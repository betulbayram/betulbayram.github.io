## Konu 2: IAM İzinleri ve Politikaları (Permissions and Policies)
Bir önceki konuda IAM'in kimliklerini (Users, Groups, Roles) yani "Kim?" sorusunun cevabını öğrendik. Şimdi ise bu kimliklerin "Ne yapabileceğini?" tanımlayan kurallar bütünü olan IAM İzinleri (Permissions) ve bu izinlerin yazıldığı belgeler olan IAM Politikalarını (Policies) inceleyeceğiz.

### 1. IAM Politikaları (IAM Policies) Nedir?
Bir **IAM Politikası**, bir veya daha fazla izni tanımlayan, **JSON (JavaScript Object Notation)** formatında yazılmış bir belgedir. Bu belge, bir kimliğe (kullanıcı, grup veya rol) iliştirildiğinde (attach), o kimliğin AWS'teki yetkilerini belirler.

Bir politikayı, bir kimliğin uyması gereken bir "anayasa" veya "kurallar listesi" olarak düşünebilirsiniz. Bu liste, hangi eylemlere izin verildiğini (**Allow**) ve hangilerinin açıkça yasaklandığını (**Deny**) belirtir.

### 2. Politika Kalıtımı ve Değerlendirme Mantığı (Policy Inheritance and Evaluation)
"Kalıtım (inheritance)" terimi, bir kullanıcının izinlerinin nasıl bir araya geldiğini ifade etmek için kullanılır. AWS'teki izinlerin nasıl çalıştığını anlamak için şu temel kuralları bilmek hayati önem taşır:

-   **Kural 1: Varsayılan Olarak Her Şey Yasaktır (Implicit Deny):** Bir eylem için açıkça bir `Allow` izni verilmemişse, o eylem varsayılan olarak reddedilir.
-   **Kural 2: İzinler Kümülatiftir:** Bir kullanıcının nihai yetkileri, kendisine doğrudan atanan politikalar ile üyesi olduğu tüm gruplardan gelen politikaların birleşimidir.
-   **KURAL 3 (EN ÖNEMLİ): AÇIK BİR REDDETME, HER ZAMAN İZİN VERMEYİ GEÇERSİZ KILAR (Explicit Deny trumps Allow):** Eğer bir kullanıcının sahip olduğu politikalardan herhangi birinde bir eylem için `Effect: "Deny"` ifadesi varsa, başka yüzlerce politikada aynı eylem için `Effect: "Allow"` olsa bile, o eylem **KESİNLİKLE YASAKLANIR**.

#### Örnek Senaryo:
-   "Developers" grubunun "AmazonEC2FullAccess" politikası var (Tüm EC2 eylemlerine izin verir).
-   "Stajyerler" grubunun "EC2InstanceStopDeny" adında özel bir politikası var (Bu politika `ec2:StopInstances` eylemini açıkça reddeder).
-   "Ayşe" adında bir kullanıcı hem "Developers" hem de "Stajyerler" grubunun üyesi.

**Sonuç:** Ayşe, EC2 sunucusu oluşturabilir (`ec2:CreateInstances`), silebilir (`ec2:TerminateInstances`) ancak **KESİNLİKLE DURDURAMAZ** (`ec2:StopInstances`). Çünkü "Stajyerler" grubundan gelen `Deny` politikası, "Developers" grubundan gelen `Allow` politikasını ezer.

#### AWS İzin Değerlendirme Mantığı:
Bir kullanıcı bir eylem yapmak istediğinde, AWS şu sırayı izler:
1.  Kullanıcıyla ilişkili tüm politikalarda bu eylem için **Explicit Deny (Açık Reddetme)** var mı? Varsa, istek **REDDEDİLİR**.
2.  **Explicit Deny** yoksa, bu eylem için **Explicit Allow (Açık İzin)** var mı? Varsa, istek **KABUL EDİLİR**.
3.  Her ikisi de yoksa, varsayılan olarak **Implicit Deny (Örtülü Reddetme)** devreye girer ve istek **REDDEDİLİR**.

### 3. IAM Politika Yapısı (IAM Policy Structure)
IAM politikaları, belirli bir yapıya sahip JSON belgeleridir. İşte bu yapının temel bileşenleri ve açıklamaları:

#### Örnek bir Politika:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowS3ListAndRead",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::ornek-sirket-bucket",
                "arn:aws:s3:::ornek-sirket-bucket/*"
            ]
        },
        {
            "Sid": "DenyDeleteAction",
            "Effect": "Deny",
            "Action": "s3:DeleteObject",
            "Resource": "arn:aws:s3:::ornek-sirket-bucket/gizli-dosyalar/*"
        }
    ]
}
```

#### Bileşenlerin Açıklaması:
-   **Version:** Politika dilinin sürümünü belirtir. Neredeyse her zaman `"2012-10-17"` kullanılır.
-   **Statement:** Politikanın ana gövdesidir. Bir veya daha fazla kural ifadesi içerir. Bir dizi (`[]`) olduğu için birden fazla ifade alabilir.
-   **Her bir `Statement` içinde:**
    -   **Sid (Statement ID):** İfade için (opsiyonel) bir tanımlayıcıdır. Politikanın okunabilirliğini artırır.
    -   **Effect:** İfadenin sonucunu belirtir. `"Allow"` (İzin Ver) veya `"Deny"` (Reddet) olabilir.
    -   **Action:** İzin verilen veya reddedilen AWS hizmet eylemlerini listeler. `hizmet-adı:EylemAdı` formatındadır (örn: `ec2:StartInstances`). Birden fazla eylem bir dizi içinde belirtilebilir. Wildcard (`*`) kullanılabilir (örn: `ec2:*` tüm EC2 eylemleri anlamına gelir).
    -   **Resource:** Eylemin uygulanacağı belirli AWS kaynağını veya kaynaklarını belirtir. Kaynaklar, **ARN (Amazon Resource Name)** formatıyla tanımlanır.
        -   **ARN Formatı:** `arn:partition:service:region:account-id:resource`
        -   **Örnek:** `arn:aws:s3:::ornek-sirket-bucket`
    -   **Condition (Opsiyonel):** Politikanın ne zaman geçerli olacağına dair koşullar eklemenizi sağlar. Örneğin, "Sadece belirli bir IP adresinden geliyorsa izin ver" veya "Sadece MFA (Çok Faktörlü Kimlik Doğrulama) aktif ise izin ver" gibi kurallar tanımlanabilir.

### 4. Politika Türleri (Types of Policies)
-   **Kimlik Tabanlı Politikalar (Identity-Based Policies):** Bir kimliğe (kullanıcı, grup veya rol) doğrudan atadığınız politikalardır. Bu derste odaklandığımız tür budur.
    -   **AWS Tarafından Yönetilen (AWS Managed):** AWS tarafından oluşturulan ve yönetilen, sık kullanılan izin setleri için hazır politikalardır (örn: `AdministratorAccess`, `AmazonS3ReadOnlyAccess`).
    -   **Müşteri Tarafından Yönetilen (Customer Managed):** Sizin kendi hesabınızda oluşturduğunuz ve yönettiğiniz özel politikalardır. Daha detaylı kontrol sağlarlar.
-   **Kaynak Tabanlı Politikalar (Resource-Based Policies):** Bir kullanıcıya değil de doğrudan bir kaynağa (örn: bir S3 bucket'ı) atanan politikalardır. Bu politikalarda, hangi kimliklerin (**Principal**) bu kaynağa erişebileceği belirtilir.
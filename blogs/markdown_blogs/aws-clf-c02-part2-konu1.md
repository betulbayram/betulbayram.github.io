# Part 2: AWS Identity and Access Management (IAM)

## Giriş: IAM Nedir ve Neden Bu Kadar Önemlidir?
**IAM (Identity and Access Management)**, AWS hizmetlerinize ve kaynaklarınıza olan erişimi güvenli bir şekilde kontrol etmenizi sağlayan merkezi bir web hizmetidir. AWS'teki güvenliğin temel direğidir ve "AWS hesabınıza kim, neye, nereden ve nasıl erişebilir?" sorusunu yanıtlar.

IAM'in iki temel fonksiyonu vardır:
-   **Kimlik Doğrulama (Authentication):** Bir kullanıcı, hizmet veya uygulamanın sisteme erişmeye çalıştığında kim olduğunu doğrulamaktır. Bu işlem, kullanıcı adı/şifre veya erişim anahtarları ile yapılır.
-   **Yetkilendirme (Authorization):** Kimliği doğrulanmış olan varlığın hangi AWS kaynakları üzerinde hangi eylemleri gerçekleştirmesine izin verildiğini belirlemektir. Bu işlem, IAM Politikaları (Policies) ile yapılır.

### IAM Hakkında Bilinmesi Gereken Temel Gerçekler:
-   **Küresel (Global) bir hizmettir:** IAM yapılandırması yaparken bir Bölge (Region) seçmenize gerek yoktur. Oluşturulan kullanıcılar, gruplar ve roller tüm bölgeler için geçerlidir.
-   **Ücretsizdir:** AWS, IAM hizmetinin kendisi için ek bir ücret talep etmez.
-   **Varsayılan Olarak Güvenlidir:** Yeni oluşturulan bir IAM kullanıcısının varsayılan olarak hiçbir izni yoktur. İzinlerin (permissions) sizin tarafınızdan açıkça verilmesi gerekir. Bu, **"En Az Ayrıcalık Prensibi" (Principle of Least Privilege)** ile uyumludur.

## Konu 1: IAM'in Temel Bileşenleri - Users, Groups ve Roles (Kim?)
Bu üç bileşen, AWS'te "kimin" veya "neyin" işlem yapacağını tanımlayan kimliklerdir.

### 1. IAM Kullanıcıları (IAM Users)
-   **Nedir?:** AWS ile etkileşim kuran tek bir varlığı (bir insan veya bir uygulama) temsil eden bir kimliktir.
-   **Özellikleri:**
    -   Her kullanıcı tek bir AWS hesabına bağlıdır.
    -   İki tür kimlik bilgisine (credentials) sahip olabilir:
        -   **Şifre (Password):** AWS Yönetim Konsolu'na (web arayüzü) insan kullanıcıların giriş yapması için kullanılır.
        -   **Erişim Anahtarları (Access Keys):** AWS CLI (Komut Satırı Arayüzü) veya SDK (Yazılım Geliştirme Kiti) üzerinden programatik erişim için kullanılır. Bir Erişim Anahtarı ID'si (Access Key ID) ve bir Gizli Erişim Anahtarı'ndan (Secret Access Key) oluşur.
-   **Kullanım Alanı:** AWS hesabınıza kalıcı olarak erişmesi gereken bireyler veya uygulamalar için kimlik oluşturmak.
-   **En Önemli Kural:** Yeni oluşturulan bir IAM kullanıcısı, kendisine bir izin politikası (policy) atanana kadar hiçbir AWS kaynağına erişemez ve hiçbir eylem gerçekleştiremez.

### 2. IAM Grupları (IAM Groups)
-   **Nedir?:** IAM kullanıcılarının bir koleksiyonudur. Bir grup, kullanıcıların bir listesini tutar.
-   **Amacı:** İzin yönetimini basitleştirmek ve ölçeklenebilir hale getirmek. Çok sayıda kullanıcı için izinleri tek tek yönetmek yerine, ortak görevlere sahip kullanıcıları bir gruba toplarsınız ve izinleri doğrudan gruba atarsınız.
-   **Örnek:** "Geliştiriciler", "Test_Ekibi" ve "Finans" gibi gruplar oluşturabilirsiniz. "Geliştiriciler" grubuna test veritabanlarına erişim izni verirken, "Finans" grubuna sadece faturalandırma (billing) verilerine erişim izni verebilirsiniz.
-   **Özellikleri:**
    -   Bir kullanıcı birden fazla gruba üye olabilir.
    -   Gruplar iç içe yerleştirilemez (bir grup başka bir grubu içeremez).

### 3. IAM Rolleri (IAM Roles)
-   **Nedir?:** Belirli izinlere sahip olan ve bir kullanıcı, uygulama veya AWS hizmeti tarafından geçici olarak üstlenilebilen (assumed) bir kimliktir.
-   **Kullanıcılardan Farkı Nedir?:** Bir rolün, kullanıcı gibi kalıcı bir şifresi veya erişim anahtarı yoktur. Bir rol üstlenildiğinde, o işi yapmak için belirli bir süre geçerli olan **geçici güvenlik kimlik bilgileri (temporary security credentials)** üretilir. Bu, rolleri çok daha güvenli bir seçenek haline getirir.
-   **En Yaygın Kullanım Alanları:**
    -   **AWS Hizmetleri İçin Roller (En Önemli Senaryo):** Bir AWS hizmetinin başka bir AWS hizmetiyle etkileşime girmesi gerektiğinde kullanılır.
        -   **Örnek:** Bir EC2 sanal sunucusunun, S3 depolama birimindeki bir dosyayı okuması gerekiyor.
        -   **YANLIŞ YÖNTEM:** Bir IAM kullanıcısının erişim anahtarlarını sunucunun içine kaydetmek. Bu anahtarlar çalınabilir.
        -   **DOĞRU YÖNTEM:** S3 okuma iznine sahip bir rol oluşturmak ve bu rolü EC2 sunucusuna atamak. EC2 hizmeti, bu rolü üstlenerek S3'e güvenli bir şekilde erişim için geçici kimlik bilgileri alır.
    -   **Hesaplar Arası Erişim (Cross-Account Access):** Bir AWS hesabındaki bir kullanıcının veya hizmetin, başka bir AWS hesabındaki kaynaklara sınırlı ve geçici erişim sağlaması için kullanılır.
    -   **Federasyon (Federation):** Şirketinizin kimlik sağlayıcısı (örn: Microsoft Active Directory) veya web kimlik sağlayıcıları (örn: Google, Facebook) ile kimliği doğrulanan kullanıcıların, AWS kaynaklarına geçici erişim sağlaması için kullanılır.
-   **Analoji:** Bir kullanıcı, şirketin kalıcı bir çalışanıdır ve kendi giriş kartı vardır. Bir rol ise, belirli bir iş için (örn: tamirat) gelen bir ziyaretçiye verilen, sadece belirli kapıları açan ve gün sonunda geçerliliğini yitiren bir ziyaretçi kartı gibidir.
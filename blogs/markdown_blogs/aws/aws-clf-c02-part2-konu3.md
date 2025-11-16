## Konu 3: IAM Erişim Yöntemleri ve Güvenlik Katmanları
Önceki konularda IAM'in kimliklerini (Users, Groups, Roles) ve bu kimliklerin yetkilerini (Policies) öğrendik. Şimdi ise, bu kullanıcıların AWS'e nasıl erişim sağladığını ve bu erişimi daha güvenli hale getirmek için hangi mekanizmaları kullanabileceğimizi inceleyeceğiz.

### 1. IAM Parola Politikası (IAM Password Policy)
-   **Nedir?:** AWS hesabınızdaki tüm IAM kullanıcıları için geçerli olacak şekilde, parola karmaşıklığı kuralları belirlemenizi sağlayan bir özelliktir. Amacı, zayıf ve kolay tahmin edilebilir parolaların kullanılmasını engelleyerek güvenliği artırmaktır.
-   **Neden Önemlidir?:** Zayıf bir parola, bir saldırganın hesaba sızması için en kolay yollardan biridir. Güçlü parola politikaları bu riski önemli ölçüde azaltır.

#### Yapılandırabileceğiniz Kurallar:
-   **Minimum Parola Uzunluğu:** Parolanın en az kaç karakter olması gerektiğini belirleyebilirsiniz (örn: en az 12 karakter).
-   **Karakter Türü Zorunluluğu:** Parolada şunlardan en az bir tane bulunmasını zorunlu kılabilirsiniz:
    -   Büyük harf (A-Z)
    -   Küçük harf (a-z)
    -   Rakam (0-9)
    -   Alfa-nümerik olmayan karakter (`!@#$%^&*()_+-=[]{}` gibi)
-   **Parola Değiştirme Yetkisi:** IAM kullanıcılarının kendi parolalarını değiştirmesine izin verebilirsiniz.
-   **Parola Tekrarını Önleme:** Kullanıcıların son X parolalarını tekrar kullanmasını engelleyebilirsiniz (örn: son 5 parolayı tekrar kullanamaz).
-   **Parola Geçerlilik Süresi:** Parolaların belirli bir süre sonra (örn: 90 gün) zorunlu olarak değiştirilmesini sağlayabilirsiniz.

> **Sınav İpucu:** IAM Parola Politikası, hesaptaki tüm IAM kullanıcıları için geçerlidir, ancak AWS hesabının **Kök Kullanıcısı (Root User)** için geçerli değildir.

### 2. Çok Faktörlü Kimlik Doğrulama (Multi-Factor Authentication - MFA)
-   **Nedir?:** MFA, kullanıcıların AWS'e giriş yaparken ek bir güvenlik katmanı sunan bir mekanizmadır. Sadece bildikleri bir şeye (parola) ek olarak, sahip oldukları bir şeyi de (fiziksel bir cihazdan gelen kod) kanıtlamalarını gerektirir.
-   **Neden Önemlidir?:** Bir kullanıcının parolası çalınsa bile, saldırgan fiziksel MFA cihazına sahip olmadığı için hesaba giriş yapamaz. Bu, hesap güvenliğini sağlamak için tek başına en etkili yöntemlerden biridir. **Kök Kullanıcı (Root User)** ve tüm admin yetkisine sahip kullanıcılar için mutlaka etkinleştirilmelidir.

#### AWS'teki MFA Cihaz Seçenekleri:
-   **Sanal MFA Cihazları (Virtual MFA Devices - En Yaygın Yöntem):**
    -   **Nasıl Çalışır?:** Akıllı telefonunuza veya bilgisayarınıza kurduğunuz, sürekli değişen 6 haneli tek kullanımlık kodlar üreten uygulamalardır (TOTP protokolü).
    -   **Örnekler:** Google Authenticator, Authy, Microsoft Authenticator.
    -   **Avantajları:** Ücretsizdir ve çoğu insanın zaten bir akıllı telefonu olduğu için kullanımı çok pratiktir.
-   **U2F / FIDO Güvenlik Anahtarları (U2F / FIDO Security Keys):**
    -   **Nasıl Çalışır?:** Bilgisayarınızın USB portuna takılan fiziksel bir güvenlik anahtarıdır. Giriş sırasında bu cihaza dokunmanız istenir.
    -   **Örnek:** YubiKey.
    -   **Avantajları:** Kimlik avı (phishing) saldırılarına karşı çok yüksek koruma sağlar. Sanal MFA'ya göre daha güvenli kabul edilir.
-   **Donanım MFA Cihazları (Hardware MFA Devices):**
    -   **Nasıl Çalışır?:** Sadece kod üretme işine yarayan, anahtarlık boyutunda küçük fiziksel cihazlardır.
    -   **Örnek:** Gemalto tarafından sağlanan donanım token'ları.
    -   **Avantajları/Dezavantajları:** Çok güvenlidir ancak ek bir maliyeti vardır ve AWS'ten ayrıca satın alınması gerekir.

### 3. Kullanıcılar AWS'e Nasıl Erişir? (How Can Users Access AWS?)
Bir IAM kullanıcısının AWS kaynaklarıyla etkileşime geçebileceği üç temel yol vardır:

-   **AWS Yönetim Konsolu (AWS Management Console):**
    -   **Erişim Yöntemi:** Web tarayıcısı üzerinden erişilen, tıklamalarla yönetilen grafiksel arayüz (GUI).
    -   **Kimlik Doğrulama:** Kullanıcı adı ve şifre (+ MFA).
    -   **Kimin İçin İdeal?:** Sistemleri görsel olarak yönetmek isteyenler, geliştirici olmayan teknik personel ve AWS'e yeni başlayanlar için.
-   **AWS Komut Satırı Arayüzü (AWS Command Line Interface - CLI):**
    -   **Erişim Yöntemi:** Bilgisayarınızın terminal veya komut istemcisi üzerinden komutlar yazarak AWS hizmetlerini yönetmenizi sağlayan bir araç.
    -   **Kimlik Doğrulama:** Erişim Anahtarları (Access Keys).
    -   **Kimin İçin İdeal?:** Sistem yöneticileri, DevOps mühendisleri ve görevleri otomatikleştirmek veya script yazmak isteyenler için.
-   **AWS Yazılım Geliştirme Kitleri (AWS Software Development Kits - SDKs):**
    -   **Erişim Yöntemi:** Python, Java, JavaScript, .NET gibi popüler programlama dilleri için sunulan kütüphaneler aracılığıyla, kendi yazdığınız uygulama kodları içinden AWS hizmetlerini yönetmenizi sağlar.
    -   **Kimlik Doğrulama:** Erişim Anahtarları (Access Keys).
    -   **Kimin İçin İdeal?:** AWS hizmetleriyle entegre çalışan uygulamalar geliştiren yazılım geliştiriciler için (örn: kullanıcıların fotoğraflarını S3'e yükleyen bir mobil uygulama).

### 4. Erişim Anahtarları (Access Keys) ve Örnekleri
-   **Nedir?:** Programatik erişim (CLI ve SDK aracılığıyla) için kullanılan, uzun süreli kimlik bilgileridir. Bir kullanıcı adı ve şifre çifti gibidirler ancak makineler tarafından kullanılmak üzere tasarlanmışlardır.
-   **İki Parçadan Oluşur:**
    -   **Erişim Anahtarı ID'si (Access Key ID):** Kullanıcı adınız gibidir. Hangi kullanıcıya ait olduğunu belirtir ve gizli değildir.
        -   **Örnek:** `AKIAIOSFODNN7EXAMPLE`
    -   **Gizli Erişim Anahtarı (Secret Access Key):** Parolanız gibidir. Çok gizlidir ve mutlaka güvenli bir yerde saklanmalıdır.
        -   **Örnek:** `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

> ### ÇOK ÖNEMLİ GÜVENLİK NOTU:
> -   Gizli Erişim Anahtarı (Secret Access Key), sadece oluşturulduğu anda **BİR KEZ** gösterilir. Eğer kaybederseniz, onu bir daha asla göremezsiniz; yeni bir anahtar çifti oluşturmanız gerekir.
> -   Erişim anahtarlarını **ASLA** kodunuzun içine doğrudan yazmayın veya GitHub gibi herkese açık repolara göndermeyin! Bu, hesabınızın dakikalar içinde çalınmasına neden olabilir.

**En İyi Yöntem:** AWS üzerinde çalışan uygulamalarınız (örn: EC2 üzerinde çalışan bir yazılım) için erişim anahtarları yerine her zaman **IAM Rollerini** kullanın. Bu sayede kalıcı anahtarlara olan ihtiyacı ortadan kaldırmış olursunuz.
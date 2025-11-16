## Konu 4: Programatik Erişim ve IAM Güvenlik Araçları
Bu bölümde, AWS'i otomatikleştirmek ve uygulamalara entegre etmek için kullanılan araçları (CLI ve SDK), rollerin en kritik kullanım senaryosunu ve IAM yapılandırmanızı denetlemenize yardımcı olan iki temel güvenlik aracını öğreneceğiz.

### 1. AWS Komut Satırı Arayüzü (AWS Command Line Interface - CLI)
-   **Nedir?:** AWS CLI, AWS hizmetlerinizi bilgisayarınızdaki bir terminal veya komut istemcisi penceresinden, komutlar yazarak yönetmenizi sağlayan birleşik bir araçtır. Tek bir araç yükleyerek yüzlerce AWS hizmetini kontrol edebilirsiniz.
-   **Kimler Kullanır?:** Özellikle sistem yöneticileri, DevOps mühendisleri ve görevleri otomatikleştirmek isteyen geliştiriciler tarafından sıkça kullanılır.
-   **Nasıl Çalışır?:**
    1.  Öncelikle bilgisayarınıza (Windows, macOS veya Linux) AWS CLI'ı yüklersiniz.
    2.  Ardından, terminalde `aws configure` komutunu çalıştırarak kurulum yaparsınız. Bu komut size şunları sorar:
        -   `AWS Access Key ID`: Erişim Anahtarı ID'niz.
        -   `AWS Secret Access Key`: Gizli Erişim Anahtarınız.
        -   `Default region name`: Varsayılan olarak hangi AWS Bölgesi'nde çalışmak istediğiniz (örn: `eu-central-1`).
        -   `Default output format`: Komut çıktılarının hangi formatta olacağı (örn: `json`, `text`, `table`).
-   **Örnek Komut:**
    -   `aws s3 ls` -> Bu komut, hesabınızdaki tüm S3 bucket'larını listeler.
    -   `aws ec2 describe-instances` -> Bu komut, hesabınızdaki tüm EC2 sunucuları hakkında detaylı bilgi verir.
-   **Temel Faydası:** Tekrarlayan görevleri otomatikleştiren betikler (scripts) yazmayı çok kolaylaştırır. Örneğin, her gece tüm sunucuları durduran bir betik yazabilirsiniz.

### 2. AWS Yazılım Geliştirme Kitleri (AWS Software Development Kits - SDKs)
-   **Nedir?:** SDK'lar, yazılım geliştiricilerin tercih ettikleri programlama dillerini kullanarak AWS hizmetleriyle etkileşime girmelerini sağlayan kütüphaneler ve API'ler koleksiyonudur.
-   **CLI'dan Farkı Nedir?:** CLI, komut satırında çalıştırdığınız hazır bir araçtır. SDK ise, kendi uygulamanızın kodunun içine dahil ettiğiniz bir kütüphanedir. SDK, `s3.upload()`, `ec2.start_instance()` gibi dile özgü, kullanımı kolay fonksiyonlar sunarak AWS entegrasyonunu basitleştirir.
-   **Kimler Kullanır?:** Yazılım geliştiriciler.
-   **Desteklenen Diller:** Python (**Boto3** olarak bilinir), JavaScript (Node.js), Java, .NET, Go, Ruby, PHP ve daha birçok popüler dili destekler.
-   **Örnek Senaryo:** Bir kullanıcı, web uygulamanıza bir profil fotoğrafı yüklediğinde, uygulamanızın arka planında çalışan Python kodu, **Boto3 (Python SDK'sı)** kütüphanesini kullanarak bu fotoğrafı otomatik olarak bir S3 bucket'ına kaydedebilir.

### 3. Servisler İçin IAM Rolleri (IAM Roles for Services) - Detaylı Bakış
Bu konseptten daha önce bahsetmiştik, ancak AWS güvenliğinin temel taşı olduğu için önemi nedeniyle daha derinine inmekte fayda var.

-   **Çözdüğü Problem:** "Bir AWS hizmetinin (örneğin bir EC2 sunucusunun), başka bir AWS hizmetine (örneğin bir S3 bucket'ına) erişmesi gerektiğinde, bunu kalıcı ve riskli erişim anahtarlarını sunucuda saklamadan nasıl güvenli bir şekilde yapabiliriz?"
-   **Çözüm: IAM Rolü Kullanımı**
    1.  **Rol Oluşturma:** İlk olarak, S3'e erişim izni veren bir IAM Rolü oluşturursunuz.
    2.  **Güven İlişkisi (Trust Policy):** Rolü oluştururken, bu rolü kimin üstlenebileceğini belirtirsiniz. Bu senaryoda, "güvenilen varlık" olarak EC2 hizmetini (`ec2.amazonaws.com`) seçersiniz. Bu, "Sadece EC2 hizmeti bu rolü üstlenebilir" demektir.
    3.  **İzin Politikası (Permissions Policy):** Role, ne yapabileceğini söyleyen bir izin politikası (örn: "belirli bir S3 bucket'ından nesne okuma" izni) eklersiniz.
    4.  **Role Atama:** EC2 sunucusunu başlatırken, oluşturduğunuz bu rolü sunucuya atarsınız.
-   **Arka Planda Ne Olur?:** EC2 sunucusu, kendisine atanan rolü üstlenerek **AWS Güvenlik Jetonu Servisi'nden (STS)** geçici güvenlik kimlik bilgileri (geçici bir erişim anahtarı, gizli anahtar ve bir oturum jetonu) talep eder. Bu kimlik bilgileri kısa bir süre için geçerlidir ve AWS tarafından otomatik olarak yenilenir (rotate edilir). Bu sayede sunucuda hiçbir zaman kalıcı bir anahtar saklanmaz.

> **Altın Kural:** Bir AWS hizmetinin başka bir AWS hizmetine erişmesi gerektiğinde her zaman **IAM Rollerini** kullanın. EC2 sunucularınızda kalıcı erişim anahtarları kullanmaktan ne pahasına olursa olsun kaçının.

### 4. IAM Güvenlik Araçları (IAM Security Tools)
AWS, IAM yapılandırmanızı denetlemenize ve "En Az Ayrıcalık Prensibi"ni uygulamanıza yardımcı olacak iki güçlü araç sunar:

#### 1. IAM Kimlik Bilgileri Raporu (IAM Credentials Report)
-   **Nedir?:** Tüm AWS hesabınız için indirebileceğiniz, tüm IAM kullanıcılarınızı ve onların kimlik bilgilerinin (parola, erişim anahtarı, MFA) durumunu listeleyen bir CSV (Excel) dosyasıdır.
-   **Ne İşe Yarar?:** Hesabınızın genel güvenlik durumunu hızlıca denetlemenizi sağlar. Bu raporu inceleyerek şu gibi sorulara cevap bulabilirsiniz:
    -   "Hangi kullanıcılar MFA'yı etkinleştirmemiş?"
    -   "Hangi kullanıcıların parolası 90 günden daha eski?"
    -   "Hangi kullanıcıların hiç kullanılmayan veya çok eski erişim anahtarları var?"
    -   "Bir kullanıcı en son ne zaman konsola giriş yapmış?"

#### 2. IAM Erişim Danışmanı (IAM Access Advisor)
-   **Nedir?:** Belirli bir kullanıcı, grup veya rol seviyesinde, onlara atanan hizmet izinlerini ve bu hizmetlere en son ne zaman erişildiğini gösteren bir özelliktir.
-   **Credentials Report'tan Farkı Nedir?:** Credentials Report, kimlik bilgilerinin durumuna (parola var mı, MFA aktif mi?) odaklanır. Access Advisor ise izinlerin **kullanımına** (verilen S3 izni en son ne zaman kullanıldı?) odaklanır.
-   **Ne İşe Yarar?:** En Az Ayrıcalık Prensibi'ni uygulamanıza yardımcı olur.
    -   **Örnek Senaryo:** "Finans" grubuna faturalandırma, S3 ve EC2 erişim izni verdiğinizi varsayalım. 6 ay sonra Access Advisor'a baktığınızda, bu grubun S3 ve EC2 izinlerini hiç kullanmadığını görürsünüz. Bu bilgi, artık ihtiyaç duyulmayan bu izinleri gruptan güvenle kaldırabileceğinizi ve böylece potansiyel güvenlik riskini azaltabileceğinizi gösterir.
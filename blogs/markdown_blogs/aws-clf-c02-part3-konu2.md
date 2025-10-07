## Konu 2: EC2 Boyutlandırma ve Yapılandırma Seçenekleri
Bir önceki dersimizde EC2'nin ne olduğunu öğrendik. Şimdi ise "Yeni bir EC2 sunucusu oluştur" (Launch Instance) düğmesine tıkladığımızda karşımıza çıkan ve sunucumuzun karakterini şekillendiren temel seçeneklerin detaylarına ineceğiz. Bu süreci, sanal ortamda kendinize özel bir bilgisayar toplamak gibi düşünebilirsiniz.

### 1. İşletim Sistemi (OS) ve Donanım (CPU, RAM)

#### İşletim Sistemi (Operating System) - AMI Seçimi:
Bir EC2 sunucusu oluştururken attığınız ilk adım, onun işletim sistemini ve temel yazılımını içeren şablonu, yani **AMI (Amazon Machine Image)**'ı seçmektir.

**Popüler Seçenekler:**
-   **Amazon Linux 2 / Amazon Linux 2023:** AWS tarafından geliştirilen, genel amaçlı, stabil ve AWS hizmetleriyle tam entegre çalışan bir Linux dağıtımıdır.
-   **Ubuntu, Red Hat (RHEL), SUSE:** Sektör standardı haline gelmiş popüler Linux dağıtımları.
-   **Windows Server:** Windows tabanlı uygulamalar için Microsoft'un sunucu işletim sistemleri (örn: Windows Server 2019, 2022).
-   **AWS Marketplace:** Burası, üçüncü parti yazılım satıcılarının kendi hazırladıkları AMI'ları sunduğu bir pazar yeridir. Örneğin, içinde hazır WordPress kurulmuş, güvenlik duvarı (firewall) yazılımı olan veya belirli bir veritabanı için optimize edilmiş AMI'ları burada bulabilirsiniz.

#### CPU ve RAM - Sunucu Tipi (Instance Type) Seçimi:
CPU ve RAM'i ayrı ayrı seçmezsiniz. Bunun yerine, bu kaynakları belirli oranlarda bir araya getiren **Sunucu Tipi (Instance Type)**'nı seçersiniz. Bir önceki derste bahsettiğimiz gibi, iş yükünüze en uygun olanı seçmelisiniz:
-   **Web sunucusu için:** Dengeli bir **Genel Amaçlı (General Purpose)** tip (örn: `t3.medium`, `m5.large`).
-   **Veri analizi için:** Yüksek işlem gücüne sahip bir **İşlem Gücü Optimize Edilmiş (Compute Optimized)** tip (örn: `c5.xlarge`).
-   **Bellek-içi veritabanı için:** Bol RAM'e sahip bir **Bellek Optimize Edilmiş (Memory Optimized)** tip (örn: `r5.large`).

### 2. Depolama Seçenekleri (Storage Options)
Bu, en kritik seçimlerden biridir. Verilerinizin nerede ve nasıl saklanacağını belirler.

#### Amazon EBS (Elastic Block Store)
-   **Analoji:** "Bulut için ağa bağlı bir USB hard disk."
-   **Tanım:** EC2 sunucunuza bir ağ bağlantısı üzerinden takılan, blok seviyesinde bir depolama birimidir.
-   **Temel Özellikleri:**
    -   **Kalıcıdır (Persistent):** Bu en önemli özelliğidir. EC2 sunucunuzu durdursanız veya hatta sonlandırsanız (terminate) bile, EBS birimindeki verileriniz silinmez. Birim, hesabınızda kalmaya devam eder ve başka bir sunucuya takılabilir.
    -   **Dayanıklıdır (Durable):** Verileriniz, arıza riskine karşı aynı Erişilebilirlik Alanı (AZ) içindeki birden çok sunucuda otomatik olarak kopyalanır.
    -   **Yedeklenebilir:** EBS birimlerinin anlık görüntülerini (snapshot) alarak S3'te güvenle yedekleyebilirsiniz.
-   **Kullanım Alanı:** İşletim sisteminin kurulduğu önyükleme birimi (boot volume) ve kalıcı olması gereken tüm verileriniz için varsayılan ve en yaygın seçenektir.

#### EC2 Instance Store
-   **Analoji:** "Sunucunun içindeki dahili, geçici disk."
-   **Tanım:** EC2 sunucusunun çalıştığı fiziksel ana makinenin (host machine) kendi üzerinde bulunan, sunucuya fiziksel olarak bağlı bir depolama alanıdır.
-   **Temel Özellikleri:**
    -   **Geçicidir (Ephemeral / Non-Persistent):** En kritik fark budur. Eğer EC2 sunucusunu durdurur (stop), hazırda bekletir (hibernate) veya sonlandırırsanız (terminate), Instance Store üzerindeki **TÜM VERİLER KALICI OLARAK SİLİNİR**.
    -   **Yüksek Performans:** Fiziksel olarak bağlı olduğu için çok yüksek okuma/yazma hızları (IOPS) ve çok düşük gecikme sunar.
-   **Kullanım Alanı:** Önbellek (cache), arabellek (buffer), geçici log dosyaları veya başka bir yerde yedeği olan ve kaybolmasında sakınca olmayan veriler için idealdir.

#### Amazon EFS (Elastic File System)
-   **Analoji:** "Bulut için paylaşılan bir ağ sürücüsü (NAS)."
-   **Tanım:** Birden çok EC2 sunucusunun aynı anda bağlanıp kullanabildiği, paylaşılan bir dosya depolama hizmetidir.
-   **Temel Özellikleri:**
    -   **Paylaşılabilirdir:** En önemli özelliğidir. Bir EFS dosya sistemine, farklı AZ'lerdeki yüzlerce EC2 sunucusu aynı anda erişebilir. (EBS ise aynı anda sadece tek bir sunucuya bağlanabilir).
    -   **Esnektir (Elastic):** Siz dosya ekledikçe kapasitesi otomatik olarak artar, dosya sildikçe azalır. Önceden bir boyut belirlemenize gerek yoktur.
    -   **Linux Tabanlıdır:** Linux sunucularıyla NFS protokolü üzerinden çalışır.
-   **Kullanım Alanı:** İçerik yönetim sistemleri, birden çok web sunucusunun ortak olarak erişmesi gereken dosyalar, merkezi kod depoları.

| Özellik                 | ✅ Amazon EBS                      | ⚠️ EC2 Instance Store             | 🔄 Amazon EFS                        |
| :---------------------- | :--------------------------------- | :------------------------------- | :----------------------------------- |
| **Veri Kalıcılığı** | Kalıcı (Persistent)                | Geçici (Ephemeral)               | Kalıcı (Persistent)                  |
| **Erişim Modeli** | Tek bir EC2'ye bağlı               | Tek bir EC2'ye bağlı             | Birden çok EC2'den erişilebilir      |
| **Performans** | İyi - Mükemmel (tipe göre)         | **En Yüksek** (Düşük Gecikme)    | İyi (Paylaşılan dosya sistemi için)  |
| **Temel Kullanım Alanı**| Önyükleme diski, veritabanları     | Önbellek, geçici dosyalar        | Paylaşılan web içeriği, merkezi loglar|

### 3. Ağ ve Güvenlik (Networking & Security)

#### Ağ Kartı (Network Card - Elastic Network Interface - ENI)
Her EC2 sunucusunun, sanal ağınıza (VPC) bağlanmasını sağlayan bir sanal ağ kartı vardır. Bu kartın özel bir IP adresi, MAC adresi gibi özellikleri bulunur.

#### Güvenlik Duvarı Kuralları (Firewall Rules - Security Group)
-   **Tanım:** EC2 sunucusu seviyesinde çalışan, sanal bir güvenlik duvarıdır. Sunucuya hangi portlardan, hangi IP adreslerinden trafik gelebileceğini ve sunucudan dışarıya hangi trafiğin çıkabileceğini kontrol eder.
-   **Stateful (Durum Bilgili):** En önemli özelliğidir. Eğer siz dışarıdan içeriye 80. porttan (HTTP) gelen bir isteğe izin verirseniz, o isteğe verilen cevabın dışarı çıkmasına otomatik olarak izin verilir. Giden trafik için ayrıca bir kural yazmanıza gerek kalmaz.
-   **Kurallar:** Sadece **"İzin Ver" (Allow)** kuralları oluşturabilirsiniz. Varsayılan olarak, izin verilmeyen her şey engellenir. **"Yasakla" (Deny)** kuralı yoktur.

### 4. Başlangıç Otomasyonu (EC2 User Data - Bootstrap Script)
-   **Nedir?:** **User Data**, bir EC2 sunucusu ilk kez başlatılırken (first boot) otomatik olarak çalıştırılacak bir betik (script) veya komutlar dizisi eklemenizi sağlayan bir alandır. Bu betiğe genellikle **"Bootstrap Script"** denir.
-   **Ne İşe Yarar?:** Sunucuları manuel olarak yapılandırmak yerine, ilk açılışta kendilerini otomatik olarak hazırlamalarını sağlar.
-   **Örnek Kullanım Alanları:**
    -   İşletim sistemini en son yamalarla güncellemek (`sudo yum update -y`).
    -   Gerekli yazılımları kurmak (örn: Apache web sunucusunu kurmak).
    -   Kodunuzu bir depodan (örn: GitHub) sunucuya çekmek.
    -   Gerekli konfigürasyon dosyalarını düzenlemek.

***Unutma:*** *User Data betiği, varsayılan olarak sadece ve sadece sunucunun ilk açılışında bir kez çalışır.*
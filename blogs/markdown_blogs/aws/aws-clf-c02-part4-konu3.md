## Konu 3: Amazon EFS ve EC2 Depolama Sorumluluk Modeli

### 1. Amazon EFS (Elastic File System) - Paylaşılan Ağ Sürücüsü
**Amazon EFS**, AWS bulut hizmetleriyle kullanılmak üzere tasarlanmış, basit, ölçeklenebilir, tam yönetilen ve esnek bir paylaşılan dosya depolama hizmetidir.

* **Analoji:** EFS'i, bir ofisteki herkesin bilgisayarından erişebildiği ortak bir "ağ sürücüsü" (genellikle Z: veya G: sürücüsü olarak bilinir) veya bir NAS (Network Attached Storage) cihazı gibi düşünebilirsiniz.

#### Temel Özellikleri:
-   **Paylaşılabilirdir (Sharable):** Bu, EFS'in en ayırıcı ve en güçlü özelliğidir. Bir EFS dosya sistemine, aynı bölge (Region) içindeki farklı Erişilebilirlik Alanları'ndaki (AZ) binlerce EC2 sunucusu **aynı anda** bağlanabilir ve dosyaları okuyup yazabilir.
-   **Esnektir (Elastic):** "Elastic" kelimesi, depolama alanını önceden belirlemenize gerek olmadığı anlamına gelir. Siz dosya ekledikçe EFS'in kapasitesi **otomatik olarak büyür**, dosya sildikçe **otomatik olarak küçülür**. Sadece kullandığınız alan kadar ödeme yaparsınız.
-   **Tam Yönetilen (Fully Managed):** Donanım bakımı, yazılım yamaları, kapasite yönetimi gibi tüm altyapı işlerini AWS sizin yerinize yönetir.
-   **Bölgeseldir (Regional):** Bir EFS dosya sistemi, oluşturulduğu bölge içindeki birden çok Erişilebilirlik Alanı'na veriyi otomatik olarak yedekler. Bu, onu doğası gereği **yüksek erişilebilir (highly available)** ve **dayanıklı (durable)** kılar.
-   **Linux Tabanlıdır:** EFS, Linux tabanlı işletim sistemleriyle standart **NFSv4 (Network File System)** protokolü üzerinden çalışır.

### 2. EBS vs. EFS - Kritik Farklar
Bu iki depolama hizmeti farklı amaçlar için tasarlanmıştır ve aralarındaki farkları bilmek, doğru mimariyi kurmak için hayati önem taşır.

| Özellik | Amazon EBS (Elastic Block Store) | Amazon EFS (Elastic File System) |
| :--- | :--- | :--- |
| **Depolama Tipi** | Blok Depolama (Bir sunucuya takılan disk gibi) | Dosya Depolama (Paylaşılan klasör gibi) |
| **Erişim** | Aynı anda **tek bir** EC2 sunucusuna bağlanır (aynı AZ'de) | Aynı anda **binlerce** EC2 sunucusuna bağlanabilir (bölge genelinde) |
| **Boyutlandırma** | Boyut önceden belirlenir (Provisioned) | Otomatik olarak ölçeklenir (Elastic) |
| **Performans** | IOPS & Throughput (MB/s) - önceden belirlenir | Throughput (MB/s) - kullanıma göre ölçeklenir |
| **Protokol** | Ağa bağlı sanal disk | NFSv4 protokolü |
| **Temel Kullanım Alanı** | Önyükleme diski, tek sunucu veritabanları | Paylaşılan web içeriği, merkezi loglama, veri bilimi |

### 3. EFS Infrequent Access (Seyrek Erişilen) & Yaşam Döngüsü Yönetimi
-   **Nedir?:** **EFS Infrequent Access (EFS IA)**, sık erişilmeyen dosyalarınız için önemli ölçüde daha düşük maliyetli bir depolama sınıfıdır. Bu, EFS kullanımında maliyet optimizasyonu sağlayan bir özelliktir.
-   **Nasıl Çalışır (Lifecycle Management)?:** EFS dosya sisteminiz için bir **Yaşam Döngüsü Politikası** ayarlayabilirsiniz. Örneğin, "30 gündür erişilmeyen dosyaları IA sınıfına taşı" gibi bir kural belirlersiniz.
    -   EFS, bu kurala göre 30 gündür dokunulmayan dosyaları otomatik ve şeffaf bir şekilde standart EFS depolama sınıfından daha ucuz olan EFS IA sınıfına taşır.
    -   Bir kullanıcı veya uygulama o dosyaya tekrar eriştiğinde, EFS dosyayı yine otomatik olarak standart sınıfa geri taşır.
-   **Faydası:** Bu özellik sayesinde, hiçbir manuel müdahale olmadan, sadece bir kural belirleyerek EFS faturalarınızda ciddi tasarruf sağlayabilirsiniz.

### 4. EC2 Depolama için Paylaşılan Sorumluluk Modeli
EC2 ile kullanılan depolama servisleri (EBS, EFS, Instance Store) için güvenlik sorumlulukları şu şekilde dağılır:

#### AWS'nin Sorumlulukları (Bulutun KENDİSİNİN Güvenliği)
-   **Altyapı Güvenliği:** Depolama hizmetlerini çalıştıran fiziksel disklerin, sunucuların, ağ ekipmanlarının ve veri merkezlerinin güvenliği ve bakımı.
-   **Dayanıklılık ve Erişilebilirlik:**
    -   **EBS için:** Verileri, arızalara karşı **aynı Erişilebilirlik Alanı (AZ) içinde** otomatik olarak yedeklemek.
    -   **EFS için:** Verileri, arızalara karşı bölge içindeki **birden çok Erişilebilirlik Alanı'na (Multi-AZ)** otomatik olarak yedeklemek.
-   Servislerin AWS'in taahhüt ettiği erişilebilirlik oranlarında (SLA) çalışmasını sağlamak.

#### Sizin (Müşterinin) Sorumluluklarınız (Bulutun İÇİNDEKİ Güvenlik)
-   **Veri Şifreleme (Data Encryption):**
    -   EBS birimleriniz ve EFS dosya sistemleriniz için bekleme anında şifrelemeyi (**encryption-at-rest**) etkinleştirmeyi seçmek. AWS bu özelliği sunar, ancak onu aktif hale getirmek sizin sorumluluğunuzdadır.
    -   Verilerinizin EC2 ile depolama birimi arasında hareket ederken şifrelenmesini (**encryption-in-transit**) yapılandırmak.
-   **Ağ Erişimi Kontrolü (Network Access Control):**
    -   EC2 sunucularınızın **Security Group** kurallarını doğru yapılandırarak depolama birimlerine yalnızca yetkili sunucuların erişebildiğinden emin olmak.
    -   EFS için, bağlantı noktalarının (mount targets) hangi alt ağlarda (subnet) olacağını ve onlara hangi Security Group'ların atanacağını belirlemek.
-   **IAM Politikaları (IAM Policies):**
    -   Hangi kullanıcı veya rollerin depolama kaynakları üzerinde eylem (EBS birimi oluşturma, Snapshot alma, EFS dosya sistemini silme vb.) yapabileceğini IAM ile kontrol etmek.
-   **Yedekleme Stratejisi (Backup Strategy):**
    -   **EBS için:** Düzenli olarak **EBS Snapshot'ları** almayı ve bu snapshot'ların yönetimini (saklama süresi, kopyalama vb.) planlamak.
    -   **EFS için:** **AWS Backup** hizmetini veya başka araçları kullanarak EFS dosya sisteminizin yedeklerini oluşturmak ve yönetmek.
-   **Dosya Seviyesi İzinler (File-Level Permissions - EFS için):**
    -   EFS dosya sistemine bağlandıktan sonra, içindeki dosya ve klasörlerin standart Linux izinlerini (`chmod`, `chown`) yönetmek sizin sorumluluğunuzdadır.
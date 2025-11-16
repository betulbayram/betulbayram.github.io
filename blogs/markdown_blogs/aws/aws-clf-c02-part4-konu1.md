## Konu 1: Amazon EBS - EC2'nin Kalıcı ve Esnek Diski

### 1. EBS Volume Nedir?
**Amazon EBS (Elastic Block Store)**, tek bir EC2 sunucusuna bağlanabilen, dayanıklı, blok seviyesinde bir depolama birimidir.

Bunu anlamanın en kolay yolu, onu *"bulut için sanal bir USB hard disk"* gibi düşünmektir. Tıpkı bilgisayarınıza harici bir disk takar gibi, EBS birimlerini de EC2 sunucularınıza takıp çıkarabilirsiniz. Bu diskler, sunucunuza bir ağ üzerinden bağlıdır, bu da onlara esneklik ve kalıcılık kazandırır.

EC2 sunucusunun işletim sistemini (**boot volume**) ve kalıcı olması gereken tüm verileri (**data volume**) depolamak için varsayılan ve en yaygın yöntemdir.

### 2. EBS Hacminin Özellikleri
-   **Kalıcılık (Persistence):** Bu, EBS'nin en temel özelliğidir. Bir EBS birimi, bağlı olduğu EC2 sunucusu durdurulsa veya hatta sonlandırılsa (terminate) bile var olmaya devam eder. Verileriniz güvendedir ve birim, daha sonra başka bir EC2 sunucusuna bağlanabilir.
-   **Erişilebilirlik Alanı Sınırlaması (Availability Zone-Scoped):** Bu çok önemli bir kuraldır. Bir EBS birimi, oluşturulduğu Erişilebilirlik Alanı'na (AZ) aittir (örn: `eu-central-1a`). **Sadece ve sadece aynı AZ içindeki EC2 sunucularına bağlanabilir.** `eu-central-1a`'daki bir EBS birimini `eu-central-1b`'deki bir sunucuya doğrudan bağlayamazsınız.
-   **Tek Bir Sunucuya Bağlantı:** Standart bir EBS birimi, aynı anda sadece **tek bir EC2 sunucusuna** bağlı olabilir. (Not: İleri seviye kullanım durumları için birden fazla sunucuya bağlanabilen özel tipler de vardır, ancak temel kural budur).
-   **Esnek Boyutlandırma:** EBS birimlerini ihtiyacınıza göre farklı boyutlarda (1 GB'den 16 TB'a kadar) oluşturabilir ve daha sonra ihtiyacınız arttığında bu birimlerin boyutunu kolayca artırabilirsiniz.
-   **Farklı Performans Seviyeleri:** Genel amaçlı SSD'lerden (gp3), saniyede on binlerce işlem yapabilen yüksek performanslı IOPS SSD'lere (io2 Block Express) kadar farklı performans ve maliyet seçenekleri sunar.

### 3. EBS Volume Örneği
Bir web sunucusu senaryosunu düşünelim:

-   **Önyükleme Birimi (Root/Boot Volume):** 10 GB'lık bir EBS birimi, Amazon Linux işletim sistemini ve temel dosyaları barındırmak için kullanılır. Bu, Windows'taki `C:` sürücüsü gibidir.
-   **Veri Birimi (Data Volume):** 50 GB'lık ikinci bir EBS birimi, web sitesinin dosyalarını, resimlerini ve veritabanı verilerini saklamak için sunucuya ek olarak bağlanır. Bu da `D:` sürücüsü gibidir.

Eğer bu sunucuyu sonlandırırsak, veri birimi hesabımızda kalmaya devam eder ve içindeki değerli verileri başka bir sunucuya bağlayarak kullanabiliriz.

### 4. EBS "Sonlandırmada Sil" Özelliği (Delete on Termination Attribute)
Bu, bir EBS biriminin, bağlı olduğu EC2 sunucusu sonlandırıldığında ne olacağını belirleyen basit ama önemli bir ayardır.

-   **Önyükleme Birimi (Root Volume) için:** Varsayılan olarak bu ayar **AÇIKTIR (True)**. Yani, sunucuyu sonlandırdığınızda işletim sisteminin bulunduğu disk de otomatik olarak silinir. Bu genellikle istenen bir davranıştır.
-   **Ek Veri Birimleri (Additional Data Volumes) için:** Varsayılan olarak bu ayar **KAPALIDIR (False)**. Yani, sunucuyu sonlandırdığınızda ek veri diskiniz silinmez, hesabınızda kalır. Bu, yanlışlıkla veri kaybını önleyen bir güvenlik önlemidir.

Bu ayarı bir sunucuya disk bağlarken veya daha sonra istediğiniz zaman değiştirebilirsiniz.

### 5. EBS Snapshots
-   **Nedir?:** Bir EBS Snapshot, bir EBS biriminin belirli bir andaki anlık yedeğidir (**point-in-time backup**). Bir diskin "fotoğrafını çekmek" gibi düşünebilirsiniz.
-   **Nerede Saklanır?:** Snapshot'lar, yüksek dayanıklılık ve düşük maliyet için arka planda **Amazon S3**'te saklanır. Ancak siz onları S3 konsolunda değil, EC2 konsolu altından yönetirsiniz.

### 6. EBS Snapshot'larının Özellikleri
-   **Artımlı Olma (Incremental):** Bu, Snapshot'ların en verimli özelliğidir.
    -   Bir diskten aldığınız ilk snapshot, diskin tamamının bir kopyasıdır.
    -   Daha sonra aldığınız tüm snapshot'lar ise sadece bir önceki snapshot'tan bu yana **değişen veri bloklarını** kaydeder.
    -   Bu, hem yedek alma işlemini çok hızlandırır hem de depolama maliyetlerinizi önemli ölçüde düşürür. Bir diski sildiğinizde ise AWS, tutarlılığı sağlamak için sadece ihtiyaç duyulan verileri saklar.
-   **Bölge Kapsamlı Olma (Region-Scoped):** Snapshot'lar, oluşturuldukları AWS Bölgesi (Region) içinde saklanır.
-   **Yeni Hacimler Oluşturma:** Bir snapshot'ın temel amacı, ondan yeni bir EBS birimi oluşturarak veriyi geri yüklemektir. Oluşturulan yeni birim, snapshot'ın alındığı andaki orijinal diskin birebir kopyası olur.
-   **Erişilebilirlik Alanları (AZ) Arası Taşıma:** Bir EBS birimini bir AZ'den diğerine taşımanın standart yolu budur. `eu-central-1a`'daki bir diskin snapshot'ını alıp, bu snapshot'tan `eu-central-1b`'de yeni bir disk oluşturabilirsiniz.
-   **Bölgeler (Region) Arası Kopyalama:** Bir snapshot'ı bir AWS Bölgesi'nden diğerine (örn: Frankfurt'tan İrlanda'ya) kopyalayabilirsiniz. Bu, **felaket kurtarma (disaster recovery)** ve coğrafi genişleme stratejileri için kritik bir özelliktir.
-   **AMI Oluşturma:** Bir işletim sistemi diskinin (root volume) snapshot'ından yeni bir **AMI (Amazon Machine Image)** oluşturabilirsiniz. Bu sayede, yapılandırdığınız sunucunun aynısından yüzlerce kopya başlatabilirsiniz.
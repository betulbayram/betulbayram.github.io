## Konu 2: Amazon Machine Image (AMI) ve Instance Store

### 1. AMI'ye Genel Bakış
**Amazon Machine Image (AMI)**, bir EC2 sunucusunu (instance) başlatmak için gereken tüm bilgileri içeren bir ana şablondur. Bir evin inşaat planı (blueprint) ne ise, bir EC2 sunucusu için de AMI odur. Bu planı kullanarak birbirinin aynısı yüzlerce ev (EC2 sunucusu) inşa edebilirsiniz.

Bir AMI'nin içinde temel olarak şunlar bulunur:
-   **Bir Kök Hacim (Root Volume) Şablonu:** Genellikle bir EBS Snapshot'ıdır ve işletim sistemini (OS), yapılandırma ayarlarını ve kurulmuş olan tüm uygulamaları içerir.
-   **Başlatma İzinleri (Launch Permissions):** Hangi AWS hesaplarının bu AMI'ı kullanarak sunucu başlatabileceğini kontrol eder. AMI'larınızı gizli tutabilir, belirli hesaplarla paylaşabilir veya herkese açık yapabilirsiniz.
-   **Blok Cihaz Eşlemesi (Block Device Mapping):** Sunucu başlatıldığında hangi depolama birimlerinin (EBS veya Instance Store) hangi noktalara bağlanacağını belirten bir haritadır.

#### AMI Türleri:
-   **AWS Tarafından Sağlanan (Quick Start):** Amazon Linux, Ubuntu, Windows Server gibi popüler işletim sistemleri için AWS'in hazırladığı, güvenli ve bakımı yapılmış standart AMI'lardır.
-   **AWS Marketplace:** Üçüncü parti şirketlerin, içinde kendi yazılımları (örn: WordPress, SAP, güvenlik duvarları) önceden kurulmuş ve yapılandırılmış olarak sunduğu (genellikle ücretli) AMI'lardır.
-   **Topluluk AMI'ları (Community AMIs):** Diğer AWS kullanıcılarının oluşturup paylaştığı AMI'lardır. Güvenilirliği AWS tarafından doğrulanmadığı için dikkatli kullanılmalıdır.
-   **Benim AMI'larım (My AMIs):** Kendi yapılandırdığınız EC2 sunucularından oluşturduğunuz özel (custom) AMI'lardır.

### 2. Özel Bir AMI Oluşturma Süreci
Genellikle, standart bir AMI ile başlayıp onu kendi ihtiyaçlarınıza göre özelleştirdikten sonra kendi özel AMI'ınızı oluşturmak istersiniz.

#### Neden Özel AMI Oluşturmalısınız?
-   **Hız:** Her sunucuyu başlattıktan sonra aynı güncellemeleri, aynı yazılımları (web sunucusu, veritabanı istemcisi, izleme ajanı vb.) tekrar tekrar kurmak zaman alır. Özel bir AMI ile, tüm bu yazılımlar önceden yüklenmiş olarak gelir ve sunucu saniyeler içinde kullanıma hazır olur.
-   **Standardizasyon:** Tüm sunucularınızın birebir aynı yapılandırmaya, aynı güvenlik ayarlarına ve aynı yazılım versiyonlarına sahip olmasını garantiler. Bu **"altın imaj" (golden image)** yaklaşımı, tutarlılığı artırır ve hataları azaltır.

#### Süreç Adım Adım:
1.  **Temel Bir Sunucu Başlatın:** AWS'in sunduğu standart bir Amazon Linux AMI'ı ile bir EC2 sunucusu başlatın.
2.  **Sunucuyu Yapılandırın:** SSH ile sunucuya bağlanın. `sudo yum update -y` ile tüm güncellemeleri yapın. `httpd` (Apache web sunucusu) gibi gerekli tüm yazılımları kurun. Güvenlik ayarlarını (hardening) yapın. Kendi uygulamanızı yükleyin.
3.  **İmajı Oluşturun:** Yapılandırma bittiğinde, AWS Yönetim Konsolu'nda çalışan sunucunuzu seçin ve `Actions -> Image and templates -> Create image` seçeneğine tıklayın.
4.  **Arka Planda Olanlar:** AWS, veri tutarlılığını sağlamak için genellikle sunucuyu geçici olarak durdurur, sunucunun kök EBS biriminin bir Snapshot'ını alır ve bu snapshot'ı diğer yapılandırma bilgileriyle birlikte paketleyerek sizin için özel bir AMI olarak kaydeder.
5.  **Yeni Sunucuları Başlatın:** Artık "Launch Instance" ekranında "My AMIs" sekmesi altında kendi özel AMI'ınızı görebilir ve bunu kullanarak saniyeler içinde tam yapılandırılmış yeni sunucular başlatabilirsiniz.

### 3. EC2 Image Builder
Manuel olarak AMI oluşturmak tek seferlik işler için uygun olsa da, AMI'ları sürekli güncel ve güvenli tutmak zordur. EC2 Image Builder, bu süreci otomatikleştiren bir AWS hizmetidir.

-   **Çözdüğü Problem:** Güvenlik yamaları çıktıkça veya yazılım versiyonları değiştikçe "altın imajınızı" sürekli olarak manuel güncelleme ve test etme zahmetini ortadan kaldırır.
-   **Nasıl Çalışır?:** Bir "pipeline" (iş akışı) oluşturursunuz. Bu pipeline içinde şunları tanımlarsınız:
    -   **Tarif (Recipe):** Hangi temel AMI'ın kullanılacağı, hangi yazılımların kurulacağı ve hangi testlerin çalıştırılacağı.
    -   **Dağıtım (Distribution):** Oluşturulan yeni ve güncel AMI'ın hangi AWS Bölgelerine otomatik olarak kopyalanacağı.
-   **Faydası:** Image Builder'ı haftalık veya aylık olarak otomatik çalışacak şekilde ayarlayarak, her zaman en güncel ve güvenli AMI'lara sahip olmanızı sağlar. Bu, güvenli ve tekrarlanabilir bir süreçtir.

### 4. EC2 Instance Store ve Yerel (Local) Kavramı
Bu konuyu bir önceki derste görmüştük ama AMI ile olan ilişkisi nedeniyle tekrar üzerinden geçmek çok önemli.

#### Tekrar Hatırlatma:
-   **Geçicidir (Ephemeral):** Sunucu durdurulur, kapatılır veya sonlandırılırsa üzerindeki **TÜM VERİLER SİLİNİR**.
-   **Fiziksel Olarak Bağlıdır:** EC2 sunucusunun üzerinde çalıştığı ana makinenin (host) kendi dahili diskleridir. Bu yüzden **"Yerel (Local) Instance Store"** olarak da anılır. "Yerel" olması, onun ağa bağlı bir EBS birimi gibi olmadığını, doğrudan ana makineye bağlı olduğunu vurgular.
-   **Yüksek Performans:** Bu fiziksel ve yerel bağlantı sayesinde inanılmaz hızlıdır. Önbellek (cache) veya geçici veri işleme (scratch space) için mükemmeldir.

> #### AMI ve Instance Store İlişkisi - ÇOK ÖNEMLİ!
> Bir EC2 sunucusundan özel bir AMI oluşturduğunuzda, bu işlem sunucunun EBS birimlerinin bir snapshot'ını alır. Sunucuya bağlı olan **Instance Store disklerindeki veriler, AMI'a DAHİL EDİLMEZ ve KAYBOLUR**. Bu nedenle, kalıcı olması gereken hiçbir veriyi Instance Store'a koymamalısınız.
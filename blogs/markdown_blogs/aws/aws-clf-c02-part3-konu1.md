## Konu 1: Amazon EC2'ye Giriş - Buluttaki Sanal Sunucunuz

### Amazon EC2 Nedir?
**Amazon EC2 (Elastic Compute Cloud)**, AWS bulutunda güvenli ve yeniden boyutlandırılabilir işlem kapasitesi (yani, sanal bilgisayarlar) sağlayan bir web hizmetidir.

En basit haliyle EC2'yi şöyle düşünebilirsiniz: Fiziksel bir sunucu satın almak, onu bir veri merkezine yerleştirmek, soğutmasını, elektriğini ve ağ bağlantısını yönetmek yerine, AWS'ten internet üzerinden sanal bir bilgisayar kiralarsınız. Bu sanal bilgisayara **"Instance"** adı verilir.

Bu kiraladığınız sanal sunucunun işlem gücünü (CPU), belleğini (RAM), depolama alanını ve işletim sistemini (Windows veya Linux) birkaç tıklama ile seçebilir, dakikalar içinde kullanmaya başlayabilir ve işiniz bittiğinde kapatabilirsiniz. En güzel yanı ise, sadece kullandığınız süre kadar (saniye veya saat bazında) ödeme yapmanızdır.

### "Elastic Compute Cloud" Adını Anlamak
EC2'nin ne yaptığını anlamak için ismindeki üç kelimeyi çözümlemek en iyi yoldur:

-   **Elastic (Elastik):** Bu, EC2'nin en güçlü özelliğidir. "Elastik" kelimesi, işlem kapasitenizi ihtiyaca göre kolayca ve hatta otomatik olarak artırıp azaltabilme yeteneğini ifade eder.
    -   **Örnek 1 (Sayıyı Artırma/Azaltma):** Web sitenize gelen trafik bir anda 10 katına mı çıktı? Mevcut 1 sunucunuz yerine, trafiği karşılamak için otomatik olarak 10 sunucu (instance) daha çalıştırabilir ve trafik normale döndüğünde bu sunucuları yine otomatik olarak kapatabilirsiniz.
    -   **Örnek 2 (Gücü Artırma/Azaltma):** Mevcut sunucunuzun işlem gücü yetersiz mi kalıyor? Sunucuyu durdurup, birkaç tıklamayla daha güçlü bir işlemciye ve daha fazla RAM'e sahip bir modele yükseltebilirsiniz.

-   **Compute (İşlem Gücü):** Bu kelime, hizmetin temel fonksiyonunu, yani "hesaplama" veya "işlem yapma" yeteneğini belirtir. EC2, size uygulamalarınızı çalıştırmak için gereken işlemci (CPU), bellek (RAM) ve ağ kaynaklarını sağlar.

-   **Cloud (Bulut):** Bu işlem gücünün, sizin ofisinizdeki bir makinede değil, AWS'in küresel veri merkezi ağında, internet üzerinden bir hizmet olarak sunulduğu anlamına gelir.

### EC2'nin Temel Kavramları
EC2 ile çalışırken sürekli karşınıza çıkacak olan temel yapı taşları şunlardır:

-   **Instance:** Buluttaki sanal sunucunuzun kendisi.
-   **AMI (Amazon Machine Image - Amazon Makine İmajı):** Bir instance'ı başlatmak için gereken şablon. AMI, bir işletim sistemini (örn: Ubuntu Linux, Windows Server 2022) ve isteğe bağlı olarak ek yazılımları içerir. Bir sunucunun "planı" veya "kalıbı" gibidir.
-   **Instance Types (Sunucu Tipleri):** Farklı iş yükleri için optimize edilmiş çeşitli CPU, bellek, depolama ve ağ kapasitesi kombinasyonlarıdır. "Donanım seçimi" olarak düşünebilirsiniz.
-   **EBS (Elastic Block Store):** EC2 instance'ınıza takılan sanal bir sabit disktir. İşletim sisteminiz ve verileriniz burada saklanır.
-   **Security Group (Güvenlik Grubu):** Instance'ınız için sanal bir güvenlik duvarı görevi görür. Instance'ınıza gelen (inbound) ve instance'ınızdan giden (outbound) ağ trafiğini kontrol eden kurallar bütünüdür. Örneğin, "Bu sunucuya sadece 80 portundan (HTTP) gelen isteklere izin ver" gibi kurallar belirleyebilirsiniz.
-   **Key Pair (Anahtar Çifti):** Linux instance'larına güvenli bir şekilde (SSH üzerinden) bağlanmak için kullanılan şifreleme anahtarlarıdır. Bir genel anahtar (public key) ve bir özel anahtardan (private key) oluşur.

### EC2 Sunucu Tipleri (Instance Types)
AWS, "her işe aynı çözüm uymaz" prensibiyle, farklı ihtiyaçlara yönelik özel sunucu aileleri sunar. Sunucu tipleri genellikle `aile.boyut` şeklinde isimlendirilir (örn: `t2.micro`, `m5.large`). İşte en yaygın sunucu aileleri ve kullanım alanları:

-   **Genel Amaçlı (General Purpose - T, M serisi):**
    -   CPU, bellek ve ağ kaynakları arasında dengeli bir dağılım sunar.
    -   **Kullanım Alanları:** Web sunucuları, kod depoları, küçük ve orta ölçekli veritabanları, geliştirme ve test ortamları.
-   **İşlem Gücü Optimize Edilmiş (Compute Optimized - C serisi):**
    -   Belleğe oranla yüksek işlem gücü (CPU) sunar.
    -   **Kullanım Alanları:** Yüksek performans gerektiren web sunucuları, video işleme (encoding), toplu iş (batch) işleme, bilimsel modelleme.
-   **Bellek Optimize Edilmiş (Memory Optimized - R, X, Z serisi):**
    -   CPU'ya oranla çok büyük miktarda RAM sunar.
    -   **Kullanım Alanları:** Yüksek performanslı veritabanları, bellek-içi (in-memory) veritabanları (Redis gibi), büyük veri analizi.
-   **Depolama Optimize Edilmiş (Storage Optimized - I, D, H serisi):**
    -   Yerel diskler üzerinde çok yüksek hızda, on binlerce okuma/yazma operasyonu (IOPS) için tasarlanmıştır.
    -   **Kullanım Alanları:** Veri ambarları, NoSQL veritabanları (Cassandra gibi), dağıtık dosya sistemleri.
-   **Hızlandırılmış Bilişim (Accelerated Computing - P, G, F serisi):**
    -   Donanım hızlandırıcıları (GPU'lar veya FPGA'ler) kullanır.
    -   **Kullanım Alanları:** Makine öğrenmesi (machine learning), 3D grafik oluşturma (rendering), bilimsel hesaplamalar.

### EC2 Fiyatlandırma Modelleri
EC2 kullanırken maliyetlerinizi optimize etmek için farklı fiyatlandırma modellerinden yararlanabilirsiniz:

-   **On-Demand (İsteğe Bağlı):**
    -   Hiçbir taahhüt vermeden, kullandığınız saniye veya saat başına ödeme yaparsınız. En esnek ama en pahalı modeldir.
    -   **İdeal Kullanım:** Kısa süreli, kesintiye uğramaması gereken, ne zaman başlayıp biteceği belli olmayan işler.
-   **Reserved Instances (Rezerve Edilmiş Sunucular) & Savings Plans (Tasarruf Planları):**
    -   Belirli bir sunucu tipi veya kullanım miktarı için 1 veya 3 yıllık taahhütte bulunursunuz. Karşılığında On-Demand fiyatlarına göre %72'ye varan indirimler alırsınız.
    -   **İdeal Kullanım:** Sürekli çalışacağını bildiğiniz, öngörülebilir iş yükleri (örn: bir şirketin ana web sunucusu).
-   **Spot Instances (Spot Sunucular):**
    -   AWS'in o an kullanmadığı atıl EC2 kapasitesini açık artırmaya çıkardığı modeldir. On-Demand fiyatlarına göre %90'a varan indirimler sunar.
    -   **Dezavantajı:** AWS bu kapasiteye ihtiyaç duyduğunda, 2 dakikalık bir bildirimle sunucunuzu geri alabilir.
    -   **İdeal Kullanım:** Kesintiye uğramasında sakınca olmayan, acil olmayan işler (büyük veri analizi, batch işlemleri, test ortamları).
-   **Dedicated Hosts (Adanmış Sunucular):**
    -   Fiziksel bir sunucunun tamamı size adanır. Başka hiçbir müşteri o donanımı kullanmaz. En pahalı seçenektir.
    -   **İdeal Kullanım:** Mevcut sunucuya bağlı yazılım lisanslarınızı kullanmanız gerektiğinde veya katı uyumluluk (compliance) gereksinimleriniz olduğunda.

### Özet:
**EC2**, AWS'in temel işlem gücü hizmetidir. Size bulutta yeniden boyutlandırılabilir sanal sunucular (**instance'lar**) sunar. Bir sunucuyu başlatırken onun şablonunu (**AMI**), donanımını (**Instance Tipi**) ve güvenlik duvarını (**Security Group**) siz belirlersiniz.
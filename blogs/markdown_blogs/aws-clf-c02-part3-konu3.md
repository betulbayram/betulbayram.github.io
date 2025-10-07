## Konu 3: EC2 Sunucu Tipleri (Instance Types)

### 1. Genel Bakış
AWS'in neden bu kadar çok sayıda sunucu tipi sunduğunu anlamak önemlidir. Sebebi basit: Her **iş yükünün (workload)** ihtiyacı farklıdır. Bazı uygulamalar ham işlem gücüne (CPU), bazıları devasa belleğe (RAM), bazıları ise inanılmaz hızlı disk okuma/yazma hızlarına ihtiyaç duyar. "Tek beden herkese uymaz" prensibi, bulut bilişim için de geçerlidir.

Doğru sunucu tipini seçmek, uygulamanızın hem yüksek performansla çalışmasını hem de gereksiz kaynak için para ödememenizi (**maliyet optimizasyonu**) sağlar.

#### Sunucu Tipi İsimlendirme Kuralı
Bir sunucu tipinin isimlendirmesi, onun özelliklerini anlamak için bir formül gibidir. Genellikle şu yapıdadır: **Aile Harfi + Jenerasyon Numarası + Ek Yetenek Harfi + . + Boyut**

Örnek olarak `m5d.large` sunucu tipini çözümleyelim:
-   `m`: **Sunucu Ailesi.** Bu örnekte "M", yani **Genel Amaçlı (General Purpose)** bir aileye ait olduğunu gösterir.
-   `5`: **Jenerasyon.** Bu sunucunun **5. nesil** olduğunu belirtir. Genellikle, jenerasyon numarası ne kadar yüksekse, o kadar yeni teknolojiye sahiptir ve fiyat/performans oranı o kadar iyidir.
-   `d`: **Ek Yetenek.** Bu harf, sunucunun ek bir özelliğe sahip olduğunu belirtir.
    -   `d`: Yerel, fiziksel olarak bağlı NVMe SSD depolaması (**Instance Store**) olduğunu gösterir.
    -   `n`: Ağ performansı optimize edilmiş (daha yüksek bant genişliği) demektir.
    -   `g`: AWS'in kendi ürettiği ARM tabanlı **Graviton** işlemcisini kullandığını belirtir.
-   `large`: **Aile içindeki boyut.** Bu boyutlar genellikle bir öncekinin iki katı kaynak sunar (`nano`, `micro`, `small`, `medium`, `large`, `xlarge`, `2xlarge`...).

### 2. Sunucu Aileleri ve Kullanım Alanları

#### Genel Amaçlı (General Purpose)
-   **Temel Özelliği:** CPU, bellek ve ağ kaynakları arasında dengeli bir oran sunar. En esnek ve en yaygın kullanılan ailelerdir.
-   **Seri Harfleri:** M, T, A, Mac
-   **Önemli Not - T Serisi:** "T" serisi sunucular **"patlama (burstable)"** özelliğine sahiptir. Bu, normalde belirli bir temel (baseline) CPU performansında çalıştıkları, ancak ihtiyaç anında kısa süreliğine çok daha yüksek CPU performansına "patlayabildikleri" anlamına gelir. Düşük ve düzensiz trafikli web siteleri için çok uygun maliyetlidirler.
-   **İdeal Kullanım Alanları:**
    -   Web sunucuları ve uygulama sunucuları
    -   Mikroservisler
    -   Geliştirme ve test ortamları
    -   Küçük ve orta ölçekli veritabanları
    -   Kod depoları

#### İşlem Gücü Optimize Edilmiş (Compute Optimized)
-   **Temel Özelliği:** Bellek (RAM) miktarına oranla çok yüksek CPU performansı sunarlar.
-   **Seri Harfi:** C
-   **İdeal Kullanım Alanları:**
    -   Yüksek performans gerektiren hesaplama (HPC) işleri
    -   Toplu iş (batch) işleme
    -   Medya dönüştürme (transcoding)
    -   Bilimsel modelleme ve simülasyonlar
    -   Yoğun trafikli, CPU'ya yüklenen oyun sunucuları

#### Bellek Optimize Edilmiş (Memory Optimized)
-   **Temel Özelliği:** CPU çekirdeği başına çok yüksek miktarda bellek (RAM) sunarlar.
-   **Seri Harfleri:** R, X, Z
-   **İdeal Kullanım Alanları:**
    -   Yüksek performanslı ilişkisel (SQL) ve NoSQL veritabanları
    -   Bellek-içi (in-memory) veritabanları ve önbellekler (Redis, Memcached)
    -   Büyük veri analizi (Hadoop, Spark gibi framework'ler)
    -   Gerçek zamanlı veri işleme

#### Depolama Optimize Edilmiş (Storage Optimized)
-   **Temel Özelliği:** Yerel diskler üzerinde çok yüksek okuma/yazma hızları (düşük gecikme ve yüksek IOPS - Saniyedeki Girdi/Çıktı Operasyonu) için tasarlanmıştır. Devasa veri setlerine çok hızlı erişim gerektiren işler için kullanılırlar.
-   **Seri Harfleri:** I, D, H
-   **İdeal Kullanım Alanları:**
    -   Yüksek frekansta işlem yapan NoSQL veritabanları (Cassandra, MongoDB, ScyllaDB)
    -   Veri ambarları (Data Warehousing)
    -   Dağıtık dosya sistemleri (HDFS, MapR-FS)
    -   Arama motorları (Elasticsearch)

### 3. Sunucu Tipi Örnekleri ve Anlamları
Aşağıdaki tablo, isimlendirme kuralının pratikte nasıl çalıştığını gösteren bazı örnekler sunmaktadır.

| Örnek Sunucu Tipi | Açıklaması |
| :--- | :--- |
| `t2.micro` | **T** ailesinden (Genel Amaçlı, Patlayabilen), **2.** jenerasyon, **micro** boyutunda bir sunucu. AWS Ücretsiz Kullanım (Free Tier) kapsamında yer alan popüler bir tiptir. |
| `m5.large` | **M** ailesinden (Genel Amaçlı), **5.** jenerasyon, **large** boyutunda bir sunucu. Standart web uygulamaları için yaygın bir seçimdir. |
| `c6g.xlarge` | **C** ailesinden (İşlem Gücü Optimize), **6.** jenerasyon, **g** yani AWS **Graviton (ARM)** işlemcili, **xlarge** boyutunda bir sunucu. |
| `r5d.2xlarge` | **R** ailesinden (Bellek Optimize), **5.** jenerasyon, **d** yani yerel **NVMe disk** depolaması olan, **2xlarge** boyutunda bir sunucu. |
| `g4dn.xlarge` | **G** ailesinden (Hızlandırılmış Bilişim - GPU'lu), **4.** jenerasyon, **d** yani yerel **NVMe disk** ve **n** yani optimize edilmiş **ağ** yeteneğine sahip, **xlarge** boyutunda bir sunucu. |

**Sonuç olarak;**
Doğru EC2 sunucu tipini seçmek, bulut mimarinizin temel taşlarından biridir. İşe başlamadan önce uygulamanızın ihtiyaçlarını (**CPU mu, RAM mi, Disk hızı mı önemli?**) analiz etmek, hem uygulamanızın performansını garantiler hem de sizi gereksiz maliyetlerden kurtarır.
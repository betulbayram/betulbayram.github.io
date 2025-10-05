# Konu 4: Bulut Modelleri ve Fiyatlandırma

## Bölüm 1: Bulut Dağıtım Modelleri (The Deployment Models)
Bu modeller, bulut altyapısının "Nerede?" barındırıldığı ve "Kimin tarafından?" yönetildiği sorularına cevap verir.

### Genel Bulut (Public Cloud)
-   **Nedir?:** AWS, Microsoft Azure, Google Cloud Platform (GCP) gibi üçüncü parti bir sağlayıcı tarafından sahip olunan ve internet üzerinden genel kullanıma açık olan bulut altyapısıdır. Kaynaklar (sunucular, ağ vb.) birçok farklı müşteri (şirket veya birey) tarafından paylaşılır.
-   **Analoji:** Toplu taşıma (otobüs, metro) gibidir. Altyapı (araçlar, hatlar) herkese aittir ve herkes tarafından kullanılır. Siz sadece bindiğiniz mesafe kadar ödeme yaparsınız. Aracın bakımı, şoförün maaşı gibi detaylarla ilgilenmezsiniz.
-   **Avantajları:** Düşük başlangıç maliyeti, neredeyse sonsuz ölçeklenebilirlik, esneklik.
-   **Dezavantajları:** Kontrolün daha az olması, bazı regülasyonlara (devlet, finans vb.) uymakta zorlanabilmesi.

### Özel Bulut (Private Cloud)
-   **Nedir?:** Bilişim altyapısının sadece tek bir kuruluşa özel olarak ayrıldığı modeldir. Bu bulut, şirketin kendi veri merkezinde (on-premises) veya dışarıda bir tesiste barındırılabilir, ancak tüm kaynaklar o şirkete aittir.
-   **Analoji:** Şahsi aracınız gibidir. Tüm kontrol sizdedir, istediğiniz gibi modifiye edebilirsiniz, içine sizden başkası binemez. Ancak arabanın satın alma maliyeti, sigortası, bakımı, yakıtı gibi tüm masraflar size aittir.
-   **Avantajları:** Maksimum kontrol, yüksek güvenlik, hassas veriler ve regülasyonlar için idealdir.
-   **Dezavantajları:** Çok yüksek başlangıç maliyeti (CAPEX), bakım ve yönetim sorumluluğu, sınırlı ölçeklenebilirlik.

### Hibrit Bulut (Hybrid Cloud)
-   **Nedir?:** Genel Bulut (Public Cloud) ve Özel Bulut'un (Private Cloud) teknoloji ile birbirine bağlanarak birlikte çalıştığı modeldir. Şirketler, bazı uygulamalarını özel bulutta, bazılarını ise genel bulutta çalıştırabilir ve bunlar arasında veri akışı sağlayabilir.
-   **Analoji:** Hem şahsi aracınızın olması hem de gerektiğinde taksi veya toplu taşıma kullanmanız gibidir. Günlük işleriniz için kendi arabanızı kullanır, ancak havaalanına giderken trafiği ve park sorununu düşünmemek için taksi (genel bulutun esnekliği) kullanabilirsiniz. İki dünyanın da en iyi yönlerini birleştirir.
-   **Kullanım Senaryosu:** Bir banka, çok hassas olan müşteri verilerini kendi özel bulutunda tutarken, yoğun trafik alan halka açık web sitesini AWS'in genel bulutunda barındırabilir.

## Bölüm 2: Bulut Bilişim Hizmet Modelleri (Types of Cloud Computing)
Bu modeller, "Ne kadarını sen yönetiyorsun, ne kadarını bulut sağlayıcı yönetiyor?" sorusunun cevabıdır. Bunu anlamak için en güzel yöntem **"Pizza-as-a-Service"** analojisidir.

### IaaS (Infrastructure as a Service - Altyapı Hizmeti)
-   **Ne Sağlanır?:** Bulutun en temel yapı taşları. AWS size sanal sunucuları (EC2), depolamayı (S3), ağı (VPC) gibi ham altyapıyı verir.
-   **Sizin Sorumluluğunuz:** İşletim sistemini (Linux/Windows) kurmak, yamalarını yapmak, üzerine gerekli yazılımları (veritabanı, uygulama sunucusu vb.) yüklemek ve kendi uygulamanızı çalıştırmak.
-   **Pizza Analojisi:** **Marketten Hazır Pizza Almak.** Market size pizzanın hamurunu, sosunu ve peynirini (altyapı) verir. Eve getirip kendi fırınınızda (platform), kendi ayarlarınızla pişirmek ve masayı kurup servis etmek (uygulama) size aittir.
-   **Özellikleri:** En fazla esneklik ve kontrolü sunar.

### PaaS (Platform as a Service - Platform Hizmeti)
-   **Ne Sağlanır?:** AWS, altyapıya ek olarak işletim sistemini ve uygulamanızı çalıştırmanız için gerekli olan ortamı (örn: Java, Python, .NET platformu) da yönetir.
-   **Sizin Sorumluluğunuz:** Sadece kendi kodunuzu/uygulamanızı yüklemek ve yönetmek. Alttaki işletim sisteminin güncellemeleri veya bakımıyla ilgilenmezsiniz.
-   **Pizza Analojisi:** **Eve Pizza Sipariş Etmek.** Siz sadece pizzayı seçersiniz. Pizzacı, altyapıyı (mutfak, fırın) ve platformu (pizzayı pişirme işi) halleder ve size hazır bir pizza gönderir. Sizin sorumluluğunuz sadece masayı kurup içecekleri hazırlamaktır.
-   **Özellikleri:** Genellikle yazılım geliştiricilere yöneliktir. Kodunuza odaklanmanızı sağlar. Örnek: **AWS Elastic Beanstalk**.

### SaaS (Software as a Service - Yazılım Hizmeti)
-   **Ne Sağlanır?:** Kullanıma hazır, bitmiş bir yazılım/uygulama.
-   **Sizin Sorumluluğunuz:** Sadece uygulamayı kullanmak. Hiçbir teknik detayla (altyapı, platform, kod vb.) ilgilenmezsiniz.
-   **Pizza Analojisi:** **Restoranda Pizza Yemek.** Siz sadece restorana gider, oturur ve pizzanızı yersiniz. Mutfak, fırın, aşçı, servis gibi hiçbir detay sizi ilgilendirmez.
-   **Özellikleri:** Son kullanıcıya yöneliktir. Örnekler: **Gmail, Dropbox, Microsoft 365, Salesforce**.

## Bölüm 3: Bulutun Fiyatlandırılması
AWS'in fiyatlandırma felsefesi birkaç temel ilkeye ve hizmete özel metriklere dayanır.

### Temel Fiyatlandırma Prensipleri
-   **Kullandığın Kadar Öde (Pay-as-you-go):**
    Bu en temel prensiptir. Bir sunucuyu 10 dakika çalıştırırsanız 10 dakikanın parasını, 10 saat çalıştırırsanız 10 saatin parasını ödersiniz. Uzun vadeli kontratlar veya peşin ödemeler zorunlu değildir.
-   **Kullandıkça Daha Az Öde (Pay less when you use more):**
    AWS, toplu kullanımı ödüllendirir. Örneğin, depolama hizmeti olan S3'de ne kadar çok veri depolarsanız, gigabyte başına ödediğiniz birim fiyat o kadar düşer (Volume Discounts).
-   **Rezerve Ettikçe Daha da Az Öde (Pay even less when you reserve capacity):**
    Sürekli kullanacağınızdan emin olduğunuz kaynaklar için AWS'e taahhüt vererek çok büyük indirimler alabilirsiniz. `Reserved Instances (RI)` ve `Savings Plans` gibi modellerle 1 veya 3 yıllık taahhütler karşılığında ciddi indirimler kazanırsınız.

### Hizmet Kategorisine Göre Fiyatlandırma Detayları

#### 1. İşlem Gücü Fiyatlandırması (Compute Pricing - Örn: Amazon EC2)
Bir sanal sunucunun (EC2 instance) maliyetini belirleyen birkaç ana faktör vardır:

-   **Sunucu Tipi (Instance Type):** Seçtiğiniz sanal sunucunun işlemci (vCPU), bellek (RAM), depolama ve ağ kapasitesine göre fiyatı değişir. Örneğin, `t2.micro` (düşük kapasiteli) bir sunucu, `m5.4xlarge` (yüksek kapasiteli) bir sunucudan çok daha ucuzdur.
-   **Çalışma Süresi (Running Time):** Sunucunun ne kadar süre "çalışır" durumda kaldığına göre faturalandırılırsınız. Linux sunucuları için saniye bazlı, Windows sunucuları için ise saat bazlı ücretlendirme yapılır.
-   **Fiyatlandırma Modeli (Pricing Model):**
    -   **On-Demand (İsteğe Bağlı):** En esnek ama en pahalı modeldir. Taahhütsüz, kullandığın kadar ödersin.
    -   **Reserved/Savings Plans:** Taahhüt vererek en yüksek indirimi aldığın modeldir.
    -   **Spot Instances:** AWS'in o an kullanmadığı atıl işlem gücünü açık artırmaya çıkardığı modeldir. On-Demand fiyatlarına göre %90'a varan indirimler sunar. Ancak, AWS bu kapasiteye ihtiyaç duyarsa, 2 dakikalık bir bildirimle sunucunuzu geri alabilir. Kesintiye uğramasında sakınca olmayan işler (veri analizi, test vb.) için mükemmeldir.
-   **Ek Maliyetler:** Sunucuya bağlı disklerin (EBS Volumes), atanmış elastik IP adreslerinin ve işletim sistemi lisanslarının (örn: Windows Server) maliyeti de faturaya eklenir.

#### 2. Depolama Fiyatlandırması (Storage Pricing - Örn: Amazon S3)
Depolama maliyetleri genellikle şu faktörlere dayanır:

-   **Depolanan Veri Miktarı (Storage Volume):** En temel metrik budur. Ay boyunca depoladığınız toplam veri miktarı (genellikle Gigabyte - GB cinsinden) üzerinden ücretlendirilirsiniz.
-   **Depolama Sınıfı (Storage Class):** Tüm veriler eşit değildir. Verilerinize ne sıklıkla eriştiğinize bağlı olarak S3 size farklı fiyatlarda depolama sınıfları sunar:
    -   **S3 Standard:** Sık erişilen, kritik veriler için. En yüksek performansı sunar ama en pahalı depolama sınıfıdır.
    -   **S3 Intelligent-Tiering:** Erişim sıklığı değişen veriler için. AWS, veriyi otomatik olarak sık ve seyrek erişilen katmanlar arasında taşıyarak maliyeti optimize eder.
    -   **S3 Standard-Infrequent Access (IA):** Seyrek erişilen ama ihtiyaç duyulduğunda anında ulaşılması gereken veriler için (yedekler, loglar vb.). Depolama maliyeti daha ucuzdur ama veriye her eriştiğinizde bir "veri çekme ücreti" (retrieval fee) ödersiniz.
    -   **S3 Glacier Sınıfları:** Çok uzun süreli arşivleme için (yıllarca saklanacak veriler). Depolama maliyeti inanılmaz ucuzdur, ancak veriyi geri almak daha uzun sürer ve daha pahalıdır.
-   **İstek Sayısı (Number of Requests):** Depolama alanınıza yapılan `GET` (veri okuma), `PUT` (veri yazma), `LIST` (içeriği listeleme) gibi her bir istek için de (genellikle 1.000 istek başına) çok küçük bir ücret ödersiniz.

#### 3. Buluttan Dışarı Veri Transferi Fiyatlandırması (Data Transfer Out of the Cloud)
Bu, en çok kafa karıştıran ama aslında basit bir kuralı olan bir konudur:

> **ALTIN KURAL:**
> - İnternetten AWS'e doğru olan veri transferi (**Data Transfer IN**) neredeyse her zaman **ÜCRETSİZDİR**.
> - AWS'ten internete doğru olan veri transferi (**Data Transfer OUT**) ise **ÜCRETLİDİR**.

-   **Nasıl Ücretlendirilir?:** AWS'ten dışarıya aktardığınız her Gigabyte (GB) veri için para ödersiniz. Aktardığınız toplam veri miktarı arttıkça, GB başına ödediğiniz birim fiyat düşer.
-   **AWS İçi Transferler:**
    -   Farklı AWS Bölgeleri (Regions) arasında (örn: Frankfurt'taki bir sunucudan İrlanda'daki bir sunucuya) yapılan veri transferleri ücretlidir.
    -   Aynı Bölge (Region) içindeki farklı Erişilebilirlik Alanları (Availability Zones) arasında yapılan transferler de (genellikle daha düşük bir fiyattan) ücretlidir.
    -   Aynı Erişilebilirlik Alanı (AZ) içinde yapılan veri transferleri ise genellikle ücretsizdir.

### Diğer Fiyatlandırma Araçları

-   **AWS Ücretsiz Kullanım (AWS Free Tier):**
    AWS'i denemek ve öğrenmek isteyenler için harika bir fırsattır. Hesabı açtıktan sonra 12 ay boyunca belirli servisleri limitler dahilinde ücretsiz kullanmanızı sağlar.
-   **AWS Fiyatlandırma Hesaplayıcısı (AWS Pricing Calculator):**

---
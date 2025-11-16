## Konu 5: Elastic Load Balancing (ELB) - Ölçeklenebilirlik ve Yüksek Erişilebilirlik Mimarisi
Bu bölümde, uygulamalarımızı güçlü, dayanıklı ve esnek kılan temel mimari prensipleri ve bu prensipleri hayata geçirmemizi sağlayan AWS'in yük dengeleme hizmetlerini derinlemesine inceleyeceğiz.

### Bölüm 1: Modern Bulut Mimarilerinin Temel Direkleri

#### 1.1 Ölçeklenebilirlik ve Yüksek Erişilebilirlik (Scalability & High Availability)
Bu iki kavram, bulut bilişimin en temel vaatleridir ve genellikle birlikte anılsalar da farklı sorunları çözerler:

-   **Ölçeklenebilirlik (Scalability):** Bir sistemin artan iş yükünü (daha fazla kullanıcı, daha fazla veri) verimli bir şekilde karşılama yeteneğidir. **Büyüme** ile ilgilidir.
-   **Yüksek Erişilebilirlik (High Availability):** Bir sistemin, beklenmedik arızalar (sunucu çökmesi, ağ sorunu vb.) karşısında bile hizmet vermeye devam etme yeteneğidir. **Dayanıklılık** ile ilgilidir.

#### 1.2 Dikey Ölçeklenebilirlik (Vertical Scalability)
-   **Nedir?:** Mevcut tek bir sunucunun (instance) kaynaklarını artırarak kapasitesini yükseltmektir. Diğer bir deyişle, sunucuyu "büyütmektir".
-   **Örnek:** `t2.medium` (2 vCPU, 4 GiB RAM) bir sunucunun, `t2.xlarge` (4 vCPU, 16 GiB RAM) bir sunucuya yükseltilmesi.
-   **Dezavantajları:**
    -   **Limitler:** Her sunucu tipinin ulaşabileceği bir maksimum boyut vardır.
    -   **Kesinti:** Genellikle sunucuyu durdurup yeniden boyutlandırmayı gerektirir, bu da kısa süreli bir hizmet kesintisine neden olur.
    -   **Hata Noktası:** Hâlâ tek bir sunucunuz vardır. Bu sunucu arızalanırsa, uygulamanız tamamen durur (**Single Point of Failure**).

#### 1.3 Yatay Ölçeklenebilirlik (Horizontal Scalability)
-   **Nedir?:** Mevcut sunucunun gücünü artırmak yerine, sisteme daha fazla sayıda sunucu eklemektir. Diğer bir deyişle, sistemi "genişletmektir".
-   **Örnek:** Tek bir `large` sunucu yerine, yükü paylaşan dört tane `small` sunucu çalıştırmak.
-   **Avantajları:**
    -   **Esneklik:** Neredeyse sınırsız bir ölçeklenme potansiyeli sunar.
    -   **Dayanıklılık:** Sunuculardan biri arızalansa bile diğerleri çalışmaya devam eder.
    -   **Maliyet Etkinliği:** Genellikle, tek bir dev sunucudan daha uygun maliyetlidir.
-   *Bulutun gücü, yatay ölçeklenebilirlik yeteneğinden gelir.*

#### 1.4 Yüksek Erişilebilirlik (High Availability)
-   **Nedir?:** Bir uygulamanın, altyapıdaki bir arızadan etkilenmeden ayakta kalmasını sağlamak için tasarlanmasıdır. Amaç, tek bir hata noktasını (**Single Point of Failure**) ortadan kaldırmaktır.
-   **AWS'te Nasıl Sağlanır?:** En temel yöntem, uygulamanızı çalıştıran EC2 sunucularını, birbirlerinden fiziksel olarak izole edilmiş olan birden fazla **Erişilebilirlik Alanı'na (Multi-AZ)** dağıtmaktır. Bu sayede, bir veri merkezinin tamamı hizmet dışı kalsa bile, diğer veri merkezindeki sunucularınız hizmet vermeye devam eder.

#### 1.5 EC2 için Yüksek Erişilebilirlik ve Ölçeklenebilirlik Birlikteliği
İdeal bir mimari bu iki konsepti birleştirir: Uygulamamız, yatay olarak ölçeklenmiş (birden çok sunucu) ve bu sunucular yüksek erişilebilirlik için en az iki farklı Erişilebilirlik Alanı'na dağıtılmıştır. Gelen trafik ise bu sağlıklı sunucular arasında bir **Yük Dengeleyici (Load Balancer)** tarafından dağıtılır.

#### 1.6 Kavramların Karşılaştırılması: Ölçeklenebilirlik vs. Elastikiyet vs. Çeviklik
Bu üç kavram sıkça karıştırılır, ancak aralarında önemli farklar vardır:

-   **Ölçeklenebilirlik (Scalability):** Bir sistemin artan talebi karşılamak için **büyüme kapasitesidir**. Genellikle yukarı yönlü bir planlamayı ifade eder.
-   **Elastikiyet (Elasticity):** Bir sistemin talebe göre kaynaklarını hem **artırma hem de azaltma** yeteneğidir. Talep düştüğünde gereksiz kaynakları otomatik olarak serbest bırakarak maliyet tasarrufu sağlar. Ölçeklenebilirlik yukarı doğru, elastikiyet ise her iki yöne de çalışır.
-   **Çeviklik (Agility):** Bu teknik değil, bir işletme kavramıdır. Bulutun sağladığı ölçeklenebilirlik ve elastikiyet sayesinde, şirketlerin yeni fikirleri denemek, yeni uygulamaları haftalar veya aylar yerine dakikalar içinde devreye almak ve pazara çok hızlı adapte olmak yeteneğidir.

### Bölüm 2: Yük Dengelemenin (Load Balancing) Temelleri

#### 2.1 Yük Dengeleme Nedir? (What is load balancing?)
Yük Dengeleme, gelen ağ trafiğini, arkada çalışan bir grup sunucu (sunucu havuzu veya hedef grup) arasında verimli bir şekilde dağıtma işlemidir.

#### 2.2 Neden Yük Dengeleyici Kullanmalıyız? (why use a load balancer?)
-   **Hata Toleransı ve Yüksek Erişilebilirlik:** Yük dengeleyiciler, arkalarındaki sunuculara sürekli olarak **"sağlık kontrolleri" (health checks)** gönderir. Bir sunucu bu kontrole yanıt vermezse, onu sağlıksız olarak işaretler ve trafik göndermeyi durdurur. Bu, tek bir sunucunun çökmesinin tüm uygulamanızı çökertmesini engeller.
-   **Ölçeklenebilirlik ve Performans:** Gelen istekleri birden çok sunucuya dağıtarak, hiçbir sunucunun aşırı yüklenmemesini sağlar. Bu, uygulamanızın daha fazla kullanıcıya hizmet vermesine olanak tanır ve genel yanıt süresini iyileştirir.
-   **Yönetim Kolaylığı:** Sunucu havuzunuza yeni sunucular ekleyebilir veya bakım için mevcut sunucuları havuzdan çıkarabilirsiniz ve tüm bu süreç boyunca yük dengeleyici sayesinde hizmetiniz kesintiye uğramaz.

#### 2.3 Neden Elastic Load Balancer Kullanmalıyız? (why use an elastic load balancer?)
Geleneksel yük dengeleyiciler, kendileri de sabit kapasiteli sunuculardır ve gelen trafik arttığında bir **darboğaz (bottleneck)** haline gelebilirler. **AWS Elastic Load Balancing (ELB)** ise, gelen trafiğin hacmine göre kendi kapasitesini otomatik olarak ölçeklendiren, tam yönetilen bir hizmettir. ELB, kendisi de yüksek erişilebilir ve ölçeklenebilir bir yapıya sahiptir. Sizin yük dengeleyicinin altyrasını yönetmenize gerek kalmaz, sadece yapılandırmasına odaklanırsınız.

### Bölüm 3: AWS Elastic Load Balancer (ELB) Türleri
AWS, farklı ihtiyaçlara yönelik farklı ağ katmanlarında çalışan üç ana yük dengeleyici türü sunar:

#### 3.1 Application Load Balancer (ALB) - Uygulama Yük Dengeleyici
-   **Katman:** Layer 7 (Uygulama - HTTP/HTTPS).
-   **Ne Yapar?:** Gelen isteğin içeriğini (URL yolu, host adı, HTTP başlıkları vb.) anlayarak çok akıllı yönlendirme kararları verir.
-   **Temel Özellikleri:**
    -   **Yol Tabanlı Yönlendirme (Path-based routing):** `site.com/kullanicilar` trafiğini bir sunucu grubuna, `site.com/urunler` trafiğini başka bir gruba yönlendirebilir.
    -   **Host Tabanlı Yönlendirme:** `kullanicilar.site.com` ve `urunler.site.com` gibi farklı alt alan adlarından gelen trafiği farklı sunucu gruplarına yönlendirebilir.
-   **İdeal Kullanım Alanı:** HTTP/HTTPS tabanlı trafik, mikroservisler, konteyner tabanlı uygulamalar (ECS, EKS) ve modern web uygulamaları için en iyi ve en yaygın seçimdir.

#### 3.2 Network Load Balancer (NLB) - Ağ Yük Dengeleyici
-   **Katman:** Layer 4 (Taşıma - TCP/UDP/TLS).
-   **Ne Yapar?:** İçeriğe bakmaksızın, IP adresi ve port bilgisine göre paketleri ultra hızlı bir şekilde iletir.
-   **Temel Özellikleri:**
    -   **Ekstrem Performans:** Milyonlarca isteği saniyeler içinde, çok düşük gecikme süreleriyle işleyebilir.
    -   **Statik IP Adresi:** Yük dengeleyici için sabit bir IP adresi sağlayabilir, bu bazı entegrasyonlar için gereklidir.
-   **İdeal Kullanım Alanı:** Performansın kritik olduğu TCP/UDP tabanlı uygulamalar, oyun sunucuları, finansal işlem platformları ve IoT (Nesnelerin İnterneti) uygulamaları.

#### 3.3 Gateway Load Balancer (GWLB) - Ağ Geçidi Yük Dengeleyici
-   **Katman:** Layer 3 (Ağ - IP Paketleri).
-   **Ne Yapar?:** Bu özel bir türdür. Temel amacı, üçüncü parti sanal ağ cihazlarını (güvenlik duvarları, saldırı tespit ve önleme sistemleri - IDS/IPS) dağıtmak, ölçeklendirmek ve yönetmektir.
-   **Temel Özellikleri:**
    -   **Şeffaf Ağ Entegrasyonu:** Ağ trafiğini, hedefine gitmeden önce bu sanal cihaz filosundan şeffaf bir şekilde geçirir.
-   **İdeal Kullanım Alanı:** AWS Marketplace'ten alınan üçüncü parti güvenlik ve ağ cihazlarını, ağ mimarinize kolayca entegre etmek. Bu, daha ileri seviye bir kullanım senaryosudur.
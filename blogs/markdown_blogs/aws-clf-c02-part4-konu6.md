## Konu 6: Auto Scaling Groups (ASG) - Otomatik Ölçeklenen ve Kendi Kendini İyileştiren Ordular
Bir önceki konuda, gelen trafiği birden çok EC2 sunucusuna dağıtan Yük Dengeleyiciyi (ELB) öğrendik. Peki bu sunucuların sayısını talebe göre kim otomatik olarak artırıp azaltacak? Veya sunuculardan biri arızalanırsa, onun yerine yenisini kim başlatacak? İşte bu soruların cevabı **Auto Scaling Group (ASG)**'tur.

### ASG Nedir?
**Auto Scaling Group**, uygulamanızın yükünü karşılamak için her zaman doğru sayıda EC2 sunucusuna sahip olmanızı sağlayan bir AWS hizmetidir.

* **Analoji:** ASG'yi, sunucu ordunuzu yöneten akıllı bir komutan gibi düşünebilirsiniz. Bu komutan;
    * Sahadaki asker (sunucu) sayısını sürekli izler.
    * Savaşın (trafik yükünün) şiddetine göre cepheye otomatik olarak takviye kuvvetler (yeni sunucular) gönderir (**Scale Out**).
    * Savaş sakinleştiğinde askerleri dinlenmeleri için geri çeker (sunucuları sonlandırır - **Scale In**).
    * Yaralanan veya görev yapamaz hale gelen bir askerin yerine anında yeni ve sağlıklı bir asker koyar (**Self-Healing**).

#### ASG'nin Temel Ayarları:
Bir ASG oluştururken üç temel parametre belirlersiniz:

-   **Minimum (Min) Boyut:** ASG'nin her ne koşulda olursa olsun çalışır durumda tutacağı minimum sunucu sayısıdır. Bu, yüksek erişilebilirlik (high availability) için temel seviyeyi garantiler.
-   **Maksimum (Max) Boyut:** ASG'nin ölçeklenerek ulaşabileceği maksimum sunucu sayısıdır. Bu, beklenmedik bir talep patlamasında maliyetlerin kontrolden çıkmasını önleyen bir güvenlik tavanıdır.
-   **İstenen Kapasite (Desired Capacity):** ASG'nin o an sahip olması gereken sunucu sayısıdır. Ölçeklendirme politikaları, bu değeri otomatik olarak Min ve Max arasında ayarlar.

### Yük Dengeleyici ile Auto Scaling Group Birlikteliği
ELB ve ASG, birlikte çalışmak üzere tasarlanmış mükemmel bir ikilidir ve AWS'teki en yaygın mimari deseni oluştururlar.

#### Nasıl Çalışırlar?
1.  Kullanıcıdan gelen trafik **Elastic Load Balancer (ELB)**'a ulaşır.
2.  ELB, bu trafiği arkasındaki sağlıklı EC2 sunucuları arasında dağıtır.
3.  Bu EC2 sunucuları ise bir **Auto Scaling Group (ASG)** tarafından yönetilir.
4.  ASG, bir ölçeklendirme politikası gereği yeni bir sunucu başlattığında, bu sunucuyu otomatik olarak ELB'nin **hedef grubuna (target group)** kaydeder. ELB, yeni sunucuya sağlık kontrolleri yapmaya başlar ve sunucu sağlıklı olduğunda ona trafik göndermeye başlar.
5.  ASG, bir sunucuyu sonlandırdığında, önce ELB'ye sunucudan kaydı silmesini söyler. ELB, o sunucuya yeni trafik göndermeyi keser (**connection draining**) ve ardından ASG, sunucuyu güvenli bir şekilde sonlandırır.

Bu birliktelik, hem **yüksek erişilebilir** (arızalı sunucular trafik almaz) hem de **elastik** (sunucu sayısı yüke göre değişir) bir sistem yaratır.

### Otomatik Ölçeklendirme Stratejileri (Scaling Strategies)
ASG'nin ne zaman ve nasıl ölçekleneceğini belirleyen farklı stratejiler vardır:

#### Manuel Ölçeklendirme (Manual Scaling)
-   **Nedir?:** İstenen kapasite (Desired Capacity) değerini sizin manuel olarak AWS konsolu veya CLI üzerinden değiştirmenizdir.
-   **Kullanım Alanı:** Beklenen, tek seferlik olaylar için. "Saat 14:00'te büyük bir kampanya başlayacak, o yüzden sunucu sayısını şimdiden manuel olarak 20'ye çıkarıyorum" gibi.

#### Dinamik Ölçeklendirme (Dynamic Scaling)
-   **Nedir?:** ASG'nin, CloudWatch metriklerindeki değişimlere göre kendini otomatik olarak yeniden boyutlandırmasıdır. "Otomatik" ölçeklendirmenin gerçek anlamı budur.
    1.  **Hedef Takipli Ölçeklendirme (Target Tracking Scaling):** En basit ve en çok tavsiye edilen yöntemdir. Belirli bir metrik için bir hedef değer belirlersiniz.
        -   **Örnek:** "Tüm sunucularımın ortalama CPU kullanımını %60 seviyesinde tutmak istiyorum." ASG, ortalama CPU kullanımı %60'ın üzerine çıkarsa yeni sunucular ekler, altına düşerse sunucuları kaldırır.
    2.  **Basit / Adım Adımlı Ölçeklendirme (Simple / Step Scaling):** Daha detaylı kontrol sağlar. "EĞER metrik X eşiğini geçerse, O ZAMAN Y eylemini yap" mantığıyla çalışır.
        -   **Örnek (Step Scaling):** "EĞER CPU kullanımı %70-%80 arasındaysa 1 sunucu ekle, AMA %80'in üzerine çıkarsa 3 sunucu ekle." Bu, alarmın şiddetine göre farklı tepkiler vermenizi sağlar.

#### Zamanlanmış Ölçeklendirme (Scheduled Scaling)
-   **Nedir?:** Ölçeklendirme eylemlerinin önceden bilinen, belirli zamanlarda gerçekleşmesidir.
-   **Örnek:** "Bir haber sitesi, her sabah 08:00-10:00 arasında trafiğin zirve yaptığını bilir. ASG'yi her sabah 07:45'te minimum kapasiteyi 10'a çıkaracak ve 10:15'te tekrar 2'ye düşürecek şekilde zamanlayabilirsiniz." Bu, reaktif değil, proaktif bir yöntemdir.

#### Tahminsel Ölçeklendirme (Predictive Scaling)
-   **Nedir?:** Bu en gelişmiş stratejidir. AWS, Makine Öğrenmesi (Machine Learning) kullanarak uygulamanızın geçmiş trafik verilerini (genellikle son 14 gün) analiz eder ve gelecekteki talebi tahmin eder.
-   **Nasıl Çalışır?:** Talep artışı gerçekleşmeden hemen önce proaktif olarak yeni sunucuları başlatır. Örneğin, her Cuma akşamı trafiğinizin arttığını öğrenir ve Cuma akşamı gelmeden sunucuları hazır eder.
-   **Faydası:** Reaktif ölçeklendirmenin (CPU yükseldikten sonra sunucu ekleme) neden olduğu kısa gecikmeyi ortadan kaldırır.

### ELB & ASG Özeti ve Sınav İpuçları
Bu iki hizmet, AWS'te modern, dayanıklı ve ölçeklenebilir uygulamalar oluşturmanın temelini oluşturur. Sınav için en kritik noktalar şunlardır:

-   **ELB (Yük Dengeleyici):**
    -   **Görevi:** Gelen trafiği dağıtmak ve yüksek erişilebilirlik sağlamaktır.
    -   **Anahtar Kelime:** Trafik dağıtımı, Sağlık kontrolleri (Health Checks).
    -   **Sınav İpucu:** 3 türü olduğunu unutmayın: **ALB** (Layer 7 - HTTP/HTTPS, akıllı yönlendirme), **NLB** (Layer 4 - TCP/UDP, ultra hızlı, statik IP), **GWLB** (Layer 3 - Sanal ağ cihazları için).
-   **Auto Scaling Group (ASG):**
    -   **Görevi:** Her zaman doğru sayıda sunucuya sahip olmanızı sağlamaktır.
    -   **Anahtar Kelime:** Elastikiyet (Scale In/Out), Kendi kendini iyileştirme (Self-healing).
    -   **Sınav İpucu:** ASG, yüksek erişilebilirlik de sağlar. Çünkü bir sunucu çökerse, ASG bunu tespit eder ve minimum kapasiteyi korumak için yerine yenisini başlatır.
-   **Mükemmel İkili:**
    -   ELB, gelen istekler için "ön kapıdır".
    -   ASG, arka planda çalışan "sunucu ordusunun komutanıdır".
    -   Birlikte, dış dünyaya tek bir noktadan hizmet veren, ancak arka planda esnek, ölçeklenebilir ve kendi kendini iyileştiren bir sistem oluştururlar.
-   **Ölçeklendirme Stratejileri:**
    -   **Dinamik (Target Tracking):** Yüke göre reaktif olarak ölçeklenir.
    -   **Zamanlanmış (Scheduled):** Önceden bilinen zamanlarda proaktif olarak ölçeklenir.
    -   **Tahminsel (Predictive):** ML kullanarak gelecekteki yükü tahmin edip proaktif olarak ölçeklenir.
## Konu 5: EC2 Satın Alma Seçenekleri
AWS, farklı ihtiyaçlara ve bütçelere yönelik esnek satın alma modelleri sunar. Doğru modeli seçmek, iş yükünüzün gereksinimlerine (sürekli mi çalışacak, kesintiye uğrayabilir mi, ne kadar sürecek?) bağlıdır.

### 1. On-Demand Instances (İsteğe Bağlı Sunucular)
-   **Nedir?:** Hiçbir ön taahhüt veya uzun vadeli sözleşme olmadan, kullandığınız saniye veya saat başına ödeme yaptığınız en esnek modeldir. ☕
-   **Özellikleri:**
    -   **Esneklik:** İstediğiniz zaman başlatabilir, durdurabilir veya sonlandırabilirsiniz.
    -   **Taahhütsüz:** Peşin ödeme yoktur.
    -   **Maliyet:** En yüksek birim maliyetine sahip modeldir.
-   **İdeal Kullanım Alanı:**
    -   Ne kadar süreceği belli olmayan, ani ve düzensiz iş yükleri.
    -   Geliştirme ve test ortamları.
    -   AWS'i ilk kez deneyen ve taahhütte bulunmak istemeyen kullanıcılar.

### 2. Reserved Instances (RI - Rezerve Edilmiş Sunucular)
-   **Nedir?:** Belirli bir sunucu ailesi, tipi, işletim sistemi ve bölge için 1 veya 3 yıllık taahhütte bulunarak On-Demand fiyatlarına göre önemli ölçüde (%72'ye varan) indirim aldığınız modeldir.
-   **Özellikleri:**
    -   **Tasarruf:** Sürekli çalışan sunucular için büyük maliyet avantajı sağlar.
    -   **Taahhüt:** 1 veya 3 yıllık bir sözleşme gerektirir.
    -   **Ödeme Seçenekleri:** Peşin ödemesiz (No Upfront), kısmi peşin ödemeli (Partial Upfront) veya tam peşin ödemeli (All Upfront) seçenekleri vardır. Ne kadar çok peşin ödeme yaparsanız, indirim oranı o kadar artar.
-   **İdeal Kullanım Alanı:**
    -   Sürekli olarak (7/24) çalışacağını bildiğiniz, durumu stabil ve öngörülebilir uygulamalar (örn: bir şirketin ana web sunucusu veya veritabanı).

### 3. Savings Plans (Tasarruf Planları)
-   **Nedir?:** RI'lara göre daha modern ve esnek bir tasarruf modelidir. Belirli bir sunucu tipine değil, saatlik olarak belirli bir miktar harcama taahhüdünde (`$10/saat` gibi) bulunursunuz.
-   **RI'dan Farkı Nedir?:** RI'lar sizi belirli bir sunucu tipine (örn: `m5.large`) bağlarken, Savings Plans size esneklik tanır. Taahhüdünüz dahilinde `m5.large` yerine `c5.large` çalıştırabilirsiniz ve indiriminiz devam eder. Hatta farklı bölgeler arasında veya Fargate gibi diğer işlem hizmetlerinde bile geçerli olabilir.
-   **Özellikleri:**
    -   **Esneklik:** Sunucu tipini veya hatta bölgeyi değiştirme özgürlüğü sunar.
    -   **Tasarruf:** RI'lara benzer şekilde On-Demand'e göre büyük indirimler sağlar.
    -   **Taahhüt:** 1 veya 3 yıllık harcama taahhüdü gerektirir.
-   **İdeal Kullanım Alanı:**
    -   Sürekli bir kullanım ihtiyacı olan ancak zamanla sunucu tiplerini veya mimarisini değiştirebilecek modern ve dinamik uygulamalar.

### 4. Spot Instances (Spot Sunucular)
-   **Nedir?:** AWS'in o an kullanmadığı atıl EC2 kapasitesini, açık artırma benzeri bir modelle sunduğu seçenektir. Fiyatlar, arz ve talebe göre dalgalanır. 💸
-   **Özellikleri:**
    -   **En Yüksek Tasarruf:** On-Demand fiyatlarına göre %90'a varan indirimler sunabilir.
    -   **Kesintiye Uğrayabilir:** En önemli özelliği budur. AWS bu kapasiteye ihtiyaç duyduğunda veya sizin teklifiniz mevcut spot fiyatının altına düştüğünde, 2 dakikalık bir bildirimle sunucunuzu geri alabilir (terminate).
-   **İdeal Kullanım Alanı:**
    -   Kesintiye uğramasında veya yarıda kalmasında bir sakınca olmayan, aciliyeti bulunmayan işler.
    -   Büyük veri analizi, bilimsel hesaplamalar, görüntü işleme, test ortamları.
    -   **Asla veritabanı veya müşteri trafiği alan kritik web sunucuları gibi kesintiye toleransı olmayan işler için kullanılmamalıdır.**

### 5. Dedicated Options (Adanmış Seçenekler)
Bu seçenekler, donanımı başka müşterilerle paylaşmak istemediğiniz özel durumlar için kullanılır.

#### Dedicated Hosts (Adanmış Sunucular)
-   **Nedir?:** Fiziksel bir sunucunun tamamı size kiralanır. Donanım üzerinde tam kontrol ve görünürlük sahibi olursunuz.
-   **İdeal Kullanım Alanı:**
    -   Katı uyumluluk (compliance) gereksinimleri (örn: devlet veya sağlık sektörü).
    -   Mevcut, sunucuya bağlı yazılım lisanslarınızı (**BYOL - Bring Your Own License**) kullanmak istediğinizde (örn: belirli Windows veya VMWare lisansları).

#### Dedicated Instances (Adanmış Sunucular)
-   **Nedir?:** Sunucularınız, size adanmış donanım üzerinde çalışır, ancak bu donanımın hangisi olduğu üzerinde tam kontrolünüz yoktur. Dedicated Host'a göre daha "elle tutulmaz" bir adanmışlık sunar.
-   **Dedicated Host'tan Farkı:** Dedicated Host'ta fiziksel sunucuyu yönetirsiniz, Dedicated Instance'da ise AWS sizin için adanmış bir donanım ayırır ama yönetimi kendisi yapar.
-   **İdeal Kullanım Alanı:** Uyum gereksinimleri için yeterli olabilir, ancak lisanslama için genellikle Dedicated Host gerekir.

### 6. Capacity Reservations (Kapasite Rezervasyonları)
-   **Nedir?:** Belirli bir Erişilebilirlik Alanı'nda (AZ), belirli bir sunucu tipi için işlem kapasitesini önceden rezerve etmenizi sağlar.
-   **RI'dan Farkı Nedir?:** RI ve Savings Plans size **fiyat indirimi** taahhüdü verir. Capacity Reservation ise size **kapasite garantisi** verir. Yani, bir felaket anında veya ani bir talep artışında o bölgedeki tüm sunucular dolsa bile, sizin rezerve ettiğiniz kapasite her zaman orada sizi bekler.
-   **İdeal Kullanım Alanı:**
    -   Felaket kurtarma (disaster recovery) senaryoları için kritik sunucuların her zaman başlatılabileceğinden emin olmak.

### Hangi Satın Alma Seçeneği Benim İçin Doğru? 🤔
Aşağıdaki tablo, iş yükünüze en uygun seçeneği bulmanıza yardımcı olabilir:

| İhtiyacınız | En İyi Seçenek | Açıklama |
| :--- | :--- | :--- |
| **Esneklik ve Düzensiz Yük** | On-Demand | Ne zaman ihtiyacınız olacağı belli olmayan, kısa süreli işler. |
| **Sürekli ve Öngörülebilir Yük**| Reserved Instances / Savings Plans | 7/24 çalışacak web sunucuları, veritabanları. (Savings Plans daha esnektir) |
| **En Düşük Maliyet ve Kesintiye Tolerans**| Spot Instances | Kesintiye uğrayabilecek, acil olmayan analiz veya test işleri. |
| **Lisanslama ve Uyum Gereksinimi**| Dedicated Hosts | Kendi lisanslarınızı kullanmanız veya donanımı paylaşmamanız gerektiğinde. |
| **Kapasite Garantisi** | Capacity Reservations | Felaket anında sunucunuzu kesinlikle başlatabilmeniz gerektiğinde. |
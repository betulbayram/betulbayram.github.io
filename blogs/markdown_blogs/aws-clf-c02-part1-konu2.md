# Konu 2: Bazı Temel Kavramlar

# 1. Web Siteleri Nasıl Çalışır? (How Websites Work)

Bir web sitesinin nasıl çalıştığını anlamak için **"İstemci-Sunucu (Client-Server)"** modelini bilmemiz gerekir. Bu süreç, bir restoranda sipariş vermeye çok benzer.

-   **Siz (İstemci/Client):** Tarayıcınız (Google Chrome, Safari vb.) bir istemcidir.
-   **Web Sitesi (Sunucu/Server):** Web sitesinin dosyalarının barındırıldığı güçlü bilgisayar ise sunucudur.

İşte adım adım süreç:

1.  **Adres Yazma (İstek):** Tarayıcınızın adres çubuğuna `www.google.com` yazdığınızda, aslında sunucuya bir istek göndermeye hazırlanırsınız.
2.  **İsmi Adrese Çevirme (DNS):** Bilgisayarlar `google.com` gibi isimlerden anlamaz, onlar sadece rakamlardan oluşan IP adreslerini (örn: `172.217.16.142`) anlarlar. Tarayıcınız, internetin telefon rehberi olan **DNS'e (Domain Name System)** sorar: "Bana `google.com`'un IP adresi nedir?" DNS, ilgili IP adresini tarayıcınıza söyler.
3.  **Sunucuya Ulaşma (HTTP Talebi):** Tarayıcınız artık doğru adresi bildiği için, bu IP adresindeki sunucuya bir **HTTP (HyperText Transfer Protocol)** talebi gönderir. Bu talep aslında şuna benzer: "Merhaba, bana ana sayfanı (`HTML`, `CSS`, `JavaScript` dosyalarını) gönderir misin?"
4.  **Sunucunun Cevabı (HTTP Yanıtı):** Sunucu bu talebi alır, istenen dosyaları (web sitesini oluşturan kodlar ve görseller) paketler ve tarayıcınıza geri yollar.
5.  **Sayfanın Görüntülenmesi (Render):** Tarayıcınız gelen bu kod dosyalarını (`HTML` yapıyı, `CSS` renkleri ve stili, `JavaScript` ise interaktif fonksiyonları belirler) yorumlar ve sizin ekranınızda gördüğümüz görsel web sitesine dönüştürür.

Kısacası, siz tarayıcınızla bir web sitesinin adresini yazdığınızda, bir sunucudan o siteyi oluşturan dosyaları istersiniz ve sunucu da bu dosyaları size gönderir.

# 2. Bir Sunucu Nelerden Oluşur? (What is a Server Composed Of?)

Bir sunucuyu, temel olarak sizin evdeki kişisel bilgisayarınızın (PC) çok daha güçlü, dayanıklı ve 7/24 kesintisiz çalışmak üzere tasarlanmış bir versiyonu olarak düşünebilirsiniz.

## Donanım (Hardware) Bileşenleri:

-   **CPU (Central Processing Unit / İşlemci):** Sunucunun beynidir. Tüm hesaplamaları ve komutları işler. Sunucularda genellikle birden fazla ve çok çekirdekli, güçlü işlemciler bulunur.
-   **RAM (Random Access Memory / Bellek):** Sunucunun geçici hafızasıdır. O an çalışan uygulamaların ve verilerin tutulduğu yerdir. Sunucularda, veri bütünlüğünü korumak için daha güvenilir olan **ECC (Error-Correcting Code) RAM**'ler kullanılır ve miktarı çok yüksektir (yüzlerce GB olabilir).
-   **Depolama (Storage):** Verilerin kalıcı olarak saklandığı yerdir. Tıpkı PC'lerdeki gibi **HDD (Hard Disk Drive)** veya çok daha hızlı olan **SSD (Solid-State Drive)** olabilir. Sunuculardaki diskler daha dayanıklı ve hızlıdır. Genellikle veri kaybını önlemek için **RAID** gibi konfigürasyonlarla birden fazla disk bir arada kullanılır.
-   **Ağ Kartı (Network Interface Card - NIC):** Sunucunun internete veya yerel ağa bağlanmasını sağlayan parçadır. Sunucularda çok yüksek hızlarda (10 Gbps, 40 Gbps veya daha fazla) veri transferi yapabilen kartlar bulunur.
-   **Anakart (Motherboard) ve Güç Kaynağı (Power Supply):** Tüm bu bileşenleri birbirine bağlayan iskelet (anakart) ve onlara enerji sağlayan güç kaynağıdır. Sunucularda genellikle elektrik kesintilerine karşı yedekli (redundant) güç kaynakları bulunur.

## Yazılım (Software) Bileşenleri:

-   **İşletim Sistemi (Operating System):** Donanımı yöneten temel yazılımdır. Sunucularda genellikle **Linux (Ubuntu Server, CentOS)** veya **Windows Server** gibi özel işletim sistemleri çalışır.
-   **Web Sunucusu Yazılımı:** Gelen HTTP taleplerini dinleyen ve web sitesi dosyalarını istemciye gönderen yazılımdır (Örn: **Apache, NGINX**).

# 3. Bilişim Terminolojisi (IT Terminology)

Bu yolculukta sıkça karşımıza çıkacak bazı temel terimler:

-   **Veri Merkezi (Data Center):** Binlerce sunucunun, ağ ekipmanının ve depolama sisteminin özel sıcaklık, nem ve güvenlik koşulları altında barındırıldığı fiziksel binalardır. AWS'in bulutu, aslında tüm dünyaya yayılmış bu devasa veri merkezlerinden oluşur.
-   **Sanallaştırma (Virtualization):** Tek bir fiziksel sunucunun donanım kaynaklarını (CPU, RAM, Depolama) mantıksal olarak bölerek, üzerinde birden fazla bağımsız **"sanal makine" (Virtual Machine - VM)** çalıştırılmasını sağlayan teknolojidir. Bulut bilişimin temelini bu teknoloji oluşturur. AWS'te bir sunucu (EC2 instance) kiraladığınızda aslında bir sanal makine kiralamış olursunuz.
-   **Ağ (Network):** Cihazların (bilgisayarlar, sunucular vb.) birbirleriyle iletişim kurmasını sağlayan yapı.
-   **Bant Genişliği (Bandwidth):** Bir ağ bağlantısının belirli bir sürede taşıyabileceği maksimum veri miktarı. Genellikle saniyedeki bit (bps) olarak ölçülür.
-   **Gecikme (Latency):** Veri paketinin kaynaktan hedefe gitmesi için geçen süre (gecikme). Milisaniye (ms) olarak ölçülür. AWS'in dünyanın farklı yerlerinde veri merkezleri kurmasının bir sebebi de kullanıcılara en yakın noktadan hizmet vererek gecikmeyi azaltmaktır.

# 4. Geleneksel Bilişim Yaklaşımının Sorunları (Problems with Traditional IT)

Bulut bilişimin neden bu kadar popüler olduğunu anlamak için, "bulut öncesi" yani geleneksel IT dünyasının sorunlarını bilmek gerekir. Bu sorunlar bir önceki dersimizde bahsettiğimiz "bulutun çözdüğü problemlerle" doğrudan ilişkilidir.

-   **Yüksek Başlangıç Maliyetleri (CAPEX):** Bir projeye başlamadan önce, sunucuları, ağ ekipmanlarını, depolama ünitelerini peşin parayla satın almanız gerekirdi. Bu, büyük bir sermaye yatırımıdır.
-   **Tahmine Dayalı Kapasite Planlaması:** En büyük sorunlardan biriydi. Projenizin gelecekte ne kadar popüler olacağını tahmin etmek zorundaydınız.
    -   **Az tahmin ederseniz (Under-provisioning):** Web siteniz yoğun trafikte çöker, müşteri ve para kaybedersiniz.
    -   **Çok tahmin ederseniz (Over-provisioning):** İhtiyacınızdan çok daha güçlü ve pahalı sunucular alırsınız, paranızın büyük bir kısmı atıl kapasitede boşa gider.
-   **Yavaş Tedarik ve Kurulum:** Yeni bir fiziksel sunucuya ihtiyacınız olduğunda, sipariş vermeniz, teslim edilmesini beklemeniz (haftalar sürebilir), veri merkezine kurmanız, kablolamasını yapmanız ve yazılımlarını yüklemeniz gerekirdi. Bu süreç çok yavaştır.
-   **Ağır Bakım ve Yönetim Yükü:** Donanım arızalandığında parçasını değiştirmek, sunucu odasını soğutmak, elektrik faturalarını ödemek, fiziksel güvenliği sağlamak gibi işinize doğrudan değer katmayan ama yapılması zorunlu olan birçok iş yükü vardı.
-   **Ölçeklenememe (Scaling) Problemi:** İşleriniz büyüdüğünde yeni sunucu eklemek yavaş ve zahmetliydi. Ama daha da kötüsü, işleriniz küçüldüğünde veya proje bittiğinde elinizdeki o pahalı donanımla kalırdınız. Onları "küçültemez" veya iade edemezdiniz.
-   **Zor ve Pahalı Felaket Kurtarma (Disaster Recovery):** Veri merkezinizde bir yangın, sel veya deprem olması durumuna karşı, tüm sisteminizin bir kopyasını coğrafi olarak farklı bir yerde ikinci bir veri merkezinde tutmak inanılmaz derecede pahalı ve karmaşıktı.
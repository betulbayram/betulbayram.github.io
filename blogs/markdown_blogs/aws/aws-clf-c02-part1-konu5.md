# Konu 5: AWS Global Altyapısı ve Bölge Seçimi

## Bölüm 1: AWS Global Altyapısının Bileşenleri
AWS altyapısını birbiri içine geçmiş bir yapı olarak düşünebiliriz: Dünyanın farklı coğrafyalarında **Bölgeler (Regions)**, her bölgenin içinde birden fazla **Erişilebilirlik Alanı (Availability Zones - AZ)** ve her AZ'nin içinde de bir veya daha fazla **Veri Merkezi (Data Center)** bulunur.

### 1. AWS Bölgeleri (AWS Regions)
-   **Nedir?:** Bir AWS Bölgesi, dünyanın belirli bir coğrafi alanıdır (örn: Frankfurt, İrlanda, Ohio). AWS, bu coğrafi alanlarda veri merkezi kümeleri kurar.
-   **Temel Özellikleri:**
    -   **İzolasyon:** Her bölge, diğer bölgelerden tamamen bağımsız ve izole bir şekilde tasarlanmıştır. Örneğin, Frankfurt'taki bir doğal afetin İrlanda'daki hizmetleri etkilemesi söz konusu değildir. Bu, hata toleransını ve stabiliteyi artırır.
    -   **Yapısı:** Her bölge, en az iki (genellikle üç veya daha fazla) Erişilebilirlik Alanı'ndan (AZ) oluşur.
    -   **İsimlendirme:** `bölge-kodu` şeklinde bir standardı vardır. Örneğin, Frankfurt Bölgesi'nin kodu `eu-central-1`'dir.

### 2. AWS Erişilebilirlik Alanları (Availability Zones - AZs)
-   **Nedir?:** Bir AZ, bir Bölge (Region) içinde yer alan, kendine ait güç kaynağı, soğutma ve ağ bağlantısı olan bir veya daha fazla bağımsız veri merkezinden oluşur.
-   **Temel Özellikleri:**
    -   **Fiziksel Ayrım:** AZ'ler, bir bölge içinde birbirlerinden kilometrelerce uzakta konumlandırılır. Bu sayede bir AZ'de yaşanacak sel, yangın veya elektrik kesintisi gibi felaketler diğer AZ'leri etkilemez.
    -   **Yüksek Hızlı Bağlantı:** AZ'ler, aralarında çok düşük gecikmeli (low-latency) ve yüksek bant genişliğine sahip özel fiber optik ağlarla birbirine bağlıdır. Bu, verilerin AZ'ler arasında çok hızlı bir şekilde kopyalanmasını (replikasyon) sağlar.
-   **Amacı:** Uygulamaları **Yüksek Erişilebilir (Highly Available)** kılmak. Bir uygulamayı aynı anda birden fazla AZ'de çalıştırarak, bir AZ tamamen çökse bile uygulamanın diğer AZ'de çalışmaya devam etmesini sağlayabilirsiniz.

### 3. AWS Veri Merkezleri (Data Centers)
-   **Nedir?:** Bunlar, on binlerce sunucunun, ağ ekipmanının ve depolama sistemlerinin bulunduğu, yüksek güvenlikli fiziksel binalardır. Aslında her şeyin kalbi burasıdır.
-   **İlişki:** Bir Erişilebilirlik Alanı (AZ), bir veya daha fazla bu tür veri merkezinden oluşur. AWS, güvenlik nedeniyle bir AZ'de tam olarak kaç veri merkezi olduğunu veya bunların kesin konumlarını açıklamaz.

### 4. AWS Uç Konumları / Varlık Noktaları (Edge Locations / Points of Presence - PoPs)
-   **Nedir?:** Bunlar, Bölgeler ve AZ'lerden farklı bir amaca hizmet eden, dünya çapında yüzlerce büyük şehre yayılmış daha küçük altyapı noktalarıdır.
-   **Temel Fark:** Uç konumlarda EC2 sunucuları veya RDS veritabanları gibi temel uygulamalarınızı çalıştırmazsınız.
-   **Amacı:** Veriyi son kullanıcıya mümkün olan en yakın noktadan ulaştırarak gecikmeyi (latency) azaltmaktır. İki ana hizmet için kullanılırlar:
    -   **Amazon CloudFront (CDN Hizmeti):** Web sitenizin statik içeriklerini (resimler, videolar, CSS dosyaları) bu uç konumlarda önbelleğe alır (cache). Örneğin, Türkiye'deki bir kullanıcı web sitenize girdiğinde, resimler ve videolar uygulamanızın çalıştığı Frankfurt'tan değil, kullanıcıya en yakın olan İstanbul'daki uç konumdan anında yüklenir. Bu, site hızını dramatik bir şekilde artırır.
    -   **Amazon Route 53 (DNS Hizmeti):** DNS sorgularını kullanıcılara en yakın noktadan yanıtlayarak web sitenize erişimi hızlandırır.

> **Sınav İpucu:** AZ'ler, uygulamaları **hatalara karşı dayanıklı (fault-tolerant)** ve **yüksek erişilebilir (highly available)** yapmak içindir. Uç Konumlar (Edge Locations) ise içeriği **hızlı teslim etmek (low latency)** içindir.

## Bölüm 2: Doğru AWS Bölgesi (Region) Nasıl Seçilir?
Projeniz için altyapınızı hangi AWS Bölgesi'nde kuracağınıza karar verirken şu dört ana faktörü göz önünde bulundurmalısınız:

### 1. Gecikme (Latency)
-   **Kural:** Kullanıcılarınıza en yakın bölgeyi seçin. Verinin kullanıcı ile sunucu arasında kat ettiği fiziksel mesafe ne kadar kısa olursa, uygulamanız o kadar hızlı ve akıcı çalışır.
-   **Örnek:** Müşterilerinizin büyük çoğunluğu Türkiye ve Avrupa'da ise, uygulamanızı Frankfurt (`eu-central-1`), Milano (`eu-west-3`) veya Zürih (`eu-central-2`) gibi Avrupa bölgelerinden birinde barındırmanız mantıklıdır. Avustralya'daki Sidney bölgesini seçmek, Avrupalı kullanıcılar için çok yüksek gecikmeye ve yavaş bir deneyime neden olacaktır.

### 2. Maliyet (Cost)
-   **Kural:** AWS hizmetlerinin fiyatları bölgeden bölgeye değişiklik gösterebilir. Bunun sebebi yerel vergiler, arazi ve elektrik maliyetleri gibi faktörlerdir.
-   **Örnek:** Genellikle Kuzey Amerika'daki bazı bölgeler (örn: `us-east-1`, N. Virginia) diğer bölgelere göre biraz daha ucuz olabilir. Projenizin bütçesi kısıtlıysa, birkaç potansiyel bölge arasında maliyet karşılaştırması yapmak için AWS Pricing Calculator'ı kullanmalısınız.

### 3. Hizmet Kullanılabilirliği (Service Availability)
-   **Kural:** AWS, en yeni ve en gelişmiş hizmetlerini (özellikle Yapay Zeka/Makine Öğrenmesi gibi alanlarda) genellikle önce belirli bölgelerde (çoğunlukla `us-east-1`, N. Virginia) kullanıma sunar ve daha sonra diğer bölgelere yayar.
-   **Örnek:** Eğer uygulamanız çok yeni ve spesifik bir AWS hizmetine bağımlıysa, o hizmetin seçmeyi düşündüğünüz bölgede mevcut olup olmadığını kontrol etmeniz gerekir.

### 4. Veri Egemenliği ve Uyumluluk (Data Sovereignty and Compliance)
-   **Kural:** Birçok ülke ve sektör, vatandaşlarının veya müşterilerinin verilerinin ülke sınırları içinde saklanmasını yasal olarak zorunlu kılar. (Örn: Avrupa Birliği'ndeki **GDPR**).
-   **Örnek:** Bir Alman kamu kurumu için proje yapıyorsanız, Alman yasaları gereği tüm verileri Almanya sınırları içinde tutmanız gerekebilir. Bu durumda tek seçeneğiniz Frankfurt (`eu-central-1`) bölgesi olacaktır. Bu, genellikle en önemli ve bağlayıcı faktördür.

---
Bu altyapıyı anlamak, AWS üzerinde güvenilir, hızlı ve uygun maliyetli uygulamalar tasarlamanın ilk adımıdır.
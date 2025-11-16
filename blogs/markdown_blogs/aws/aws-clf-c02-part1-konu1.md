# Konu 1: Bulut Bilişim (Cloud Computing) Nedir?

Bulut bilişimi teknik terimlere boğulmadan önce basit bir analoji ile anlamaya çalışalım.

## Analoji: Elektrik Şebekesi

Eskiden, 100-150 yıl önce, bir fabrikanın elektriğe ihtiyacı olduğunda ne yapması gerekirdi? Kendi jeneratörünü, kendi güç santralini kurmak zorundaydı. Bu, inanılmaz bir ilk yatırım maliyeti (bina, jeneratör, yakıt, bakım için mühendisler) ve sürekli operasyonel bir yük demekti.

Bugün ise elektriğe ihtiyacımız olduğunda ne yapıyoruz? Sadece fişi prize takıyoruz. Arkadaki devasa ve karmaşık altyapıyı (barajlar, santraller, trafolar, iletim hatları) düşünmüyoruz. Sadece kullandığımız kadarının faturasını ay sonunda ödüyoruz. İhtiyacımız arttığında daha fazla kullanıyoruz, azaldığında daha az.

**İşte Bulut Bilişim, bilişim dünyasının elektrik şebekesidir.**

Eskiden bir şirket, bir web sitesi veya uygulama yayınlamak istediğinde kendi sunucularını (bilgisayarlarını) satın almak, onları soğutulan özel odalarda (veri merkezleri - data center) barındırmak, network altyapısını kurmak, işletim sistemlerini yönetmek ve tüm bunların bakımını yapmak zorundaydı. Bu, tıpkı kendi elektrik santralini kurmak gibiydi: pahalı, yavaş ve verimsiz.

Bulut Bilişim ise, bu bilişim kaynaklarının (sunucular, depolama alanları, veritabanları, ağ bileşenleri, yazılımlar vb.) internet üzerinden, **"kullandığın kadar öde"** modeliyle, bir servis olarak sunulmasıdır.

**AWS (Amazon Web Services)**, **Microsoft Azure** ve **Google Cloud** gibi devasa şirketler, dünyanın dört bir yanında devasa veri merkezleri kurdular. Bizler de artık kendi sunucularımızı almak yerine, bu şirketlerden internet üzerinden ihtiyacımız olan bilişim gücünü kiralıyoruz.

## Bulut Bilişimin Resmi Tanımı ve Temel Özellikleri

Daha teknik bir tanım yapmak gerekirse, ABD Ulusal Standartlar ve Teknoloji Enstitüsü'ne (NIST) göre Bulut Bilişim şu 5 temel özelliğe sahip bir modeldir:

1.  **İsteğe Bağlı Self-Servis (On-Demand Self-Service):**
    Bir sunucuya veya depolama alanına ihtiyacınız olduğunda kimseyi aramanıza, e-posta atmanıza veya bilet açmanıza gerek yoktur. AWS'in web tabanlı konsoluna girip birkaç tıklama ile saniyeler veya dakikalar içinde istediğiniz kaynağı kendiniz oluşturabilirsiniz.

2.  **Geniş Ağ Erişimi (Broad Network Access):**
    Buluttaki kaynaklarınıza internetin olduğu her yerden, standart mekanizmalarla (bilgisayar, tablet, telefon vb.) erişebilirsiniz.

3.  **Kaynak Havuzlama (Resource Pooling):**
    Bulut sağlayıcının fiziksel kaynakları (sunucular, diskler) birden çok müşteri tarafından aynı anda kullanılır (multi-tenant model). Siz bir sunucu kiraladığınızda, fiziksel bir makinenin tamamını değil, o makinenin sanallaştırılmış bir parçasını kullanırsınız. Bu, devasa bir verimlilik ve maliyet avantajı sağlar. Hangi fiziksel sunucuda çalıştığınızı bilmezsiniz ve bilmenize gerek yoktur.

4.  **Hızlı Esneklik (Rapid Elasticity):**
    Bu, bulutun en güçlü özelliklerinden biridir. Web sitenize bir anda binlerce kullanıcı geldi diyelim. Geleneksel yöntemde sunucunuz çökerdi. Bulutta ise, trafiğe göre sunucu sayınızı otomatik olarak artırabilir (scale out) ve trafik azaldığında yine otomatik olarak azaltabilirsiniz (scale in). Bu sayede hem talebi karşılar hem de gereksiz kaynak için para ödemezsiniz.

5.  **Ölçülen Hizmet (Measured Service):**
    Tıpkı elektrik sayacı gibi, bulutta kullandığınız her şey (işlemci süresi, depolama alanı, veri transferi) hassas bir şekilde ölçülür. Ay sonunda sadece ve sadece kullandığınız kadarının faturasını ödersiniz. Gizli maliyetler veya uzun vadeli bağlayıcı kontratlar (genellikle) yoktur.

## Bulut Bilişimin Çözdüğü Temel Problemler

Peki, şirketler neden buluta geçiyor? Hangi temel sorunları çözüyor?

-   **Sermaye Giderini (CAPEX) Operasyonel Gidere (OPEX) Çevirme:** Kendi veri merkezinizi kurmak için en başta milyonlarca dolar harcamak (CAPEX) yerine, her ay kullandığınız kadar fatura ödersiniz (OPEX). Bu, özellikle start-up'lar için büyük bir avantajdır.

-   **Kapasite Tahmin Derdini Ortadan Kaldırma:** Geleneksel yöntemde, gelecekteki en yoğun anı tahmin edip ona göre sunucu satın almanız gerekirdi. Bu tahmin ya yanlış çıkar, paranız boşa gider (atıl kapasite) ya da yetersiz kalır, müşterilerinizi kaybedersiniz. Bulutta ise kapasiteyi anlık olarak ayarlayabilirsiniz.

-   **Hız ve Çeviklik (Speed and Agility):** Yeni bir sunucu sipariş edip gelmesini haftalarca beklemek yerine, bulutta dakikalar içinde yüzlerce sunucuyu ayağa kaldırabilirsiniz. Bu, yeni fikirleri deneme ve pazara ürün çıkarma hızını inanılmaz derecede artırır.

-   **Bakım ve Yönetim Yükünden Kurtulma:** Donanım arızaları, soğutma, elektrik kesintileri, fiziksel güvenlik gibi konularla artık siz değil, AWS gibi bulut sağlayıcıları ilgilenir. Siz sadece kendi uygulamanıza ve işinize odaklanırsınız.

-   **Küreselleşme:** Birkaç tıklama ile uygulamanızı saniyeler içinde Tokyo'da, Frankfurt'ta veya Oregon'da çalıştırabilir, müşterilerinize daha yakın noktalardan hizmet vererek gecikmeyi (latency) azaltabilirsiniz.
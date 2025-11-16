# Konu 6: AWS Konsolu, Sorumluluk Modeli ve Politikalar

## Bölüm 1: AWS Yönetim Konsolu (AWS Management Console)

### AWS Yönetim Konsolu Nedir?
AWS Yönetim Konsolu, AWS hizmetlerini yönetmek için kullanılan, web tabanlı bir grafik arayüzdür (GUI). AWS'in kokpiti olarak düşünebilirsin. Sunucu başlatmaktan kullanıcıları yönetmeye, faturaları kontrol etmekten güvenlik ayarlarını yapmaya kadar aklına gelebilecek neredeyse her şeyi bu arayüz üzerinden yapabilirsin. [https://aws.amazon.com/](https://aws.amazon.com/) adresinden AWS hesabınla giriş yaparak erişirsin.

### Konsolda Hangi Servisler Var?
AWS'in 200'den fazla hizmeti var ve hepsi konsol üzerinden erişilebilir. Ancak CLF-C02 sınavı için en temel kategorileri ve bu kategorilerdeki en popüler hizmetleri bilmen yeterlidir:

#### İşlem Gücü (Compute)
-   **Amazon EC2 (Elastic Compute Cloud):** Sanal sunucular.
-   **AWS Lambda:** Sunucu yönetmeden kod çalıştırmanızı sağlayan "sunucusuz" (serverless) işlem hizmeti.

#### Depolama (Storage)
-   **Amazon S3 (Simple Storage Service):** İnternet için tasarlanmış, neredeyse sonsuz ölçeklenebilir nesne depolama hizmeti (dosyalar, resimler, videolar, yedekler için).
-   **Amazon EBS (Elastic Block Store):** EC2 sunucuları için yüksek performanslı sanal diskler.

#### Ağ ve İçerik Teslimi (Networking & Content Delivery)
-   **Amazon VPC (Virtual Private Cloud):** AWS bulutu içinde kendi izole sanal ağınızı oluşturmanızı sağlar.
-   **Amazon Route 53:** Alan adı (domain name) kaydı ve DNS hizmeti.
-   **Amazon CloudFront:** İçeriklerinizi kullanıcılara en yakın Uç Konumlardan (Edge Locations) dağıtan CDN hizmeti.

#### Veritabanları (Databases)
-   **Amazon RDS (Relational Database Service):** MySQL, PostgreSQL gibi ilişkisel veritabanlarını kolayca kurup yönetmenizi sağlar.
-   **Amazon DynamoDB:** Yüksek performanslı, esnek bir NoSQL veritabanı hizmeti.

#### Güvenlik, Kimlik ve Uyumluluk (Security, Identity, & Compliance)
-   **AWS IAM (Identity and Access Management):** AWS kaynaklarına kimin, ne şekilde erişebileceğini güvenli bir şekilde yönetmenizi sağlar. AWS'nin en önemli güvenlik servisidir.

#### Yönetim ve İdare (Management & Governance)
-   **Amazon CloudWatch:** Kaynaklarınızı ve uygulamalarınızı izlemek, alarmlar kurmak için kullanılır (örn: "CPU kullanımı %80'i geçerse haber ver").
-   **AWS CloudTrail:** Hesabınızda yapılan tüm API çağrılarının (kim, ne zaman, nereden, ne yaptı?) kaydını tutar.

## Bölüm 2: AWS Bölgeleri
Daha önce bahsettiğimiz gibi, AWS'in dünya çapında birçok bölgesi bulunur.

> ![AWS Bölgeleri Tablosu](img/blog/embed/aws-regions.jpg)

Her bölgenin insanlar tarafından bilinen bir adı (örn: Frankfurt) ve makineler/API'lar tarafından kullanılan bir kodu (`eu-central-1`) vardır. Liste sürekli büyümektedir ve en güncel listeye her zaman [AWS'in resmi web sitesinden](https://aws.amazon.com/tr/about-aws/global-infrastructure/) ulaşabilirsin.

## Bölüm 3: Paylaşılan Sorumluluk Modeli (Shared Responsibility Model)
Bu, AWS'deki güvenliğin en temel prensibidir ve sınavda kesinlikle karşına çıkacaktır. Bu model, buluttaki güvenlik sorumluluğunun AWS ile müşteri arasında nasıl paylaşıldığını tanımlar.


> ![Paylaşılan Sorumluluk Modeli](img/blog/embed/aws-shared-responsibility.png)

Modelin ana fikri şudur:
**AWS**, bulutun **KENDİSİNİN** güvenliğinden sorumludur.
**Müşteri** ise bulutun **İÇİNDEKİ** güvenliğinden sorumludur.

Bunu bir ev sahibi-kiracı ilişkisine benzetebiliriz:

### AWS'nin Sorumlulukları (Bulutun Güvenliği - Security OF the Cloud)
AWS, altyapıyı oluşturan tüm fiziksel ve temel katmanlardan sorumludur.
-   **Fiziksel Güvenlik:** Veri merkezlerine giriş çıkışları, güvenlik görevlilerini, kameraları yönetmek.
-   **Donanım:** Sunucuların, depolama ünitelerinin, ağ kablolarının çalışır durumda olmasını sağlamak.
-   **Yazılım (Temel):** AWS'in kendi servislerini çalıştıran temel yazılımları ve sanallaştırma katmanını (hypervisor) yönetmek.
-   **Global Altyapı:** Bölgeleri (Regions), Erişilebilirlik Alanlarını (AZs) ve Uç Konumları (Edge Locations) yönetmek.
-   **Ev Sahibi Analojisi:** Ev sahibi, binanın temelinden, dış kapısının kilidinden, su ve elektrik tesisatından sorumludur.

### Müşterinin Sorumlulukları (Bulutun İçindeki Güvenlik - Security IN the Cloud)
Siz, yani müşteri, AWS'in size sağladığı altyapının üzerine koyduğunuz her şeyden sorumlusunuz.
-   **Veri:** Kendi verilerinizin güvenliği, sınıflandırılması ve şifrelenmesi size aittir. AWS, sizin verinizin ne olduğunu bilmez ve görmez.
-   **Kimlik ve Erişim Yönetimi (IAM):** Hangi kullanıcıların hangi servislere erişebileceğini doğru yapılandırmak tamamen sizin sorumluluğunuzdadır.
-   **İşletim Sistemi, Ağ ve Güvenlik Duvarı:** Bir EC2 sunucusu kullanıyorsanız, işletim sisteminin yamalarını yapmak, güvenlik duvarı kurallarını (Security Groups) yapılandırmak sizin görevinizdir.
-   **İstemci Tarafı Şifreleme:** Verilerinizi buluta göndermeden önce şifrelemek.
-   **Sunucu Tarafı Şifreleme:** Verilerinizi S3 gibi servislerde saklarken şifreleme seçeneğini aktif etmek.
-   **Kiracı Analojisi:** Kiracı, ev sahibinin sağladığı dairenin kapısını kilitlemekten, anahtarını kimseye vermemekten ve değerli eşyalarını korumaktan kendisi sorumludur.

**Not:** Bu sorumluluk çizgisi, kullanılan hizmet modeline (`IaaS`, `PaaS`, `SaaS`) göre değişir. Örneğin, `IaaS (EC2)` modelinde işletim sisteminden siz sorumluyken, `PaaS (RDS)` modelinde işletim sistemi ve veritabanı yazılımının bakımını AWS üstlenir. `SaaS` modelinde ise sorumluluğunuz en az düzeydedir.

> ![Hizmet Modeli Tipleri](img/blog/embed/aws-cloud-type.jpg)

## Bölüm 4: AWS Kabul Edilebilir Kullanım Politikası (AWS Acceptable Use Policy)
Bu politika, AWS hizmetlerini kullanırken uymanız gereken kurallar bütünüdür. Kısacası, AWS platformunda neleri yapamayacağınızı belirten yasal bir belgedir. Amacı, platformu herkes için güvenli, stabil ve yasal tutmaktır.

Yasaklanan bazı temel aktiviteler şunlardır:
-   Yasa Dışı Faaliyetler: Telif hakkı ihlali yapan içerik barındırmak, yasa dışı ürün satmak vb.
-   Spam Gönderimi: İstenmeyen toplu e-postalar göndermek.
-   Ağ Saldırıları: Başka sistemlere veya kullanıcılara yönelik hizmet engelleme (Denial of Service - DoS) saldırıları düzenlemek.
-   İzinsiz Güvenlik Taraması: Size ait olmayan sistemlerde veya AWS'in kendi altyapısında izinsiz olarak zafiyet taraması yapmak. (Not: Kendi sistemleriniz için izin alarak sızma testi yapabilirsiniz).
-   Zararlı Yazılım Barındırma: Virüs, fidye yazılımı gibi kötü amaçlı yazılımları dağıtmak veya barındırmak.

Bu kurallara uyulmaması, hesabınızın askıya alınmasına veya tamamen kapatılmasına neden olabilir.
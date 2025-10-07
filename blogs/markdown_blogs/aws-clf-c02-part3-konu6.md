## Konu 6: EC2 Bölüm Özeti, Ücretlendirme ve Sorumluluk Modeli

### 1. EC2 Bölümü Özeti

-   **EC2 Nedir?:** Bulutta çalışan, yeniden boyutlandırılabilir sanal sunuculardır (**Instance**).
-   **Temel Bileşenler:**
    -   **AMI (Amazon Machine Image):** Bir sunucuyu başlatmak için kullanılan, işletim sistemi ve yazılımları içeren şablondur.
    -   **Instance Type (Sunucu Tipi):** Sunucunun donanımını (CPU, RAM, vb.) belirler. İhtiyaca göre Genel Amaçlı, İşlem Gücü Optimize, Bellek Optimize gibi ailelerden seçilir.
-   **Depolama Seçenekleri:**
    -   **EBS (Elastic Block Store):** Kalıcı, ağa bağlı, yedeklenebilir sanal "hard disk".
    -   **Instance Store:** Geçici, fiziksel olarak bağlı, ultra hızlı "geçici disk". Sunucu durdurulursa veriler silinir.
    -   **EFS (Elastic File System):** Birden çok sunucu tarafından aynı anda kullanılabilen, paylaşılan ve kalıcı "ağ sürücüsü".
-   **Ağ ve Güvenlik:**
    -   **Security Group:** Sunucu seviyesinde çalışan, **stateful** (durum bilgili) bir sanal güvenlik duvarıdır. Sadece "İzin Ver" (Allow) kuralları içerir.
    -   **Key Pair (Anahtar Çifti):** Linux sunucularına güvenli SSH erişimi için kullanılan `.pem` dosyasıdır.
-   **Otomasyon ve Erişim:**
    -   **User Data (Bootstrap Script):** Sunucu ilk kez başlatılırken otomatik olarak çalışan betiklerdir.
    -   **Erişim Yöntemleri:** AWS Konsolu (şifre/MFA), CLI ve SDK (erişim anahtarları).
-   **Satın Alma Seçenekleri:**
    -   **On-Demand:** En esnek, taahhütsüz model.
    -   **Reserved / Savings Plans:** 1-3 yıllık taahhüt ile en yüksek indirimi sunar.
    -   **Spot:** Kesintiye uğrayabilen işler için %90'a varan indirim sağlar.
    -   **Dedicated:** Uyum ve lisanslama için adanmış fiziksel donanım sunar.

### 2. AWS EC2 Ücretlendirmesi (How AWS EC2 Charges)
Bir EC2 sunucusu kullandığınızda, faturanızda göreceğiniz maliyetler birkaç ana bileşenden oluşur. Maliyet, sadece sunucunun çalıştığı süreden ibaret değildir.

-   **Sunucu Çalışma Süresi (Instance Uptime):**
    -   Bu, en temel maliyet kalemidir. Seçtiğiniz sunucu tipine (instance type), çalıştığı bölgeye (region) ve işletim sistemine (Windows lisansları ek maliyet getirir) göre değişen bir saatlik veya saniyelik ücret ödersiniz.
    -   **Linux/Unix sunucuları:** Genellikle saniye bazında faturalandırılır (minimum 60 saniye).
    -   **Windows sunucuları:** Genellikle saat bazında faturalandırılır.
-   **Depolama (Storage - EBS Hacimleri):**
    -   EC2 sunucunuza bağladığınız EBS diskleri için ayrı bir ücret ödersiniz.
    -   Bu ücret, ayırdığınız (provisioned) disk alanına göre hesaplanır (GB/ay olarak). 100 GB'lık bir disk oluşturduysanız, içinde 10 GB veri olsa bile 100 GB için ödeme yaparsınız.
    -   Ayrıca, diskinizin tipine (SSD, HDD) ve performansına (IOPS) göre de ek ücretler olabilir. Aldığınız Snapshot'lar (yedekler) da S3'te depolandığı için ayrıca ücretlendirilir.
-   **Veri Transferi (Data Transfer):**
    -   **ALTIN KURAL:** İnternetten AWS'e doğru olan veri transferi (**Data Transfer IN**) neredeyse her zaman **ücretsizdir**.
    -   AWS'ten internete doğru olan veri transferi (**Data Transfer OUT**) ise **ücretlidir** ve GB başına faturalandırılır.
    -   Aynı bölge içindeki farklı Erişilebilirlik Alanları (AZ) arasında yapılan veri transferi de genellikle ücretlidir.
-   **Ek Hizmetler (Additional Services):**
    -   **Elastic IP Adresleri:** Bir Elastic IP adresi alıp çalışan bir sunucuya bağlamazsanız, boşta durduğu her saat için küçük bir ücret ödersiniz. Bu, kaynakları verimli kullanmaya teşvik eder.
    -   **Detaylı CloudWatch İzleme (Detailed Monitoring):** Standart 5 dakikalık izleme ücretsizdir, ancak 1 dakikalık daha detaylı izlemeyi etkinleştirirseniz ek bir maliyeti olur.

### 3. EC2 için Paylaşılan Sorumluluk Modeli (Shared Responsibility Model for EC2)
EC2, bir **IaaS (Infrastructure as a Service - Altyapı Hizmeti)** örneğidir. Bu modelde, sorumluluğun önemli bir kısmı müşteriye aittir.

#### AWS'nin Sorumlulukları (Bulutun KENDİSİNİN Güvenliği)
AWS, size sanal sunucuyu sunduğu altyapının güvenliğinden sorumludur.
-   **Fiziksel Donanım:** EC2 sunucularının üzerinde çalıştığı fiziksel sunucuların, rafların, ağ kablolarının ve diğer donanımların bakımı ve güvenliği.
-   **Fiziksel Güvenlik:** Bu donanımların barındırıldığı veri merkezlerinin fiziksel güvenliği (güvenlik görevlileri, kameralar, biyometrik erişim vb.).
-   **Sanallaştırma Katmanı (Hypervisor):** Fiziksel bir sunucuyu birden çok sanal EC2 sunucusuna bölen sanallaştırma yazılımının güvenliği ve yalıtımı.
-   **Ağ Altyapısı:** AWS'in küresel ağ altyapısının yönetimi ve güvenliği.

#### Sizin (Müşterinin) Sorumluluklarınız (Bulutun İÇİNDEKİ Güvenlik)
Siz, sanal sunucunun kendisi ve içine koyduğunuz her şeyden sorumlusunuz.
-   **İşletim Sistemi (Guest OS):** İşletim sisteminin güvenlik güncellemelerini ve yamalarını yapmak (örn: Windows Update'leri çalıştırmak veya `yum update` komutunu çalıştırmak).
-   **Uygulamalar ve Yazılımlar:** İşletim sisteminin üzerine kurduğunuz tüm yazılımların (web sunucusu, veritabanı, kendi uygulamanız vb.) güvenliği, yapılandırılması ve bakımı.
-   **Veri Güvenliği:** Sunucunuzda sakladığınız verilerin güvenliği ve şifrelenmesi (hem diskte - at rest, hem de ağ üzerinde - in transit). EBS şifrelemesini etkinleştirmek sizin sorumluluğunuzdadır.
-   **Güvenlik Duvarı Yapılandırması:** Security Group ve Network ACL kurallarını doğru ve güvenli bir şekilde yapılandırmak. Gereksiz portları açık bırakmamak.
-   **IAM Yönetimi:** Sunucuya kimlerin erişebileceğini IAM kullanıcıları, rolleri ve politikaları ile yönetmek.
-   **Anahtar Yönetimi (Key Management):** Sunucuya erişim için kullandığınız `.pem` anahtar dosyalarını güvenli bir şekilde saklamak.

---
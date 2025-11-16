## Konu 4: Amazon FSx ve EC2 Depolama Özeti

### 1. Amazon FSx'e Genel Bakış (Amazon FSx Overview)
Amazon EFS, genel amaçlı Linux dosya paylaşımı için harika bir çözümken, bazı uygulamaların çok özel dosya sistemlerine ihtiyacı vardır. Örneğin, Windows tabanlı uygulamalar genellikle SMB protokolü ve Active Directory entegrasyonu beklerken, yüksek performanslı hesaplama (HPC) işleri Lustre gibi paralel dosya sistemlerine ihtiyaç duyar.

**Amazon FSx**, bu popüler ve özel dosya sistemlerini (Windows File Server, Lustre, NetApp ONTAP, OpenZFS gibi) sizin için **tam yönetilen (fully managed)** bir hizmet olarak sunan bir hizmet ailesidir. "FSx"teki "x", hizmetin sunduğu farklı dosya sistemi türlerini temsil eder.

-   **Çözdüğü Problem:** Bu özel dosya sistemlerini kendiniz kurmak, yapılandırmak, yamalarını yapmak, yedeklemek ve yüksek erişilebilirliği sağlamak son derece karmaşık ve zaman alıcıdır. Amazon FSx, tüm bu ağır işleri sizin yerinize yaparak, bu güçlü dosya sistemlerinin özelliklerinden ve performansından kolayca yararlanmanızı sağlar.

### 2. Amazon FSx for Windows File Server
-   **Nedir?:** Windows Server üzerinde çalışan, tam yönetilen, doğal bir Microsoft Windows dosya sistemidir. Standart **SMB (Server Message Block)** protokolünü kullanarak paylaşılan depolama alanı sunar.
-   **Analoji:** Şirketinizdeki, herkesin `\\paylasim\ortak_klasor` gibi bir yolla eriştiği geleneksel bir "Windows Paylaşım Klasörünün" buluttaki tam yönetilen versiyonudur.

#### Temel Özellikleri ve Kullanım Alanları:
-   **Doğal Windows Uyumluluğu:** Windows'un tüm dosya sistemi özelliklerini (ACLs, Shadow Copies, vb.) tam olarak destekler.
-   **Active Directory (AD) Entegrasyonu:** Şirketinizin mevcut Microsoft Active Directory'si ile tam entegre çalışır. Bu sayede, dosya ve klasör izinlerini mevcut kullanıcı ve grup kimlik bilgilerinizle yönetebilirsiniz.
-   **SMB Protokolü:** Windows tabanlı EC2 sunucuları, son kullanıcı bilgisayarları ve diğer AWS hizmetleri tarafından kolayca erişilebilir.
-   **Performans:** İhtiyacınıza göre SSD veya daha uygun maliyetli HDD depolama seçenekleriyle yüksek performans sunar.

#### İdeal Kullanım Alanları:
-   Windows tabanlı kurumsal uygulamaların "lift-and-shift" ile buluta taşınması.
-   Kullanıcıların kişisel "home directory" klasörleri.
-   .NET uygulamaları, SQL Server veritabanları gibi Windows ekosistemine ait iş yükleri için paylaşılan depolama.

### 3. Amazon FSx for Lustre
-   **Nedir?:** Hız odaklı iş yükleri için tasarlanmış, tam yönetilen, ultra yüksek performanslı bir dosya sistemidir. Lustre, özellikle **Yüksek Performanslı Hesaplama (HPC - High-Performance Computing)** dünyasında kullanılan, popüler bir açık kaynaklı paralel dosya sistemidir.
-   **Analoji:** Veri dünyasının **"Formula 1 aracıdır"**. Standart bir arabanın gidemeyeceği hızlarda veri işlemek için tasarlanmıştır.

#### Temel Özellikleri ve Kullanım Alanları:
-   **Ekstrem Performans:** Saniyede yüzlerce Gigabyte'a varan veri aktarım hızları (throughput) ve milyonlarca IOPS (saniyedeki okuma/yazma işlemi) sunarak en zorlu iş yüklerinin altından kalkar.
-   **Paralel Mimari:** Veriler, performansı maksimize etmek için arka planda birden çok sunucuya dağıtılır ve bu sunuculardan paralel olarak okunur.
-   **S3 Entegrasyonu:** En güçlü özelliklerinden biridir. FSx for Lustre dosya sisteminizi bir S3 bucket'ına bağlayabilirsiniz. Bu sayede, S3'teki devasa veri setinizi Lustre'a alıp inanılmaz hızlarda işleyebilir ve sonuçları tekrar uzun süreli saklama için S3'e geri yazabilirsiniz. Lustre, bu senaryoda S3 için yüksek performanslı bir **"önbellek (cache)"** gibi çalışır.

#### İdeal Kullanım Alanları:
-   **Yüksek Performanslı Hesaplama (HPC):** Finansal modelleme, genom analizi, hava durumu tahmini gibi yoğun hesaplama gerektiren işler.
-   **Makine Öğrenmesi (Machine Learning):** Büyük veri setleriyle model eğitimi.
-   **Medya ve Eğlence:** 4K/8K video işleme (rendering) ve transkodlama.

### 4. EC2 Instance Storage Özeti
Şu ana kadar öğrendiğimiz tüm EC2 depolama seçeneklerini karşılaştıran bu özet tablo, doğru seçimi yapmanıza yardımcı olacaktır.

| Özellik | ✅ EBS | 🔄 EFS | ⚠️ Instance Store | 🪟 FSx for Windows | 🚀 FSx for Lustre |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Depolama Tipi** | Blok | Dosya | Blok | Dosya | Dosya |
| **Kalıcılık** | Kalıcı | Kalıcı | **GEÇİCİ** | Kalıcı | Kalıcı |
| **Paylaşım** | Tek EC2'ye | Binlerce EC2'ye | Tek EC2'ye | Binlerce Cihaza | Binlerce EC2'ye |
| **Protokol** | Ağ Diski | NFSv4 (Linux) | Yerel Disk | SMB (Windows) | Lustre (HPC) |
| **Performans Profili** | Dengeli - Yüksek IOPS | Ölçeklenebilir | En Düşük Gecikme | Yüksek (Windows için) | Ekstrem HPC Hızı |
| **Temel Kullanım Alanı**| Önyükleme diski, Tek sunucu veritabanı | Paylaşılan Linux içeriği, Web sunumu | Önbellek, Geçici veri | Kurumsal Windows paylaşımları | HPC, ML, Video işleme |
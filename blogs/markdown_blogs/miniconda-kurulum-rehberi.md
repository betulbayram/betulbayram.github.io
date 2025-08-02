# Miniconda Kurulum Rehberi: Geliştirme Ortamınızı Kolayca Yönetin

Veri bilimi, makine öğrenmesi veya genel yazılım geliştirme ile uğraşıyorsanız, paket ve ortam yönetiminin ne kadar kritik olduğunu bilirsiniz. Projelerinizin farklı kütüphane ve Python sürümlerine ihtiyaç duyması, zamanla içinden çıkılmaz bir hal alabilir. İşte bu noktada Anaconda ve Miniconda gibi araçlar devreye giriyor.

Bu yazıda, öncelikle Anaconda ve Miniconda'nın ne olduğundan ve hangi durumlarda hangisini tercih etmeniz gerektiğinden bahsedeceğiz. Ardından, daha hafif ve esnek bir seçenek olan Miniconda'nın Windows, macOS ve Linux işletim sistemlerine nasıl kurulacağını adım adım göstereceğiz.

## Anaconda ve Miniconda Nedir?

### Anaconda: Hepsi Bir Arada Çözüm

**Anaconda**, Python ve R programlama dilleri için geliştirilmiş, açık kaynaklı bir dağıtımdır. Özellikle veri bilimi ve makine öğrenmesi alanında çalışanlar için tasarlanmıştır. Anaconda'yı kurduğunuzda sadece Python değil, aynı zamanda `numpy`, `pandas`, `scipy`, `matplotlib`, `jupyter notebook` gibi yüzlerce popüler veri bilimi kütüphanesi de otomatik olarak yüklenir.

**Avantajları:**
* **Zengin Paket İçeriği:** Veri bilimi için gerekli olan birçok popüler kütüphane ve araçla birlikte gelir.
* **Kullanıcı Dostu:** Anaconda Navigator adındaki grafiksel kullanıcı arayüzü sayesinde ortam ve paket yönetimi oldukça kolaydır.
* **Yeni Başlayanlar İçin İdeal:** Kurulumla birlikte her şeyin hazır gelmesi, yeni başlayanların hızla çalışmaya başlamasını sağlar.

### Miniconda: Hafif ve Özelleştirilebilir Alternatif

**Miniconda**, Anaconda'nın "küçük kardeşi" olarak düşünülebilir. Sadece `conda` paket yöneticisi, Python ve bunların çalışması için gerekli olan temel bağımlılıkları içerir. Anaconda gibi yüzlerce paketi otomatik olarak kurmaz. Bu sayede, sadece ihtiyacınız olan paketleri kurarak daha temiz ve kontrol edilebilir bir çalışma ortamı oluşturmanıza olanak tanır.

**Avantajları:**
* **Hafiflik:** Sadece temel bileşenleri içerdiği için diskte çok daha az yer kaplar.
* **Tam Kontrol:** Hangi paketlerin kurulacağı tamamen size bağlıdır. Bu, sisteminizi gereksiz paketlerden arındırmanızı sağlar.
* **Esneklik:** Deneyimli geliştiriciler ve özel proje gereksinimleri olanlar için idealdir.

### Hangisini Seçmelisiniz?

* **Veri bilimine yeni başlıyorsanız** veya disk alanı sizin için bir sorun değilse, **Anaconda** hızlı bir başlangıç için harika bir seçenektir.
* **Deneyimli bir geliştiriciyseniz**, disk alanınız kısıtlıysa veya sadece ihtiyacınız olan paketleri kurarak sisteminizi temiz tutmak istiyorsanız, **Miniconda** sizin için daha uygun olacaktır.

Bu rehberde, esnekliği ve hafifliği nedeniyle Miniconda kurulumuna odaklanacağız.

---

## Miniconda Kurulumu

Aşağıda Windows, macOS ve Linux için Miniconda kurulum adımlarını bulabilirsiniz.

### Windows için Miniconda Kurulumu

1.  **Miniconda Yükleyicisini İndirin:**
    * [Miniconda'nın resmi indirme sayfasına](https://docs.conda.io/en/latest/miniconda.html) gidin.
    * "Windows installers" başlığı altından sisteminize uygun (genellikle 64-bit) Python 3.x sürümünü indirin.

2.  **Yükleyiciyi Çalıştırın:**
    * İndirdiğiniz `.exe` dosyasına çift tıklayarak kurulumu başlatın.
    * Karşılama ekranında "Next" butonuna tıklayın.

3.  **Lisans Sözleşmesini Kabul Edin:**
    * Lisans sözleşmesini okuduktan sonra "I Agree" butonuna tıklayın.

4.  **Kurulum Türünü Seçin:**
    * "Just Me" (Sadece Benim İçin) seçeneğini işaretleyip "Next" ile devam edin. Bu, yönetici izni gerektirmediği için genellikle en sorunsuz seçenektir.

5.  **Kurulum Dizinini Seçin:**
    * Kurulum yapılacak klasörü seçin. Genellikle varsayılan konum uygundur. "Next" ile devam edin.

6.  **Gelişmiş Seçenekler:**
    * Bu adımda karşınıza iki seçenek çıkacaktır:
        * **"Add Miniconda3 to my PATH environment variable" (Miniconda3'ü PATH ortam değişkenime ekle):** Bu seçeneği **işaretlememeniz önerilir.** Kurulumdan sonra Anaconda Prompt üzerinden `conda` komutlarına erişebilirsiniz.
        * **"Register Miniconda3 as my default Python" (Miniconda3'ü varsayılan Python'um olarak kaydet):** Bu seçeneği işaretleyebilirsiniz.
    * "Install" butonuna tıklayarak kurulumu başlatın.

7.  **Kurulumu Test Edin:**
    * Başlat Menüsü'nden "Anaconda Prompt (Miniconda3)" programını aratıp çalıştırın.
    * Açılan komut satırına aşağıdaki komutu yazın ve Enter'a basın:
        ```bash
        conda list
        ```
    * Eğer yüklü paketlerin bir listesini görüyorsanız, kurulum başarıyla tamamlanmış demektir.

---

### Windows'ta Sık Karşılaşılan Bir Sorun: 'conda' is not recognized... Hatası ve Çözümü

Miniconda'yı kurduktan sonra standart Komut İstemi'ni (Command Prompt) veya PowerShell'i açıp `conda` yazdığınızda şu hata mesajını alabilirsiniz:

`'conda' is not recognized as an internal or external command, operable program or batch file.`

Bu hata, Windows'un `conda` komutunu nerede bulacağını bilmediği anlamına gelir ve oldukça yaygindir. Sebebi, kurulum sırasında "Add Miniconda3 to my PATH..." seçeneğini işaretlememiş olmanızdır ki bu, Anaconda'nın önerdiği bir güvenlik adımıdır.

Panik yapmayın, çözümü çok basit!

#### Çözüm 1: Doğru Terminali Kullanmak (En Kolay ve Önerilen Yöntem)

Miniconda, kendisi için özel olarak yapılandırılmış bir komut istemi ile birlikte gelir. `conda` komutlarını çalıştırmak için her zaman bu özel terminali kullanmalısınız.

1.  Klavyenizdeki **Windows** tuşuna basın veya **Başlat Menüsü**'nü açın.
2.  Arama çubuğuna **"Anaconda Prompt"** yazın.
3.  Çıkan sonuçlardan **"Anaconda Prompt (Miniconda3)"** seçeneğine tıklayarak çalıştırın.
4.  Bu özel terminal penceresinde `conda list` gibi komutlar sorunsuz bir şekilde çalışacaktır.

Çoğu kullanıcı için en güvenli ve sorunsuz yöntem budur.

#### Çözüm 2: Conda'yı PATH Ortam Değişkenine Manuel Olarak Ekleme (Gelişmiş Kullanıcılar İçin)

Eğer `conda` komutunu standart Komut İstemi veya VS Code gibi programların entegre terminalinde de çalıştırmak istiyorsanız, Miniconda'nın konumunu Windows'un PATH (yol) değişkenine manuel olarak ekleyebilirsiniz.

> **Uyarı:** Bu yöntem, sisteminizde başka Python sürümleri varsa veya bazı programlarla çakışmalara neden olabileceğinden genellikle **önerilmez**. Ne yaptığınızdan eminseniz bu adımları izleyin.

1.  **Miniconda Kurulum Klasörünü Bulun:**
    Genellikle `C:\Users\KullaniciAdiniz\miniconda3` yolundadır. `KullaniciAdiniz` kısmını kendi Windows kullanıcı adınızla değiştirin.

2.  **Gerekli Klasör Yollarını Kopyalayın:**
    Aşağıdaki üç yolu bir metin editörüne kopyalayın ve `KullaniciAdiniz` kısmını düzenleyin:
    * `C:\Users\KullaniciAdiniz\miniconda3\Scripts`
    * `C:\Users\KullaniciAdiniz\miniconda3\Library\bin`
    * `C:\Users\KullaniciAdiniz\miniconda3`

3.  **Ortam Değişkenlerini Açın:**
    * Başlat Menüsü'ne "Ortam değişkenlerini düzenle" yazın ve "Sistem ortam değişkenlerini düzenleyin" seçeneğini açın.
    * Açılan pencerede "Ortam Değişkenleri..." butonuna tıklayın.

4.  **PATH Değişkenini Düzenleyin:**
    * Üst kısımdaki "Kullanıcı değişkenleri" bölümünde `Path` değişkenini bulun ve seçin, ardından "Düzenle..." butonuna tıklayın.
    * "Yeni" butonuna tıklayın ve 2. adımda kopyaladığınız yollardan ilkini yapıştırın.
    * Bu işlemi diğer iki yol için de tekrarlayarak üçünü de listeye ekleyin.
    * Tüm pencereleri "Tamam" diyerek kapatın.

5.  **Doğrulama:**
    **Açık olan tüm Komut İstemi veya PowerShell pencerelerini kapatıp yeni bir tane açın.** Artık `conda` komutu standart terminalde de çalışacaktır.

---

### macOS için Miniconda Kurulumu

1.  **Miniconda Yükleyicisini İndirin:**
    * [Miniconda'nın resmi indirme sayfasına](https://docs.conda.io/en/latest/miniconda.html) gidin.
    * "macOS installers" başlığı altından işlemcinize uygun (Apple Silicon için `arm64`, Intel için `x86_64`) `.pkg` dosyasını indirin.

2.  **Yükleyiciyi Çalıştırın (Grafiksel Yöntem):**
    * İndirdiğiniz `.pkg` dosyasına çift tıklayın ve kurulum adımlarını takip edin. Varsayılan ayarlar genellikle çoğu kullanıcı için uygundur.

3.  **Yükleyiciyi Çalıştırın (Komut Satırı Yöntemi - Önerilen):**
    * Terminal'i açın.
    * `Downloads` klasörüne gidin:
        ```bash
        cd ~/Downloads
        ```
    * İndirdiğiniz dosyayı çalıştırılabilir yapın ve kurulumu başlatın (dosya adını kendi indirdiğiniz dosya ile değiştirin):
        ```bash
        bash Miniconda3-latest-MacOSX-arm64.sh
        ```
    * Kurulum sırasında lisans sözleşmesini onaylamanız ve kurulum yerini seçmeniz istenecektir. Genellikle varsayılan ayarları kabul etmek için "Enter" tuşuna basmanız yeterlidir.
    * Kurulumun sonunda `conda`'yı başlatmak isteyip istemediğiniz sorulacaktır. `yes` yazarak onaylayın.

4.  **Kurulumu Test Edin:**
    * Terminal penceresini kapatıp yeniden açın.
    * Aşağıdaki komutu çalıştırın:
        ```bash
        conda list
        ```
    * Yüklü paketlerin listesi görünüyorsa kurulum tamamdır.

### Linux için Miniconda Kurulumu

1.  **Miniconda Yükleyicisini İndirin:**
    * Terminali açın.
    * `wget` komutu ile en son Miniconda yükleyicisini indirin:
        ```bash
        wget [https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh](https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh)
        ```

2.  **Kurulum Betiğini Çalıştırın:**
    * İndirdiğiniz betik dosyasını `bash` ile çalıştırın:
        ```bash
        bash Miniconda3-latest-Linux-x86_64.sh
        ```

3.  **Kurulum Adımlarını Takip Edin:**
    * Kurulum sırasında lisans sözleşmesini onaylamanız (`yes` yazarak) ve kurulum dizinini seçmeniz istenecektir. Varsayılan konumu (`/home/kullaniciadiniz/miniconda3`) kabul etmek için "Enter"a basın.
    * Kurulumun sonunda `conda init` işlemini çalıştırmak isteyip istemediğiniz sorulacaktır. `yes` yazarak bu adımı onaylayın. Bu, `conda` komutunun terminaliniz tarafından tanınmasını sağlayacaktır.

4.  **Değişiklikleri Uygulayın ve Test Edin:**
    * Terminali kapatıp yeniden açın veya aşağıdaki komutu çalıştırarak `bash` profilinizi yeniden yükleyin:
        ```bash
        source ~/.bashrc
        ```
    * Kurulumu test etmek için şu komutu girin:
        ```bash
        conda list
        ```
    * Paket listesi ekrana geldiyse, Linux sisteminize Miniconda'yı başarıyla kurdunuz.
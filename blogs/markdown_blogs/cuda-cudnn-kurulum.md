# Derin Öğrenme CUDA, cuDNN ve PyTorch Kurulum Rehberi

Derin öğrenme modellerini eğitirken NVIDIA ekran kartınızın (GPU) gücünden faydalanmak, süreci saatlerden dakikalara indirebilir. Ancak bu gücü kullanabilmek için PyTorch gibi kütüphanelerin, ekran kartınızla doğru bir şekilde iletişim kurmasını sağlayan CUDA ve cuDNN sürücülerinin eksiksiz kurulması gerekir. Bu süreç, versiyon uyumsuzlukları nedeniyle genellikle en çok zorlanılan kısımdır.

Bu rehberde, Windows işletim sistemi üzerinde, doğru versiyonları seçerek CUDA ve cuDNN'i nasıl kuracağınızı, PyTorch ile entegrasyonu nasıl yapacağınızı ve kurulumun başarılı olup olmadığını nasıl test edeceğinizi adım adım anlatacağız.

## Ön Gereksinimler

Başlamadan önce sisteminizde aşağıdakilerin kurulu ve güncel olduğundan emin olun:

1.  **NVIDIA Ekran Kartı:** CUDA destekli bir NVIDIA GPU'nuz olmalı.
2.  **Güncel NVIDIA Sürücüsü:** [NVIDIA Sürücü İndirme](https://www.nvidia.com.tr/Download/index.aspx?lang=tr) sayfasından ekran kartınıza en uygun güncel "Game Ready" veya "Studio" sürücüsünü kurun.
3.  **Anaconda/Miniconda ya da pip:** Paket ve ortam yönetimi için tavsiye edilir. Bu rehberde `conda` komutlarını kullanacağız.

## Adım 1: Doğru CUDA Sürümünü Belirleme

En kritik adım, kuracağınız PyTorch sürümünün hangi CUDA versiyonunu desteklediğini öğrenmektir. En son CUDA sürümünü kurmak her zaman en iyi seçenek değildir!

1.  PyTorch'un resmi web sitesindeki [Get Started](https://pytorch.org/get-started/locally/) sayfasına gidin.
2.  Kurulum seçeneklerini belirleyin:
    * **PyTorch Build:** Stable (Kararlı)
    * **Your OS:** Windows
    * **Package:** Conda
    * **Language:** Python
3.  **Compute Platform** başlığı altındaki seçeneklere bakın. Burada PyTorch'un desteklediği CUDA versiyonlarını göreceksiniz. Örneğin, `CUDA 11.8` ve `CUDA 12.1` gibi seçenekler olabilir.

Bu rehber için **CUDA 11.8**'i hedef olarak seçtiğimizi varsayalım. Siz bu adımdaki listeden kendinize uygun olanı seçin.

## Adım 2: NVIDIA CUDA Toolkit Kurulumu

Belirlediğimiz versiyonu NVIDIA'nın arşivinden indireceğiz.

1.  [NVIDIA CUDA Toolkit Arşivi](https://developer.nvidia.com/cuda-toolkit-archive) sayfasına gidin.
2.  Listeden, 1. Adım'da belirlediğiniz sürümü bulun (örneğin, **CUDA Toolkit 11.8.0**). Üzerine tıklayın.
3.  İşletim sisteminize uygun seçenekleri belirleyin:
    * **Operating System:** Windows
    * **Architecture:** x86_64
    * **Version:** 10 veya 11 (Windows sürümünüze göre)
    * **Installer Type:** exe (local)
4.  **Download** butonuna basarak kurulum dosyasını indirin.
5.  İndirilen `.exe` dosyasına çift tıklayarak kurulumu başlatın.
    * **Express (Önerilen):** Tüm bileşenleri kurar. Yeni başlıyorsanız bu seçeneği kullanın.
    * **Custom:** Hangi bileşenleri kuracağınızı seçmenize olanak tanır.
6.  Kurulum tamamlandıktan sonra, kurulumun başarılı olup olmadığını kontrol etmek için bir Komut İstemi (CMD) veya Anaconda Prompt açın ve şu komutu yazın:

    ```bash
    nvcc --version
    ```

    Eğer `Cuda compilation tools, release 11.8...` gibi bir çıktı alıyorsanız, CUDA Toolkit başarıyla kurulmuştur.

## Adım 3: NVIDIA cuDNN Kurulumu ve Dosyaları Taşıma

cuDNN, derin sinir ağları için CUDA üzerinde çalışan, performansı artıran bir kütüphanedir. Kurulumu manuel olarak dosya kopyalama ile yapılır.

1.  [NVIDIA cuDNN Arşivi](https://developer.nvidia.com/rdp/cudnn-archive) sayfasına gidin. (NVIDIA geliştirici hesabı ile giriş yapmanız gerekebilir.)
2.  Listeden, **kurduğunuz CUDA sürümüyle uyumlu olan cuDNN versiyonunu** bulun. Örneğin, "Download cuDNN v8.9.7 (December 5th, 2023), for CUDA 11.x".
3.  Açılan listeden **"Local Installer for Windows (Zip)"** seçeneğini bularak `.zip` dosyasını indirin.
4.  İndirdiğiniz `.zip` dosyasını bir klasöre çıkartın. İçinde `bin`, `include` ve `lib` adında klasörler göreceksiniz.
5.  Şimdi bu dosyaları, 2. Adım'da kurduğumuz CUDA Toolkit klasörünün içine kopyalayacağız. CUDA'nın varsayılan kurulum dizini şöyledir:
    `C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.8`

6.  Aşağıdaki kopyalama işlemlerini dikkatlice yapın:
    * İndirdiğiniz cuDNN klasöründeki **`bin`** içindeki dosyaları, CUDA'nın **`bin`** klasörüne kopyalayın.
        * **Kaynak:** `cudnn-windows-x86_64-8.x.x.x_cuda11\\bin\\cudnn*.dll`
        * **Hedef:** `C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.8\\bin`

    * İndirdiğiniz cuDNN klasöründeki **`include`** içindeki dosyaları, CUDA'nın **`include`** klasörüne kopyalayın.
        * **Kaynak:** `cudnn-windows-x86_64-8.x.x.x_cuda11\\include\\cudnn*.h`
        * **Hedef:** `C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.8\\include`

    * İndirdiğiniz cuDNN klasöründeki **`lib`** içindeki` dosyalarını, CUDA'nın **`lib\\x64`** klasörüne kopyalayın.
        * **Kaynak:** `cudnn-windows-x86_64-8.x.x.x_cuda11\\lib\\cudnn*.lib`
        * **Hedef:** `C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.8\\lib\\x64`

Bu adımla birlikte cuDNN kurulumu tamamlanmıştır.

## Adım 4: PyTorch'u CUDA Desteği ile Kurma

Artık her şey hazır olduğuna göre, PyTorch'u kurabiliriz.

1.  Temiz bir başlangıç için yeni bir conda ortamı oluşturmanızı öneririm:
    ```bash
    conda create --name pytorch-gpu python=3.10
    conda activate pytorch-gpu
    ```

2.  [PyTorch Get Started](https://pytorch.org/get-started/locally/) sayfasına geri dönün.

3.  1. Adım'da yaptığınız seçimlere göre sayfanın en altında oluşan **"Run this Command"** bölümündeki komutu kopyalayın. CUDA 11.8 için bu komut şuna benzer olacaktır:
    ```bash
    conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
    ```

4.  Kopyaladığınız bu komutu, aktif ettiğiniz Anaconda Prompt penceresine yapıştırın ve çalıştırın. Kurulumun tamamlanmasını bekleyin.

## Adım 5: Kurulumu Test Etme

Her şeyin yolunda gidip gitmediğini kontrol etmenin en heyecanlı kısmı!

1.  Aynı terminal penceresinde `python` yazarak Python yorumlayıcısını başlatın.
2.  Aşağıdaki komutları sırayla girin:

    ```python
    import torch

    # 1. CUDA'nın kullanılabilir olup olmadığını kontrol et
    cuda_available = torch.cuda.is_available()
    print(f"CUDA kullanılabilir mi? -> {cuda_available}")

    # 2. Eğer kullanılabilirse, GPU sayısını kontrol et
    if cuda_available:
        gpu_count = torch.cuda.device_count()
        print(f"Bulunan GPU sayısı: {gpu_count}")

    # 3. İlk GPU'nun adını yazdır
        gpu_name = torch.cuda.get_device_name(0)
        print(f"GPU Modeli: {gpu_name}")
    ```

Eğer çıktınız aşağıdaki gibi ise, tebrikler! Kurulumu başarıyla tamamladınız.

```
CUDA kullanılabilir mi? -> True
Bulunan GPU sayısı: 1
GPU Modeli: NVIDIA GeForce RTX 3080
```

Eğer `CUDA kullanılabilir mi? -> False` çıktısı alıyorsanız, versiyon uyumsuzluklarını veya dosya kopyalama adımlarını tekrar gözden geçirmeniz gerekir.

Artık derin öğrenme modellerinizi GPU'nuzun tüm hızıyla eğitmeye hazırsınız!
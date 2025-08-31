# Docker ile GPU Destekli Ollama Kurulumu

Büyük dil modellerini (LLM) yerel makinenizde çalıştırmak, hem veri gizliliği hem de esneklik açısından büyük avantajlar sunar. Ollama, bu süreci inanılmaz derecede basitleştiren bir araçtır. Docker ise, Ollama'yı ve modellerini izole, temiz ve taşınabilir bir ortamda çalıştırmamızı sağlar.

Bu yazımda Windows işletim sisteminde, NVIDIA ekran kartınızın (GPU) gücünden faydalanarak Docker üzerinde Ollama'yı nasıl kurup çalıştıracağınızı adım adım göstereceğim.

## Ön Gereksinimler

Başlamadan önce sisteminizin aşağıdaki gereksinimleri karşıladığından emin olun:

1. **NVIDIA Ekran Kartı:** CUDA destekli, en az 8 GB VRAM'e sahip bir NVIDIA GPU.

2. **Güncel NVIDIA Sürücüsü:** [NVIDIA Sürücü İndirme](https://www.nvidia.com.tr/Download/index.aspx?lang=tr) sayfasından ekran kartınıza en uygun güncel sürücüyü kurun. Bu adım, GPU'nun Docker tarafından tanınması için kritik öneme sahiptir.

3. **Windows 10/11:** 64-bit Pro, Enterprise veya Education sürümü. (Windows Home da WSL 2 ile çalışır).

4. **BIOS'ta Sanallaştırma:** Donanım sanallaştırma özelliğinin bilgisayarınızın BIOS/UEFI ayarlarından aktif edilmiş olması gerekir.

## Adım 1: WSL 2 ve Docker Desktop Kurulumu

Modern Docker Desktop, Windows'ta en iyi performansı **WSL 2 (Windows Subsystem for Linux)** ile verir. GPU desteği için de WSL 2 zorunludur.

1. **WSL 2'yi Yükleyin:**
   Yönetici olarak bir PowerShell veya Komut İstemi (CMD) penceresi açın ve aşağıdaki komutu çalıştırın. Bu komut, WSL 2 ve varsayılan Ubuntu dağıtımını sizin için kuracaktır.

   ```
   wsl --install
   ```

   Kurulumdan sonra bilgisayarınızı yeniden başlatmanız istenebilir.

2. **Docker Desktop'ı İndirin ve Kurun:**

   * [Docker Desktop'ın resmi web sitesine](https://www.docker.com/products/docker-desktop/) gidin ve kurulum dosyasını indirin.

   * İndirilen `.exe` dosyasına çift tıklayarak kurulumu başlatın.

   * Kurulum sırasında **"Use WSL 2 instead of Hyper-V (recommended)"** seçeneğinin işaretli olduğundan emin olun ve kurulumu tamamlayın.

   * Kurulum bittikten sonra Docker Desktop'ı başlatın.

3. **Docker'ın WSL 2 kullandığını doğrulayın:**

   * Docker Desktop ayarlarını açın (`Settings` > `General`).

   * **"Use the WSL 2 based engine"** seçeneğinin aktif olduğunu kontrol edin.

## Adım 2: NVIDIA GPU Desteğini Doğrulama

Eğer en güncel NVIDIA sürücülerini kurduysanız, WSL 2'nin GPU'nuzu otomatik olarak tanıması gerekir. Bunu doğrulayalım.

1. Bir PowerShell veya CMD penceresi açın.

2. Aşağıdaki komutla WSL terminaline girin:

   ```
   wsl
   ```

3. WSL terminali içindeyken, `nvidia-smi` komutunu çalıştırın:

   ```
   nvidia-smi
   ```

   Eğer ekran kartı bilgilerinizi, sürücü versiyonunu ve CUDA versiyonunu gösteren bir tablo görüyorsanız, her şey yolunda demektir. GPU'nuz, Docker konteynerleri tarafından kullanılmaya hazır!

## Adım 3: Docker'da Ollama'yı Çalıştırma

Artık Ollama'yı bir Docker konteyneri olarak, GPU erişimiyle birlikte çalıştırabiliriz.

1. Bir PowerShell veya CMD penceresi açın. Docker Desktop'ın arka planda çalıştığından emin olun.

2. Aşağıdaki komutu çalıştırarak Ollama konteynerini başlatın:

   ```
   docker run -d --gpus all -v ollama:/root/.ollama -p 11434:11434 --name ollama-gpu ollama/ollama
   ```

   Bu komutun ne anlama geldiğini inceleyelim:

   * `-d`: Konteyneri arka planda (detached mode) çalıştırır.

   * `--gpus all`: **En önemli kısım!** Bu bayrak, konteynere sistemdeki tüm NVIDIA GPU'larına erişim izni verir.

   * `-v ollama:/root/.ollama`: İndirilen LLM'lerin konteyner silinse bile kaybolmaması için bir Docker "volume" oluşturur. `ollama` adında bir volume oluşturup bunu konteynerin `/root/.ollama` dizinine bağlar.

   * `-p 11434:11434`: Yerel makinenizin 11434 portunu, konteynerin 11434 portuna yönlendirir. Bu, Ollama API'sine dışarıdan erişim için gereklidir.

   * `--name ollama-gpu`: Konteynere kolayca hatırlanabilir bir isim verir.

   * `ollama/ollama`: Çalıştırılacak olan resmi Ollama imajıdır.

## Adım 4: Kurulumu Test Etme ve İlk Modeli Çalıştırma

Her şeyin doğru çalıştığından emin olalım.

1. **Konteynerin Loglarını Kontrol Edin:**
   Ollama'nın GPU'yu tanıyıp tanımadığını görmek için konteynerin loglarına bakalım.

   ```
   docker logs ollama-gpu
   ```

   Logların içinde `nvidia` veya `cuda` ile ilgili satırlar görüyorsanız (örneğin, NVIDIA kütüphanelerinin yüklendiğine dair bir mesaj), bu GPU'nun başarıyla tanındığı anlamına gelir.

2. **İlk LLM'inizi Çalıştırın:**
   Şimdi konteynerin içinde interaktif bir komut çalıştırarak popüler bir model olan `Llama 3`'ü indirelim ve çalıştıralım.

   ```
   docker exec -it ollama-gpu ollama run llama3
   ```

   * `docker exec -it ollama-gpu`: `ollama-gpu` adlı konteynerin içinde interaktif bir terminal oturumu başlatır.

   * `ollama run llama3`: Ollama'ya `llama3` modelini çalıştırmasını söyler.

   İlk çalıştırmada modelin katmanları indirilecektir. İndirme bittikten sonra, `>>>` istemini göreceksiniz. Artık modelle sohbet edebilirsiniz!

   GPU'nuzun çalıştığını, modelin cevaplarının ne kadar hızlı geldiğinden de anlayabilirsiniz.

Artık Windows makinenizde, Docker'ın sağladığı izolasyon ve taşınabilirlik avantajlarıyla birlikte, GPU hızlandırmalı bir Ollama servisi çalışıyor. Bu kurulum sayesinde, farklı büyük dil modellerini kolayca indirip test edebilir, API aracılığıyla kendi uygulamalarınıza entegre edebilir ve yerel yapay zeka geliştirmenin keyfini çıkarabilirsiniz.
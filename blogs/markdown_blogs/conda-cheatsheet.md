# Conda Komutları

Bu blogta, en sık kullanılan `conda` komutlarını tek bir yerde toplayarak size bir "kopya kağıdı" sundum. İhtiyacınız olan komutu hızla bulup kopyalayarak terminalinizde kullanabilirsiniz.

## Ortam (Environment) Yönetimi

### Yeni Bir Ortam Oluşturma

Sadece ortam oluşturur
```bash
conda create --name myenv
```

Belirli bir Python sürümü ile oluşturur (en yaygın kullanım)
```bash
conda create --name myenv python=3.9
```
Ortamı oluştururken istediğiniz paketleri de yükler
```bash
conda create --name myenv python=3.9 numpy pandas jupyter
```

*(**İpucu:** `--name` yerine daha kısa olan `-n` kullanabilirsiniz.)*

### Ortamı Aktif Hale Getirme

```bash
conda activate myenv
```

*(Terminal satırınızın başında `(myenv)` ifadesini göreceksiniz.)*

### Ortamı Devre Dışı Bırakma

Aktif ortamdan çıkıp temel (base) ortama dönmek için kullanılır.

```bash
conda deactivate
```

### Ortamları Listeleme

Sisteminizdeki tüm `conda` ortamlarını listeler. Aktif olan yıldız `(*)` ile işaretlenir.

```bash
conda env list
```

### Bir Ortamı Klonlama (Kopyalama)

Mevcut bir ortamın birebir kopyasını yeni bir isimle oluşturmak için kullanışlıdır.

```bash
conda create --name newenv --clone oldenv
```

### Bir Ortamı Silme

Artık ihtiyaç duymadığınız bir ortamı tüm paketleriyle birlikte siler.

```bash
conda env remove --name myenv
```

*(**Dikkat:** Bu işlem geri alınamaz!)*

---

## Paket (Package) Yönetimi

Ortamınızı oluşturduktan sonra ihtiyacınız olan kütüphaneleri yönetmeye başlayabilirsiniz. Bu komutlar, **aktif olan ortam** üzerinde işlem yapar.

### Paket Arama

Bir paketin `conda` kanallarında mevcut olup olmadığını ve hangi sürümlerinin olduğunu kontrol eder.

```bash
conda search "tensorflow"
```

### Paket Yükleme

Aktif ortama yeni bir veya birden fazla paket yükler.

Tek bir paket yükleme
```bash
conda install numpy
```

Birden fazla paket yükleme
```bash
conda install pandas matplotlib scikit-learn
```

### Belirli Bir Sürümü Yükleme

Bir paketin spesifik bir sürümünü yüklemek için kullanılır.

```bash
conda install numpy=1.21.5
```

### Farklı Kanaldan Paket Yükleme (conda-forge)

Bazı paketler varsayılan kanalda bulunmaz. `conda-forge` en popüler alternatif kanaldır.

```bash
conda install --channel conda-forge beautifulsoup4
```

*(**İpucu:** `--channel` yerine daha kısa olan `-c` kullanabilirsiniz.)*

### Yüklü Paketleri Listeleme

Mevcut aktif ortamdaki tüm paketleri ve sürümlerini listeler.

```bash
conda list
```

### Paketleri Güncelleme

Belirli bir paketi en son sürümüne günceller
```bash
conda update pandas
```

Ortamdaki tüm paketleri günceller (dikkatli kullanın)
```bash
conda update --all
```

### Paket Silme

Aktif ortamdan bir veya birden fazla paketi kaldırır.

```bash
conda remove numpy
```

---

## Ortamları Paylaşma ve Yedekleme (Export/Import)

Projelerinizi başka geliştiricilerle paylaşmanın veya farklı bir makineye taşımanın en iyi yolu `environment.yml` dosyası kullanmaktır.

### Ortamı Dosyaya Aktarma (`.yml`)

Aktif ortamın tüm paket listesini `environment.yml` adında bir dosyaya yazar.

```bash
conda env export > environment.yml
```

### Dosyadan Ortam Oluşturma (`.yml`)

Bir `environment.yml` dosyasını kullanarak ortamı tüm paketleriyle birlikte sıfırdan oluşturur.

```bash
conda env create -f environment.yml
```

*(Bu komut, `.yml` dosyasında belirtilen isimle yeni bir ortam oluşturur.)*

---

## Conda'yı Yönetme ve Temizleme

### Conda Bilgilerini Gösterme

Conda kurulumu, aktif ortam, Python sürümü gibi genel bilgileri gösterir.

```bash
conda info
```

### Conda Sürümünü Kontrol Etme

```bash
conda --version
```

### Conda'yı Güncelleme

`conda`'nın kendisini en son sürüme günceller.

```bash
conda update -n base -c defaults conda
```

### Gereksiz Paketleri ve Önbelleği Temizleme

Zamanla biriken ve artık kullanılmayan paketleri ve önbelleği silerek diskte yer açar.

```bash
conda clean --all
```

Bu rehberi sık kullanılanlara ekleyerek `conda` komutlarına her zaman hızlıca ulaşabilirsiniz. İyi kodlamalar!
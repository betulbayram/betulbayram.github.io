# Docker Komutları

Docker, uygulamaları ve bağımlılıklarını "konteyner" adı verilen izole ortamlarda paketleyip çalıştırmanızı sağlayan bir platformdur.

## Konteyner Yaşam Döngüsü Yönetimi

Konteynerleri başlatma, durdurma ve yönetme ile ilgili temel komutlar.

### Konteyner Çalıştırma

Bir imajdan yeni bir konteyner oluşturur ve çalıştırır:
```bash
docker run [İMAJ_ADI]
```

Arka planda (`-d`), port yönlendirmesi (`-p`) ve isim (`--name`) vererek çalıştırma:
```bash
docker run -d -p 8080:80 --name web-sunucum nginx
```

İnteraktif bir terminal (`-it`) ile çalıştırma (örneğin bir shell'e bağlanmak için):
```bash
docker run -it ubuntu bash
```

GPU desteğiyle (`--gpus all`) çalıştırma (NVIDIA Docker gerektirir):
```bash
docker run -d --gpus all --name ollama-gpu ollama/ollama
```

### Konteynerleri Başlatma, Durdurma ve Yeniden Başlatma

Durmuş bir konteyneri başlatır:
```bash
docker start [KONTEYNER_ID_VEYA_ADI]
```

Çalışan bir konteyneri durdurur:
```bash
docker stop [KONTEYNER_ID_VEYA_ADI]
```

Çalışan bir konteyneri yeniden başlatır:
```bash
docker restart [KONTEYNER_ID_VEYA_ADI]
```

### Konteyner Silme

Durmuş bir konteyneri siler:
```bash
docker rm [KONTEYNER_ID_VEYA_ADI]
```

Çalışan bir konteyneri zorla durdurup siler (`-f` force):
```bash
docker rm -f [KONTEYNER_ID_VEYA_ADI]
```

## Bilgi Alma ve İnceleme

Çalışan konteynerler, imajlar ve sistem hakkında bilgi almak için kullanılır.

### Konteynerleri Listeleme

Sadece çalışan konteynerleri listeler:
```bash
docker ps
```

Çalışan ve durmuş olan tüm konteynerleri listeler:
```bash
docker ps -a
```

### Konteyner Loglarını Görme

Bir konteynerin loglarını (çıktılarını) gösterir:
```bash
docker logs [KONTEYNER_ID_VEYA_ADI]
```

Logları canlı olarak takip eder (`-f` follow):
```bash
docker logs -f [KONTEYNER_ID_VEYA_ADI]
```

### Konteyner İçinde Komut Çalıştırma

Çalışan bir konteynerin içinde yeni bir komut çalıştırır (örneğin shell'e girme):
```bash
docker exec -it [KONTEYNER_ID_VEYA_ADI] bash
```

### Konteyner Detaylarını İnceleme

Bir konteynerin IP adresi, portları gibi tüm detaylı bilgilerini JSON formatında gösterir:
```bash
docker inspect [KONTEYNER_ID_VEYA_ADI]
```

## İmaj Yönetimi

Konteynerleri oluşturmak için kullanılan şablonlar olan imajları yönetme komutları.

### İmajları Listeleme

Sistemdeki tüm Docker imajlarını listeler:
```bash
docker images
```

### İmaj İndirme (Pull)

Docker Hub veya başka bir registry'den bir imaj indirir:
```bash
docker pull ubuntu:22.04
```

### İmaj Oluşturma (Build)

Mevcut dizindeki Dockerfile'dan bir imaj oluşturur (`-t` tag/isim vermek için):
```bash
docker build -t benim-uygulamam:1.0 .
```

### İmaj Silme

Sistemdeki bir imajı siler:
```bash
docker rmi [İMAJ_ID_VEYA_ADI]
```

Bir veya daha fazla konteyner tarafından kullanılan bir imajı zorla siler (`-f` force):
```bash
docker rmi -f [İMAJ_ID_VEYA_ADI]
```

## Sistem ve Temizlik

Docker sistemini yönetmek ve gereksiz dosyaları temizlemek için kullanılır.

### Gereksiz Kaynakları Temizleme

Durmuş tüm konteynerleri, kullanılmayan network'leri ve dangling imajları siler:
```bash
docker system prune
```

Yukarıdakilere ek olarak, hiçbir konteyner tarafından kullanılmayan tüm imajları da siler (`-a` all):
```bash
docker system prune -a
```

Kullanılmayan volume'leri de temizler:
```bash
docker system prune --volumes
```
*(**Uyarı:** Bu komutlar geri alınamaz, dikkatli kullanın!)*

### Docker Disk Kullanımını Görme

İmajların, konteynerlerin ve volume'lerin ne kadar disk alanı kullandığını gösterir:
```bash
docker system df
```

## Docker Compose Komutları

Birden fazla konteynerden oluşan uygulamaları yönetmek için kullanılır. Bu komutlar, `docker-compose.yml` dosyasının bulunduğu dizinde çalıştırılmalıdır.

### Uygulamayı Başlatma

`docker-compose.yml` dosyasındaki servisleri oluşturur ve başlatır (arka planda `-d`):
```bash
docker-compose up -d
```

İmajları yeniden build ederek başlatır:
```bash
docker-compose up -d --build
```

### Uygulamayı Durdurma

Servislere ait konteynerleri durdurur ve siler. Varsayılan olarak volume'ler silinmez.
```bash
docker-compose down
```

Konteynerlerle birlikte volume'leri de siler:
```bash
docker-compose down --volumes
```

### Servisleri Listeleme ve Logları Görme

Compose ile çalışan servisleri (konteynerleri) listeler:
```bash
docker-compose ps
```

Tüm servislerin loglarını gösterir ve canlı takip eder:
```bash
docker-compose logs -f
```

Sadece belirli bir servisin loglarını gösterir:
```bash
docker-compose logs -f [SERVİS_ADI]
```
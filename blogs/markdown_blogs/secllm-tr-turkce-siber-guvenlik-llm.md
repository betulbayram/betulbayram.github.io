# SecLLM-TR: Türkçe Siber Güvenlik için Bir LLM'i Fine-Tune Ettim

Genel amaçlı büyük dil modelleri (LLM) etkileyici, ama iki noktada zorlanıyorlar: **dar alan bilgisi** ve **Türkçe teknik içerik**. Bir CVE zafiyetini Türkçe, doğru terminolojiyle analiz etmesini istediğinizde ya İngilizceye kaçıyorlar ya da yüzeysel kalıyorlar. Oysa siber güvenlik ekipleri raporlarını, olay kayıtlarını ve analizlerini Türkçe üretmek zorunda.

Bu boşluğu kapatmak için **SecLLM-TR**'yi eğittim: Mistral 7B üzerine **QLoRA** ile fine-tune edilmiş, siber güvenliğe özelleşmiş Türkçe bir dil modeli. Bu yazıda projeyi baştan sona nasıl inşa ettiğimi anlatıyorum — veri toplamadan tek GPU'da eğitime, oradan Hugging Face'te canlı demoya kadar.

> 🚀 Canlı demo: [huggingface.co/spaces/betulbayram/SecLLMTR](https://huggingface.co/spaces/betulbayram/SecLLMTR) · 🤗 Model: [betulbayram/secllm-tr-mistral-7b-qlora](https://huggingface.co/betulbayram/secllm-tr-mistral-7b-qlora)

---

## 1. Neden Türkçe Bir Siber Güvenlik LLM'i?

Siber güvenlik, hata payının düşük olduğu bir alan. Bir modelin "yaklaşık doğru" cevabı yeterli değil; CVSS skorunu, saldırı vektörünü ve önerilen aksiyonu doğru vermesi gerekiyor. Türkiye'deki kurumlar için buna bir de **dil** ve **veri egemenliği** boyutu ekleniyor: hassas güvenlik verisini dış servislere göndermeden, kendi donanımında çalışan bir model.

SecLLM-TR dört yeteneğe odaklanıyor:

1. **Zafiyet Analizi** — CVE açıklamasından Türkçe risk analizi
2. **Rapor Üretimi** — teknik bulgulardan profesyonel güvenlik raporu
3. **Güvenlik QA** — ağ, web, kriptografi, olay müdahale sorularına yanıt
4. **Log Sınıflandırma** — güvenlik loglarını kategorize etme

---

## 2. Veri: En Zor Kısım

Bir fine-tune projesinin kalitesi, verisinin kalitesi kadardır. Hazır bir "Türkçe siber güvenlik instruction" seti olmadığı için kendim ürettim. Üç kaynağı birleştirdim:

- **CVE / NVD** — NVD API 2.0'dan yüksek/kritik zafiyetler (id, açıklama, CVSS, CWE).
- **MITRE ATT&CK** — resmi STIX bundle'dan Enterprise teknikleri (taktik, platform, tespit).
- **Sentetik Türkçe analiz** — bu olgusal veriler üzerine Türkçe uzman yorumu.

Kritik tasarım kararı şuydu: **olgusal veriyi kaynaktan deterministik aldım, LLM'e yalnızca Türkçe analiz metnini yazdırdım.** Böylece model, uydurma CVE numarası veya CVSS skoru öğrenmek yerine gerçek verilere dayalı analiz üretmeyi öğrendi — halüsinasyonu baştan azaltan bir yaklaşım.

Sentetik üretimi **Ollama Cloud** (`gpt-oss:120b`) ile yaptım. Ücretsiz katman büyük hacimde limite takılınca, birden fazla API anahtarı arasında otomatik geçiş yapan bir **key rotasyonu** ekledim: bir anahtar 429 verince sıradakine geçiliyor, checkpoint'ler korunuyor.

Sonuç: temizlenmiş ve `train/val/test` olarak bölünmüş **1.339 instruction-response çifti** (543 MITRE, 360 CVE, 304 QA). Her örnek chat formatında, ortalama ~7.000 karakterlik zengin yanıtlar.

---

## 3. Fine-Tuning: QLoRA ile Tek GPU'da

7 milyar parametreli bir modeli sıfırdan eğitmek imkânsız; ama **QLoRA** ile tek bir RTX 3090 (24GB) yeter. QLoRA'nın fikri basit: modeli **4-bit** kuantize et (bellek ~4 kat düşer), ağırlıkları dondur, ve araya küçük eğitilebilir **LoRA adaptörleri** ekle. Böylece 7B modelin sadece ~%1'i eğitilir.

Kullandığım ana konfigürasyon:

```yaml
base_model: mistralai/Mistral-7B-Instruct-v0.3
quantization: 4bit (NF4) + bfloat16 compute
lora: { r: 64, alpha: 128, dropout: 0.05 }
epochs: 3, effective_batch: 16, lr: 2e-4 (cosine)
```

Eğitim `transformers` + `peft` + `trl` (SFTTrainer) ile döndü. RTX 3090'da GPU %100, ~18.5GB VRAM, adım başına ~40 saniye — toplam **~2.7 saat**. Eğitim boyunca loss düzenli düştü:

| Epoch | Train Loss | Validation Loss |
|-------|-----------|-----------------|
| 0 | 1.17 | — |
| 1 | 0.69 | 0.70 |
| 2 | 0.44 | 0.67 |
| 3 | 0.23 | — |

Validation loss'un epoch 2'ye kadar düşmesi (0.74 → 0.67), modelin ezberlemeyip genellediğini gösterdi. Küçük bir Windows detayı: `torch`'un CUDA build'i, `bitsandbytes` uyumu ve TensorFlow/Keras çakışmaları (`USE_TF=0`) gibi tuzaklar vakit aldı — hepsini eğitim kılavuzuna not ettim.

---

## 4. Evaluation: Base vs Fine-Tuned

Bir modelin "daha iyi" olduğunu iddia etmek yetmez, ölçmek gerekir. Test setinde base Mistral 7B ile fine-tuned SecLLM-TR'yi karşılaştırdım:

| Metrik | Base Mistral 7B | SecLLM-TR | Δ |
|--------|:---:|:---:|:---:|
| ROUGE-L | 0.097 | 0.107 | +0.01 |
| BLEU | 0.00 | 0.21 | **+0.21** |

En belirgin kazanım **BLEU 0.00 → 0.21**: base model hedef Türkçe uzman formatından uzakken, fine-tuned model bu stili ve yapıyı öğrenmiş. Dürüst olmak gerekirse, otomatik metrikler (tek referansa karşı) açık uçlu üretimde düşük ve gürültülüdür — asıl fark **niteliksel**: format tutarlılığı, doğru terminoloji, tablo yapılı analizler. Bunu demoda görmek, sayılardan daha ikna edici.

Örneğin Log4Shell (CVE-2021-44228) için model şöyle bir çıktı üretiyor:

```
CVE‑2021‑44228 – Log4Shell (Apache Log4j2 JNDI RCE)
■ Risk Seviyesi: 10.0 / KRİTİK
■ Sömürülebilirlik: Ağ üzerinden, kimlik doğrulama gerektirmeden RCE
■ Zafiyet Türü: JNDI sorgu doğrulaması eksikliği (RCE)
■ Önerilen Aksiyon: Log4j2'yi güncelle, JNDI lookup'ı devre dışı bırak...
```

---

## 5. Yayın: Hugging Face + ZeroGPU Canlı Demo

Model bir işe yaramalı, o yüzden kullanılabilir olmalı. LoRA adaptörünü **Hugging Face Hub**'a yükledim ve **Gradio** ile dört sekmeli interaktif bir demo yazdım (CVE analizi, log sınıflandırma, serbest soru, rapor üretimi).

Demoyu ücretsiz çalıştırmak için Hugging Face **ZeroGPU**'yu kullandım — ama birkaç engel vardı:

- **ZeroGPU'da global scope'ta fiziksel GPU yok**, sadece `@spaces.GPU` fonksiyonu içinde var. Adaptörü doğrudan CUDA'ya yüklemeye çalışınca "No CUDA GPUs available" hatası aldım. Çözüm: modeli CPU'da yükle, sonra `.to("cuda")` çağır (kütüphane bunu GPU bağlanınca uygular).
- ZeroGPU güçlü bir GPU (H200) verdiği için **4-bit'e gerek kalmadı**; modeli doğrudan bf16 yükleyerek bitsandbytes/ZeroGPU uyumsuzluklarını tamamen atladım.

Sonuç: kimsenin kurulum yapmadan tarayıcıdan deneyebileceği, ücretsiz çalışan **canlı bir demo**. Repo ayrıca FastAPI endpoint'i, Ollama Modelfile ve Docker ile geliyor.

---

## 6. Neler Öğrendim?

- **Veri > her şey.** Modelin kalitesini en çok belirleyen şey mimarî değil, verinin kalitesi ve grounding stratejisi oldu.
- **Otomatik metrikler eksik anlatır.** Domain fine-tune'unun asıl değeri, tek bir BLEU skorunda değil, çıktının tutarlılığında ve kullanılabilirliğinde.
- **Deploy, eğitimden zor olabilir.** ZeroGPU'da çalıştırmak, eğitmekten daha çok hata ayıklama gerektirdi — ama kullanıcıya dokunan kısım burası.

---

## 7. Linkler ve Sonraki Adımlar

SecLLM-TR açık kaynak (Apache 2.0). Model, dataset kartı, eğitim kılavuzu ve tüm kod paylaşımda:

- 🚀 **Canlı Demo:** [huggingface.co/spaces/betulbayram/SecLLMTR](https://huggingface.co/spaces/betulbayram/SecLLMTR)
- 🤗 **Model:** [betulbayram/secllm-tr-mistral-7b-qlora](https://huggingface.co/betulbayram/secllm-tr-mistral-7b-qlora)

Bu bir başlangıç sürümü; dataset'i büyütmek, farklı base modellerle kıyaslamak ve bir Türkçe siber güvenlik benchmark'ı yayınlamak gibi fikirler üzerinde çalışmaya devam ediyorum. Denersen geri bildirimlerini duymayı çok isterim! 🛡️🇹🇷

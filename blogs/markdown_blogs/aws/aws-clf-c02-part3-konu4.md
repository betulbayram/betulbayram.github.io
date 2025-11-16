## Konu 4: Security Groups - EC2 Sunucunuzun Sanal Güvenlik Duvarı
Önceki konularda EC2 sunucumuzun donanımını ve depolamasını yapılandırdık. Şimdi ise onun dijital dünyadaki kapılarını ve pencerelerini, yani ağ güvenliğini yöneteceğiz. İşte bu noktada **Security Groups (Güvenlik Grupları)** devreye giriyor.

### 1. Security Group Nedir ve Nasıl Çalışır?

#### Sanal Bir Güvenlik Duvarı Gibi Davranmak (Acting as a Firewall)
Bir Security Group, EC2 sunucunuz için sanal bir güvenlik duvarı görevi görür. Sunucuya hangi tür trafiğin girebileceğini (**Inbound Rules**) ve sunucudan hangi tür trafiğin çıkabileceğini (**Outbound Rules**) kontrol eden bir kurallar listesidir. Bu kontrol, sunucunun sanal ağ kartı (ENI - Elastic Network Interface) seviyesinde gerçekleşir.

#### Trafik Akışı ve Kurallar
Hayal edin: İnternetten gelen bir istek (örneğin, bir kullanıcının web sitenize erişmeye çalışması) önce Security Group'un kapısını çalar. Security Group, bu isteğin özelliklerine (protokol, port, kaynak IP adresi) bakar ve "Gelen Kurallar" (Inbound Rules) listesini kontrol eder.
-   Eğer istekle eşleşen bir **"İzin Ver" (Allow)** kuralı varsa, trafik içeri alınır ve EC2 sunucusuna ulaşır.
-   Eğer eşleşen bir kural yoksa, trafik sessizce reddedilir (drop) ve sunucuya asla ulaşamaz.

### 2. Bilinmesi Gereken Önemli Özellikler (Good to Know)
-   **Sunucu Seviyesinde Çalışır (Instance Level):** Security Group, doğrudan bir veya daha fazla EC2 sunucusuna atanır.
-   **Sadece "İzin Ver" Kuralları (Allow Rules Only):** Security Group'ta "Yasakla" (Deny) kuralı oluşturamazsınız. Bir kural listesinde olmayan her şey, varsayılan olarak zaten yasaklanmıştır (Implicit Deny).
-   **Stateful (Durum Bilgili):** Bu, en önemli ve en çok karıştırılan özelliğidir. "Stateful" demek, bir isteğe izin verildiğinde, o isteğin cevabının da otomatik olarak geri dönmesine izin verildiği anlamına gelir.
    -   **Örnek:** Dışarıdan içeriye 80. porttan (HTTP) gelen bir isteğe izin veren bir Inbound kuralınız varsa, EC2 sunucunuzun bu isteğe verdiği cevabın dışarı çıkması için ayrıca bir Outbound kural yazmanıza **gerek yoktur**. Security Group, bu cevabın "ilk isteğin devamı" olduğunu anlar ve otomatik olarak izin verir.
-   **Esnek Atama:** Bir Security Group birden fazla EC2 sunucusuna atanabilir. Aynı şekilde, bir EC2 sunucusuna da birden fazla Security Group atanabilir.
-   **Anında Değişiklik:** Bir Security Group'ta yaptığınız kural değişikliği (örn: yeni bir port açmak), anında geçerli olur. Sunucuyu yeniden başlatmanıza gerek yoktur.
-   **Kaynak (Source) Belirleme:** Bir kural oluştururken, trafiğin kaynağını bir IP adresi aralığı (örn: `0.0.0.0/0` - internetteki herkes) veya başka bir Security Group'un ID'si olarak belirleyebilirsiniz. Bu, aynı VPC içindeki farklı sunucu gruplarının (örn: web sunucuları ve veritabanı sunucuları) birbirleriyle güvenli bir şekilde konuşmasını sağlar.

### 3. Klasik Port Numaraları ve Protokoller
Bir Security Group yapılandırırken sıkça karşılaşacağınız standart portlar şunlardır:

| Port | Protokol | Servis Adı | Açıklama |
| :--- | :--- | :--- | :--- |
| **22** | TCP | SSH (Secure Shell) | Linux ve macOS sunucularına güvenli komut satırı erişimi. |
| **3389** | TCP | RDP (Remote Desktop) | Windows sunucularına grafik arayüz ile uzaktan masaüstü erişimi. |
| **80** | TCP | HTTP | Standart, şifrelenmemiş web trafiği. |
| **443** | TCP | HTTPS | Güvenli, şifrelenmiş (SSL/TLS) web trafiği. |

### 4. EC2 Sunucusuna SSH ile Bağlanma
Linux tabanlı bir EC2 sunucusunu yönetmenin standart yolu SSH kullanmaktır.

#### SSH Komut Özeti Tablosu:
| Parametre | Açıklama |
| :--- | :--- |
| `ssh` | Bağlantıyı başlatan komut. |
| `-i [anahtar.pem]` | Kimlik doğrulaması için kullanılacak özel anahtar (.pem) dosyasını belirtir. |
| `[kullanıcı]@[adres]` | **kullanıcı:** Sunucudaki kullanıcı adı (örn: `ec2-user`, `ubuntu`). **adres:** Sunucunun genel IP adresi veya DNS adı. |

#### Adım Adım Bağlantı:
1.  EC2 sunucusunu başlatırken bir anahtar çifti (key pair) seçin veya oluşturun ve `.pem` uzantılı özel anahtar dosyasını indirin.
2.  İndirdiğiniz `.pem` dosyasını güvenli bir dizine taşıyın.
3.  Terminali açın ve anahtar dosyasının izinlerini, sadece sizin okuyabileceğiniz şekilde kısıtlayın. Bu zorunlu bir adımdır!
    -   **Komut:** `chmod 400 sizin-anahtar-dosyaniz.pem`
4.  AWS Konsolu'ndan EC2 sunucunuzun **Genel IPv4 adresini (Public IPv4 address)** kopyalayın.
5.  Terminale aşağıdaki komutu, kendi bilgilerinizle doldurarak yazın ve çalıştırın:
    -   **Amazon Linux için:** `ssh -i "sizin-anahtar-dosyaniz.pem" ec2-user@[kopyalanan-IP-adresi]`
    -   **Ubuntu için:** `ssh -i "sizin-anahtar-dosyaniz.pem" ubuntu@[kopyalanan-IP-adresi]`

#### SSH Bağlantı Sorunları (Troubleshooting):
-   **Connection Timed Out (Bağlantı Zaman Aşımına Uğradı):** En sık karşılaşılan hatadır. Neredeyse her zaman Security Group ile ilgilidir. Sunucunuza atanan Security Group'un Inbound kurallarında, sizin IP adresinizden 22. porta (SSH) gelen TCP trafiğine izin verildiğinden emin olun.
-   **Permission Denied (publickey) (İzin Reddedildi):** Bu hata genellikle şu nedenlerden kaynaklanır:
    -   Yanlış kullanıcı adı kullanıyorsunuz (`ec2-user` yerine `ubuntu` denemeniz gerekebilir).
    -   Yanlış `.pem` anahtar dosyasını kullanıyorsunuz.
    -   Anahtar dosyasının izinlerini `chmod 400` komutuyla düzeltmediniz.
-   **Connection Refused (Bağlantı Reddedildi):** Sunucu çalışıyor olmayabilir veya sunucu içindeki SSH hizmeti (sshd) bir sorun yaşıyor olabilir.

### 5. EC2 Instance Connect
-   **Nedir?:** EC2 sunucularına SSH ile bağlanmanın daha modern, basit ve güvenli bir yoludur. AWS Yönetim Konsolu üzerinden, tarayıcı tabanlı bir terminal açarak bağlantı kurmanızı sağlar.
-   **Nasıl Çalışır?:** Instance Connect, siz bağlanmak istediğinizde geçici, tek kullanımlık bir SSH anahtarı oluşturur, bu anahtarı sunucuya güvenli bir şekilde gönderir, bağlantıyı kurar ve kısa bir süre sonra o anahtarı sunucudan siler.
-   **Avantajları:**
    -   Bilgisayarınızda kalıcı `.pem` dosyalarını saklamak ve yönetmek zorunda kalmazsınız.
    -   Security Group'ta 22. portu tüm internete (`0.0.0.0/0`) açmak yerine, sadece AWS'in belirlediği IP aralıklarına açabilirsiniz, bu da güvenliği artırır.
    -   Kimin ne zaman bağlandığı, IAM politikaları ve AWS CloudTrail logları üzerinden çok daha detaylı bir şekilde denetlenebilir.
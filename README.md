# 📖 Açık Kaynaklı Kur’an-ı Kerim Web Uygulaması

Kuran-ı Kerim’in dijital ortamda doğru, erişilebilir ve kullanıcı dostu bir şekilde sunulmasını amaçlayan açık kaynaklı bir web uygulaması projesidir.

Bu proje, **Diyanet İşleri Başkanlığı Strateji ve Geliştirme Başkanlığı Bilgi İşlem Daire Başkanlığı** (@diyanet-bid) koordinasyonunda, yazılım topluluklarının gönüllü katkılarıyla geliştirilmektedir. Amacımız, herkesin Allah’ın kelamına kolay, güvenli ve işlevsel biçimde ulaşabileceği, çağdaş yazılım standartlarına uygun ve zengin özelliklerle donatılmış bir dijital platform oluşturmaktır.

---

## 🎯 Projenin Amacı ve Motivasyonu

Açık Kaynaklı Kur’an-ı Kerim Web Uygulaması, Kur’an-ı Kerim’in dijital çağın imkânlarıyla daha geniş kitlelere **sahih**, **erişilebilir** ve **kullanıcı dostu** bir biçimde ulaştırılmasını amaçlamaktadır.

Bu kapsamda proje aşağıdaki temel hedefleri benimsemektedir:

- **Evrensel Erişim:** Herkesin, her yerden ve herhangi bir ücret ya da engelle karşılaşmaksızın Kur’an-ı Kerim’e web üzerinden kolayca ulaşabilmesini sağlamak.
- **Doğruluk ve Güvenilirlik:** Diyanet İşleri Başkanlığı Mushafları İnceleme ve Kıraat Kurulu tarafından onaylanmış metinler ile güvenilir kaynaklardan alınan tefsir ve mealleri esas almak.
- **Modern Kullanıcı Deneyimi:** Next.js 15+ ve Redux Toolkit gibi güncel web teknolojileriyle geliştirilen hızlı, sade, erişilebilir ve estetik bir kullanıcı arayüzü sunmak.
- **Katılımcı Gelişim:** Yazılım geliştiriciler, tasarımcılar ve Kur’an-ı Kerim ilimlerine hâkim gönüllü uzmanların katkılarıyla projeyi sürekli geliştirmek ve zenginleştirmek.
- **Açık Kaynak Felsefesi:** Şeffaflık, iş birliği ve bilgi paylaşımını esas alarak sürdürülebilir bir dijital hizmet modeli oluşturmak.

---

## ✨ Temel Özellikler (Başlangıç Fazı)

Açık Kaynaklı Kur’an-ı Kerim Web Uygulaması, başlangıç fazında aşağıdaki temel işlevleri sunmayı hedeflemektedir:

### 📘 Kur’an-ı Kerim Okuma

- Farklı hat seçenekleri (Mushaf-ı Şerif, Medine hattı vb.)
- Sayfa, cüz, sure ve ayet bazında esnek gezinme
- Gece/gündüz modu ve ayarlanabilir yazı tipi boyutları

### 📗 Meal ve Tefsir

- Diyanet İşleri Başkanlığı Meali ve güvenilir kaynaklardan mealler
- Seçilebilir tefsir içerikleri (ör. Diyanet Tefsiri)
- Aynı anda birden fazla meal veya tefsir görüntüleme

### 🎧 Sesli Kur’an Dinleme

- Tanınmış kârilerden farklı kıraat seçenekleri
- Ayet veya sure bazında sesli takip

### 🔍 Arama Fonksiyonu

- Kur’an metni, meal ve tefsirlerde temel düzeyde metin arama

### ⭐ Kişiselleştirme (Çerez Tabanlı)

- Yer imi (bookmark) ekleme
- Son okunan konumun kaydedilmesi
- Tema ve yazı tipi ayarlarının korunması

### ♿ Erişilebilirlik

- Web İçeriği Erişilebilirlik Yönergeleri (WCAG) doğrultusunda temel erişilebilirlik standartları

Bu özellikler sayesinde kullanıcılar Kur’an-ı Kerim’e dijital ortamda sahih, estetik ve kullanıcı merkezli bir şekilde erişebilecektir.

---

## 🛠️ Kullanılan Teknolojiler

Bu proje **tamamen frontend odaklı** bir web uygulaması olarak geliştirilmektedir:

- **Framework:** Next.js 15+ (App Router tercih edilebilir)
- **Durum Yönetimi:** Redux Toolkit
- **Programlama Dili:** TypeScript _(önerilir)_ / JavaScript
- **Stil:** Tailwind CSS / CSS Modules / Styled Components _(topluluk kararına göre)_
- **API Entegrasyonu:** `fetch` API veya `axios` (Kur’an API ile entegrasyon)
- **Linting & Formatting:** ESLint, Prettier
- **Versiyon Kontrol:** Git & GitHub
- **Paket Yöneticisi:** npm / yarn / pnpm

> **Not:** Bu proje başlangıç aşamasında bir backend veya veritabanı içermemektedir. Tüm veriler harici Kur’an API’den çekilir, kullanıcıya özel ayarlar çerezlerde saklanır.

---

## 🚀 Nasıl Başlarım?

Detaylı kurulum talimatları ve önkoşullar için lütfen `INSTALLATION.md` dosyasına göz atın. _(Oluşturulacak)_

---

## 🤝 Katkıda Bulunma

Bu proje hepimizin! Her türlü katkıya açığız ve minnettarız.

### 💡 Fikir ve Öneriler

- **Issues** bölümünde yeni bir konu açarak öneri ve hatalarınızı paylaşabilirsiniz.

### 🧑‍💻 Kod Katkısı

1. **Issues** sayfasından görev seçin veya yeni bir görev önerin.
2. Projeyi **fork’layın**.
3. Yeni bir branch oluşturun:
   ```git checkout -b feature/yeni-ozellik```
4. Değişikliklerinizi commit’leyin (anlamlı commit mesajları kullanın):
   ```feat: Ayetlere yer imi ekleme özelliği geliştirildi```
5. Branch’inizi push’layın:
   ```git push origin feature/yeni-ozellik```
6. Ana depoya bir **Pull Request (PR)** açın. PR’da yaptığınız değişiklikleri detaylıca açıklayın.

### 🎨 Tasarım Katkısı

- UI/UX tasarımı, ikon ve görseller için Figma, Adobe XD gibi araçlarla katkı sunabilirsiniz.

### 🧪 Test ve Geri Bildirim

- Uygulamayı farklı cihaz ve tarayıcılarda test ederek geri bildirim paylaşabilirsiniz.

Lütfen katkıda bulunmadan önce:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`

dosyalarını okuyun.

Amacımız **saygılı, yapıcı ve işbirlikçi** bir topluluk oluşturmaktır.

---

## 📬 İletişim ve Topluluk

Projeye katkı sağlamak veya geri bildirimde bulunmak için aşağıdaki kanalları kullanabilirsiniz:

- **GitHub Issues:** Hata bildirimi, özellik talepleri ve teknik tartışmalar
- **GitHub Discussions:** Genel sohbet ve duyurular _(aktif ise)_
- **API Bilgileri:** Kur’an API Dokümantasyonu
- **Diyanet Bilgi İşlem Daire Başkanlığı GitHub:** [@diyanet-bid](https://github.com/diyanet-bid)
- **Resmi İletişim:** community@diyanet.gov.tr

---

🙏 **Allah’ın kelamını daha geniş kitlelere ulaştırmak için katkınız çok değerli!**


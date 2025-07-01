# 🙌 Açık Kaynaklı Kur’an-ı Kerim Web Uygulamasına Katkıda Bulunma Rehberi

Öncelikle, Açık Kaynaklı Kur’an-ı Kerim Web Uygulaması projemize katkıda bulunmayı düşündüğünüz için teşekkür ederiz.  
Bu proje, **Diyanet İşleri Başkanlığı** öncülüğünde yürütülmekte olup, açık kaynak anlayışıyla daha güvenilir, erişilebilir ve kullanıcı dostu bir dijital Kur’an-ı Kerim deneyimi sunmayı hedeflemektedir.

Bu rehber, projeye nasıl katkı sağlayabileceğinize dair temel adımları ve katılım kurallarını açıklamaktadır.  
Lütfen aşağıdaki bilgileri dikkatlice inceleyiniz.

---

## 📜 Davranış Kuralları

Tüm katılımcıların, [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) belgesinde belirtilen ilkelere uyması beklenmektedir.  
Saygılı, yapıcı ve kapsayıcı bir topluluk ortamı oluşturmak hepimizin sorumluluğudur.

---

## ✨ Nasıl Katkıda Bulunabilirim?

Katkılarınız birçok farklı şekilde olabilir. Örnekler:

---

### 🐞 Hata Bildirimi _(Reporting Bugs)_

Uygulamada bir hata mı buldunuz?  
Lütfen **Issues** bölümünde detaylı bir rapor oluşturun.  
Raporunuzda şunları belirtmeye çalışın:

- Hatayı nasıl tekrarlayabileceğimiz (adım adım)
- Beklenen davranış
- Gerçekleşen davranış
- Kullandığınız tarayıcı ve işletim sistemi bilgileri
- Mümkünse ekran görüntüsü

---

### 💡 Özellik Önerileri _(Suggesting Enhancements)_

Uygulamaya eklenmesini istediğiniz yeni bir özellik veya mevcut bir özelliğin geliştirilmesi için fikriniz mi var?  
**Issues** bölümünde `feature request` etiketiyle bir konu açın.  
Fikrinizi ve neden faydalı olacağını düşündüğünüzü açıklayın.

---

### 💻 Kod Katkısı _(Code Contributions)_

En heyecan verici kısım!  
Eğer kod yazarak katkıda bulunmak isterseniz, aşağıdaki adımları izleyin (detaylı rehber aşağıda).

---

### 📝 Belgelendirme _(Documentation)_

README, kurulum rehberi veya kod içi yorumlar gibi belgelerin iyileştirilmesine yardımcı olabilirsiniz.

---

### 🎨 Tasarım _(Design)_

UI/UX konusunda önerileriniz veya Figma/XD gibi araçlarla hazırlanmış tasarımlarınız varsa paylaşabilirsiniz.

---

## 🧭 İlk Kod Katkınız

Kod katkısında bulunmak istiyorsanız adım adım rehber:

---

### 1️⃣ Projeyi Fork'layın

Bu depoyu kendi GitHub hesabınıza **fork**'layın.

---

### 2️⃣ Depoyu Klonlayın

Fork'ladığınız depoyu yerel makinenize klonlayın:

```bash
git clone https://github.com/diyanet-bid/Kuran.git
cd Kuran
````

---

### 3️⃣ Geliştirme Ortamını Kurun

Projenin ana `README.md` dosyasındaki kurulum adımlarını izleyerek geliştirme ortamınızı hazırlayın.

---

### 4️⃣ Yeni Bir Branch Oluşturun

Yapacağınız değişiklikler için yeni bir branch oluşturun.
Branch adlarının açıklayıcı olmasına özen gösterin (İngilizce tercih edilir):

```bash
git checkout -b feature/ayet-paylasma-ozelligi
```

Hata düzeltmeleri için:

```bash
git checkout -b fix/arama-sonuclari-sorunu
```

---

### 5️⃣ Değişikliklerinizi Yapın

İlgili dosyalarda kod değişikliklerinizi yapın.
Projede kullanılan teknolojilere (Next.js 15+, Redux Toolkit, TypeScript vb.) ve kodlama standartlarına uymaya çalışın.

---

### 6️⃣ Değişikliklerinizi Test Edin

Yaptığınız değişikliklerin beklendiği gibi çalıştığından ve mevcut özellikleri bozmadığından emin olun.

---

### 7️⃣ Commit'lerinizi Oluşturun

Değişikliklerinizi anlamlı commit mesajları ile kaydedin.
Mümkünse **Conventional Commits** formatını kullanın:

```bash
git add .
git commit -m "feat: Ayetlere sosyal medya paylaşım butonu eklendi"
```

veya

```bash
git commit -m "fix: Arama sonuçlarındaki nadir bir bug düzeltildi"
```

---

### 8️⃣ Branch'inizi Push'layın

Oluşturduğunuz branch’i kendi fork’ladığınız depoya push’layın:

```bash
git push origin feature/ayet-paylasma-ozelligi
```

---

### 9️⃣ Pull Request (PR) Açın

GitHub üzerinden fork'ladığınız depodan ana projeye (**dib-bid/\[KuranAppRepoAdi]**) bir Pull Request açın.

PR başlığınızın ve açıklamanızın net ve anlaşılır olmasına dikkat edin:

* Yaptığınız değişiklikleri ve nedenlerini açıklayın.
* Eğer bir **Issue** ile ilgiliyse, PR açıklamanızda `Closes #123` gibi bir ifadeyle ilgili Issue'yu referans gösterin.

---

## 🏷️ Pull Request Süreci

PR’ınız proje yöneticileri tarafından incelenecektir.

* Geri bildirimler veya değişiklik talepleri olabilir.
* Lütfen yapıcı eleştirilere açık olun.
* Gerekli düzenlemeler yapıldıktan ve onay alındıktan sonra PR’ınız ana branch’e (genellikle `main` veya `develop`) merge edilir.

---

## 🧑‍💻 Kodlama Standartları

* **Dil:** Kod içi yorumlar ve değişken isimlerinde tutarlı olun. İngilizce terimler tercih edilir.
* **Formatlama:** ESLint ve Prettier gibi araçların belirlediği kurallara uyun.
* **Testler:** Eğer projenin test altyapısı varsa, eklediğiniz özellikler veya düzeltmeler için test yazmaya özen gösterin.

---

## 📨 İletişim

Herhangi bir sorunuz veya takıldığınız bir konu olursa:

* **Issues** bölümünden soru sormaktan çekinmeyin.
* **Discussions** bölümü aktifleştirildiyse orayı da kullanabilirsiniz.

---

🙏 Katkılarınız için şimdiden teşekkür ederiz!
Bu projeyi birlikte daha iyi bir hale getireceğimize inanıyoruz.

# Kurulum Rehberi

Bu doküman, Açık Kaynaklı Kur'an-ı Kerim Web Uygulaması'nın yerel ortamınızda çalıştırılması için gerekli adımları içermektedir.

## Sistem Gereksinimleri

Projeyi çalıştırmadan önce aşağıdaki yazılımların sisteminizde kurulu olması gerekmektedir:

### Zorunlu Gereksinimler
- **Node.js**: v20.0.0 veya üzeri (önerilen: v22.x.x)
- **npm**: v9.0.0 veya üzeri (Node.js ile birlikte gelir)

### Alternatif Paket Yöneticileri (İsteğe Bağlı)
- **yarn**: v1.22.0 veya üzeri
- **pnpm**: v7.0.0 veya üzeri
- **bun**: v1.0.0 veya üzeri

## Kurulum Adımları

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/diyanet-bid/kuran.git diyanet-kuran
cd diyanet-kuran
```

### 2. Bağımlılıkları Yükleyin

Tercih ettiğiniz paket yöneticisiyle bağımlılıkları yükleyin:

```bash
# npm ile
npm install

# yarn ile
yarn install

# pnpm ile
pnpm install

# bun ile
bun install
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env.example` dosyasını kopyalayarak `.env.local` dosyası oluşturun:

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyerek gerekli API bilgilerini girin:

```env
# Diyanet API ayarları - Diyanet İşleri Başkanlığı'ndan alınacak
DIB_KURAN_API_BASE_URL=https://api.diyanet.gov.tr
DIB_KURAN_API_TOKEN=your_actual_api_token_here

# Temel uygulama ayarları (henüz altyapı hazır değil)
# FRONTEND_APP_PORT=3000
# FRONTEND_APP_URL="http://localhost:${FRONTEND_APP_PORT}"
# FRONTEND_APP_NAME="Kuran-ı Kerim Dijital Diyanet Projesi"
```

> API token'ı almak için: https://acikkaynakkuran-dev.diyanet.gov.tr

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama başarıyla çalıştığında, tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini ziyaret edebilirsiniz.

## Geliştirme Komutları

### Temel Komutlar

```bash
# Geliştirme sunucusunu başlatma
npm run dev

# Production build oluşturma
npm run build

# Production sunucusunu başlatma (build sonrası)
npm run start

# Linting (kod kalitesi kontrolü)
npm run lint

# Type checking (sadece TypeScript hataları için)
npx tsc --noEmit
```

### Faydalı Geliştirme Komutları

```bash
# Tüm bağımlılıkları güncelleme
npm update

# Güvenlik açığı taraması
npm audit

# Cache temizleme
npm run clean  # (eğer tanımlandıysa)
# veya
rm -rf .next && rm -rf node_modules && npm install
```

## API Konfigürasyonu

### Diyanet Kuran API

Bu proje, Diyanet İşleri Başkanlığı'nın resmi Kuran API'sini kullanmaktadır. API erişimi için:

1. **API Token Alma**: community@diyanet.gov.tr adresine başvuruda bulunun
2. **Geliştirici Hesabı**: GitHub [@diyanet-bid](https://github.com/diyanet-bid) sayfasını takip edin
3. **API Dokümantasyonu**: Resmi API dokümantasyonuna erişim için Diyanet BİD ile iletişime geçin

## Sorun Giderme

### Sık Karşılaşılan Problemler

#### 1. Node.js Sürüm Uyumsuzluğu
```bash
# Node.js sürümünüzu kontrol edin
node --version

# nvm veya fnm kullanarak doğru sürümü yükleyin (eğer kuruluysa)
fnm install 22
fnm use 22
```

#### 2. Port Çakışması
Eğer 3000 portu meşgulse, farklı bir port kullanabilirsiniz:

```bash
# Package.json'da dev script'ini güncelleyin veya
npm run dev -- --port 3001

# Veya ortam değişkeni ile
FRONTEND_APP_PORT=3001 npm run dev
```

#### 3. Bağımlılık Çakışmaları
```bash
# node_modules ve lock dosyasını silip yeniden yükleme
rm -rf node_modules package-lock.json
npm install

# Veya farklı paket yöneticisi deneme
npm install --legacy-peer-deps
```

#### 4. TypeScript Hataları
```bash
# TypeScript derlemesini kontrol etme
npx tsc --noEmit

# Gerekirse tsconfig.json'u güncelleyin
```

### Performans Optimizasyonu

#### Geliştirme Ortamında
- **Hot Reload**: Kodda yaptığınız değişiklikler otomatik olarak tarayıcıda görünür
- **Fast Refresh**: React bileşenlerinde state korunarak hızlı yenileme
- **TypeScript**: Tip kontrolü sayesinde hataları geliştirme aşamasında yakalama

#### Production Build
```bash
# Bundle analizi
npm run build
npm run analyze  # (eğer configure edilmişse)
```

## Destek ve Yardım

Kurulum sırasında sorun yaşıyorsanız:

1. **GitHub Issues**: [Proje Issues sayfası](https://github.com/diyanet-bid/kuran/issues)
2. **Doküman**: Bu `INSTALLATION.md` dosyasını tekrar gözden geçirin
3. **Topluluk**: `CONTRIBUTING.md` dosyasındaki iletişim kanallarını kullanın
4. **Diyanet BİD**: Resmi destek için bid@diyanet.gov.tr

## Sonraki Adımlar

Kurulumu tamamladıktan sonra:

1. **Katkıda Bulunma**: `CONTRIBUTING.md` dosyasını okuyun
2. **Kod Standartları**: `CODE_OF_CONDUCT.md` dosyasını inceleyin  
3. **Issue'lar**: GitHub Issues sayfasından görev alabilirsiniz

---

**Topluluk katkılarınızla bu projeyi geliştirmeye devam ediyoruz!**
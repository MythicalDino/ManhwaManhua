# 🚀 Panduan Deployment ke Cloudflare Pages

## 📋 Persiapan

### 1. Akun Cloudflare
- Daftar di [Cloudflare](https://cloudflare.com) (gratis)
- Buat akun Cloudflare Pages

### 2. Repository GitHub
- Push kode ke GitHub repository
- Pastikan semua file sudah ter-commit

## 🛠️ Metode Deployment

### Metode 1: Melalui Dashboard Cloudflare (Recommended)

1. **Login ke Cloudflare Dashboard**
   - Masuk ke [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pilih "Pages" di sidebar

2. **Connect Repository**
   - Klik "Create a project"
   - Pilih "Connect to Git"
   - Authorize GitHub dan pilih repository Anda

3. **Build Configuration**
   ```
   Framework preset: Next.js
   Build command: npm run build:cloudflare
   Build output directory: .open-next/cloudflare-pages
   Root directory: (leave empty)
   ```

4. **Environment Variables** (Optional)
   - Tidak ada environment variables yang diperlukan untuk versi dasar
   - Semua API menggunakan public endpoints

5. **Deploy**
   - Klik "Save and Deploy"
   - Tunggu proses build selesai (~5-10 menit)

### Metode 2: Melalui Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login**
   ```bash
   wrangler login
   ```

3. **Build dan Deploy**
   ```bash
   npm run build:cloudflare
   wrangler pages deploy .open-next/cloudflare-pages --project-name ai-manga-reader
   ```

## ⚠️ Keterbatasan di Cloudflare Pages

### 1. OCR Functionality
- **Status**: Disabled di production
- **Alasan**: Membutuhkan server-side processing yang tidak tersedia
- **Solusi**: Fitur OCR akan menampilkan pesan bahwa fitur tidak tersedia

### 2. Web Scraping
- **Comments dari MangaDex Forums**: Mungkin terbatas karena CORS
- **Latest Activity**: Bisa berjalan tapi dengan performa terbatas

### 3. File Upload
- **Limit**: 100MB per request
- **OCR Upload**: Disabled untuk menghindari error

## 🔧 Troubleshooting

### Build Errors
```bash
# Jika ada error saat build
npm run lint
npm run build

# Test lokal dulu
npm run preview:cloudflare
```

### API Issues
- Semua API routes akan berjalan sebagai Edge Functions
- Memory limit: 128MB per function
- Timeout: 15 detik per request

### Performance
- Static assets di-cache secara otomatis
- API responses tidak di-cache (real-time data)
- Images dari MangaDex di-proxy melalui Cloudflare

## 🌟 Keuntungan Cloudflare Pages

1. **Gratis**: 500 builds per bulan, unlimited bandwidth
2. **Global CDN**: Website cepat di seluruh dunia  
3. **Auto SSL**: HTTPS otomatis
4. **Git Integration**: Auto-deploy saat push ke GitHub
5. **Custom Domain**: Bisa pakai domain sendiri
6. **Analytics**: Built-in web analytics

## 📊 Monitoring

### Cloudflare Dashboard
- Real-time analytics
- Error tracking
- Performance metrics
- Build history

### Logs
```bash
# Lihat logs functions
wrangler pages deployment tail --project-name ai-manga-reader
```

## 🔄 Update Website

### Auto-Deploy
- Setiap push ke main branch akan trigger build otomatis
- Build time: ~5-10 menit
- Zero downtime deployment

### Manual Deploy
```bash
npm run build:cloudflare
wrangler pages deploy .open-next/cloudflare-pages
```

## 🎯 Custom Domain (Optional)

1. **Di Cloudflare Dashboard**
   - Pages → Your Project → Custom domains
   - Add custom domain
   - Update DNS records sesuai instruksi

2. **SSL Certificate**
   - Otomatis di-generate oleh Cloudflare
   - Support HTTP/2 dan HTTP/3

## 💡 Tips Optimasi

1. **Images**: Sudah dioptimasi dengan Next.js Image
2. **Caching**: Static assets di-cache 1 tahun
3. **Compression**: Gzip/Brotli otomatis
4. **Minification**: CSS/JS otomatis diminify

## 🆘 Support

Jika ada masalah:
1. Check build logs di Cloudflare Dashboard
2. Test lokal dengan `npm run preview:cloudflare`
3. Check [Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
4. Check [OpenNext docs](https://opennext.js.org/cloudflare)

---

**🎉 Selamat! Website Anda siap di-deploy ke Cloudflare Pages!**

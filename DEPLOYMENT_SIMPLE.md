# 🚀 Cara Deploy ke Cloudflare Pages - Panduan Singkat

## ✅ Persiapan Selesai!
Semua konfigurasi sudah siap. Anda tinggal deploy saja!

## 🎯 Langkah Deploy (Pilih salah satu)

### Metode 1: GitHub + Cloudflare Dashboard (RECOMMENDED)

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for Cloudflare deployment"
   git push origin main
   ```

2. **Connect di Cloudflare**
   - Buka [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pilih "Pages" → "Create a project" → "Connect to Git"
   - Pilih repository Anda
   
3. **Build Settings**
   ```
   Framework preset: Next.js
   Build command: npm run build:cloudflare
   Build output directory: .open-next/worker.js
   Root directory: (kosongkan)
   ```

4. **Deploy!**
   - Klik "Save and Deploy"
   - Tunggu ~5-10 menit
   - Website siap di `https://your-project.pages.dev`

### Metode 2: Wrangler CLI

1. **Install & Login**
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. **Deploy**
   ```bash
   npm run build:cloudflare
   wrangler pages deploy .open-next/worker.js --project-name ai-manga-reader
   ```

## 🎉 Selesai!

Website Anda akan tersedia di:
- `https://ai-manga-reader.pages.dev` (atau nama yang Anda pilih)
- Custom domain bisa ditambahkan nanti

## ⚠️ Yang Perlu Diketahui

- **OCR Feature**: Disabled di production (butuh server khusus)
- **Semua fitur lain**: Berjalan normal
- **Performance**: Sangat cepat dengan Cloudflare global CDN
- **Cost**: GRATIS (500 builds/bulan, unlimited bandwidth)

## 🔄 Update Website

Setiap kali push ke GitHub, website otomatis update!

---

**🎊 Selamat! Website manga reader Anda siap online!**

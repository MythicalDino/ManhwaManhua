# 📁 Panduan Build Static - Upload Langsung ke Hosting

## ⚠️ **Catatan Penting**

Untuk membuat website yang bisa langsung di-upload ke hosting biasa (seperti cPanel, Netlify, Vercel, dll), ada beberapa keterbatasan:

### 🚫 **Fitur yang Tidak Tersedia di Static Build:**
1. **Dynamic Routes** - Halaman manga individual tidak bisa di-generate secara static
2. **API Routes** - Semua API calls harus dilakukan client-side
3. **OCR Feature** - Membutuhkan server-side processing
4. **Web Scraping** - Comments dan latest activity terbatas karena CORS

### ✅ **Fitur yang Tetap Berfungsi:**
1. **Landing Page** - Fully functional
2. **Manga List** - Browse manga dengan client-side API calls
3. **Search Page** - Search dengan filter dan sorting
4. **Library Page** - Local storage management
5. **Basic Reading** - Baca manga (tanpa OCR)

## 🛠️ **Cara Build Static**

### Opsi 1: Build Sederhana (Recommended)
```bash
# Ubah next.config.ts untuk static pages saja
npm run build:static
```

### Opsi 2: Build dengan Dynamic Routes (Advanced)
Perlu menambahkan `generateStaticParams` untuk setiap dynamic route.

## 📂 **Struktur Hasil Build**

Setelah build berhasil, folder `dist/` akan berisi:
```
dist/
├── index.html          # Landing page
├── manga-list/
│   └── index.html      # Manga list page  
├── search/
│   └── index.html      # Search page
├── library/
│   └── index.html      # Library page
├── _next/              # Static assets
├── favicon.ico
└── ...
```

## 🚀 **Cara Upload ke Hosting**

### 1. **cPanel/Shared Hosting**
- Upload seluruh isi folder `dist/` ke folder `public_html/`
- Website langsung bisa diakses

### 2. **Netlify**
- Drag & drop folder `dist/` ke Netlify dashboard
- Atau connect GitHub repository

### 3. **Vercel**
- Import project dari GitHub
- Set build command: `npm run build:static`
- Set output directory: `dist`

### 4. **GitHub Pages**
- Push folder `dist/` ke branch `gh-pages`
- Enable GitHub Pages di repository settings

## 🔧 **Troubleshooting**

### Build Error: Dynamic Routes
```bash
# Error: Page "/manga/[mangaId]/chapters" is missing generateStaticParams
```

**Solusi**: Hapus dynamic routes atau tambahkan generateStaticParams:
```typescript
export async function generateStaticParams() {
  return []; // Return empty array untuk skip dynamic routes
}
```

### CORS Issues
API calls mungkin terblokir CORS. Solusi:
1. Gunakan CORS proxy
2. Deploy ke platform yang support serverless functions
3. Gunakan client-side workarounds

## 💡 **Rekomendasi**

Untuk pengalaman terbaik, gunakan:
1. **Cloudflare Pages** - Support serverless functions
2. **Vercel** - Full Next.js support
3. **Netlify** - Good static hosting dengan functions

Untuk hosting sederhana (cPanel, dll), website akan berfungsi tapi dengan keterbatasan fitur.

---

**🎯 Intinya**: Static build cocok untuk demo/preview, tapi untuk fitur lengkap lebih baik pakai Cloudflare Pages atau Vercel.

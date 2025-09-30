# 📁 **PANDUAN UPLOAD WEBSITE - SIAP PAKAI!**

## ✅ **WEBSITE SUDAH SIAP!**

Folder `dist/` berisi website yang sudah siap upload ke hosting manapun!

## 🚀 **CARA UPLOAD KE BERBAGAI HOSTING**

### 1. **cPanel / Shared Hosting (Hostinger, Niagahoster, dll)**

**Langkah:**
1. Login ke cPanel
2. Buka **File Manager**
3. Masuk ke folder `public_html/`
4. **Upload semua isi folder `dist/`** (bukan foldernya, tapi isinya!)
5. Extract jika dalam bentuk ZIP
6. Website langsung bisa diakses di domain Anda

**Struktur akhir di public_html:**
```
public_html/
├── index.html
├── _next/
├── library/
├── manga-list/
├── search/
└── ...
```

### 2. **Netlify (Gratis & Mudah)**

**Cara 1 - Drag & Drop:**
1. Buka [netlify.com](https://netlify.com)
2. Drag folder `dist/` ke area "Deploy"
3. Website langsung online!

**Cara 2 - GitHub:**
1. Push project ke GitHub
2. Connect repository di Netlify
3. Set build command: `npm run build:static`
4. Set publish directory: `dist`

### 3. **Vercel (Recommended untuk Next.js)**

1. Install Vercel CLI: `npm i -g vercel`
2. Di folder project: `vercel`
3. Follow setup wizard
4. Website auto-deploy!

### 4. **GitHub Pages**

1. Create repository di GitHub
2. Upload folder `dist/` ke branch `main`
3. Settings → Pages → Source: Deploy from branch
4. Select branch `main` dan folder `/` (root)

### 5. **Firebase Hosting**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Pilih folder dist sebagai public directory
firebase deploy
```

### 6. **Surge.sh (Super Simple)**

```bash
npm install -g surge
cd dist
surge
# Follow prompts untuk domain
```

## 📊 **PERBANDINGAN HOSTING**

| Hosting | Gratis | Custom Domain | Speed | Difficulty |
|---------|--------|---------------|-------|------------|
| **Netlify** | ✅ | ✅ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Vercel** | ✅ | ✅ | ⭐⭐⭐⭐⭐ | ⭐ |
| **cPanel** | ❌ | ✅ | ⭐⭐⭐ | ⭐⭐ |
| **GitHub Pages** | ✅ | ✅ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Firebase** | ✅ | ✅ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Surge** | ✅ | ✅ | ⭐⭐⭐ | ⭐ |

## ⚠️ **CATATAN PENTING**

### ✅ **Fitur yang Berfungsi:**
- ✅ Landing Page
- ✅ Manga List (browse manga)
- ✅ Search Page (dengan filter)
- ✅ Library Page (local storage)
- ✅ Responsive design
- ✅ Dark/Light theme

### ❌ **Fitur yang Tidak Tersedia:**
- ❌ Individual manga pages (butuh dynamic routing)
- ❌ OCR Translation (butuh server)
- ❌ Comments scraping (butuh server)
- ❌ Chapter reading (butuh dynamic routing)

### 🔧 **Untuk Fitur Lengkap:**
Gunakan **Cloudflare Pages** atau **Vercel** dengan serverless functions.

## 🎯 **REKOMENDASI BERDASARKAN KEBUTUHAN**

### **Untuk Demo/Portfolio:**
→ **Netlify** (drag & drop, instant)

### **Untuk Production:**
→ **Vercel** (best Next.js support)

### **Untuk Hosting Berbayar:**
→ **cPanel** (upload ke public_html)

### **Untuk Gratis Permanen:**
→ **GitHub Pages** (unlimited bandwidth)

## 🚀 **QUICK START - 5 MENIT**

**Cara Tercepat (Netlify):**
1. Buka [netlify.com](https://netlify.com)
2. Drag folder `dist/` ke halaman utama
3. Done! Website online dalam 30 detik

**URL akan seperti:** `https://random-name-123.netlify.app`

## 🔄 **UPDATE WEBSITE**

Untuk update website:
1. Edit kode
2. Run `npm run build:static`
3. Upload ulang folder `dist/` ke hosting

---

## 🎉 **SELAMAT!**

Website AI Manga Reader Anda siap online! 

**Folder `dist/` = Website siap pakai!**

Tinggal upload dan website langsung bisa diakses! 🚀

// Client-side API functions for static deployment
// These replace the server-side API routes

const MANGADEX_BASE_URL = 'https://api.mangadex.org';

// CORS proxy for client-side requests (you can use any CORS proxy)
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

// Helper function to make API calls with CORS handling
async function apiCall(url, options = {}) {
  try {
    // Try direct call first
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Direct API call failed, trying with CORS proxy:', error);
    
    // Fallback to CORS proxy
    try {
      const proxyResponse = await fetch(CORS_PROXY + url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers,
        },
      });
      
      if (!proxyResponse.ok) {
        throw new Error(`Proxy HTTP error! status: ${proxyResponse.status}`);
      }
      
      return await proxyResponse.json();
    } catch (proxyError) {
      console.error('Both direct and proxy calls failed:', proxyError);
      throw proxyError;
    }
  }
}

// API functions that replace the server-side routes
export const mangaAPI = {
  // Get manga by ID(s)
  async getManga(mangaIds) {
    const ids = Array.isArray(mangaIds) ? mangaIds : [mangaIds];
    const [mangaResponse, statsResponse] = await Promise.all([
      apiCall(`${MANGADEX_BASE_URL}/manga`, {
        method: 'GET',
        params: new URLSearchParams({
          includes: ['cover_art', 'author', 'artist', 'creator'].join(','),
          ids: ids.slice(0, 100).join(',')
        })
      }),
      apiCall(`${MANGADEX_BASE_URL}/statistics/manga`, {
        method: 'GET',
        params: new URLSearchParams({
          'manga[]': ids.slice(0, 100)
        })
      })
    ]);
    
    return {
      data: mangaResponse.data || [],
      statistics: statsResponse.statistics || {}
    };
  },

  // Get manga chapters
  async getChapters(mangaId, params = {}) {
    const searchParams = new URLSearchParams({
      manga: mangaId,
      includes: ['scanlation_group', 'user'].join(','),
      order: JSON.stringify({ volume: 'desc', chapter: 'desc' }),
      limit: '500',
      ...params
    });
    
    const response = await apiCall(`${MANGADEX_BASE_URL}/chapter?${searchParams}`);
    return response;
  },

  // Get chapter pages
  async getChapterPages(chapterId) {
    const response = await apiCall(`${MANGADEX_BASE_URL}/at-home/server/${chapterId}`);
    return response;
  },

  // Get random manga
  async getRandomManga() {
    const response = await apiCall(`${MANGADEX_BASE_URL}/manga`, {
      method: 'GET',
      params: new URLSearchParams({
        limit: '100',
        includes: ['cover_art', 'author', 'artist', 'creator'].join(',')
      })
    });
    
    // Randomize the results client-side
    const manga = response.data || [];
    const randomManga = manga
      .filter(m => m.attributes.latestUploadedChapter !== null)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    return { data: randomManga };
  },

  // Get latest manga
  async getLatestManga() {
    const response = await apiCall(`${MANGADEX_BASE_URL}/manga`, {
      method: 'GET',
      params: new URLSearchParams({
        limit: '20',
        includes: ['cover_art', 'author', 'artist', 'creator'].join(','),
        order: JSON.stringify({ latestUploadedChapter: 'desc' })
      })
    });
    
    return response;
  },

  // Get top rated manga
  async getTopRatedManga() {
    const response = await apiCall(`${MANGADEX_BASE_URL}/manga`, {
      method: 'GET',
      params: new URLSearchParams({
        limit: '20',
        includes: ['cover_art', 'author', 'artist', 'creator'].join(','),
        order: JSON.stringify({ rating: 'desc' })
      })
    });
    
    return response;
  },

  // Search manga
  async searchManga(title = '', params = {}) {
    const searchParams = new URLSearchParams({
      title: title,
      limit: '100',
      includes: ['cover_art', 'author', 'artist', 'creator'].join(','),
      ...params
    });
    
    const response = await apiCall(`${MANGADEX_BASE_URL}/manga?${searchParams}`);
    return response;
  }
};

// Translation API (using Google Translate directly)
export const translateAPI = {
  async translate(text, targetLang = 'en') {
    try {
      const url = `https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const data = await response.json();
      const translatedText = data[0].map(item => item[0]).join("");
      
      return { translatedText };
    } catch (error) {
      console.error('Translation error:', error);
      return { translatedText: text }; // Return original text if translation fails
    }
  }
};

// OCR API (disabled for static deployment)
export const ocrAPI = {
  async processImage() {
    return {
      status: "error",
      error: "OCR functionality is not available in static deployment. This feature requires server-side processing.",
      code: "OCR_DISABLED"
    };
  }
};

// Comments API (simplified - no web scraping in static deployment)
export const commentsAPI = {
  async getLatestActivity() {
    return {
      status: "info",
      message: "Latest activity comments are not available in static deployment due to CORS restrictions.",
      data: []
    };
  },
  
  async getComments() {
    return {
      status: "info", 
      message: "Comments are not available in static deployment due to CORS restrictions.",
      data: []
    };
  }
};

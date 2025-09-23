// Import translations statically for better Webpack compatibility
import jaTranslations from './translations/ja.js';
import enTranslations from './translations/en.js';
import frTranslations from './translations/fr.js';

// i18n Translation Manager
export class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'ja';
    this.translations = {
      ja: jaTranslations,
      en: enTranslations,
      fr: frTranslations
    };
    this.listeners = [];
  }

  // Load translations for a specific language (now synchronous)
  loadTranslations(lang) {
    if (this.translations[lang]) {
      return true;
    } else {
      console.error(`Translations not available for language: ${lang}`);
      return false;
    }
  }

  // Initialize i18n with current language
  async init() {
    // All translations are already loaded statically
    this.loadTranslations(this.currentLang);
    console.log('i18n initialized with language:', this.currentLang);
  }

  // Get translation by key (supports nested keys like "header.shop")
  t(key, params = {}) {
    if (!this.translations[this.currentLang]) {
      console.warn(`Translations not loaded for ${this.currentLang}`);
      return key;
    }

    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Replace parameters like {name} with actual values
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      Object.entries(params).forEach(([param, val]) => {
        value = value.replace(new RegExp(`{${param}}`, 'g'), val);
      });
    }

    return value;
  }

  // Change language
  changeLang(lang) {
    if (lang === this.currentLang) return;

    // Check if translations are available
    if (!this.translations[lang]) {
      console.error(`Cannot change to language: ${lang}`);
      return;
    }

    this.currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Set HTML lang attribute for SEO and accessibility
    document.documentElement.lang = lang;

    // Notify all listeners about language change
    this.notifyListeners();
    
    console.log('Language changed to:', lang);
  }

  // Subscribe to language changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners about language change
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLang));
  }

  // Get current language
  getCurrentLang() {
    return this.currentLang;
  }

  // Get available languages
  getAvailableLanguages() {
    return [
      { code: 'ja', name: 'JP', fullName: '日本語' },
      { code: 'en', name: 'EN', fullName: 'English' },
      { code: 'fr', name: 'FR', fullName: 'Français' }
    ];
  }

  // Format price based on language
  formatPrice(price) {
    const currency = this.t('common.currency');
    const priceNumber = typeof price === 'string' 
      ? price.replace(/[^0-9]/g, '') 
      : price;
    
    switch (this.currentLang) {
      case 'en':
      case 'fr':
        return `${currency} ${parseInt(priceNumber).toLocaleString()}`;
      default:
        return `${currency}${parseInt(priceNumber).toLocaleString()}`;
    }
  }

  // Format date based on language
  formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    switch (this.currentLang) {
      case 'en':
        return date.toLocaleDateString('en-US', options);
      case 'fr':
        return date.toLocaleDateString('fr-FR', options);
      default:
        return date.toLocaleDateString('ja-JP', options);
    }
  }
}

// Create global instance
const i18n = new I18n();
export default i18n;
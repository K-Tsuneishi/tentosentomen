// Import logo image
import logoImage from '../../assets/images/logo.jpg';
import i18n from '../../i18n/i18n.js';

export class Header {
  constructor() {
    this.element = null;
    this.mobileMenuBtn = null;
    this.mobileMenu = null;
    this.isMobileMenuOpen = false;
    this.scrolled = false;
    this.cartCount = 0; // Initial cart count
    this.i18n = i18n;
    this.langUnsubscribe = null;
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.subscribeToLanguageChanges();
  }

  render() {
    const headerHTML = `
      <header class="header ${this.scrolled ? 'header--scrolled' : ''}">
        <div class="header__container">
          <div class="header__inner">
            <!-- Logo and Mobile Menu Button -->
            <div class="header__left">
              <button class="header__mobile-menu-btn" aria-label="${this.i18n.t('header.menu')}">
                <svg class="header__menu-icon header__menu-icon--open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <svg class="header__menu-icon header__menu-icon--close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div class="header__logo">
                <a href="/" class="header__logo-link">
                  <img src="${logoImage}" alt="点と線と面" class="header__logo-image" />
                </a>
              </div>
            </div>

            <!-- Desktop Navigation -->
            <nav class="header__nav header__nav--desktop">
              <a href="#new" class="header__nav-link">${this.i18n.t('header.new')}</a>
              <a href="#collection" class="header__nav-link">${this.i18n.t('header.collection')}</a>
              <a href="#workshop" class="header__nav-link">${this.i18n.t('header.workshop')}</a>
              <a href="#about" class="header__nav-link">${this.i18n.t('header.about')}</a>
            </nav>

            <!-- Right Icons -->
            <div class="header__right">
              <!-- Language Switcher -->
              <div class="header__language">
                <button class="lang-btn ${this.i18n.getCurrentLang() === 'ja' ? 'lang-btn--active' : ''}" data-lang="ja">JP</button>
                <span class="lang-separator">|</span>
                <button class="lang-btn ${this.i18n.getCurrentLang() === 'en' ? 'lang-btn--active' : ''}" data-lang="en">EN</button>
                <span class="lang-separator">|</span>
                <button class="lang-btn ${this.i18n.getCurrentLang() === 'fr' ? 'lang-btn--active' : ''}" data-lang="fr">FR</button>
              </div>
              
              <button class="header__icon-btn header__icon-btn--search" aria-label="${this.i18n.t('header.search')}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              <button class="header__icon-btn header__icon-btn--user" aria-label="${this.i18n.t('header.account') || 'アカウント'}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              <button class="header__icon-btn header__icon-btn--heart" aria-label="${this.i18n.t('header.favorites') || 'お気に入り'}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button class="header__icon-btn header__icon-btn--cart" aria-label="${this.i18n.t('header.cart')}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                ${this.cartCount > 0 ? `<span class="header__cart-count">${this.cartCount}</span>` : ''}
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu -->
        <nav class="header__mobile-menu">
          <div class="header__mobile-menu-inner">
            <a href="#new" class="header__mobile-link">${this.i18n.t('header.new')}</a>
            <a href="#collection" class="header__mobile-link">${this.i18n.t('header.collection')}</a>
            <a href="#workshop" class="header__mobile-link">${this.i18n.t('header.workshop')}</a>
            <a href="#about" class="header__mobile-link">${this.i18n.t('header.about')}</a>
            <div class="header__mobile-divider"></div>
            <a href="#login" class="header__mobile-link">${this.i18n.t('header.account')}</a>
            <a href="#register" class="header__mobile-link">${this.i18n.t('header.menu')}</a>
          </div>
        </nav>
      </header>
    `;

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = headerHTML;
    this.element = temp.firstElementChild;

    // Cache DOM references
    this.mobileMenuBtn = this.element.querySelector('.header__mobile-menu-btn');
    this.mobileMenu = this.element.querySelector('.header__mobile-menu');
  }

  attachEventListeners() {
    // Mobile menu toggle
    this.mobileMenuBtn.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu when clicking on links
    const mobileLinks = this.element.querySelectorAll('.header__mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Scroll event for header style change
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    // Handle cart button click
    const cartBtn = this.element.querySelector('.header__icon-btn--cart');
    cartBtn.addEventListener('click', () => {
      this.handleCartClick();
    });

    // Handle search button click
    const searchBtn = this.element.querySelector('.header__icon-btn--search');
    searchBtn.addEventListener('click', () => {
      this.handleSearchClick();
    });

    // Language switcher event listeners
    const langButtons = this.element.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        this.handleLanguageChange(lang);
      });
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      this.element.classList.add('header--mobile-menu-open');
      this.mobileMenu.classList.add('header__mobile-menu--open');
      document.body.style.overflow = 'hidden';
    } else {
      this.closeMobileMenu();
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.element.classList.remove('header--mobile-menu-open');
    this.mobileMenu.classList.remove('header__mobile-menu--open');
    document.body.style.overflow = '';
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const scrollThreshold = 20;

    if (scrollY > scrollThreshold && !this.scrolled) {
      this.scrolled = true;
      this.element.classList.add('header--scrolled');
    } else if (scrollY <= scrollThreshold && this.scrolled) {
      this.scrolled = false;
      this.element.classList.remove('header--scrolled');
    }
  }

  handleCartClick() {
    console.log('Cart clicked - Items:', this.cartCount);
    // Implement cart modal/dropdown functionality
  }

  handleSearchClick() {
    console.log('Search clicked');
    // Implement search modal functionality
  }

  handleLanguageChange(lang) {
    this.i18n.changeLang(lang);
  }

  subscribeToLanguageChanges() {
    this.langUnsubscribe = this.i18n.subscribe(() => {
      this.updateContent();
    });
  }

  updateContent() {
    // Store current state
    const currentScrolled = this.scrolled;
    const currentCartCount = this.cartCount;
    const parentNode = this.element.parentNode;
    
    // Remove old element
    if (this.element && parentNode) {
      parentNode.removeChild(this.element);
    }
    
    // Re-render the header with new language
    this.render();
    this.attachEventListeners();
    
    // Re-insert into DOM
    if (parentNode) {
      parentNode.insertBefore(this.element, parentNode.firstChild);
    }
    
    // Restore state
    this.scrolled = currentScrolled;
    this.cartCount = currentCartCount;
    
    if (this.scrolled) {
      this.element.classList.add('header--scrolled');
    }
  }

  updateCartCount(count) {
    this.cartCount = count;
    const cartCountElement = this.element.querySelector('.header__cart-count');
    
    if (count > 0) {
      if (cartCountElement) {
        cartCountElement.textContent = count;
      } else {
        const cartBtn = this.element.querySelector('.header__icon-btn--cart');
        const newCountElement = document.createElement('span');
        newCountElement.className = 'header__cart-count';
        newCountElement.textContent = count;
        cartBtn.appendChild(newCountElement);
      }
    } else if (cartCountElement) {
      cartCountElement.remove();
    }
  }

  mount(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    
    if (container && this.element) {
      container.insertBefore(this.element, container.firstChild);
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.langUnsubscribe) {
      this.langUnsubscribe();
    }
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
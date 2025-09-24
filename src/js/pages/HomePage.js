import { ProductCard } from '../components/ProductCard.js';
import { NewsItem } from '../components/NewsItem.js';
import { Newsletter } from '../components/Newsletter.js';
import product1Image from '../../assets/images/product_1.webp';
import product2Image from '../../assets/images/product_2.webp';
import product3Image from '../../assets/images/product_3.webp';
import mainViewImage from '../../assets/images/main_view.webp';
import aboutProductImage from '../../assets/images/about_product.webp';
import i18n from '../../i18n/i18n.js';

export class HomePage {
  constructor() {
    this.element = null;
    this.productCards = [];
    this.newsItems = [];
    this.newsletter = null;
    this.hoveredProduct = null;
    this.i18n = i18n;
    this.langUnsubscribe = null;
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.initializeComponents();
    this.subscribeToLanguageChanges();
    return this.element;
  }

  render() {
    const homeHTML = `
      <main class="home-page">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-section__background">
            <img 
              src="${mainViewImage}" 
              alt="手作りの工芸品"
              class="hero-section__image"
            />
          </div>
          <div class="hero-section__content">
            <div class="hero-section__container">
              <h2 class="hero-section__title">
                ${this.i18n.t('hero.title')}
              </h2>
              <p class="hero-section__subtitle">
                ${this.i18n.t('hero.subtitle')}
              </p>
              <button class="hero-section__cta btn btn--primary btn--lg">
                <span>${this.i18n.t('hero.cta')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <!-- Popular Products Section -->
        <section class="popular-products">
          <div class="popular-products__container">
            <div class="popular-products__header">
              <h2 class="popular-products__title">${this.i18n.t('products.popular')}</h2>
              <p class="popular-products__subtitle">${this.i18n.t('products.popularSubtitle')}</p>
            </div>
            <div class="popular-products__grid" id="products-container">
              <!-- Products will be rendered here -->
            </div>
          </div>
        </section>

        <!-- Brand Story Section -->
        <section class="brand-story">
          <div class="brand-story__container">
            <div class="brand-story__grid">
              <div class="brand-story__image">
                <img 
                  src="${aboutProductImage}" 
                  alt="工房の様子"
                  class="brand-story__img"
                />
              </div>
              <div class="brand-story__content">
                <h2 class="brand-story__title">${this.i18n.t('about.title')}</h2>
                <p class="brand-story__text">
                  ${this.i18n.t('about.line1')}<br>
                  ${this.i18n.t('about.line2')}
                </p>
                <p class="brand-story__text">
                  ${this.i18n.t('about.line3')}<br>
                  ${this.i18n.t('about.line4')}
                </p>
                <p class="brand-story__text">
                  ${this.i18n.t('about.line5')}<br>
                  ${this.i18n.t('about.line6')}
                </p>
                <p class="brand-story__text">
                  ${this.i18n.t('about.line7')}
                </p>
                <a href="#story" class="brand-story__link">
                  ${this.i18n.t('about.viewMore')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- News Section -->
        <section class="news-section">
          <div class="news-section__container">
            <div class="news-list">
              <div class="news-list__header">
                <h2 class="news-list__title">${this.i18n.t('news.title')}</h2>
              </div>
              <div class="news-list__items" id="news-container">
                <!-- News items will be rendered here -->
              </div>
              <div class="news-list__footer">
                <a href="#news" class="news-list__view-all">${this.i18n.t('news.viewAll')}</a>
              </div>
            </div>
          </div>
        </section>

        <!-- Newsletter Section -->
        <div id="newsletter-container">
          <!-- Newsletter component will be rendered here -->
        </div>
      </main>
    `;

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = homeHTML;
    this.element = temp.firstElementChild;
  }

  initializeComponents() {
    // Initialize popular products
    this.initializeProducts();
    
    // Initialize news items
    this.initializeNews();
    
    // Initialize newsletter
    this.initializeNewsletter();
  }

  initializeProducts() {
    const productsContainer = this.element.querySelector('#products-container');
    
    const popularProducts = [
      { 
        id: 1, 
        name: this.i18n.t('products.laFrance'), 
        price: this.i18n.formatPrice(4400), 
        description: this.i18n.t('products.laFranceDesc'),
        image: product1Image,
        isFavorited: false
      },
      { 
        id: 2, 
        name: this.i18n.t('products.potHolder'), 
        price: this.i18n.formatPrice(5600), 
        description: this.i18n.t('products.potHolderDesc'),
        image: product2Image,
        badge: this.i18n.t('products.badge.new'),
        isFavorited: false
      },
      { 
        id: 3, 
        name: this.i18n.t('products.placemat'), 
        price: this.i18n.formatPrice(7800), 
        description: this.i18n.t('products.placematDesc'),
        image: product3Image,
        isFavorited: false
      }
    ];

    popularProducts.forEach(productData => {
      const productCard = new ProductCard(productData, this.i18n);
      const cardElement = productCard.init();
        productsContainer.appendChild(cardElement);
      this.productCards.push(productCard);
    });
  }

  initializeNews() {
    const newsContainer = this.element.querySelector('#news-container');
    
    const newsData = [
      { 
        id: 1, 
        date: this.i18n.t('news.news1Date'), 
        title: this.i18n.t('news.news1Title'), 
        tag: this.i18n.t('news.tags.event') 
      },
      { 
        id: 2, 
        date: this.i18n.t('news.news2Date'), 
        title: this.i18n.t('news.news2Title'), 
        tag: this.i18n.t('news.tags.new') 
      }
    ];

    newsData.forEach(news => {
      const newsItem = new NewsItem(news, this.i18n);
      const itemElement = newsItem.init();
      newsContainer.appendChild(itemElement);
      this.newsItems.push(newsItem);
    });
  }

  initializeNewsletter() {
    const newsletterContainer = this.element.querySelector('#newsletter-container');
    
    this.newsletter = new Newsletter(this.i18n);
    const newsletterElement = this.newsletter.init();
    newsletterContainer.appendChild(newsletterElement);
  }

  attachEventListeners() {
    // Hero CTA button
    const heroCtaBtn = this.element.querySelector('.hero-section__cta');
    heroCtaBtn.addEventListener('click', () => {
      this.handleHeroCTAClick();
    });

    // Brand story link
    const brandStoryLink = this.element.querySelector('.brand-story__link');
    brandStoryLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleBrandStoryClick();
    });

    // News view all link
    const newsViewAllLink = this.element.querySelector('.news-list__view-all');
    newsViewAllLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleNewsViewAllClick();
    });

    // Listen for product events
    this.element.addEventListener('favoriteToggled', (e) => {
      this.handleProductFavoriteToggled(e.detail);
    });

    this.element.addEventListener('cardClicked', (e) => {
      this.handleProductCardClicked(e.detail);
    });

    this.element.addEventListener('ctaClicked', (e) => {
      this.handleProductCTAClicked(e.detail);
    });

    // Listen for news events
    this.element.addEventListener('newsClicked', (e) => {
      this.handleNewsClicked(e.detail);
    });

    // Listen for newsletter events
    this.element.addEventListener('newsletterSubscribed', (e) => {
      this.handleNewsletterSubscribed(e.detail);
    });

    // Intersection Observer for animations
    this.setupScrollAnimations();
  }

  subscribeToLanguageChanges() {
    this.langUnsubscribe = this.i18n.subscribe(() => {
      this.updateContent();
    });
  }

  updateContent() {
    // Re-render the entire home page with new language
    const currentScrollPosition = window.scrollY;
    const parentNode = this.element.parentNode;
    
    // Clean up existing components
    this.productCards.forEach(card => card.destroy());
    this.productCards = [];
    this.newsItems.forEach(item => item.destroy());
    this.newsItems = [];
    if (this.newsletter) {
      this.newsletter.destroy();
      this.newsletter = null;
    }
    
    // Remove old element
    if (this.element && parentNode) {
      parentNode.removeChild(this.element);
    }
    
    // Re-render
    this.render();
    this.attachEventListeners();
    this.initializeComponents();
    
    // Re-insert into DOM
    if (parentNode) {
      const footer = parentNode.querySelector('footer');
      if (footer) {
        parentNode.insertBefore(this.element, footer);
      } else {
        parentNode.appendChild(this.element);
      }
    }
    
    // Restore scroll position
    window.scrollTo(0, currentScrollPosition);
  }

  handleHeroCTAClick() {
    console.log('Hero CTA clicked - Navigate to collection');
    // Smooth scroll to products section
    const productsSection = this.element.querySelector('.popular-products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
  }

  handleBrandStoryClick() {
    console.log('Brand story link clicked');
    // Navigate to brand story page
  }

  handleNewsViewAllClick() {
    console.log('View all news clicked');
    // Navigate to news page
  }

  handleProductFavoriteToggled(detail) {
    console.log('Product favorite toggled:', detail);
    // Update favorites in local storage or backend
  }

  handleProductCardClicked(detail) {
    console.log('Product card clicked:', detail);
    // Navigate to product detail page
  }

  handleProductCTAClicked(detail) {
    console.log('Product CTA clicked:', detail);
    // Navigate to product detail page or open quick view
  }

  handleNewsClicked(detail) {
    console.log('News item clicked:', detail);
    // Navigate to news detail page
  }

  handleNewsletterSubscribed(detail) {
    console.log('Newsletter subscribed:', detail);
    // Track subscription event
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations
    const animateElements = this.element.querySelectorAll('.popular-products, .brand-story, .news-section');
    animateElements.forEach(el => observer.observe(el));
  }

  destroy() {
    // Unsubscribe from language changes
    if (this.langUnsubscribe) {
      this.langUnsubscribe();
    }

    // Clean up product cards
    this.productCards.forEach(card => card.destroy());
    this.productCards = [];

    // Clean up news items
    this.newsItems.forEach(item => item.destroy());
    this.newsItems = [];

    // Clean up newsletter
    if (this.newsletter) {
      this.newsletter.destroy();
      this.newsletter = null;
    }

    // Remove main element
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

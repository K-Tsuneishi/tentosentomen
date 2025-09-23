import i18n from '../../i18n/i18n.js';

export class NotFoundPage {
  constructor() {
    this.element = null;
    this.i18n = i18n;
    this.langUnsubscribe = null;
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.subscribeToLanguageChanges();
    return this.element;
  }

  render() {
    const notFoundHTML = `
      <main class="not-found-page">
        <div class="not-found-page__container">
          <div class="not-found-page__content">
            <div class="not-found-page__error-code">404</div>
            <h1 class="not-found-page__title">${this.i18n.t('notFound.title')}</h1>
            <p class="not-found-page__description">${this.i18n.t('notFound.description')}</p>
            
            <div class="not-found-page__actions">
              <button class="not-found-page__home-btn btn btn--primary btn--lg">
                <span>${this.i18n.t('notFound.backToHome')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </button>
              <button class="not-found-page__back-btn btn btn--secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
                <span>${this.i18n.t('notFound.goBack')}</span>
              </button>
            </div>

            <div class="not-found-page__suggestions">
              <h3 class="not-found-page__suggestions-title">${this.i18n.t('notFound.suggestionsTitle')}</h3>
              <div class="not-found-page__suggestions-grid">
                <a href="#new" class="not-found-page__suggestion-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  <span>${this.i18n.t('header.new')}</span>
                </a>
                <a href="#collection" class="not-found-page__suggestion-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>${this.i18n.t('header.collection')}</span>
                </a>
                <a href="#workshop" class="not-found-page__suggestion-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  <span>${this.i18n.t('header.workshop')}</span>
                </a>
                <a href="#about" class="not-found-page__suggestion-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>${this.i18n.t('header.about')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = notFoundHTML;
    this.element = temp.firstElementChild;
  }

  attachEventListeners() {
    // Home button
    const homeBtn = this.element.querySelector('.not-found-page__home-btn');
    homeBtn.addEventListener('click', () => {
      this.handleHomeClick();
    });

    // Back button
    const backBtn = this.element.querySelector('.not-found-page__back-btn');
    backBtn.addEventListener('click', () => {
      this.handleBackClick();
    });

    // Suggestion links
    const suggestionLinks = this.element.querySelectorAll('.not-found-page__suggestion-link');
    suggestionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSuggestionClick(link.getAttribute('href'));
      });
    });
  }

  handleHomeClick() {
    console.log('NotFound: Navigate to home');
    // Navigate to home page
    window.location.hash = '';
    // Don't reload, let the hash change trigger the route change
  }

  handleBackClick() {
    console.log('NotFound: Go back');
    // Go back in history
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.handleHomeClick();
    }
  }

  handleSuggestionClick(href) {
    console.log('NotFound: Navigate to suggestion:', href);
    // Navigate to suggested page
    window.location.hash = href;
  }

  subscribeToLanguageChanges() {
    this.langUnsubscribe = this.i18n.subscribe(() => {
      this.updateContent();
    });
  }

  updateContent() {
    // Re-render the not found page with new language
    const currentScrollPosition = window.scrollY;
    const parentNode = this.element.parentNode;
    
    // Remove old element
    if (this.element && parentNode) {
      parentNode.removeChild(this.element);
    }
    
    // Re-render
    this.render();
    this.attachEventListeners();
    
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

  destroy() {
    // Unsubscribe from language changes
    if (this.langUnsubscribe) {
      this.langUnsubscribe();
    }

    // Remove main element
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
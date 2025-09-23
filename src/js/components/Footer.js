import i18n from '../../i18n/i18n.js';

export class Footer {
  constructor() {
    this.element = null;
    this.i18n = i18n;
    this.langUnsubscribe = null;
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.subscribeToLanguageChanges();
  }

  render() {
    const footerHTML = `
      <footer class="footer">
        <div class="footer__container">
          <div class="footer__grid">
            <!-- Column 1: Shopping -->
            <div class="footer__column">
              <h3 class="footer__title">${this.i18n.t('footer.shopping')}</h3>
              <ul class="footer__list">
                <li><a href="#new" class="footer__link">${this.i18n.t('footer.new')}</a></li>
                <li><a href="#gift" class="footer__link">${this.i18n.t('footer.gift')}</a></li>
                <li><a href="#sale" class="footer__link">${this.i18n.t('footer.sale')}</a></li>
              </ul>
            </div>

            <!-- Column 2: Support -->
            <div class="footer__column">
              <h3 class="footer__title">${this.i18n.t('footer.support')}</h3>
              <ul class="footer__list">
                <li><a href="#contact" class="footer__link">${this.i18n.t('footer.contactUs')}</a></li>
                <li><a href="#shipping" class="footer__link">${this.i18n.t('footer.shipping')}</a></li>
                <li><a href="#returns" class="footer__link">${this.i18n.t('footer.returns')}</a></li>
                <li><a href="#size-guide" class="footer__link">${this.i18n.t('footer.sizeGuide')}</a></li>
              </ul>
            </div>

            <!-- Column 3: About -->
            <div class="footer__column">
              <h3 class="footer__title">${this.i18n.t('footer.aboutUs')}</h3>
              <ul class="footer__list">
                <li><a href="#story" class="footer__link">${this.i18n.t('footer.brandStory')}</a></li>
                <li><a href="#workshop" class="footer__link">${this.i18n.t('footer.workshop')}</a></li>
              </ul>
            </div>

            <!-- Column 4: Connect -->
            <div class="footer__column">
              <h3 class="footer__title">${this.i18n.t('footer.connect')}</h3>
              <ul class="footer__list">
                <li><a href="https://www.instagram.com/points_lignes_et_plans/" class="footer__link footer__social-link" target="_blank" rel="noopener noreferrer">${this.i18n.t('footer.instagram')}</a></li>
              </ul>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer__bottom">
            <p class="footer__copyright">
              ${this.i18n.t('footer.copyright')}
            </p>
            <div class="footer__legal">
              <a href="#terms" class="footer__legal-link">${this.i18n.t('footer.terms')}</a>
              <a href="#privacy" class="footer__legal-link">${this.i18n.t('footer.privacy')}</a>
              <a href="#commerce-law" class="footer__legal-link">${this.i18n.t('footer.commerceLaw')}</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = footerHTML;
    this.element = temp.firstElementChild;
  }

  attachEventListeners() {
    // Handle link clicks for analytics or custom behavior
    const links = this.element.querySelectorAll('.footer__link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleLinkClick(e, link);
      });
    });

    // Handle social link clicks with tracking
    const socialLinks = this.element.querySelectorAll('.footer__social-link');
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleSocialClick(e, link);
      });
    });
  }

  handleLinkClick(event, link) {
    const href = link.getAttribute('href');
    
    // If it's a hash link (internal navigation), handle smoothly
    if (href && href.startsWith('#')) {
      event.preventDefault();
      this.scrollToSection(href.substring(1));
    }
    
    // Log for analytics (in a real app, you'd send to analytics service)
    console.log('Footer link clicked:', {
      text: link.textContent,
      href: href,
      category: this.getLinkCategory(link)
    });
  }

  handleSocialClick(event, link) {
    const platform = link.textContent.toLowerCase();
    
    // Log social media click for analytics
    console.log('Social media click:', {
      platform: platform,
      href: link.getAttribute('href')
    });
    
    // In a real app, you might track social media engagement
  }

  getLinkCategory(link) {
    const column = link.closest('.footer__column');
    const title = column?.querySelector('.footer__title')?.textContent;
    return title || 'other';
  }

  scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If section doesn't exist, navigate to the href
      console.log(`Section ${sectionId} not found`);
    }
  }

  subscribeToLanguageChanges() {
    this.langUnsubscribe = this.i18n.subscribe(() => {
      this.updateContent();
    });
  }

  updateContent() {
    // Re-render footer with new language
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
      parentNode.appendChild(this.element);
    }
  }

  mount(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    
    if (container && this.element) {
      container.appendChild(this.element);
    }
  }

  destroy() {
    // Unsubscribe from language changes
    if (this.langUnsubscribe) {
      this.langUnsubscribe();
    }

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
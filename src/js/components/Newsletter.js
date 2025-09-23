export class Newsletter {
  constructor(i18n) {
    this.element = null;
    this.emailInput = null;
    this.submitBtn = null;
    this.isSubmitting = false;
    this.i18n = i18n;
  }

  init() {
    this.render();
    this.attachEventListeners();
    return this.element;
  }

  render() {
    const newsletterHTML = `
      <section class="newsletter">
        <div class="newsletter__container">
          <div class="newsletter__content">
            <h2 class="newsletter__title">${this.i18n.t('newsletter.title')}</h2>
            <p class="newsletter__description">${this.i18n.t('newsletter.subtitle')}</p>
            <form class="newsletter__form">
              <div class="newsletter__input-group">
                <input 
                  type="email" 
                  class="newsletter__input"
                  placeholder="${this.i18n.t('newsletter.placeholder')}" 
                  required
                  aria-label="${this.i18n.t('newsletter.placeholder')}"
                />
                <button type="submit" class="newsletter__submit-btn">
                  <span class="newsletter__submit-text">${this.i18n.t('newsletter.button')}</span>
                  <span class="newsletter__submit-loading">
                    <svg class="newsletter__loading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div class="newsletter__message" role="status" aria-live="polite"></div>
            </form>
            <p class="newsletter__privacy">
              <small>
                ${this.i18n.getCurrentLang() === 'ja' ? '登録いただいたメールアドレスは、ニュースレター配信のみに使用し、第三者に提供することはありません。' : this.i18n.getCurrentLang() === 'en' ? 'Your email address will only be used for newsletter delivery and will not be shared with third parties.' : 'Votre adresse e-mail ne sera utilisée que pour la livraison de newsletters et ne sera pas partagée avec des tiers.'}
                <a href="#privacy" class="newsletter__privacy-link">${this.i18n.t('footer.privacy')}</a>
              </small>
            </p>
          </div>
        </div>
      </section>
    `;

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = newsletterHTML;
    this.element = temp.firstElementChild;

    // Cache DOM references
    this.emailInput = this.element.querySelector('.newsletter__input');
    this.submitBtn = this.element.querySelector('.newsletter__submit-btn');
    this.form = this.element.querySelector('.newsletter__form');
    this.messageElement = this.element.querySelector('.newsletter__message');
  }

  attachEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Input validation on blur
    this.emailInput.addEventListener('blur', () => {
      this.validateEmail();
    });

    // Input focus/blur effects
    this.emailInput.addEventListener('focus', () => {
      this.element.classList.add('newsletter--focused');
    });

    this.emailInput.addEventListener('blur', () => {
      this.element.classList.remove('newsletter--focused');
    });

    // Real-time validation
    this.emailInput.addEventListener('input', () => {
      this.clearMessage();
      if (this.emailInput.value.length > 0) {
        this.element.classList.add('newsletter--has-value');
      } else {
        this.element.classList.remove('newsletter--has-value');
      }
    });
  }

  async handleSubmit() {
    if (this.isSubmitting) return;

    const email = this.emailInput.value.trim();
    
    // Validate email
    if (!this.isValidEmail(email)) {
      this.showMessage(this.i18n.t('newsletter.error'), 'error');
      this.emailInput.focus();
      return;
    }

    this.setSubmitting(true);

    try {
      // Simulate API call
      await this.submitToNewsletter(email);
      
      this.showMessage(this.i18n.t('newsletter.success'), 'success');
      this.emailInput.value = '';
      this.element.classList.remove('newsletter--has-value');
      
      // Emit custom event
      this.element.dispatchEvent(new CustomEvent('newsletterSubscribed', {
        detail: { email },
        bubbles: true
      }));
      
    } catch (error) {
      this.showMessage(this.i18n.t('newsletter.error'), 'error');
      console.error('Newsletter subscription failed:', error);
    } finally {
      this.setSubmitting(false);
    }
  }

  async submitToNewsletter(email) {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate occasional failure for demo
        if (Math.random() > 0.9) {
          reject(new Error('Network error'));
        } else {
          resolve();
        }
      }, 1500);
    });
  }

  validateEmail() {
    const email = this.emailInput.value.trim();
    
    if (email.length === 0) {
      this.clearMessage();
      return true;
    }
    
    if (!this.isValidEmail(email)) {
      this.showMessage(this.i18n.t('newsletter.error'), 'error');
      return false;
    }
    
    this.clearMessage();
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  setSubmitting(isSubmitting) {
    this.isSubmitting = isSubmitting;
    
    if (isSubmitting) {
      this.element.classList.add('newsletter--submitting');
      this.submitBtn.disabled = true;
      this.emailInput.disabled = true;
    } else {
      this.element.classList.remove('newsletter--submitting');
      this.submitBtn.disabled = false;
      this.emailInput.disabled = false;
    }
  }

  showMessage(message, type = 'info') {
    this.messageElement.textContent = message;
    this.messageElement.className = `newsletter__message newsletter__message--${type}`;
    this.messageElement.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.clearMessage();
      }, 5000);
    }
  }

  clearMessage() {
    this.messageElement.textContent = '';
    this.messageElement.className = 'newsletter__message';
    this.messageElement.style.display = 'none';
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
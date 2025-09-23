export class ProductCard {
  constructor(productData, i18n) {
    this.product = productData;
    this.element = null;
    this.isHovered = false;
    this.isFavorited = productData.isFavorited || false;
    this.i18n = i18n;
  }

  init() {
    this.render();
    this.attachEventListeners();
    return this.element;
  }

  render() {
    const cardHTML = `
      <div class="product-card" data-product-id="${this.product.id}">
        <div class="product-card__image-container">
          <img 
            src="${this.product.image}" 
            alt="${this.product.name}"
            class="product-card__image"
            loading="lazy"
          />
          <button class="product-card__favorite-btn ${this.isFavorited ? 'product-card__favorite-btn--active' : ''}" 
                  aria-label="${this.isFavorited ? this.i18n.t('products.favoriteRemove') : this.i18n.t('products.favoriteAdd')}">
            <svg class="product-card__heart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          ${this.product.badge ? `<span class="product-card__badge">${this.product.badge}</span>` : ''}
        </div>
        
        <div class="product-card__content">
          <h3 class="product-card__name">${this.product.name}</h3>
          <p class="product-card__description">${this.product.description}</p>
          <div class="product-card__price-row">
            <span class="product-card__price">${this.product.price}</span>
            ${this.product.originalPrice ? `<span class="product-card__original-price">${this.product.originalPrice}</span>` : ''}
          </div>
          <button class="product-card__cta-btn">${this.i18n.t('products.viewDetails')}</button>
        </div>
      </div>
    `;

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = cardHTML;
    this.element = temp.firstElementChild;
  }

  attachEventListeners() {
    // Hover effects
    this.element.addEventListener('mouseenter', () => {
      this.handleMouseEnter();
    });

    this.element.addEventListener('mouseleave', () => {
      this.handleMouseLeave();
    });

    // Favorite button
    const favoriteBtn = this.element.querySelector('.product-card__favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleFavorite();
    });

    // CTA button
    const ctaBtn = this.element.querySelector('.product-card__cta-btn');
    ctaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleCTAClick();
    });

    // Card click (for product detail)
    this.element.addEventListener('click', () => {
      this.handleCardClick();
    });

    // Image lazy loading and error handling
    const image = this.element.querySelector('.product-card__image');
    image.addEventListener('load', () => {
      this.element.classList.add('product-card--loaded');
    });

    image.addEventListener('error', () => {
      this.handleImageError();
    });
  }

  handleMouseEnter() {
    this.isHovered = true;
    this.element.classList.add('product-card--hovered');
    
    // Optional: Preload higher quality image on hover
    if (this.product.highResImage && !this.highResLoaded) {
      this.preloadHighResImage();
    }
  }

  handleMouseLeave() {
    this.isHovered = false;
    this.element.classList.remove('product-card--hovered');
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
    const favoriteBtn = this.element.querySelector('.product-card__favorite-btn');
    
    if (this.isFavorited) {
      favoriteBtn.classList.add('product-card__favorite-btn--active');
      favoriteBtn.setAttribute('aria-label', 'お気に入りから削除');
      this.element.classList.add('product-card--favorited');
    } else {
      favoriteBtn.classList.remove('product-card__favorite-btn--active');
      favoriteBtn.setAttribute('aria-label', 'お気に入りに追加');
      this.element.classList.remove('product-card--favorited');
    }

    // Emit custom event for favorites management
    this.element.dispatchEvent(new CustomEvent('favoriteToggled', {
      detail: {
        productId: this.product.id,
        isFavorited: this.isFavorited,
        product: this.product
      },
      bubbles: true
    }));

    // Add temporary animation class
    favoriteBtn.classList.add('product-card__favorite-btn--animating');
    setTimeout(() => {
      favoriteBtn.classList.remove('product-card__favorite-btn--animating');
    }, 300);
  }

  handleCTAClick() {
    // Emit custom event for CTA click
    this.element.dispatchEvent(new CustomEvent('ctaClicked', {
      detail: {
        productId: this.product.id,
        product: this.product,
        action: 'view-details'
      },
      bubbles: true
    }));

    console.log('CTA clicked for product:', this.product.name);
  }

  handleCardClick() {
    // Emit custom event for card click
    this.element.dispatchEvent(new CustomEvent('cardClicked', {
      detail: {
        productId: this.product.id,
        product: this.product
      },
      bubbles: true
    }));

    console.log('Card clicked for product:', this.product.name);
  }

  handleImageError() {
    const image = this.element.querySelector('.product-card__image');
    
    // Replace with placeholder image
    image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="sans-serif" font-size="16"%3E画像を読み込めませんでした%3C/text%3E%3C/svg%3E';
    
    this.element.classList.add('product-card--image-error');
  }

  preloadHighResImage() {
    if (this.product.highResImage) {
      const img = new Image();
      img.onload = () => {
        this.highResLoaded = true;
        // Optionally swap to high-res image
        if (this.isHovered) {
          const cardImage = this.element.querySelector('.product-card__image');
          cardImage.src = this.product.highResImage;
        }
      };
      img.src = this.product.highResImage;
    }
  }

  updateProduct(newProductData) {
    this.product = { ...this.product, ...newProductData };
    
    // Re-render specific parts that might have changed
    const nameElement = this.element.querySelector('.product-card__name');
    const priceElement = this.element.querySelector('.product-card__price');
    const descriptionElement = this.element.querySelector('.product-card__description');
    
    if (nameElement) nameElement.textContent = this.product.name;
    if (priceElement) priceElement.textContent = this.product.price;
    if (descriptionElement) descriptionElement.textContent = this.product.description;
  }

  addToCart() {
    // Emit custom event for add to cart
    this.element.dispatchEvent(new CustomEvent('addToCart', {
      detail: {
        productId: this.product.id,
        product: this.product
      },
      bubbles: true
    }));

    // Add temporary animation
    this.element.classList.add('product-card--adding-to-cart');
    setTimeout(() => {
      this.element.classList.remove('product-card--adding-to-cart');
    }, 600);
  }

  setLoading(isLoading = true) {
    if (isLoading) {
      this.element.classList.add('product-card--loading');
    } else {
      this.element.classList.remove('product-card--loading');
    }
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
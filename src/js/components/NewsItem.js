export class NewsItem {
  constructor(newsData, i18n) {
    this.news = newsData;
    this.element = null;
    this.i18n = i18n;
  }

  init() {
    this.render();
    this.attachEventListeners();
    return this.element;
  }

  render() {
    const newsHTML = `
      <div class="news-item" data-news-id="${this.news.id}">
        <div class="news-item__content">
          <div class="news-item__meta">
            <span class="news-item__date">${this.news.date}</span>
            <span class="news-item__tag news-item__tag--${this.news.tag.toLowerCase()}">${this.news.tag}</span>
          </div>
          <h3 class="news-item__title">${this.news.title}</h3>
        </div>
        <div class="news-item__arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </div>
      </div>
    `;

    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = newsHTML;
    this.element = temp.firstElementChild;
  }

  attachEventListeners() {
    this.element.addEventListener('click', () => {
      this.handleClick();
    });

    this.element.addEventListener('mouseenter', () => {
      this.handleMouseEnter();
    });

    this.element.addEventListener('mouseleave', () => {
      this.handleMouseLeave();
    });
  }

  handleClick() {
    // Emit custom event for news item click
    this.element.dispatchEvent(new CustomEvent('newsClicked', {
      detail: {
        newsId: this.news.id,
        news: this.news
      },
      bubbles: true
    }));

    console.log('News item clicked:', this.news.title);
  }

  handleMouseEnter() {
    this.element.classList.add('news-item--hovered');
  }

  handleMouseLeave() {
    this.element.classList.remove('news-item--hovered');
  }

  updateNews(newNewsData) {
    this.news = { ...this.news, ...newNewsData };
    
    // Re-render specific parts that might have changed
    const titleElement = this.element.querySelector('.news-item__title');
    const dateElement = this.element.querySelector('.news-item__date');
    const tagElement = this.element.querySelector('.news-item__tag');
    
    if (titleElement) titleElement.textContent = this.news.title;
    if (dateElement) dateElement.textContent = this.news.date;
    if (tagElement) {
      tagElement.textContent = this.news.tag;
      tagElement.className = `news-item__tag news-item__tag--${this.news.tag.toLowerCase()}`;
    }
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
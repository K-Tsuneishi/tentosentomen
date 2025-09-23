// Main application entry point
import '../scss/main.scss';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import i18n from '../i18n/i18n.js';

class App {
  constructor() {
    this.header = null;
    this.footer = null;
    this.currentPage = null;
    this.isInitialized = false;
    this.i18n = i18n;
    this.langUnsubscribe = null;
  }

  async init() {
    if (this.isInitialized) return;

    try {
      // Initialize i18n
      await this.i18n.init();
      
      // Wait for DOM to be ready
      await this.waitForDOM();
      
      // Initialize global components
      this.initializeHeader();
      this.initializeFooter();
      
      // Initialize current page
      this.initializeCurrentPage();
      
      // Setup global event listeners
      this.setupGlobalEventListeners();
      
      // Subscribe to language changes
      this.subscribeToLanguageChanges();
      
      this.isInitialized = true;
      console.log('App initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize app:', error);
    }
  }

  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  initializeHeader() {
    this.header = new Header();
    this.header.init();
    this.header.mount('#app');
  }

  initializeFooter() {
    this.footer = new Footer();
    this.footer.init();
    this.footer.mount('#app');
  }

  initializeCurrentPage() {
    // Check the current route and load appropriate page
    const currentPath = window.location.pathname;
    const hash = window.location.hash;
    
    // Check if we have a hash route
    if (hash) {
      this.handleHashRoute(hash);
      return;
    }
    
    switch (currentPath) {
      case '/':
      case '/index.html':
      case '':
        this.loadHomePage();
        break;
      default:
        this.loadNotFoundPage();
        break;
    }
  }

  handleHashRoute(hash) {
    // Remove the # symbol
    const route = hash.substring(1);
    
    // Define valid routes
    const validRoutes = ['new', 'collection', 'workshop', 'about', 'contact', 'news', 'story', 'gift', 'sale', 'shipping', 'returns', 'size-guide', 'terms', 'privacy', 'commerce-law'];
    
    if (route === '' || route === 'home') {
      this.loadHomePage();
    } else if (validRoutes.includes(route)) {
      // For now, redirect valid routes to home page with scroll
      this.loadHomePage();
      // Scroll to section if it exists
      setTimeout(() => {
        this.scrollToSection(route);
      }, 100);
    } else {
      // Only load 404 page for truly invalid routes
      if (route.length > 0) {
        this.loadNotFoundPage();
      }
    }
  }

  loadHomePage() {
    // Clean up previous page if exists
    if (this.currentPage) {
      this.currentPage.destroy();
    }

    this.currentPage = new HomePage();
    const pageElement = this.currentPage.init();
    
    // Insert page content between header and footer
    const appContainer = document.getElementById('app');
    const footer = appContainer.querySelector('footer');
    
    if (footer) {
      appContainer.insertBefore(pageElement, footer);
    } else {
      appContainer.appendChild(pageElement);
    }
  }

  loadNotFoundPage() {
    // Clean up previous page if exists
    if (this.currentPage) {
      this.currentPage.destroy();
    }

    this.currentPage = new NotFoundPage();
    const pageElement = this.currentPage.init();
    
    // Insert page content between header and footer
    const appContainer = document.getElementById('app');
    const footer = appContainer.querySelector('footer');
    
    if (footer) {
      appContainer.insertBefore(pageElement, footer);
    } else {
      appContainer.appendChild(pageElement);
    }
  }

  setupGlobalEventListeners() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Handle route changes (for SPA functionality)
    window.addEventListener('popstate', () => {
      this.handleRouteChange();
    });

    // Handle hash changes
    window.addEventListener('hashchange', () => {
      this.initializeCurrentPage();
    });

    // Handle global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleGlobalKeydown(e);
    });

    // Handle click events for navigation
    document.addEventListener('click', (e) => {
      this.handleGlobalClick(e);
    });

    // Handle global errors
    window.addEventListener('error', (e) => {
      this.handleGlobalError(e);
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      this.handleUnhandledRejection(e);
    });
  }

  handleResize() {
    // Update components that need to respond to resize
    if (this.header) {
      // Header might need to recalculate mobile menu state
    }
    
    console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
  }

  handleRouteChange() {
    // Handle browser back/forward navigation
    this.initializeCurrentPage();
  }

  handleGlobalKeydown(e) {
    // Handle global keyboard shortcuts
    switch (e.key) {
      case 'Escape':
        // Close any open modals or menus
        if (this.header && this.header.isMobileMenuOpen) {
          this.header.closeMobileMenu();
        }
        break;
        
      case '/':
        // Focus search when "/" is pressed (like GitHub)
        if (!e.target.matches('input, textarea')) {
          e.preventDefault();
          const searchBtn = document.querySelector('.header__icon-btn--search');
          if (searchBtn) {
            searchBtn.click();
          }
        }
        break;
    }
  }

  handleGlobalClick(e) {
    // Handle navigation links
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      this.scrollToSection(targetId);
    }

    // Close mobile menu when clicking outside
    if (this.header && this.header.isMobileMenuOpen) {
      const isClickInsideMenu = e.target.closest('.header__mobile-menu, .header__mobile-menu-btn');
      if (!isClickInsideMenu) {
        this.header.closeMobileMenu();
      }
    }
  }

  scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      const headerHeight = this.header ? this.header.element.offsetHeight : 0;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  handleGlobalError(e) {
    console.error('Global error:', e.error);
    // In production, you might want to send this to an error tracking service
  }

  handleUnhandledRejection(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, you might want to send this to an error tracking service
  }

  // Public methods for external use
  updateCartCount(count) {
    if (this.header) {
      this.header.updateCartCount(count);
    }
  }

  showNotification(message, type = 'info') {
    // Simple notification system (could be enhanced with a proper notification component)
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  subscribeToLanguageChanges() {
    this.langUnsubscribe = this.i18n.subscribe(() => {
      console.log('App: Language changed, updating page content');
      // No need to reload the entire page, components handle their own updates
    });
  }

  destroy() {
    // Unsubscribe from language changes
    if (this.langUnsubscribe) {
      this.langUnsubscribe();
    }

    // Clean up all components
    if (this.header) {
      this.header.destroy();
      this.header = null;
    }
    
    if (this.footer) {
      this.footer.destroy();
      this.footer = null;
    }
    
    if (this.currentPage) {
      this.currentPage.destroy();
      this.currentPage = null;
    }
    
    this.isInitialized = false;
  }
}

// Initialize the app
const app = new App();

// Start the app when the page loads
app.init();

// Make app instance and i18n available globally for debugging and access
window.app = app;
window.i18n = i18n;

// Hot module replacement support (for development)
if (module.hot) {
  module.hot.accept();
}
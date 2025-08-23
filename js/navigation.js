// Navegação entre slides
class SlideNavigation {
  constructor() {
    this.currentSlideId = this.getCurrentSlideId();
    this.totalSlides   = this.getTotalSlides();
    this.init();
  }

  // Detecta slide atual a partir do filename
  getCurrentSlideId() {
    const filename = window.location.pathname.split('/').pop().toLowerCase();
    const m = filename.match(/slide(\d+)\.html/);
    return m ? parseInt(m[1], 10) : 1;  // fallback para 1
  }

  // Lê "X / Y" da .slide-counter; fallback 63
  getTotalSlides() {
    const el = document.querySelector('.slide-counter');
    if (!el) return 63;
    const parts = el.textContent.split('/');
    const y = parts[1] ? parseInt(parts[1], 10) : NaN;
    return Number.isFinite(y) ? y : 63;
  }

  // Nome do arquivo
  fileForSlide(id) {
    return `slide${id}.html`;
  }

  init() {
    this.setupKeyboardNavigation();
    this.updateNavigation();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // evita conflito em inputs
      const t = e.target;
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (typing) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          this.previousSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides);
          break;
      }
    });
  }

  nextSlide() {
    if (this.currentSlideId < this.totalSlides) {
      this.goToSlide(this.currentSlideId + 1);
    }
  }

  previousSlide() {
    if (this.currentSlideId > 1) {
      this.goToSlide(this.currentSlideId - 1);
    }
  }

  goToSlide(id) {
    window.location.href = this.fileForSlide(id);
  }

  updateNavigation() {
    // Atualiza contador
    const counter = document.querySelector('.slide-counter');
    if (counter) counter.textContent = `${this.currentSlideId} / ${this.totalSlides}`;

    // Atualiza botões
    const nav = document.querySelector('.navigation');
    if (!nav) return;
    const [prevBtn, , nextBtn] = nav.querySelectorAll('.nav-btn');

    if (prevBtn) {
      if (this.currentSlideId > 1) {
        prevBtn.href = this.fileForSlide(this.currentSlideId - 1);
        prevBtn.style.opacity = '';
        prevBtn.style.pointerEvents = '';
      } else {
        prevBtn.href = '#';
        prevBtn.style.opacity = '0.5';
        prevBtn.style.pointerEvents = 'none';
      }
    }

    if (nextBtn) {
      if (this.currentSlideId < this.totalSlides) {
        nextBtn.href = this.fileForSlide(this.currentSlideId + 1);
        nextBtn.style.opacity = '';
        nextBtn.style.pointerEvents = '';
      } else {
        nextBtn.href = '#';
        nextBtn.style.opacity = '0.5';
        nextBtn.style.pointerEvents = 'none';
      }
    }
  }

  addProgressBar() {
    const el = document.createElement('div');
    el.className = 'progress-bar';
    el.style.cssText = `
      position: fixed; top: 0; left: 0; height: 4px;
      background: linear-gradient(90deg, #4ecdc4, #44a08d);
      width: ${(this.currentSlideId / this.totalSlides) * 100}%;
      transition: width .6s ease; z-index: 1000;
    `;
    document.body.appendChild(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navigation = new SlideNavigation();
  navigation.addProgressBar();
});

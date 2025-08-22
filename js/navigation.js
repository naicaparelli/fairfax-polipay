// Configuração da navegação entre slides
class SlideNavigation {
    constructor() {
        this.slides = [
            { id: 1, file: 'index.html', title: 'Capa' },
            { id: 2, file: 'slide2.html', title: 'FairFax' },
            { id: 3, file: 'slide3.html', title: 'Agenda' },
            { id: 4, file: 'slide4.html', title: 'Projeto' },
            { id: 5, file: 'slide5.html', title: 'Conclusão' }
            // Adicione mais slides conforme necessário
        ];
        
        this.currentSlideId = this.getCurrentSlideId();
        this.init();
    }

    getCurrentSlideId() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'index.html' || filename === '') return 1;
        
        const match = filename.match(/slide(\d+)\.html/);
        return match ? parseInt(match[1]) : 1;
    }

    init() {
        this.setupKeyboardNavigation();
        this.updateNavigation();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.goToSlide(1);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.goToSlide(this.slides.length);
            }
        });
    }

    nextSlide() {
        if (this.currentSlideId < this.slides.length) {
            this.goToSlide(this.currentSlideId + 1);
        }
    }

    previousSlide() {
        if (this.currentSlideId > 1) {
            this.goToSlide(this.currentSlideId - 1);
        }
    }

    goToSlide(slideId) {
        const slide = this.slides.find(s => s.id === slideId);
        if (slide) {
            window.location.href = slide.file;
        }
    }

    updateNavigation() {
        // Atualizar contador de slides
        const counter = document.querySelector('.slide-counter');
        if (counter) {
            counter.textContent = `${this.currentSlideId} / ${this.slides.length}`;
        }

        // Atualizar links de navegação
        const prevBtn = document.querySelector('.nav-btn[href*="slide"]');
        const nextBtn = document.querySelector('.nav-btn:last-child');
        
        if (prevBtn && this.currentSlideId > 1) {
            const prevSlide = this.slides.find(s => s.id === this.currentSlideId - 1);
            prevBtn.href = prevSlide.file;
        }
        
        if (nextBtn && this.currentSlideId < this.slides.length) {
            const nextSlide = this.slides.find(s => s.id === this.currentSlideId + 1);
            nextBtn.href = nextSlide.file;
        }

        // Desabilitar botões quando necessário
        if (this.currentSlideId === 1) {
            const prevBtn = document.querySelector('.nav-btn[href*="slide"]');
            if (prevBtn) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.pointerEvents = 'none';
            }
        }

        if (this.currentSlideId === this.slides.length) {
            const nextBtn = document.querySelector('.nav-btn:last-child');
            if (nextBtn) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.pointerEvents = 'none';
            }
        }
    }

    // Método para adicionar progressão visual
    addProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #4ecdc4, #44a08d);
            width: ${(this.currentSlideId / this.slides.length) * 100}%;
            transition: width 0.6s ease;
            z-index: 1000;
        `;
        document.body.appendChild(progressBar);
    }
}

// Inicializar navegação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new SlideNavigation();
    navigation.addProgressBar();
});

// Função para smooth transitions entre páginas
function smoothTransition(href) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = href;
    }, 300);
}
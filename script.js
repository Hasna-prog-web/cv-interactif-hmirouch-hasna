// ============================================
// EFFET DE TYPING DANS LE HERO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const typedText = document.querySelector('.typed-text');
    const texts = ['Étudiante en Informatique Appliquée', 'Développeuse Web Débutante', 'Passionnée de Technologie'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typingSpeed);
    }

    if (typedText) {
        type();
    }
});


// ============================================
// NAVIGATION ACTIVE SUR SCROLL
// ============================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// ============================================
// MENU MOBILE TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-menu a');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        header.classList.toggle('header-show');
        const icon = this.querySelector('i');
        
        if (header.classList.contains('header-show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 1199) {
            header.classList.remove('header-show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});


// ============================================
// ANIMATION DES BARRES DE COMPÉTENCES
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Observer pour détecter quand la section skills est visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
}


// ============================================
// SMOOTH SCROLL POUR LES LIENS DE NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 0;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const messageDiv = document.querySelector('.form-message');
        
        // Validation simple
        if (!name || !email || !subject || !message) {
            messageDiv.innerHTML = 'Veuillez remplir tous les champs.';
            messageDiv.className = 'form-message error';
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageDiv.innerHTML = 'Veuillez entrer une adresse email valide.';
            messageDiv.className = 'form-message error';
            return;
        }
        
        // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
        messageDiv.innerHTML = 'Message envoyé avec succès ! Je vous répondrai bientôt.';
        messageDiv.className = 'form-message success';
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Effacer le message après 5 secondes
        setTimeout(() => {
            messageDiv.innerHTML = '';
            messageDiv.className = 'form-message';
        }, 5000);
    });
}


// ============================================
// ANIMATION AU SCROLL POUR LES ÉLÉMENTS
// ============================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.portfolio-item, .interests .icon-box, .resume-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        observer.observe(element);
    });
}

// Lancer l'animation au chargement
animateOnScroll();


// ============================================
// PRELOADER (OPTIONNEL)
// ============================================
window.addEventListener('load', function() {
    // Masquer le preloader si vous en avez un
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});


// ============================================
// CHANGEMENT D'ICÔNE POUR LES LIENS EXTERNES
// ============================================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});


// ============================================
// CONSOLE MESSAGE (OPTIONNEL - POUR LES CURIEUX)
// ============================================
console.log('%c👋 Bonjour ! ', 'color: #18d26e; font-size: 24px; font-weight: bold;');
console.log('%cMerci de visiter mon CV ! Si vous êtes un recruteur ou souhaitez collaborer, n\'hésitez pas à me contacter.', 'color: #149ddd; font-size: 14px;');
console.log('%c📧 h.hmirouch1054@uca.ac.ma', 'color: #666; font-size: 12px;');
console.log('%c🔗 GitHub: https://github.com/Hasna-prog-web', 'color: #666; font-size: 12px;');
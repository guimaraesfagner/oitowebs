// ===== DADOS DINÂMICOS =====
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

function calcularAnosExperiencia(dataInicio) {
    const hoje = new Date();
    const inicio = new Date(dataInicio);
    let anos = hoje.getFullYear() - inicio.getFullYear();
    const mes = hoje.getMonth() - inicio.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < inicio.getDate())) {
        anos--;
    }
    return anos;
}

// Atualizar elementos HTML
const idadeSpan = document.getElementById('idade');
const experienciaSpan = document.getElementById('experiencia');
const anosExperienciaSpan = document.getElementById('anosExperiencia');

if (idadeSpan) {
    idadeSpan.textContent = calcularIdade('1988-07-05');
}
if (experienciaSpan) {
    experienciaSpan.textContent = calcularAnosExperiencia('2017-01-02');
}
if (anosExperienciaSpan) {
    anosExperienciaSpan.textContent = calcularAnosExperiencia('2017-01-02');
}

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== ATIVAR LINK ATIVO NA NAVEGAÇÃO =====
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -30% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ===== BOTÃO VOLTAR AO TOPO =====
const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnTopo.classList.add('aparecer');
    } else {
        btnTopo.classList.remove('aparecer');
    }
});

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

if (btnTopo) {
    btnTopo.addEventListener('click', voltarAoTopo);
}

// ===== NAVEGAÇÃO COM FUNDO AO ROLAR =====
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
    }
});

// ===== ANIMAÇÕES SUCESSIVAS (FADE-IN) =====
const fadeElements = document.querySelectorAll('.servico-card, .portfolio-item, .contato-card, .sobre-content');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    fadeObserver.observe(el);
});
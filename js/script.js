// ===== DADOS DINÂMICOS =====
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}

function calcularAnosExperiencia(dataInicio) {
  const hoje = new Date();
  const inicio = new Date(dataInicio);
  let anos = hoje.getFullYear() - inicio.getFullYear();
  const mes = hoje.getMonth() - inicio.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < inicio.getDate())) anos--;
  return anos;
}

const anosExp = calcularAnosExperiencia('2017-01-02');
document.getElementById('idade').textContent = calcularIdade('1988-07-05');
document.getElementById('experiencia').textContent = anosExp;
document.getElementById('anosExperiencia').textContent = `+${anosExp}`;

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== SCROLL ACTIVE LINK =====
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) link.classList.add('active');
      });
    }
  });
}, { threshold: 0.3, rootMargin: '0px 0px -30% 0px' });

sections.forEach(section => observer.observe(section));

// ===== BOTÃO TOPO =====
const btnTopo = document.getElementById('btnTopo');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) btnTopo.classList.add('aparecer');
  else btnTopo.classList.remove('aparecer');
});
btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== NAV BG SCROLL =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.style.background = 'rgba(10,15,26,0.98)';
  else nav.style.background = 'rgba(10,15,26,0.95)';
});

// ===== FADE-IN ANIMATION =====
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
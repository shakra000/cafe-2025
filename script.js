// ========== PARTICLE BACKGROUND ==========
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = `rgba(255, 126, 103, ${Math.random() * 0.4 + 0.1})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
for (let i = 0; i < 120; i++) particles.push(new Particle());
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.addEventListener('mouseenter', () => cursor.style.opacity = 1);
document.addEventListener('mouseleave', () => cursor.style.opacity = 0);

// ========== NAVIGATION & SECTION SWITCH ==========
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links li');
function activateSection(id) {
  sections.forEach(sec => sec.classList.remove('active-section'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active-section');
  navItems.forEach(li => li.classList.remove('active'));
  const activeNav = Array.from(navItems).find(li => li.getAttribute('data-section') === id);
  if (activeNav) activeNav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
navItems.forEach(li => {
  li.addEventListener('click', () => {
    const sectionId = li.getAttribute('data-section');
    activateSection(sectionId);
    if (window.innerWidth <= 780) document.querySelector('.nav-links').style.display = 'none';
  });
});
document.querySelector('.menu-toggle').addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
document.getElementById('exploreBtn')?.addEventListener('click', () => activateSection('menu'));
document.getElementById('bookBtn')?.addEventListener('click', () => activateSection('contact'));

// ========== MENU DATA & RENDER ==========
const menuItems = [
  { name: "Nebula Latte", price: "$5.9", desc: "activated charcoal + vanilla" },
  { name: "Saffron Chai", price: "$4.8", desc: "golden milk & star anise" },
  { name: "Lunar Cold Brew", price: "$6.2", desc: "moon-aged, orange zest" },
  { name: "Cinnamon Spell", price: "$5.5", desc: "double espresso + fire foam" },
  { name: "Mystic Mocha", price: "$6.5", desc: "dark cocoa & cayenne" },
  { name: "Fairy Croissant", price: "$4.0", desc: "edible glitter & rose" }
];
const menuGrid = document.getElementById('menuGrid');
if (menuGrid) {
  menuItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item-card';
    card.innerHTML = `<i class="fas fa-coffee" style="font-size:2rem;color:#F4C28C"></i>
                      <h3>${item.name}</h3>
                      <p>${item.desc}</p>
                      <div class="menu-price">${item.price}</div>`;
    menuGrid.appendChild(card);
  });
}

// ========== STATS COUNTER ANIMATION ==========
function startCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else counter.innerText = target;
    };
    updateCounter();
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { startCounters(); observer.disconnect(); }
  });
}, { threshold: 0.5 });
const aboutSection = document.querySelector('#about');
if (aboutSection) observer.observe(aboutSection);

// ========== KINETIC CUP (mouse effect) ==========
const cupContainer = document.getElementById('kineticCup');
if (cupContainer) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    cupContainer.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}

// ========== CONTACT FORM ==========
document.getElementById('sendSpell')?.addEventListener('click', () => {
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const feed = document.getElementById('formFeed');
  if (!name || !email) {
    feed.innerHTML = "✧ weave your name and email, mortal ✧";
    feed.style.color = "#FF7E67";
  } else {
    feed.innerHTML = "✨ Your conjuration has been sent. The coven will reply ✨";
    feed.style.color = "#F4C28C";
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    setTimeout(() => feed.innerHTML = '', 3000);
  }
});

// ========== INITIAL ACTIVATION ==========
activateSection('home');

// floating cup steam effect
setInterval(() => {
  const steam = document.querySelector('.steam');
  if (steam) {
    const newDiv = document.createElement('div');
    newDiv.className = 'steam-puff';
    newDiv.style.left = Math.random() * 40 + 20 + '%';
    newDiv.style.animation = 'floatSteam 1.5s ease-out forwards';
    steam.appendChild(newDiv);
    setTimeout(() => newDiv.remove(), 1500);
  }
}, 800);
// inject steam style dynamically
const style = document.createElement('style');
style.textContent = `
.steam { position: relative; width: 100%; height: 40px; overflow: hidden; margin-top: -10px; }
.steam-puff { position: absolute; width: 12px; height: 12px; background: rgba(244,194,140,0.6); filter: blur(4px); border-radius: 50%; bottom: 0; animation: floatSteam 1.2s ease-out forwards; }
@keyframes floatSteam { 0% { transform: translateY(0) scale(1); opacity: 0.7; } 100% { transform: translateY(-40px) scale(2); opacity: 0; } }
`;
document.head.appendChild(style);

        // ============================================
// SPIDER WEB FOLLOW CURSOR EFFECT 🕸️
// ============================================
document.addEventListener("DOMContentLoaded", () => {

const webCanvas = document.getElementById("spiderWeb");
if (!webCanvas) return;
const webCtx = webCanvas.getContext("2d");


function resizeWeb() {
  webCanvas.width = window.innerWidth;
  webCanvas.height = window.innerHeight;
}
resizeWeb();
window.addEventListener("resize", resizeWeb);

let mouse = { x: 0, y: 0 };
let webPoints = [];

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  webPoints.push({ x: mouse.x, y: mouse.y });
  if (webPoints.length > 20) webPoints.shift();
});

function drawSpiderWeb() {
  webCtx.clearRect(0, 0, webCanvas.width, webCanvas.height);

  // glowing web
  webCtx.strokeStyle = "rgba(0, 200, 255, 0.6)";   // light blue web
webCtx.shadowColor = "rgba(0, 200, 255, 1)";     // glow color
webCtx.shadowBlur = 12;

webCtx.shadowBlur = 10;
  webCtx.lineWidth = 1;

  for (let i = 0; i < webPoints.length - 1; i++) {
    webCtx.beginPath();
    webCtx.moveTo(webPoints[i].x, webPoints[i].y);
    webCtx.lineTo(webPoints[i + 1].x, webPoints[i + 1].y);
    webCtx.stroke();
  }

  // Spider web nodes
  webPoints.forEach(p => {
    webCtx.beginPath();
    webCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    webCtx.fillStyle = "rgba(220,38,38,0.8)";
    webCtx.fill();
  });

  requestAnimationFrame(drawSpiderWeb);
}

drawSpiderWeb();
});

// ============================================
// CYBERPUNK SPIDER-MAN PORTFOLIO - JAVASCRIPT
// Pure vanilla JS - No frameworks
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypingAnimation();
  initScrollReveal();
  initScrollProgress();
  init3DTilt();
  initParallax();
});

// ============================================
// PARTICLE SYSTEM
// ============================================

function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }
  
  function createParticles() {
    particles = [];
const count = 80;
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '220, 38, 38' : '59, 130, 246'
      });
    }
  }
  
  function drawCircuitLines() {
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.06)';
    ctx.lineWidth = 1;
    
    const patterns = [
      { x1: 0, y1: canvas.height * 0.25, x2: canvas.width * 0.15, y2: canvas.height * 0.25 },
      { x1: canvas.width * 0.15, y1: canvas.height * 0.25, x2: canvas.width * 0.15, y2: canvas.height * 0.45 },
      { x1: canvas.width * 0.85, y1: canvas.height * 0.15, x2: canvas.width, y2: canvas.height * 0.15 },
      { x1: canvas.width * 0.85, y1: canvas.height * 0.15, x2: canvas.width * 0.85, y2: canvas.height * 0.35 },
      { x1: 0, y1: canvas.height * 0.75, x2: canvas.width * 0.1, y2: canvas.height * 0.75 },
      { x1: canvas.width * 0.9, y1: canvas.height * 0.85, x2: canvas.width, y2: canvas.height * 0.85 },
    ];
    
    patterns.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p.x1, p.y1);
      ctx.lineTo(p.x2, p.y2);
      ctx.stroke();
      
      // Node dots
      ctx.fillStyle = 'rgba(220, 38, 38, 0.2)';
      ctx.beginPath();
      ctx.arc(p.x2, p.y2, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawCircuitLines();
    
    // Draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      
      // Main particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
      
      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity * 0.2})`;
      ctx.fill();
    });
    
    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  resize();
  animate();
  
  window.addEventListener('resize', resize);
}

// ============================================
// TYPING ANIMATION
// ============================================

function initTypingAnimation() {
  const element = document.getElementById('typing-text');
  if (!element) return;
  
  const words = ['Backend Engineer', 'Android Developer', 'IoT Innovator', 'AI Explorer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);
      
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, 40);
    } else {
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);
      
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }
      setTimeout(type, 80);
    }
  }
  
  type();
}

// ============================================
// SCROLL REVEAL (POP-UP ANIMATION)
// ============================================

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// ============================================
// 3D TILT EFFECT
// ============================================

function init3DTilt() {
  const container = document.getElementById('tilt-container');
  if (!container) return;
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    const rotateX = -y * 15;
    const rotateY = x * 15;
    
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  container.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallax() {
  const nodes = document.querySelectorAll('.spider-node');
  const circles = document.querySelectorAll('.hud-circle');
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    nodes.forEach((node, i) => {
      const speed = 0.05 + (i * 0.02);
      node.style.transform = `translateY(${scrollY * speed}px)`;
    });
    
    circles.forEach((circle, i) => {
      const speed = 0.02 + (i * 0.01);
      const direction = i % 2 === 0 ? 1 : -1;
      circle.style.transform = `translateY(${scrollY * speed * direction}px) rotate(${scrollY * 0.02}deg)`;
    });
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
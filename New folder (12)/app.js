// ============================================
// 1. ساخت مارکی
// ============================================
function buildMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    
    const text = 'Marcus — Bennet';
    // دو بار تکرار برای حلقه بی‌نهایت
    const doubled = [text, text];
    
    doubled.forEach((item) => {
        const span = document.createElement('span');
        span.className = 'marquee-item';
        span.innerHTML = item.replace('—', '&mdash;') + '&nbsp;';
        track.appendChild(span);
    });
}

// ============================================
// 2. کنترل دراور
// ============================================
const hamburger = document.getElementById('hamburgerBtn');
const overlay = document.getElementById('drawerOverlay');
const panel = document.getElementById('drawerPanel');
const closeBtn = document.getElementById('closeBtn');

function openDrawer() {
    hamburger.classList.add('open');
    overlay.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', openDrawer);
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
}

if (overlay) {
    overlay.addEventListener('click', closeDrawer);
}

// بستن با کلید Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
        closeDrawer();
    }
});

// ============================================
// 3. کلیک روی لینک‌های دراور (بستن)
// ============================================
document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
});

// ============================================
// 4. کلیک روی لینک‌های هدر
// ============================================
document.querySelectorAll('.nav-column a, .social-column a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Clicked:', link.textContent);
    });
});

// ============================================
// 5. کلیک روی برند
// ============================================
document.querySelector('.brand')?.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Brand clicked');
});

// ============================================
// 6. اجرا بعد از لود
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    buildMarquee();
    console.log('Marcus — Bennet loaded');
});
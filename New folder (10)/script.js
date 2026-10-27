// ============================================
// 1. دیتای لوگوها
// ============================================
const LOGOS = [
    { 
        src: 'https://svgl.app/api/v1/procure.svg', 
        alt: 'Procure', 
        gradient: 'from-blue-500 to-blue-700' 
    },
    { 
        src: 'https://svgl.app/api/v1/shopify.svg', 
        alt: 'Shopify', 
        gradient: 'from-yellow-400 to-yellow-600' 
    },
    { 
        src: 'https://svgl.app/api/v1/blender.svg', 
        alt: 'Blender', 
        gradient: 'from-blue-400 to-blue-600' 
    },
    { 
        src: 'https://svgl.app/api/v1/figma.svg', 
        alt: 'Figma', 
        gradient: 'from-purple-500 to-purple-700' 
    },
    { 
        src: 'https://svgl.app/api/v1/spotify.svg', 
        alt: 'Spotify', 
        gradient: 'from-pink-500 to-red-500' 
    },
    { 
        src: 'https://svgl.app/api/v1/lottielab.svg', 
        alt: 'Lottielab', 
        gradient: 'from-yellow-300 to-green-400' 
    },
    { 
        src: 'https://svgl.app/api/v1/google-cloud.svg', 
        alt: 'Google Cloud', 
        gradient: 'from-blue-300 to-blue-500' 
    },
    { 
        src: 'https://svgl.app/api/v1/bing.svg', 
        alt: 'Bing', 
        gradient: 'from-cyan-400 to-teal-500' 
    },
];

// ============================================
// 2. تابع تبدیل گرادیانت به کلاس‌های CSS
// ============================================
function getGradientClass(gradient) {
    const gradientMap = {
        'from-blue-500 to-blue-700': 'bg-gradient-to-br from-blue-500 to-blue-700',
        'from-yellow-400 to-yellow-600': 'bg-gradient-to-br from-yellow-400 to-yellow-600',
        'from-blue-400 to-blue-600': 'bg-gradient-to-br from-blue-400 to-blue-600',
        'from-purple-500 to-purple-700': 'bg-gradient-to-br from-purple-500 to-purple-700',
        'from-pink-500 to-red-500': 'bg-gradient-to-br from-pink-500 to-red-500',
        'from-yellow-300 to-green-400': 'bg-gradient-to-br from-yellow-300 to-green-400',
        'from-blue-300 to-blue-500': 'bg-gradient-to-br from-blue-300 to-blue-500',
        'from-cyan-400 to-teal-500': 'bg-gradient-to-br from-cyan-400 to-teal-500'
    };
    return gradientMap[gradient] || '';
}

// ============================================
// 3. ساخت کارت‌های لوگو
// ============================================
function createLogoCard(logo) {
    const card = document.createElement('div');
    card.className = 'logo-card';
    
    // گرادیانت
    const gradient = document.createElement('div');
    gradient.className = `logo-gradient ${getGradientClass(logo.gradient)}`;
    card.appendChild(gradient);
    
    // تصویر
    const img = document.createElement('img');
    img.src = logo.src;
    img.alt = logo.alt;
    img.className = 'logo-image';
    img.loading = 'lazy';
    card.appendChild(img);
    
    return card;
}

// ============================================
// 4. ساخت مارکی
// ============================================
function buildMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    
    // دو برابر کردن لیست برای حلقه بی‌نهایت
    const doubledLogos = [...LOGOS, ...LOGOS];
    
    doubledLogos.forEach((logo, index) => {
        const card = createLogoCard(logo);
        card.setAttribute('data-key', `${logo.alt}-${index}`);
        track.appendChild(card);
    });
}

// ============================================
// 5. اجرا بعد از لود صفحه
// ============================================
document.addEventListener('DOMContentLoaded', buildMarquee);

// ============================================
// 6. پشتیبانی از تغییر اندازه (اختیاری)
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // هیچ کاری لازم نیست
    }, 200);
});
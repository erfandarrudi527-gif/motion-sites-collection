// ============================================
// 1. دیتای تیم (8 نفر)
// ============================================
const teamMembers = [
    {
        name: 'Andrei Baranov',
        role: 'Design Chief',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225202_f9e684f3-dc19-469a-8142-eb391bfc601b.png&w=1280&q=85',
        description: 'Andrei sets the visual direction of every project. He turns rough ideas into clear, confident design languages that feel effortless yet leave a lasting impression.'
    },
    {
        name: 'Daria Lebedeva',
        role: 'Interface Expert',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225149_7937e8ea-3b0a-46ab-919f-775627695a23.png&w=1280&q=85',
        description: 'Daria crafts interfaces people understand at first glance. Every screen she designs balances clarity and character, making complex products feel simple and warm.'
    },
    {
        name: 'Ivan Sorokin',
        role: 'Concept Chief',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225153_f2b1fc04-776a-4f2e-879b-b764ea762e77.png&w=1280&q=85',
        description: 'Ivan shapes the ideas behind the work. He digs into every brief until the core story emerges, then builds concepts that give each project its reason to exist.'
    },
    {
        name: 'Anna Fedorova',
        role: 'Brand Consultant',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225847_f456fd9c-8938-4103-836d-51b0e88a9510.png&w=1280&q=85',
        description: 'Anna helps brands find their voice. From positioning to tone, she builds identities that stay consistent everywhere and grow stronger with every appearance.'
    },
    {
        name: 'Pavel Smirnov',
        role: 'Movement Artist',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225854_3958a522-6203-4f84-a7fa-3b3f1dcd7256.png&w=1280&q=85',
        description: 'Pavel brings stillness to life. His motion work adds rhythm and personality to every product, guiding attention with transitions that feel natural and precise.'
    },
    {
        name: 'Olga Kravtsova',
        role: 'UX Specialist',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231111_fcefaa07-6851-4fdc-ac7b-98754ac9d5c4.png&w=1280&q=85',
        description: 'Olga studies how people actually use what we make. Her research keeps every decision grounded in real behavior, so the work serves users and not assumptions.'
    },
    {
        name: 'Igor Zakharenko',
        role: 'Graphic Creator',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231124_9a1505aa-8c44-4046-aff8-1aa0bc7b3ef3.png&w=1280&q=85',
        description: 'Igor gives every project its finishing touch. From typography to illustration, he sweats the visual details that separate good work from unforgettable work.'
    },
    {
        name: 'Ksenia Romanova',
        role: 'Studio Head',
        image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_230413_62e8b331-89be-4d35-84fe-330ba9b1b64f.png&w=1280&q=85',
        description: 'Ksenia keeps the studio moving as one. She connects people, plans, and priorities so every project ships on time without losing the craft it deserves.'
    }
];

// ============================================
// 2. State
// ============================================
let activeIndex = 0;

// ============================================
// 3. رفرنس‌های DOM
// ============================================
const backgroundsContainer = document.getElementById('backgrounds-container');
const avatarRow = document.getElementById('avatar-row');
const descriptionContainer = document.getElementById('description-container');
const nameDisplay = document.getElementById('name-display');
const roleDisplay = document.getElementById('role-display');
const metaFooter = document.getElementById('meta-footer');
const mainHeading = document.getElementById('main-heading');

// ============================================
// 4. توابع رندر
// ============================================

// رندر پس‌زمینه‌ها
function renderBackgrounds() {
    backgroundsContainer.innerHTML = '';
    teamMembers.forEach((member, index) => {
        const div = document.createElement('div');
        div.className = `bg-portrait ${index === activeIndex ? 'active' : ''}`;
        div.style.backgroundImage = `url(${member.image})`;
        div.dataset.index = index;
        backgroundsContainer.appendChild(div);
    });
}

// رندر آواتارها
function renderAvatars() {
    avatarRow.innerHTML = '';
    teamMembers.forEach((member, index) => {
        const button = document.createElement('button');
        button.className = 'flex shrink-0 flex-col items-center gap-2';
        button.setAttribute('aria-label', `Show ${member.name}`);
        button.dataset.index = index;
        
        // دات فعال/غیرفعال
        const dot = document.createElement('div');
        dot.className = `h-1 w-1 rounded-full bg-white transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`;
        button.appendChild(dot);
        
        // تصویر دایره‌ای
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'block h-10 w-10 overflow-hidden rounded-full sm:h-14 sm:w-14';
        
        const img = document.createElement('img');
        img.src = member.image;
        img.alt = member.name;
        img.className = 'h-full w-full object-cover';
        img.loading = 'lazy';
        
        imgWrapper.appendChild(img);
        button.appendChild(imgWrapper);
        
        // رویداد کلیک
        button.addEventListener('click', () => setActiveMember(index));
        
        avatarRow.appendChild(button);
    });
}

// به‌روزرسانی محتوای متنی
function updateContent(index, animate = true) {
    const member = teamMembers[index];
    const container = descriptionContainer;
    const nameEl = nameDisplay;
    
    if (animate) {
        // fade-out for description
        const existingDesc = container.querySelector('p');
        if (existingDesc) {
            existingDesc.classList.remove('animate-fade-in');
            existingDesc.classList.add('animate-fade-out');
            existingDesc.addEventListener('animationend', () => {
                container.innerHTML = '';
                const descP = document.createElement('p');
                descP.textContent = member.description;
                descP.className = 'animate-fade-in';
                container.appendChild(descP);
            }, { once: true });
        } else {
            const descP = document.createElement('p');
            descP.textContent = member.description;
            descP.className = 'animate-fade-in';
            container.appendChild(descP);
        }
        
        // fade-out for name
        const existingName = nameEl.querySelector('span');
        if (existingName) {
            existingName.classList.remove('animate-fade-in');
            existingName.classList.add('animate-fade-out');
            existingName.addEventListener('animationend', () => {
                nameEl.innerHTML = '';
                const nameSpan = document.createElement('span');
                nameSpan.textContent = member.name;
                nameSpan.className = 'animate-fade-in';
                nameEl.appendChild(nameSpan);
            }, { once: true });
        } else {
            const nameSpan = document.createElement('span');
            nameSpan.textContent = member.name;
            nameSpan.className = 'animate-fade-in';
            nameEl.appendChild(nameSpan);
        }
    } else {
        container.innerHTML = '';
        const descP = document.createElement('p');
        descP.textContent = member.description;
        container.appendChild(descP);
        
        nameEl.innerHTML = '';
        const nameSpan = document.createElement('span');
        nameSpan.textContent = member.name;
        nameEl.appendChild(nameSpan);
    }
    
    roleDisplay.textContent = member.role;
}

// انیمیشن آیتم‌های فوتر با تاخیر پله‌ای
function animateFooterItems() {
    const inner = metaFooter.querySelector('div');
    if (!inner) return;
    const items = inner.children;
    Array.from(items).forEach((item, i) => {
        item.classList.remove('footer-animate');
        void item.offsetWidth; // force reflow
        item.style.animationDelay = `${i * 60}ms`;
        item.classList.add('footer-animate');
    });
}

// تغییر عضو فعال
function setActiveMember(index) {
    if (index === activeIndex) return;
    
    activeIndex = index;
    
    // به‌روزرسانی پس‌زمینه‌ها
    const bgElements = backgroundsContainer.querySelectorAll('.bg-portrait');
    bgElements.forEach((el, i) => {
        el.classList.toggle('active', i === activeIndex);
    });
    
    // به‌روزرسانی دوت‌ها
    const dots = avatarRow.querySelectorAll('.h-1.w-1');
    dots.forEach((dot, i) => {
        dot.classList.toggle('opacity-100', i === activeIndex);
        dot.classList.toggle('opacity-0', i !== activeIndex);
    });
    
    // به‌روزرسانی محتوای متنی با انیمیشن
    updateContent(activeIndex, true);
    
    // انیمیشن آیتم‌های فوتر
    animateFooterItems();
    
    // Scale effect on avatar images
    const avatars = avatarRow.querySelectorAll('button .avatar-img');
    avatars.forEach((img, i) => {
        if (i === activeIndex) {
            img.style.transform = 'scale(1.15)';
            img.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.4)';
        } else {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = 'none';
        }
    });
}

// ============================================
// 7. Auto advance
// ============================================
let autoAdvanceTimer = null;

function startAutoAdvance() {
    if (autoAdvanceTimer) clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = setInterval(() => {
        const nextIndex = (activeIndex + 1) % teamMembers.length;
        setActiveMember(nextIndex);
    }, 60000);
}

// ============================================
// 5. مقداردهی اولیه
// ============================================
function init() {
    renderBackgrounds();
    renderAvatars();
    updateContent(activeIndex, false);
    
    // set initial avatar scale
    const avatars = avatarRow.querySelectorAll('button .avatar-img');
    if (avatars[activeIndex]) {
        avatars[activeIndex].style.transform = 'scale(1.15)';
        avatars[activeIndex].style.boxShadow = '0 0 0 2px rgba(255,255,255,0.4)';
    }
    
    // initial footer animation
    animateFooterItems();
    
    // main heading animation with delay
    if (mainHeading) {
        mainHeading.classList.add('animate-fade-in');
        mainHeading.style.animationDelay = '100ms';
    }
    
    startAutoAdvance();
}

// اجرا بعد از لود صفحه
document.addEventListener('DOMContentLoaded', init);

// ============================================
// 6. پشتیبانی از resize (اختیاری)
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // هیچ کاری لازم نیست
    }, 200);
});

console.log('Kollektiva loaded successfully!');
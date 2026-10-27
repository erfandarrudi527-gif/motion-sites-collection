// ============================================
// 1. انیمیشن‌های اضافی با Intersection Observer
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    
    // انیمیشن برای کارت پایین چپ (در صورت نیاز به تریگر مجدد)
    const leftCard = document.querySelector('.bottom-left-card');
    if (leftCard) {
        // انیمیشن قبلاً با CSS انجام شده
    }
    
    // ============================================
    // 2. دکمه‌های دراپ‌داون (برای موبایل)
    // ============================================
    const dropdownItems = document.querySelectorAll('.dropdown');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            // فقط برای نمایش (در نسخه واقعی منو باز می‌شود)
            console.log('Dropdown clicked:', this.textContent.trim());
        });
    });
    
    // ============================================
    // 3. دکمه Book Demo
    // ============================================
    const demoBtn = document.querySelector('.demo-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            alert('Book Demo clicked!');
        });
    }
    
    // ============================================
    // 4. دکمه Join Discord
    // ============================================
    const discordBtn = document.querySelector('.discord-btn');
    if (discordBtn) {
        discordBtn.addEventListener('click', () => {
            alert('Join Discord clicked!');
        });
    }
    
    // ============================================
    // 5. لینک Documentation
    // ============================================
    const docLink = document.querySelector('.corner-link');
    if (docLink) {
        docLink.addEventListener('click', () => {
            alert('Documentation Library clicked!');
        });
    }
    
    // ============================================
    // 6. منوی ناوبری
    // ============================================
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            console.log('Navigation clicked:', text);
        });
    });
    
    // ============================================
    // 7. پشتیبانی از resize
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // به‌روزرسانی در صورت نیاز
        }, 250);
    });
    
    console.log('RIVR Dashboard loaded successfully!');
});
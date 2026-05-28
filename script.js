// 1. كود إخفاء شاشة الترحيب
window.addEventListener("load", () => {
    const introScreen = document.getElementById('introScreen');
    if (introScreen) {
        setTimeout(() => {
            introScreen.classList.add('intro-hidden');
        }, 2000);
    }
});

// إعداد لوحة رسم الليزر (Canvas) وتجاوبها مع حجم الشاشة
const canvas = document.getElementById('laserCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// إحداثيات الماوس الحالية (افتراضياً في منتصف الشاشة)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// حلقة الانيميشن المستمرة للروبوت والليزر
function animate() {
    const robotHead = document.getElementById('robotHead');
    const laserEye = document.getElementById('laserEye');

    if (robotHead && laserEye) {
        // حساب إحداثيات مركز الرأس لإجراء الالتفات ثلاثي الأبعاد
        const rect = robotHead.getBoundingClientRect();
        const robotCenterX = rect.left + rect.width / 2;
        const robotCenterY = rect.top + rect.height / 2;

        const angleX = mouseX - robotCenterX;
        const angleY = mouseY - robotCenterY;

        // التفات الرأس ثلاثي الأبعاد الانسيابي
        const maxRotation = 20; 
        const rotateX = Math.min(Math.max(-angleY / 25, -maxRotation), maxRotation);
        const rotateY = Math.min(Math.max(angleX / 25, -maxRotation), maxRotation);
        robotHead.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // --- رسم ليزر نيون متلاشي ومحترف ---
        ctx.clearRect(0, 0, canvas.width, canvas.height); // تنظيف اللوحة في كل فريم

        // تحديد نقطة انطلاق شعاع الليزر (من منتصف عين الروبوت تماماً)
        const eyeRect = laserEye.getBoundingClientRect();
        const startX = eyeRect.left + eyeRect.width / 2;
        const startY = eyeRect.top + eyeRect.height / 2;

        // إنشاء تدرج لوني يبدأ قوي من العين ويتلاشى تدريجياً حتى يصل للماوس
        const gradient = ctx.createLinearGradient(startX, startY, mouseX, mouseY);
        gradient.addColorStop(0, 'rgba(0, 229, 255, 1)');       // نيون مشع عند نقطة البداية
        gradient.addColorStop(0.2, 'rgba(0, 229, 255, 0.4)');     // يبدأ بالتلاشي السريع
        gradient.addColorStop(0.7, 'rgba(0, 229, 255, 0.08)');    // شفاف جداً وهادئ في المنتصف
        gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');         // متلاشي تماماً 0% عند رأس الفأرة

        // رسم الشعاع العريض الخارجي (التوهج الضبابي الخافت)
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4; // سمك شعاع التوهج
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00e5ff';
        ctx.stroke();

        // رسم الشعاع الداخلي الدقيق (לב الخط) ليعطي واقعية الليزر
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
        // تدرج مخصص للقلب الأبيض المضيء
        const coreGradient = ctx.createLinearGradient(startX, startY, mouseX, mouseY);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = coreGradient;
        ctx.lineWidth = 1; // خط ليزر نحيف وحاد
        ctx.shadowBlur = 0; // بدون تشتيت إضافي
        ctx.stroke();
    }

    requestAnimationFrame(animate); // استدعاء الفريم القادم باستمرار بسلاسة 60fps
}

// بدء حلقة الأنميشن الذكية
animate();
// 1. كود إخفاء شاشة الترحيب
window.addEventListener("load", () => {
    const introScreen = document.getElementById('introScreen');
    if (introScreen) {
        setTimeout(() => {
            introScreen.classList.add('intro-hidden');
        }, 2000);
    }
});

// إعداد لوحة رسم الليزر (Canvas)
const canvas = document.getElementById('laserCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// إحداثيات الهدف (تعمل للماوس واللمس معاً)
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

// دعم الكمبيوتر (الماوس)
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

// دعم الهواتف الذكية (اللمس والسحب)
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
    }
}, { passive: true });


// حلقة الانيميشن المستمرة للروبوت والليزر
function animate() {
    const robotHead = document.getElementById('robotHead');
    const laserEye = document.getElementById('laserEye');

    if (robotHead && laserEye) {
        // حساب إحداثيات مركز الرأس لإجراء الالتفات
        const rect = robotHead.getBoundingClientRect();
        const robotCenterX = rect.left + rect.width / 2;
        const robotCenterY = rect.top + rect.height / 2;

        const angleX = targetX - robotCenterX;
        const angleY = targetY - robotCenterY;

        // التفات الرأس ثلاثي الأبعاد الانسيابي
        const maxRotation = 20; 
        const rotateX = Math.min(Math.max(-angleY / 25, -maxRotation), maxRotation);
        const rotateY = Math.min(Math.max(angleX / 25, -maxRotation), maxRotation);
        robotHead.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // --- رسم ليزر نيون متلاشي ---
        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        const eyeRect = laserEye.getBoundingClientRect();
        const startX = eyeRect.left + eyeRect.width / 2;
        const startY = eyeRect.top + eyeRect.height / 2;

        // إنشاء تدرج لوني يتلاشى عند الهدف
        const gradient = ctx.createLinearGradient(startX, startY, targetX, targetY);
        gradient.addColorStop(0, 'rgba(0, 229, 255, 1)');       
        gradient.addColorStop(0.2, 'rgba(0, 229, 255, 0.4)');     
        gradient.addColorStop(0.7, 'rgba(0, 229, 255, 0.08)');    
        gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');         

        // رسم الشعاع الخارجي المتوهج
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = window.innerWidth < 768 ? 2 : 4; // شعاع أنحف في الجوال ليكون منسقاً
        ctx.shadowBlur = window.innerWidth < 768 ? 5 : 10;
        ctx.shadowColor = '#00e5ff';
        ctx.stroke();

        // رسم الشعاع الداخلي الأبيض
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX, targetY);
        
        const coreGradient = ctx.createLinearGradient(startX, startY, targetX, targetY);
        coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = coreGradient;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0; 
        ctx.stroke();
    }

    requestAnimationFrame(animate); 
}

animate();

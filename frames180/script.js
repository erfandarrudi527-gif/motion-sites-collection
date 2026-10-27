"use strict";

/* ==========================================
   NOVA AI
   SMOOTH SCROLL FRAME ENGINE
========================================== */

const canvas =
    document.getElementById("video-canvas");

const ctx =
    canvas.getContext("2d", {
        alpha: false,
        desynchronized: true
    });

const poster =
    document.querySelector(".poster");

const video =
    document.getElementById("hero-video");


/* ==========================================
   SETTINGS
========================================== */

const DPR =
    Math.min(window.devicePixelRatio || 1, 2);

const LERP =
    0.12;


/* ==========================================
   STATE
========================================== */

let width = 0;
let height = 0;

let targetProgress = 0;
let currentProgress = 0;

let lastFrameIndex = -1;

let canvasReady = false;

let raf = null;


/* ==========================================
   CANVAS RESIZE
========================================== */

function resizeCanvas() {

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width =
        Math.floor(width * DPR);

    canvas.height =
        Math.floor(height * DPR);

    canvas.style.width =
        `${width}px`;

    canvas.style.height =
        `${height}px`;

    ctx.setTransform(
        DPR,
        0,
        0,
        DPR,
        0,
        0
    );


    /*
        اگر فریم قبلی وجود دارد،
        بعد از resize دوباره رسمش کن.
    */

    drawCurrentFrame();

}


window.addEventListener(
    "resize",
    resizeCanvas,
    { passive: true }
);

resizeCanvas();


/* ==========================================
   SCROLL PROGRESS
========================================== */

function updateScrollProgress() {

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (maxScroll <= 0) {

        targetProgress = 0;

        return;

    }

    targetProgress =
        Math.min(
            1,
            Math.max(
                0,
                window.scrollY / maxScroll
            )
        );

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


/* ==========================================
   OBJECT COVER
========================================== */

function drawCover(bitmap) {

    if (!bitmap) {
        return;
    }

    const canvasWidth = width;
    const canvasHeight = height;

    const imageWidth = bitmap.width;
    const imageHeight = bitmap.height;


    const scale =
        Math.max(
            canvasWidth / imageWidth,
            canvasHeight / imageHeight
        );


    const drawWidth =
        imageWidth * scale;

    const drawHeight =
        imageHeight * scale;


    const x =
        (canvasWidth - drawWidth) / 2;

    const y =
        (canvasHeight - drawHeight) / 2;


    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    ctx.drawImage(
        bitmap,
        x,
        y,
        drawWidth,
        drawHeight
    );

}


/* ==========================================
   GET BEST AVAILABLE FRAME
========================================== */

function getBestFrame(index) {

    const frames =
        window.NovaFrames;

    if (!frames) {
        return null;
    }


    /*
        اگر فریم دقیقاً لود شده،
        همان را استفاده کن.
    */

    const exact =
        frames.getFrame(index);

    if (exact) {
        return exact;
    }


    /*
        اگر هنوز لود نشده،
        نزدیک‌ترین فریم قبلی را پیدا کن.
    */

    for (
        let i = index - 1;
        i >= 1;
        i--
    ) {

        const previous =
            frames.getFrame(i);

        if (previous) {
            return previous;
        }

    }


    /*
        اگر قبلی نبود،
        نزدیک‌ترین فریم بعدی.
    */

    for (
        let i = index + 1;
        i <= frames.total;
        i++
    ) {

        const next =
            frames.getFrame(i);

        if (next) {
            return next;
        }

    }

    return null;

}


/* ==========================================
   DRAW CURRENT FRAME
========================================== */

function drawCurrentFrame() {

    const frames =
        window.NovaFrames;

    if (!frames) {
        return;
    }


    const total =
        frames.total;


    const index =
        Math.min(
            total,
            Math.max(
                1,
                Math.round(
                    currentProgress *
                    (total - 1)
                ) + 1
            )
        );


    /*
        اگر همان فریم قبلی است،
        دوباره Render نکن.
    */

    if (
        index === lastFrameIndex &&
        canvasReady
    ) {

        return;

    }


    const bitmap =
        getBestFrame(index);


    if (!bitmap) {
        return;
    }


    drawCover(bitmap);


    lastFrameIndex =
        index;


    if (!canvasReady) {

        canvasReady = true;

        /*
            فقط بعد از اینکه Canvas
            واقعاً یک فریم دارد،
            Poster را مخفی کن.
        */

        canvas.classList.add(
            "canvas-ready"
        );

        canvas.style.opacity = "1";

        if (poster) {

            poster.style.opacity = "0";

        }

    }

}


/* ==========================================
   SMOOTH LOOP
========================================== */

function animate() {

    currentProgress +=
        (
            targetProgress -
            currentProgress
        ) * LERP;


    /*
        اگر اختلاف خیلی کم شد،
        مستقیم روی target قرار بده.
    */

    if (
        Math.abs(
            targetProgress -
            currentProgress
        ) < 0.0001
    ) {

        currentProgress =
            targetProgress;

    }


    drawCurrentFrame();


    raf =
        requestAnimationFrame(
            animate
        );

}


animate();


/* ==========================================
   FIRST FRAME EVENT
========================================== */

window.addEventListener(
    "nova:first-frame-ready",
    () => {

        /*
            فریم اول آماده است.
            فوراً رسمش کن.
        */

        drawCurrentFrame();

    }
);


/* ==========================================
   ALL FRAMES READY
========================================== */

window.addEventListener(
    "nova:frames-ready",
    () => {

        console.log(
            "NOVA AI: all 180 frames loaded"
        );

    }
);


/* ==========================================
   VIDEO IS ONLY A FALLBACK
========================================== */

if (video) {

    /*
        ویدیو را دیگر به عنوان
        موتور اصلی استفاده نمی‌کنیم.
    */

    video.pause();

}
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
});
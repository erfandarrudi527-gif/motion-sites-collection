"use strict";

/* ==========================================
   NOVA AI
   FAST FRAME LOADER
========================================== */

const TOTAL_FRAMES = 180;
const FRAME_PATH = "./";
const EXTENSION = "webp";

const frameBitmaps = new Array(TOTAL_FRAMES + 1);

let loadedFrames = 0;
let loadingFinished = false;


/* ==========================================
   FRAME NAME
========================================== */

function frameName(index) {
    return String(index).padStart(4, "0");
}


/* ==========================================
   LOAD SINGLE FRAME
========================================== */

async function loadFrame(index) {

    if (frameBitmaps[index]) {
        return frameBitmaps[index];
    }

    const img = new Image();

    img.decoding = "async";

    img.src =
        `${FRAME_PATH}${frameName(index)}.${EXTENSION}`;

    try {

        await img.decode();

        const bitmap =
            await createImageBitmap(img);

        frameBitmaps[index] = bitmap;

        loadedFrames++;

        return bitmap;

    } catch (error) {

        console.warn(
            `Could not load frame ${frameName(index)}`,
            error
        );

        return null;
    }
}


/* ==========================================
   LOAD FIRST FRAME IMMEDIATELY
========================================== */

async function loadFirstFrame() {

    const first = await loadFrame(1);

    if (first) {

        window.dispatchEvent(
            new CustomEvent("nova:first-frame-ready")
        );

    }

}


/* ==========================================
   LOAD SMALL BATCH
========================================== */

async function loadBatch(start, end) {

    const jobs = [];

    for (
        let i = start;
        i <= end && i <= TOTAL_FRAMES;
        i++
    ) {

        jobs.push(loadFrame(i));

    }

    await Promise.all(jobs);

}


/* ==========================================
   PROGRESSIVE LOADING
========================================== */

async function progressiveLoad() {

    /*
        اول چند فریم نزدیک به ابتدای ویدیو
        را می‌گیریم.
    */

    await loadBatch(2, 12);


    /*
        سپس دسته‌های کوچک‌تر.
        این کار مانع فریز شدن صفحه می‌شود.
    */

    let start = 13;

    while (start <= TOTAL_FRAMES) {

        const end =
            Math.min(start + 7, TOTAL_FRAMES);

        await loadBatch(start, end);

        start = end + 1;


        /*
            به مرورگر فرصت Paint / Render بده.
        */

        await new Promise(resolve => {

            requestAnimationFrame(() => {

                resolve();

            });

        });

    }

    loadingFinished = true;

    window.dispatchEvent(
        new CustomEvent("nova:frames-ready")
    );

}


/* ==========================================
   START
========================================== */

async function startLoader() {

    /*
        مهم:
        اول فقط فریم اول.
    */

    await loadFirstFrame();


    /*
        بعد بقیه فریم‌ها
        در پس‌زمینه.
    */

    progressiveLoad();

}


startLoader();


/* ==========================================
   PUBLIC API
========================================== */

window.NovaFrames = {

    total: TOTAL_FRAMES,

    getFrame(index) {

        return frameBitmaps[index] || null;

    },

    getLoadedFrames() {

        return loadedFrames;

    },

    isReady(index) {

        return !!frameBitmaps[index];

    },

    isFinished() {

        return loadingFinished;

    }

};
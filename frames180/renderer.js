"use strict";

const Renderer = (() => {

    let canvas;
    let ctx;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function init(c, context) {

        canvas = c;
        ctx = context;

        resize();

        window.addEventListener("resize", resize);

    }

    function resize() {

        dpr = Math.min(window.devicePixelRatio || 1, 2);

        const w = window.innerWidth;
        const h = window.innerHeight;

        canvas.width = w * dpr;
        canvas.height = h * dpr;

        canvas.style.width = w + "px";
        canvas.style.height = h + "px";

        ctx.setTransform(dpr,0,0,dpr,0,0);

    }

    function objectCover(img){

        const cw = window.innerWidth;
        const ch = window.innerHeight;

        const scale = Math.max(

            cw/img.width,

            ch/img.height

        );

        const width = img.width*scale;
        const height = img.height*scale;

        const x = (cw-width)/2;
        const y = (ch-height)/2;

        return {x,y,width,height};

    }

    let lastFrame=-1;

    function render(progress){

        if(!window.frameBitmaps) return;

        if(frameBitmaps.length===0) return;

        const index=Math.min(

            frameBitmaps.length-1,

            Math.floor(

                progress*

                (frameBitmaps.length-1)

            )

        );

        if(index===lastFrame) return;

        const frame=frameBitmaps[index];

        if(!frame) return;

        lastFrame=index;

        ctx.clearRect(

            0,

            0,

            window.innerWidth,

            window.innerHeight

        );

        const box=objectCover(frame);

        ctx.drawImage(

            frame,

            box.x,

            box.y,

            box.width,

            box.height

        );

    }

    return{

        init,

        render

    };

})();
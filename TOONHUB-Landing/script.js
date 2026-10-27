const IMAGES=[
["./assets/1.png","#F4845F"],
["./assets/2.png","#6BBF7A"],
["./assets/3.png","#E882B4"],
["./assets/4.png","#6EB5FF"]
];

let active=0,busy=false;
const box=document.getElementById("carousel");
const hero=document.querySelector(".hero");

IMAGES.forEach(i=>{let x=new Image;x.src=i[0]});

function draw(){
 hero.style.background=IMAGES[active][1];
 let c=active,l=(active+3)%4,r=(active+1)%4;
 box.innerHTML=IMAGES.map((x,i)=>{
 let cls=i==c?"center":i==l?"left":i==r?"right":"back";
 return `<div class="char ${cls}"><img src="${x[0]}"></div>`
 }).join("");
}

function move(dir){
 if(busy)return;
 busy=true;
 active=dir==="next"?(active+1)%4:(active+3)%4;
 draw();
 setTimeout(()=>busy=false,900);
}
next.onclick=()=>move("next");
prev.onclick=()=>move("prev");
draw();

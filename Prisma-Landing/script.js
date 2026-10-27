const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});

document.querySelectorAll(".reveal,.feature,.scroll-text")
.forEach(el=>observer.observe(el));

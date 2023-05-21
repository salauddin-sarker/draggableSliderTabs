const tabBox = document.querySelector(".tab_box"),
allTabs = document.querySelectorAll(".tab"),
arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;
const handleIcons = () => {
    let scrollVal = Math.round(tabBox.scrollLeft);
    let maxScrollablewidth = tabBox.scrollWidth - tabBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal > 0 ? "flex" : "none";
    arrowIcons[1].parentElement.style.display = maxScrollablewidth > scrollVal ? "flex" : "none";
}
allTabs.forEach(tab => {
    tab.addEventListener("click", () =>{
        // removing active  class from the previous tab & adding to current clickd tab
        tabBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    });
});
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () =>{
        // if clicked icon is left, reduce 350 from tabBox scrollLeft else add
        tabBox.scrollLeft += icon.id === "left" ? -350 :  350;
        setTimeout(() => handleIcons(), 50); // calling handleIcons after 50 miliseconds
    });
});

const dragging = (e) => {
    if(!isDragging) return;
    tabBox.classList.add("dragging");
    tabBox.scrollLeft -= e.movementX;
    handleIcons();
}

const dragStop = () => {
    isDragging = false;
    tabBox.classList.remove("dragging");
}

tabBox.addEventListener("mousedown", () => isDragging = true);
tabBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup",dragStop);
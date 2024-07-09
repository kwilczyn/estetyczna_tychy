let lastScrollTop = 0;
let menuBarContainer = document.querySelector(".nav-container");
let menuBar = document.querySelector("nav");
let burgerMenu = document.querySelector("#burger-menu");
let menuButtons = document.querySelector("#menu-buttons");
let burgerLinks = document.querySelectorAll("#menu-buttons a");
let isAnchorClick = false;
let backdrop = document.querySelector(".backdrop");


function getRootFontSize() {
    // Pobierz obliczony styl dla elementu root (html)
    const root = document.documentElement;
    const rootFontSize = window.getComputedStyle(root).fontSize;
    
    // Konwertuj string (np. "16px") na liczbę
    return parseFloat(rootFontSize);
  }


window.addEventListener('scroll', function() {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        // Scrollowanie w dół
        if (st >= (getRootFontSize()*10) & !menuBar.classList.contains("maximize")){
            menuBar.classList.add("hidden");
        }
    } else {
        if(!isAnchorClick){
            menuBar.classList.remove("hidden");
        }
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);


document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            isAnchorClick = true;
            setTimeout(() => { isAnchorClick = false; }, 1000); // Reset flagi po krótkim czasie
        }
    }
});


function maximizeBurger(){
    menuBar.classList.add("maximize");
    menuButtons.classList.add("visible");
    backdrop.classList.add("visible");
}

function minimizeBurger(){
    menuBar.classList.remove("maximize");
    menuButtons.classList.remove("visible");
    backdrop.classList.remove("visible");
}

function hideNav(){
    minimizeBurger()
    menuBar.classList.add("hidden");
}

function showNav(){
    menuBar.classList.remove("hidden");
}

function ToggleBurger(){
    if (menuBar.classList.contains("maximize")){
        minimizeBurger();
    } else {
        maximizeBurger();
    }
}

burgerMenu.addEventListener('click', ToggleBurger);
backdrop.addEventListener('click', ToggleBurger);

for (let i=0; i < burgerLinks.length; i++){
    console.log("JAJKO!")
    burgerLinks[i].addEventListener('click', hideNav);
}

export const MenuScroll = (function () {
  let state = {
    lastScrollTop: 0,
    isAnchorClick: false,
    elements: {},
  };

  function initializeDOMElements() {
    state.elements = {
      menuBarContainer: document.querySelector(".nav-container"),
      menuBar: document.querySelector("nav"),
      burgerMenu: document.querySelector("#burger-menu"),
      menuButtons: document.querySelector("#menu-buttons"),
      burgerLinks: document.querySelectorAll("#menu-buttons a"),
      backdrop: document.querySelector(".backdrop"),
    };
  }

  function getRootFontSize() {
    const root = document.documentElement;
    const rootFontSize = window.getComputedStyle(root).fontSize;
    return parseFloat(rootFontSize);
  }

  function maximizeBurger() {
    state.elements.menuBar?.classList.add("maximize");
    state.elements.menuButtons?.classList.add("visible");
    state.elements.backdrop?.classList.add("visible");
  }

  function minimizeBurger() {
    state.elements.menuBar?.classList.remove("maximize");
    state.elements.menuButtons?.classList.remove("visible");
    state.elements.backdrop?.classList.remove("visible");
  }

  function hideNav() {
    minimizeBurger();
    state.elements.menuBar?.classList.add("hidden");
  }

  function showNav() {
    state.elements.menuBar?.classList.remove("hidden");
  }

  function toggleBurger() {
    if (state.elements.menuBar?.classList.contains("maximize")) {
      minimizeBurger();
    } else {
      maximizeBurger();
    }
  }

  function setupEventListeners() {
    window.addEventListener("scroll", handleScroll, false);
    document.addEventListener("click", handleAnchorClick);
    state.elements.burgerMenu?.addEventListener("click", toggleBurger);
    state.elements.backdrop?.addEventListener("click", toggleBurger);
    state.elements.burgerLinks?.forEach((link) =>
      link.addEventListener("click", hideNav)
    );
  }

  function handleScroll() {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st > state.lastScrollTop) {
      if (
        st >= getRootFontSize() * 10 &&
        !state.elements.menuBar?.classList.contains("maximize")
      ) {
        state.elements.menuBar?.classList.add("hidden");
      }
    } else {
      if (!state.isAnchorClick) {
        state.elements.menuBar?.classList.remove("hidden");
      }
    }
    state.lastScrollTop = st <= 0 ? 0 : st;
  }

  function handleAnchorClick(e) {
    if (e.target.tagName === "A") {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        state.isAnchorClick = true;
        setTimeout(() => {
          state.isAnchorClick = false;
        }, 1000);
      }
    }
  }

  function initialize() {
    initializeDOMElements();
    setupEventListeners();
  }

  // Public API
  return {
    initialize,
    getRootFontSize,
    maximizeBurger,
    minimizeBurger,
    toggleBurger,
    hideNav,
    showNav,
  };
})();

// Initialize only in browser environment
if (typeof window !== "undefined") {
  MenuScroll.initialize();
}

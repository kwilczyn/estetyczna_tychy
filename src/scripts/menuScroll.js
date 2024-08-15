export const MenuScroll = {
  state: {
    lastScrollTop: 0,
    isAnchorClick: false,
    elements: {},
  },

  initializeDOMElements: function () {
    this.state.elements = {
      menuBarContainer: document.querySelector(".nav-container"),
      menuBar: document.querySelector("nav"),
      burgerMenu: document.querySelector("#burger-menu"),
      menuButtons: document.querySelector("#menu-buttons"),
      burgerLinks: document.querySelectorAll("#menu-buttons a"),
      backdrop: document.querySelector(".backdrop"),
    };
  },

  getRootFontSize: function () {
    const root = document.documentElement;
    const rootFontSize = window.getComputedStyle(root).fontSize;
    return parseFloat(rootFontSize);
  },

  maximizeBurger: function () {
    this.state.elements.menuBar?.classList.add("maximize");
    this.state.elements.menuButtons?.classList.add("visible");
    this.state.elements.backdrop?.classList.add("visible");
  },

  minimizeBurger: function () {
    this.state.elements.menuBar?.classList.remove("maximize");
    this.state.elements.menuButtons?.classList.remove("visible");
    this.state.elements.backdrop?.classList.remove("visible");
  },

  hideNav: function () {
    this.minimizeBurger();
    this.state.elements.menuBar?.classList.add("hidden");
  },

  showNav: function () {
    this.state.elements.menuBar?.classList.remove("hidden");
  },

  toggleBurger: function () {
    if (this.state.elements.menuBar?.classList.contains("maximize")) {
      this.minimizeBurger();
    } else {
      this.maximizeBurger();
    }
  },

  setupEventListeners: function () {
    window.addEventListener(
      "scroll",
      this.handleScroll.bind(MenuScroll),
      false
    );
    document.addEventListener("click", this.handleAnchorClick.bind(MenuScroll));
    this.state.elements.burgerMenu?.addEventListener(
      "click",
      this.toggleBurger.bind(MenuScroll)
    );
    this.state.elements.backdrop?.addEventListener(
      "click",
      this.toggleBurger.bind(MenuScroll)
    );
    this.state.elements.burgerLinks?.forEach((link) =>
      link.addEventListener("click", this.hideNav.bind(MenuScroll))
    );
  },

  handleScroll: function () {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st > this.state.lastScrollTop) {
      if (
        st >= this.getRootFontSize() * 10 &&
        !this.state.elements.menuBar?.classList.contains("maximize")
      ) {
        this.state.elements.menuBar?.classList.add("hidden");
      }
    } else {
      if (!this.state.isAnchorClick) {
        this.state.elements.menuBar?.classList.remove("hidden");
      }
    }
    this.state.lastScrollTop = st <= 0 ? 0 : st;
  },

  handleAnchorClick: function (e) {
    if (e.target.tagName === "A") {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        this.state.isAnchorClick = true;
        setTimeout(() => {
          this.state.isAnchorClick = false;
        }, 1000);
      }
    }
  },

  initialize: function () {
    this.initializeDOMElements();
    this.setupEventListeners();
  },
};

MenuScroll.initialize();

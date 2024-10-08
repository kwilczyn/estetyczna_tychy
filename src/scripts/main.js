import { prepare_element } from "./utils.js";

import "@styles/scss/main.scss";

let imagePath = "./media/images/";

fetch("./media/text/main.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    about_us(data.about_us);
    pricing(data.pricing);
    order(data.about_us);
    contact(data.contact);
    footer(data);
  });

function about_us(data) {
  for (let i = 0; i < data.length; i++) {
    let hero = prepare_element("#about-us", "div", null);
    hero.classList.add("hero");
    prepare_element(hero, "img", null).setAttribute(
      "src",
      `${imagePath}${data[i].image}`
    );
    prepare_element(hero, "h2", data[i].doctor);
    prepare_element(hero, "p", data[i].description);
  }
}

function pricing(data) {
  prepare_element("#pricing", "ul", null);
  for (let i = 0; i < data.length; i++) {
    let subUl = prepare_element("#pricing > ul", "ul", null);
    subUl.setAttribute("id", data[i].category);
    prepare_element(subUl, "h2", data[i].category);
    for (let j = 0; j < data[i].services.length; j++) {
      let li = prepare_element(
        `#pricing > ul > ul:nth-of-type(${i + 1})`,
        "li",
        null
      );
      prepare_element(li, "span", data[i].services[j].name);
      const price = prepare_element(li, "span", data[i].services[j].price);
      price.classList.add("price");
    }
  }
}

function order(data) {
  prepare_element("#order", "h2", "Wybierz swojego lekarza:");
  for (let i = 0; i < data.length; i++) {
    if (data[i].widget) {
      let doc = prepare_element("#order", "div", null);
      doc.classList.add("order__order-container");
      let header = prepare_element(doc, "h3", data[i].doctor);
      const loadingIndicator = prepare_element(doc, "div", null);
      loadingIndicator.classList.add("loading-indicator");
      let iframe = prepare_element(doc, "iframe");
      iframe.setAttribute(
        "sandbox",
        "allow-forms allow-scripts allow-same-origin allow-popups"
      );
      iframe.setAttribute("loading", "lazy");
      if (data[i].widget.proasisst) {
        iframe.setAttribute("src", data[i].widget.proasisst);
        iframe.setAttribute("height", 1100);
        iframe.setAttribute("width", 320);
        iframe.setAttribute("allowtransparency", "true");
        iframe.setAttribute("overflow", "hidden");
        iframe.setAttribute("scrolling", "no");
      }
      if (data[i].widget.zl) {
        iframe.setAttribute("height", 688);
        iframe.setAttribute("src", data[i].widget.zl);
      }
      iframe.onload = function () {
        loadingIndicator.style.display = "none";
        iframe.loaded = true;
      };
      header.addEventListener("click", () =>
        toggleOrder(iframe, loadingIndicator)
      );
    }
  }
}

function toggleOrder(order, loadingIndicator) {
  if (order.classList.contains("visible")) {
    loadingIndicator.style.display = "none";
    order.classList.remove("visible");
  } else {
    if (!order.loaded) {
      loadingIndicator.style.display = "block";
    }
    order.classList.add("visible");
  }
}

function contact(data) {
  let data_container = prepare_element("#contact", "div", null);
  data_container.classList.add("data-container");
  let address = prepare_element(data_container, "article", null);
  prepare_element(address, "h2", "Adres");
  prepare_element(address, "span", data.address).classList.add("address");
  let how_to_get = prepare_element(data_container, "article", null);
  prepare_element(how_to_get, "h2", "Jak dojadę?");
  prepare_element(how_to_get, "span", data.tips).classList.add("tips");
  let parking = prepare_element(data_container, "article", null);
  prepare_element(parking, "h2", "Parking");
  prepare_element(parking, "span", data.parking).classList.add("parking");
  let entrance_image = prepare_element("#contact", "img", null);
  entrance_image.setAttribute("src", `${imagePath}${data.image}`);
  entrance_image.setAttribute("load", "lazy");
}

function footer(data) {
  prepare_element("footer", "span", "Zapraszamy na nasze social media");
  let social_media = prepare_element("footer", "div", null);
  social_media.classList.add("social-media-container");
  let facebook_link = prepare_element(social_media, "a", null);
  facebook_link.setAttribute(
    "href",
    "https://www.facebook.com/Estetyczna.tychy"
  );
  let facebook_image = prepare_element(facebook_link, "img", null);
  facebook_image.setAttribute("src", `${imagePath}facebook.png`);
  let instagram_link = prepare_element(social_media, "a", null);
  instagram_link.setAttribute(
    "href",
    "https://www.instagram.com/bgmedycynaestet/"
  );
  prepare_element(instagram_link, "img", null).setAttribute(
    "src",
    `${imagePath}instagram.png`
  );
}

let imagePath = "static/media/images/";

fetch("static/media/text/main.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    about_us(data.about_us);
    pricing(data.pricing);
    contact(data.contact);
  });

function about_us(data) {
  for (let i = 0; i < data.length; i++) {
    prepare_element("#about-us", "img", null).setAttribute(
      "src",
      `${imagePath}${data[i].image}`
    );
    prepare_element("#about-us", "h2", data[i].doctor);
    prepare_element("#about-us", "p", data[i].description);
    prepare_element("#about-us", "a", "Więcej...");
  }
}

function pricing(data) {
  prepare_element("#pricing", "ul", null);
  for (let i = 0; i < data.length; i++) {
    let subUl = prepare_element("#pricing > ul", "ul", null)
    subUl.setAttribute("id",data[i].category);
    prepare_element(subUl, "h2", data[i].category);
    for (let j = 0; j < data[i].services.length; j++) {
      li = prepare_element(
        `#pricing > ul > ul:nth-of-type(${i + 1})`,
        "li",
        null
      );
      prepare_element(li, "span", data[i].services[j].name);
      prepare_element(li, "span", data[i].services[j].price);
    }
  }
}

function contact(data) {
  prepare_element("#contact", "h2", "Adres");
  prepare_element("#contact", "span", data.address).classList.add("address");
  prepare_element("#contact", "h2", "Jak dojadę?");
  prepare_element("#contact", "span", data.tips).classList.add("tips");
  prepare_element("#contact", "img", null).setAttribute("src",`${imagePath}${data.image}`);
  prepare_element("#contact", "h2", "Parking");
  prepare_element("#contact", "span", data.parking).classList.add("parking");
}

function prepare_element(selector, element_type, header_text) {
  let parent = null;
  if (typeof selector === "string" ) {
    parent = document.querySelector(selector);
  } else {
    parent = selector;
  }
  element = document.createElement(element_type);
  element.textContent = header_text;
  parent.appendChild(element);
  return element;
}

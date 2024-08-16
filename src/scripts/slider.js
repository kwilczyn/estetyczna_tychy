import { prepare_element } from "./utils.js";

let certificatesSection = document.querySelector("#certificates");
let opinionsSection = document.querySelector("#opinions");
let prologSection = document.querySelector("#prolog");
let mediaRoot = "./media/images/";

const imageDirectories = {
  numOfCerts: 19,
  certificates: "cert_",
  opinions: ["op1.png", "op2.png"],
  prolog: [
    "about1.jpg",
    "about2.jpg",
    "about3.jpg",
    "about4.jpg",
    "about5.jpg",
    "about7.jpg",
    "gab1.webp",
    "gab2.webp",
    "gab3.webp",
    "gab4.webp",
  ],
};

function read_images(dir) {
  let images = imageDirectories[dir];
  if (dir === "certificates") {
    images = Array();
    for (let i = 1; i <= imageDirectories["numOfCerts"]; i++) {
      images.push(
        imageDirectories["certificates"] +
          i.toString().padStart(3, "0") +
          ".webp"
      );
    }
  }
  return images.map((fileName) => `${mediaRoot}${dir}/${fileName}`);
}

function create_slider(parent, images) {
  let sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider");
  parent.appendChild(sliderContainer);
  for (let i = 0; i < images.length; i++) {
    let image = document.createElement("img");
    image.setAttribute("src", images[i]);
    sliderContainer.appendChild(image);
  }
  slideShow(sliderContainer, "img");
}

function slideShow(slider, slidesSelector) {
  const slides = slider.querySelectorAll(slidesSelector);
  let currentImageIndex = 0;
  slides[currentImageIndex].classList.add("active");
  function showNextImage() {
    slides[currentImageIndex].classList.remove("active");
    currentImageIndex = (currentImageIndex + 1) % slides.length;
    slides[currentImageIndex].classList.add("active");
  }
  setInterval(showNextImage, 4000);
}

function createOpinionSlider(parent, opinions) {
  let sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider");
  parent.appendChild(sliderContainer);
  for (let i = 0; i < opinions.length; i++) {
    let opinion = prepare_element(sliderContainer, "div", null);
    opinion.classList.add("opinion");
    prepare_element(opinion, "span", opinions[i].author);
    prepare_element(opinion, "span", opinions[i].date);
    prepare_element(opinion, "span", opinions[i].localization);
    prepare_element(opinion, "p", opinions[i].content);
  }
  slideShow(sliderContainer, ".opinion");
}

create_slider(prologSection, read_images("prolog"));
create_slider(certificatesSection, read_images("certificates"));

async function getOpinions(zlUrl) {
  const response = await fetch("https://corsproxy.io/?" + zlUrl);
  const data = await response.json();
  const parser = new DOMParser();
  const doc = parser.parseFromString(data.html, "text/html");
  const opinionsElements = doc.body.querySelectorAll(".opinion");
  const opinions = Array();
  for (let i = 0; i < opinionsElements.length; i++) {
    const metaData = opinionsElements[i].querySelector(".media-body > .mb-1");
    opinions.push({
      author: metaData.querySelector("span:last-of-type").innerText,
      date: metaData.querySelector("time").innerText,
      localization: metaData.querySelector(":scope > span:last-of-type")
        .innerText,
      content: opinionsElements[i].querySelector(".media-body > p").innerText,
    });
  }
  return opinions;
}

let allOpinions = Array();

getOpinions(
  "https://www.znanylekarz.pl/ajax/mobile/doctor-opinions/362941/1?rating-sort=desc"
)
  .then((opinions) => {
    allOpinions = allOpinions.concat(opinions);
    return getOpinions(
      "https://www.znanylekarz.pl/ajax/mobile/doctor-opinions/297822/1?rating-sort=desc"
    );
  })
  .then((opinions) => {
    allOpinions = allOpinions.concat(opinions);
    allOpinions = allOpinions.sort(() => Math.random() - 0.5);
    createOpinionSlider(opinionsSection, allOpinions);
  });

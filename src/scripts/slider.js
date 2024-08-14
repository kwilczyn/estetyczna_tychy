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
  slideShow(sliderContainer);
}

function slideShow(slider) {
  const images = slider.querySelectorAll("img");
  let currentImageIndex = 0;
  images[currentImageIndex].classList.add("active");
  function showNextImage() {
    images[currentImageIndex].classList.remove("active");
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add("active");
  }
  setInterval(showNextImage, 3000);
}

create_slider(prologSection, read_images("prolog"));
create_slider(certificatesSection, read_images("certificates"));
create_slider(opinionsSection, read_images("opinions"));

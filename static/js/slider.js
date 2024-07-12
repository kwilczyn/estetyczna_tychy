let certificatesSection = document.querySelector("#certificates");
let opinionsSection = document.querySelector("#opinions");
let prologSection = document.querySelector("#prolog");
let mediaRoot = "static/media/images/";

const imageDirectories = {
  certificates: ["cert1.jpeg", "cert2.jpeg", "cert3.jpeg"],
  opinions: ["op1.png", "op2.png"],
  prolog: [
    "about1.jpg",
    "about2.jpg",
    "about3.jpg",
    "about4.jpg",
    "about5.jpg",
    "about7.jpg",
    "gab1.jpeg",
    "gab2.jpeg",
    "gab3.jpeg",
  ],
};

function read_images(dir) {
  console.log(`${imageDirectories}`);
  const images = imageDirectories[dir];
  return images.map((fileName) => `${mediaRoot}${dir}/${fileName}`);
}

function create_slider(parent, images) {
  sliderContainer = document.createElement("div");
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

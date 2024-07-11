let certificatesSection = document.querySelector("#certificates");
let opinionsSection = document.querySelector("#opinions");
let mediaRoot = "static/media/images/";

create_slider(certificatesSection, read_images("certificates"));
create_slider(opinionsSection, read_images("opinions"));

function read_images(dir) {
  function add_media_root(file_name) {
    return `${mediaRoot}${dir}/${file_name}`;
  }
  let images = null;
  if (dir === "certificates") {
    images = ["cert1.jpeg", "cert2.jpeg", "cert3.jpeg"];
  } else {
    images = ["op1.png", "op2.png"];
  }
  return images.map(add_media_root);
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

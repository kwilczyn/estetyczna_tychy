let certificatesSection = document.querySelector("#certificates");
let mediaRoot = "static/media/images/"


create_slider(certificatesSection, read_images());


function read_images() {
    let images = [`${mediaRoot}cert1.jpeg`,`${mediaRoot}cert2.jpeg`,`${mediaRoot}cert3.jpeg`];
    return images;
}

function create_slider(parent, images){
    sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider");
    parent.appendChild(sliderContainer);
    for ( let i=0; i<images.length; i++){
        let image = document.createElement("img");
        image.setAttribute("src", images[i]);
        sliderContainer.appendChild(image);        
    }
    slideShow(sliderContainer);
    console.log("polazłem sobie!");
}

function slideShow(slider){
    images = slider.querySelectorAll("img");
    let currentImageIndex=0;
    images[currentImageIndex].classList.add("active");
    function showNextImage(){
        images[currentImageIndex].classList.remove("active");
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add("active");
    }
    setInterval(showNextImage, 3000); 
}
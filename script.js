const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// API
let imgsToLoad = 5;
const apiKey = 'JBuclAQo09X9ExCnS4FIoE01YA0TZQCm80eXfs-LRPQ';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgsToLoad}`;

const changeImgNumberToLoad = number => {
  if (imgsToLoad !== number) {
    imgsToLoad = number;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgsToLoad}`;
  }
};

// Check if all imgs loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    changeImgNumberToLoad(30);
  }
};

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements for links & photos, add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    const linkToImg = document.createElement('a');
    setAttributes(linkToImg, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Check for load event
    img.addEventListener('load', imageLoaded);

    linkToImg.appendChild(img);
    imageContainer.appendChild(linkToImg);
  });
};

// Get photos from API
const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (err) {
    console.error(err.message);
  }
};

// If scroll near the bottom of the page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();

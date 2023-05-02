const imagesWrapper = document.querySelector(".images");

// Getting apiKey
const apiKey = "lm6LXRXyUDilPNMvBkDX5ac8YpzOTWERwRwswvnHNP0mGV1auPQ6F1KL";
// We'll load 15 images on every API call
const perPage = 15;
// Later, we'll increment the currentPage on load more button click
let = currentPage = 1;

const generateHTML = (images) => {
  // Making li of all fetched images and adding them to the existing image wrapper
  imagesWrapper.innerHTML += images.map(img =>
    `<li class="card">
    <img src="${img.src.large2x}" alt="img" />
    <div class="details">
      <div class="photographer">
        <i class="uil uil-camera"></i>
        <span>${img.photographer}</span>
      </div>
      <button><i class="uil uil-import"></i></button>
    </div>
  </li>`
    ).join("");
}

const getImages = (apiURL) => {
  // Fetching images by API call with authorization header
  fetch(apiURL, {
    headers: {Authorization: apiKey}
  }).then(res => res.json()).then(data =>{
    generateHTML(data.photos);
  })
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
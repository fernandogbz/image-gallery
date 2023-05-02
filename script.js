const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");

// API key, paginations, searchTerm variables
const apiKey = "lm6LXRXyUDilPNMvBkDX5ac8YpzOTWERwRwswvnHNP0mGV1auPQ6F1KL"; // Getting apiKey
const perPage = 15;// We'll load 15 images on every API call
let = currentPage = 1; // Later, we'll increment the currentPage on load more button click
let searchTerm = null;

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
  // Change the button state to loading while the image is fetching
  loadMoreBtn.innerText = "Loading...";
  loadMoreBtn.classList.add("disabled");
  fetch(apiURL, {
    headers: {Authorization: apiKey}
  }).then(res => res.json()).then(data =>{
    generateHTML(data.photos);
    
  loadMoreBtn.innerText = "Load More";
  loadMoreBtn.classList.remove("disabled");
  })
}

const loadMoreImages = () => {
  currentPage++; // Increment currentPage by 1
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  getImages(apiURL);
}

const loadSearchImages = (e) => {
  // If Enter key is pressed, update the current page, search term & call the getImages() function
  if(e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesWrapper.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
  }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

loadMoreBtn.addEventListener("click",loadMoreImages);
searchInput.addEventListener("keyup",loadSearchImages);
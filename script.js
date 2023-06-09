const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightbox = document.querySelector(".lightbox");
const closeBtn = lightbox.querySelector(".uil-times");
const downloadImgBtn = lightbox.querySelector(".uil-import");

// API key, paginations, searchTerm variables
const apiKey = "lm6LXRXyUDilPNMvBkDX5ac8YpzOTWERwRwswvnHNP0mGV1auPQ6F1KL"; // Getting apiKey
const perPage = 15;// We'll load 15 images on every API call
let = currentPage = 1; // Later, we'll increment the currentPage on load more button click
let searchTerm = null;

const downloadImg = (imgURL) => {
  //Converting received img to blob, creating its download link, & downloading it
  fetch(imgURL).then(res => res.blob()).then(file => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file); // URL.createObjectURL() creates URL of passed object
    a.download = new Date().getTime(); // Passing current time in miliseconds as <a> tag download value
    a.click();
  }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img ) => {
  // Showing lightbox and setting img source and name and button attribute
  lightbox.querySelector("img").src = img;
  lightbox.querySelector("span").innerText = name;
  downloadImgBtn.setAttribute("data-img", img) // Storing the image url as a btn attribute, so we can download it later
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden"; // Hide the scrollbar while lightbox is shown
}

const hideLightbox = () => {
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
}

const generateHTML = (images) => {
  // Making li of all fetched images and adding them to the existing image wrapper
  imagesWrapper.innerHTML += images.map(img =>
    `<li class="card" onclick="showLightbox('${img.photographer}', '${img.src.large2x}')">
      <img src="${img.src.large2x}" alt="img" />
      <div class="details">
        <div class="photographer">
          <i class="uil uil-camera"></i>
          <span>${img.photographer}</span>
        </div>
        <button onclick="downloadImg('${img.src.large2x}');event.stopPropagation();">
            <i class="uil uil-import"></i>
        </button>
      </div>
  </li>`
    ).join("");

    //stopPropagation() prevents propagation of the same event from being called
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
  }).catch(() => alert("Failed to load images!")); //Showing an alert if API failed for any reason
}

const loadMoreImages = () => {
  currentPage++; // Increment currentPage by 1
  // If searchTerm has some value then call API with search term else call default API
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
  getImages(apiURL);
}

const loadSearchImages = (e) => {
  // If the search input is empty, set the search term to null and return
  if(e.target.value === "") return searchTerm = null;
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
closeBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img)); // Passing btn img attribute value as argument to the downloadImg function
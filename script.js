// Getting apiKey
const apiKey = "lm6LXRXyUDilPNMvBkDX5ac8YpzOTWERwRwswvnHNP0mGV1auPQ6F1KL";
// We'll load 15 images on every API call
const perPage = 15;
// Later, we'll increment the currentPage on load more button click
let = currentPage = 1;


getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
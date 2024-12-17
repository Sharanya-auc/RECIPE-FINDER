// filter carouosel
let filterCatagories = document.querySelector(".filterCatagories");
let scrollLeft = document.querySelector(".scrollLeft");
let scrollRight = document.querySelector(".scrollRight");
let scrollAmount = 200;
function leftScoll() {
  filterCatagories.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
}
function rightScroll() {
  filterCatagories.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}
// carousel sliding
const slides = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

showSlide(currentIndex);

// cards through json data
let fetchedData = []; // Store the fetched JSON data globally
let currentPage = 1; // Tracks the current page
const limit = 7; // Number of cards to display per page

// Fetch data from JSON
fetch('jsonData.json')
  .then(res => res.json())
  .then(fetched => {
    fetchedData = fetched; // Save fetched data globally
    displayCards(); // Display cards initially
    displayPagination(); // Initialize pagination
  });

// Function to display paginated cards
function displayCards(filteredData = fetchedData) {
  const container = document.querySelector(".container");
  container.innerHTML = ""; // Clear previous cards

  // Paginate the filtered data
  const start = (currentPage - 1) * limit;
  const end = currentPage * limit;
  const paginatedData = filteredData.slice(start, end);

  // Create and display cards
  paginatedData.forEach(element => {
    const card = document.createElement('div');
    card.className = 'mainCards';
    card.innerHTML = `
      <div class="imageoverflow">
        <img class="images" src="${element.image}" width="350px" height="280px" alt="${element.title}" />
      </div>
      <div class="details">
      <h3 style="margin:5px 0 0 0">${element.title}</h3>
      <ul>
        ${element.ingredients.map(ingredient => `<li>${ingredient.name}: ${ingredient.amount}</li>`).join('')}
      </ul>
      <span>${element.instructions}</span> <br>
      <div class="wish_buy">
        <button class="add_to_cart">Add To Wishlist &nbsp; <i class="fa-solid fa-heart"></i></button>
        <button>Buy Now &nbsp;<i class="fa-solid fa-cart-shopping"></i></button>
      </div>
      </div>
    `;
    container.appendChild(card);
  });

  displayPagination(filteredData.length); // Update pagination buttons
}

// Function to display pagination buttons
function displayPagination(totalItems = fetchedData.length) {
  const pageBtns = document.querySelector('.page_btns');
  pageBtns.innerHTML = ""; // Clear existing pagination buttons

  const totalPages = Math.ceil(totalItems / limit);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('li');
    pageButton.innerText = i;
    pageButton.className = i === currentPage ? 'active' : '';
    pageButton.onclick = () => changePage(i);
    pageBtns.appendChild(pageButton);
  }
}

// Function to change page
function changePage(page) {
  currentPage = page;
  displayCards(); // Reload cards with pagination
}

// Function to filter cards by location
function filterByLocation(location) {
  currentPage = 1; // Reset to first page when filtering

  // Filter data by location
  const filteredData = location === "all" 
    ? fetchedData 
    : fetchedData.filter(item => item.location.toLowerCase() === location.toLowerCase());

  displayCards(filteredData); // Display filtered cards
}
// Function to filter cards by dietary
function filterBydietary(dietary) {
  currentPage = 1; // Reset to first page when filtering

  // Filter data by location
  const filteredData = dietary === "all" 
    ? fetchedData 
    : fetchedData.filter(item => item.dietary.toLowerCase() === dietary.toLowerCase());

  displayCards(filteredData); // Display filtered cards
  const carousel = document.querySelector('.carousel');
  const hearder_section = document.querySelector('.hearder_section');
  const container = document.querySelector(".container");
  carousel.style.display = 'none';
  hearder_section.style.top = '0px';
  // container.style.bottom = '100px';
}

// Function to search dishes by name
function searchDish() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase(); // User input
  const filteredData = fetchedData.filter(item => 
    item.title.toLowerCase().includes(searchInput)
  );

  thisPage = 1; // Reset to page 1 for search results
  displayCards(filteredData);
  loadPagination(filteredData);
  // const carousel = document.querySelector('.carousel');
  // carousel.style.display = 'none';
}

// go top btn activing
function goToTop() {
  const goTop = document.querySelector('.goTop');
  if (window.scrollY > 0) {
      goTop.style.display = 'none';
  } else {
      goTop.style.display = 'block';
  }
}

// signup block
let signupBtn = document.querySelector('.signup');
let popupOverlay = document.querySelector('.popup-overlay');
let closeBtn = document.querySelector('.close-btn');

signupBtn.addEventListener('click', function(e) {
  e.preventDefault();
  popupOverlay.style.display = 'flex';
});

closeBtn.addEventListener('click', function() {
  popupOverlay.style.display = 'none';
});

let signupHeader = document.getElementById('signup-header');
let loginHeader = document.getElementById('login-header');
let signupForm = document.getElementById('signup-form');
let loginForm = document.getElementById('login-form');

signupHeader.addEventListener('click', function() {
  signupHeader.classList.add('active');
  loginHeader.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});

loginHeader.addEventListener('click', function() {
  loginHeader.classList.add('active');
  signupHeader.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});

// menu bar toggel 
const menubar = document.querySelector('.menubar');
const responsive_bar = document.querySelector('.responsive_bar');
menubar.addEventListener("click" , ()=>{
  responsive_bar.classList.toggle("show");
    popupOverlay.style.display = 'flex';
})
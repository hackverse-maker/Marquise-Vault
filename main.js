let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () =>{
    search.classList.toggle('active');
}

// Hero Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlideIndex = index;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    showSlide(index);
}

// Auto-rotate slider every 3 seconds
setInterval(nextSlide, 3000);

// Authentication Modal Functionality
const authModal = document.getElementById('auth-modal');
const userBtn = document.getElementById('user-btn');
const authClose = document.getElementById('auth-close');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

// Open modal when user button is clicked
userBtn.addEventListener('click', () => {
    authModal.classList.add('active');
});

// Close modal when close button is clicked
authClose.addEventListener('click', () => {
    authModal.classList.remove('active');
});

// Close modal when clicking outside the modal content
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

// Toggle between Sign In and Sign Up forms
function toggleAuthForm(e) {
    e.preventDefault();
    signinForm.classList.toggle('active');
    signupForm.classList.toggle('active');
}

// Handle form submissions
const signinFormElement = signinForm.querySelector('form');
const signupFormElement = signupForm.querySelector('form');

signinFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    // Placeholder authentication logic
    if (email && password) {
        alert(`Welcome back! Logged in as: ${email}`);
        authModal.classList.remove('active');
        signinFormElement.reset();
    }
});

signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    // Placeholder authentication logic
    if (username && email && password && confirm) {
        if (password === confirm) {
            alert(`Account created successfully!\nWelcome, ${username}!`);
            authModal.classList.remove('active');
            signupFormElement.reset();
        } else {
            alert('Passwords do not match!');
        }
    }
});
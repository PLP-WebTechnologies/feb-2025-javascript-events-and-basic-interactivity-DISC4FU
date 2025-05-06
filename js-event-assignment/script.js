// DOM Elements
const colorChangeBtn = document.getElementById('colorChangeBtn');
const secretBtn = document.getElementById('secretBtn');
const gallery = document.querySelector('.gallery');
const galleryImages = gallery.querySelectorAll('img');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Color Change Button
let clickCount = 0;
const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
const messages = ['Click Me!', 'Keep Clicking!', 'Almost There!', 'One More!', 'Reset!'];

colorChangeBtn.addEventListener('click', () => {
    clickCount = (clickCount + 1) % colors.length;
    colorChangeBtn.style.backgroundColor = colors[clickCount];
    colorChangeBtn.textContent = messages[clickCount];
});

// Secret Button (Double Click)
let lastClick = 0;
secretBtn.addEventListener('click', (e) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClick;
    
    if (timeDiff < 300) { // Double click detected
        secretBtn.style.transform = 'scale(1.2) rotate(360deg)';
        secretBtn.style.backgroundColor = '#e74c3c';
        secretBtn.textContent = 'Secret Found! 🎉';
        
        setTimeout(() => {
            secretBtn.style.transform = '';
            secretBtn.style.backgroundColor = '';
            secretBtn.textContent = 'Find the Secret!';
        }, 1000);
    }
    
    lastClick = currentTime;
});

// Long Press Detection
let pressTimer;
secretBtn.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        secretBtn.style.transform = 'scale(0.9)';
        secretBtn.style.backgroundColor = '#2ecc71';
        secretBtn.textContent = 'Long Press! 🌟';
    }, 1000);
});

secretBtn.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
    setTimeout(() => {
        secretBtn.style.transform = '';
        secretBtn.style.backgroundColor = '';
        secretBtn.textContent = 'Find the Secret!';
    }, 500);
});

// Image Gallery
let currentImageIndex = 0;

function showImage(index) {
    galleryImages.forEach(img => img.classList.remove('active'));
    galleryImages[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
});

// Auto-advance gallery
setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
}, 5000);

// Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active states
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validateField(input) {
    const errorElement = input.nextElementSibling;
    let isValid = true;
    let errorMessage = '';

    if (input.value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && !emailRegex.test(input.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (input.type === 'password' && !passwordRegex.test(input.value)) {
        isValid = false;
        errorMessage = 'Password must be at least 8 characters long and contain both letters and numbers';
    }

    if (!isValid) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    } else {
        errorElement.style.display = 'none';
        input.style.borderColor = '#2ecc71';
    }

    return isValid;
}

// Real-time validation
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateField(input);
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! 🎉';
            contactForm.reset();
            formInputs.forEach(input => {
                input.style.borderColor = '#ddd';
            });
            
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
}); 
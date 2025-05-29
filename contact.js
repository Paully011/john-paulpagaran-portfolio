// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

async function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData.entries());
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Simulate API call (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('Form submission error:', error);
        
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Notification system
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        background-color: var(--card-background);
        color: var(--text-color);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #00C851;
    }
    
    .notification.error {
        border-left: 4px solid #ff4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: #00C851;
    }
    
    .notification.error i {
        color: #ff4444;
    }
`;
document.head.appendChild(style);

// Form validation
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    // Real-time validation
    input.addEventListener('input', () => {
        validateInput(input);
    });
    
    // Blur validation
    input.addEventListener('blur', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (input.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            errorMessage = 'Please enter a valid email address';
            break;
            
        case 'text':
            isValid = value.length >= 2;
            errorMessage = 'This field must be at least 2 characters long';
            break;
            
        case 'textarea':
            isValid = value.length >= 10;
            errorMessage = 'Message must be at least 10 characters long';
            break;
    }
    
    // Update input state
    input.setCustomValidity(isValid ? '' : errorMessage);
    
    // Show/hide error message
    const errorElement = input.parentElement.querySelector('.error-message') || 
                        createErrorElement(input);
    
    if (!isValid && value !== '') {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    } else {
        errorElement.style.display = 'none';
    }
}

function createErrorElement(input) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: none;
    `;
    input.parentElement.appendChild(errorElement);
    return errorElement;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation
document.querySelectorAll('.contact-info, .contact-form, .map-container').forEach(element => {
    observer.observe(element);
}); 
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION ACTIVE STATE =====
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // ===== SCROLL ANIMATIONS =====
    // Add fade-in animation to elements as they scroll into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animatedElements = document.querySelectorAll('.secondary-images, #about-section, #contact-section, #services, #pricing, .contact-information');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ===== BACK TO TOP BUTTON =====
    // Create and add back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button based on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.querySelector('#contact-section form');
    
    if (contactForm) {
        // Add error message spans to each form group
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            group.appendChild(errorSpan);
        });

        // Add success message div
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = '✓ Thank you for your message! We\'ll get back to you soon.';
        contactForm.appendChild(successDiv);

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            const errorMessages = contactForm.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
                msg.textContent = '';
            });

            const inputs = contactForm.querySelectorAll('.form-control');
            inputs.forEach(input => input.classList.remove('error'));

            let isValid = true;

            // Validate name
            const nameInput = document.getElementById('exampleInputName');
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }

            // Validate email
            const emailInput = document.getElementById('exampleInputEmail');
            if (emailInput) {
                const emailValue = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailValue === '') {
                    showError(emailInput, 'Please enter your email');
                    isValid = false;
                } else if (!emailRegex.test(emailValue)) {
                    showError(emailInput, 'Please enter a valid email address');
                    isValid = false;
                }
            }

            // Validate phone
            const phoneInput = document.getElementById('exampleInputPhone');
            if (phoneInput && phoneInput.value.trim() === '') {
                showError(phoneInput, 'Please enter your phone number');
                isValid = false;
            }

            // Validate message
            const messageInput = document.getElementById('exampleFormControlMessage');
            if (messageInput && messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter a message');
                isValid = false;
            }

            // If form is valid, show success message
            if (isValid) {
                // Hide form
                contactForm.querySelectorAll('.form-group, .btn').forEach(el => {
                    el.style.display = 'none';
                });

                // Show success message
                successDiv.style.display = 'block';

                // Scroll to success message
                successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.querySelectorAll('.form-group, .btn').forEach(el => {
                        el.style.display = 'block';
                    });
                    successDiv.style.display = 'none';
                }, 5000);
            }
        });

        // Helper function to show error messages
        function showError(input, message) {
            input.classList.add('error');
            const errorSpan = input.parentElement.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = message;
                errorSpan.style.display = 'block';
            }
        }

        // Remove error styling when user starts typing
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorSpan = this.parentElement.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.style.display = 'none';
                }
            });
        });
    }

    // ===== IMAGE LAZY LOADING ENHANCEMENT =====
    // Add loading="lazy" to images for better performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // ===== NAVBAR MOBILE CLOSE =====
    // Close mobile navbar when clicking a link
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    // Handle any anchor links smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
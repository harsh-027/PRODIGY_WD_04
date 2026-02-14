document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Progress Bar Animation on Scroll ---
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.skill-item');
    let animated = false;

    const animateSkills = () => {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !animated) {
            progressBars.forEach(item => {
                const percent = item.getAttribute('data-percent');
                const bar = item.querySelector('.progress-bar');
                bar.style.width = percent + '%';
            });
            animated = true;
        }
    };

    window.addEventListener('scroll', animateSkills);

    // --- Form Validation ---
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Name Validation
            const name = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (name.value.trim() === '') {
                nameError.textContent = 'Name is required';
                name.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                nameError.textContent = '';
                name.style.borderColor = '#ddd';
            }

            // Email Validation
            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email.value.trim() === '') {
                emailError.textContent = 'Email is required';
                email.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (!emailPattern.test(email.value)) {
                emailError.textContent = 'Please enter a valid email';
                email.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                emailError.textContent = '';
                email.style.borderColor = '#ddd';
            }

            // Message Validation
            const message = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (message.value.trim() === '') {
                messageError.textContent = 'Message is required';
                message.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                messageError.textContent = '';
                message.style.borderColor = '#ddd';
            }

            if (isValid) {
                // Simulate form submission
                const btn = form.querySelector('.btn-submit');
                const originalText = btn.textContent;
                
                btn.textContent = 'Sending...';
                btn.style.opacity = '0.7';
                
                setTimeout(() => {
                    btn.textContent = 'Message Sent!';
                    btn.style.backgroundColor = 'var(--accent-color)';
                    btn.style.opacity = '1';
                    btn.style.color = 'white';
                    
                    form.reset();
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = 'var(--text-color)';
                    }, 3000);
                }, 1500);
            }
        });
    }

    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in to cards and sections
    const fadeElements = document.querySelectorAll('.project-card, .about-text, .about-stats, .contact-info, .form-group');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

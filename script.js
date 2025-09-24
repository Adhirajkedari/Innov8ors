document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            const nav = document.querySelector('.nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Optional: Close nav when clicking outside (for mobile)
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Adjust this value: percentage of section visible to be considered active
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) { // Only observe sections that have an ID for navigation
            sectionObserver.observe(section);
        }
    });
});
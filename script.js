document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const updateHeaderOnScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeaderOnScroll);

    // Number Counter Animation
    const counters = document.querySelectorAll('.number');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counter animation when about section is in view
    let counted = false;
    const aboutSection = document.querySelector('.about-section');
    
    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        const sectionTop = aboutSection.getBoundingClientRect().top;

        if(sectionTop < triggerBottom && !counted) {
            animateCounters();
            counted = true;
        }
    };

    window.addEventListener('scroll', checkScroll);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

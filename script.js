document.addEventListener('DOMContentLoaded', () => {

    // 1. UTM PARAMETER CAPTURE
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || '';
    const utmMedium = urlParams.get('utm_medium') || '';
    const utmCampaign = urlParams.get('utm_campaign') || '';

    // Inject into all form hidden fields
    document.querySelectorAll('.utm_source').forEach(el => el.value = utmSource);
    document.querySelectorAll('.utm_medium').forEach(el => el.value = utmMedium);
    document.querySelectorAll('.utm_campaign').forEach(el => el.value = utmCampaign);
    // Hero form specific IDs
    if(document.getElementById('utm_source')) document.getElementById('utm_source').value = utmSource;
    if(document.getElementById('utm_medium')) document.getElementById('utm_medium').value = utmMedium;
    if(document.getElementById('utm_campaign')) document.getElementById('utm_campaign').value = utmCampaign;

    // 2. GTM / DATA LAYER INITIALIZATION
    window.dataLayer = window.dataLayer || [];

    // 3. SCROLL DEPTH TRACKING
    let scrollFlags = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener('scroll', () => {
        let scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        [25, 50, 75, 100].forEach(mark => {
            if (scrollPercent >= mark && !scrollFlags[mark]) {
                scrollFlags[mark] = true;
                window.dataLayer.push({
                    'event': 'scroll_depth',
                    'scroll_percentage': mark
                });
            }
        });
    });

    // 4. CLICK TRACKING
    document.querySelectorAll('.track-call').forEach(el => {
        el.addEventListener('click', () => {
            window.dataLayer.push({'event': 'mobile_bar_call_click'});
        });
    });

    document.querySelectorAll('.track-whatsapp').forEach(el => {
        el.addEventListener('click', () => {
            window.dataLayer.push({'event': 'mobile_bar_whatsapp_click'});
        });
    });

    document.querySelectorAll('.track-quote').forEach(el => {
        el.addEventListener('click', () => {
            window.dataLayer.push({'event': 'mobile_bar_quote_click'});
        });
    });

    // 5. FORM SUBMISSION HANDLING (GOOGLE FORMS INTEGRATION)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formId = form.id;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Visual feedback (Sending state)
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        // Map budget values from HTML value to Google Forms exact string
        const budgetMap = {
            '3-5L': '₹3L - ₹5L',
            '5-10L': '₹5L - ₹10L',
            '10-15L': '₹10L - ₹15L',
            '15L+': '₹15L+'
        };
        const rawBudget = formData.get('budget');
        const mappedBudget = budgetMap[rawBudget] || rawBudget;

        // Construct Google Forms payload
        const googleFormData = new URLSearchParams();
        googleFormData.append('entry.301260111', formData.get('name') || '');
        googleFormData.append('entry.1788060447', formData.get('phone') || '');
        googleFormData.append('entry.852339436', mappedBudget || '');

        try {
            // Send data via Google Forms POST quietly (no-cors)
            await fetch("https://docs.google.com/forms/d/e/1FAIpQLSeqIJ1eMi0aUfGk05c1kUQPwm6-C8dX9-LNfjRb-oj0GoAiPA/formResponse", {
                method: "POST",
                body: googleFormData,
                mode: "no-cors"
            });

            // If we reach here, it successfully sent (since no-cors hides errors anyway)
            // Show Success Modal
            document.getElementById('success-modal').style.display = 'flex';
            form.reset();
            
            // Push conversion event to GTM
            window.dataLayer.push({
                'event': 'form_submission',
                'form_id': formId
            });
        } catch (error) {
            console.error("Submission error:", error);
            alert("Connection error. Please check your internet and try again.");
        } finally {
            // Restore button state
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    };

    document.getElementById('hero-form').addEventListener('submit', handleFormSubmit);
    if(document.getElementById('final-form')) document.getElementById('final-form').addEventListener('submit', handleFormSubmit);

    // Global Modal Close
    window.closeModal = () => {
        document.getElementById('success-modal').style.display = 'none';
    };

    // 6. PORTFOLIO DATA & TABS
    const portfolioData = [
        // LIVING ROOM
        { id: 1, category: 'Living Room', caption: 'Whitefield, Bangalore · Completed in 40 Days', img: 'hero_luxury_living_room_1775745353880.png' },
        { id: 2, category: 'Living Room', caption: 'Koramangala, Bangalore · Completed in 44 Days', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80' },
        { id: 3, category: 'Living Room', caption: 'Jayanagar, Bangalore · Completed in 45 Days', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80' },
        { id: 4, category: 'Living Room', caption: 'Indiranagar, Bangalore · Completed in 35 Days', img: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&q=80' },
        { id: 5, category: 'Living Room', caption: 'Whitefield, Bangalore · Completed in 50 Days', img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80' },
        { id: 6, category: 'Living Room', caption: 'HSR Layout, Bangalore · Completed in 40 Days', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80' },

        // BEDROOM
        { id: 7, category: 'Bedroom', caption: 'Indiranagar, Bangalore · Completed in 35 Days', img: 'modern_bedroom_interior_1775745376504.png' },
        { id: 8, category: 'Bedroom', caption: 'Malleswaram, Bangalore · Completed in 30 Days', img: 'bd2.png' },
        { id: 9, category: 'Bedroom', caption: 'Hebbal, Bangalore · Completed in 35 Days', img: 'bd3.jpg' },
        { id: 10, category: 'Bedroom', caption: 'Bellandur, Bangalore · Completed in 30 Days', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80' },
        { id: 11, category: 'Bedroom', caption: 'JP Nagar, Bangalore · Completed in 28 Days', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80' },
        { id: 12, category: 'Bedroom', caption: 'Whitefield, Bangalore · Completed in 30 Days', img: 'bd6.png' },

        // KITCHEN
        { id: 13, category: 'Kitchen', caption: 'HSR Layout, Bangalore · Completed in 30 Days', img: 'modular_kitchen_interior_1775745393866.png' },
        { id: 14, category: 'Kitchen', caption: 'Marathahalli, Bangalore · Completed in 25 Days', img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80' },
        { id: 15, category: 'Kitchen', caption: 'Bellandur, Bangalore · Completed in 30 Days', img: 'kt3.png' },
        { id: 16, category: 'Kitchen', caption: 'Yelahanka, Bangalore · Completed in 35 Days', img: 'kt4.jpg' },
        { id: 17, category: 'Kitchen', caption: 'Sarjapur, Bangalore · Completed in 20 Days', img: 'modular_kitchen_interior_1775745393866.png' },
        { id: 18, category: 'Kitchen', caption: 'KR Puram, Bangalore · Completed in 25 Days', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80' },

        // BATHROOM
        { id: 19, category: 'Bathroom', caption: 'Yeshwanthpur, Bangalore · Completed in 20 Days', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80' },
        { id: 20, category: 'Bathroom', caption: 'RT Nagar, Bangalore · Completed in 22 Days', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80' },
        { id: 21, category: 'Bathroom', caption: 'JP Nagar, Bangalore · Completed in 18 Days', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
        { id: 22, category: 'Bathroom', caption: 'Sahakar Nagar, Bangalore · Completed in 25 Days', img: 'bt4.png' },
        { id: 23, category: 'Bathroom', caption: 'Kengeri, Bangalore · Completed in 20 Days', img: 'bt5.png' },
        { id: 24, category: 'Bathroom', caption: 'BTM Layout, Bangalore · Completed in 22 Days', img: 'bt6.png' },

        // FULL HOME
        { id: 25, category: 'Full Home', caption: 'Kanakapura, Bangalore · Completed in 45 Days', img: 'l1.png' },
        { id: 26, category: 'Full Home', caption: 'Whitefield, Bangalore · Completed in 50 Days', img: 'l2.jpg' },
        { id: 27, category: 'Full Home', caption: 'Sarjapur, Bangalore · Completed in 40 Days', img: 'l3.jpg' },
        { id: 28, category: 'Full Home', caption: 'Electronic City, Bangalore · Completed in 45 Days', img: 'l4.jpg' },
        { id: 29, category: 'Full Home', caption: 'Majestic, Bangalore · Completed in 50 Days', img: 'l5.jpg' },
        { id: 30, category: 'Full Home', caption: 'Banashankari, Bangalore · Completed in 42 Days', img: 'l6.png' }
    ];

    const portfolioGrid = document.getElementById('portfolio-grid');
    const tabs = document.querySelectorAll('.tab-btn');

    function renderPortfolio(category = 'Living Room') {
        portfolioGrid.innerHTML = '';
        const filtered = category === 'All' ? portfolioData : portfolioData.filter(item => item.category === category);
        
        filtered.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'portfolio-card fade-in active';
            div.onclick = () => openLightbox(item.img, item.caption);
            div.innerHTML = `
                <div class="portfolio-img-box">
                    <img src="${item.img}" alt="${item.category} by Best Interior Designers in Bangalore - ${item.caption}">
                </div>
                <div class="portfolio-info">
                    <p>${item.caption}</p>
                </div>
            `;
            portfolioGrid.appendChild(div);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderPortfolio(tab.dataset.category);
        });
    });

    renderPortfolio('Living Room'); // Initial load

    // 7. LIGHTBOX LOGIC
    window.openLightbox = (imgSrc, captionTxt) => {
        const lightbox = document.getElementById('lightbox');
        document.getElementById('lightbox-img').src = imgSrc;
        document.getElementById('lightbox-caption').innerText = captionTxt;
        lightbox.style.display = 'flex';
    };

    window.closeLightbox = () => {
        document.getElementById('lightbox').style.display = 'none';
    };

    // 8. TESTIMONIALS DATA & SLIDER
    const testimonials = [
        { 
            name: "Ellappan S", 
            area: "Bangalore", 
            stars: "⭐⭐⭐⭐⭐", 
            text: "I recently worked with The Neo Studio, and the experience has been nothing short of exceptional. From the very first consultation, the team demonstrated a rare combination of creativity, professionalism, and absolute transparency.",
            img: "1.png"
        },
        { 
            name: "Prasad Pai", 
            area: "Bangalore", 
            stars: "⭐⭐⭐⭐⭐", 
            text: "I had a great experience working with The Neo Studio. The team is extremely professional, creative, and transparent throughout the entire design process. I’d definitely recommend them to anyone looking for a trustworthy and talented interior design team in Bangalore.",
            img: "2.png"
        },
        { 
            name: "Mathu Mathi", 
            area: "Bangalore", 
            stars: "⭐⭐⭐⭐⭐", 
            text: "The Neo Studio impressed us with their attention to detail and design maturity. We appreciated how they balanced luxury with practicality, ensuring the space looked elegant but remained comfortable for everyday living.",
            img: "3.png"
        },
        { 
            name: "Harisshganth", 
            area: "Bangalore", 
            stars: "⭐⭐⭐⭐⭐", 
            text: "Working with The Neo Studio has been a refreshing experience because of their complete transparency. What impressed me most was how they shared every stage of the project through their live-tracking app.",
            img: "4.png"
        }
    ];

    const slider = document.getElementById('testimonial-slider');
    testimonials.forEach(t => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="review-image">
                <img src="${t.img}" alt="Testimonial for Home Interior Designers in Bangalore from ${t.name}">
            </div>
            <div class="review-content">
                <div class="review-stars">
                    <i data-lucide="star" fill="currentColor" stroke="currentColor"></i>
                    <i data-lucide="star" fill="currentColor" stroke="currentColor"></i>
                    <i data-lucide="star" fill="currentColor" stroke="currentColor"></i>
                    <i data-lucide="star" fill="currentColor" stroke="currentColor"></i>
                    <i data-lucide="star" fill="currentColor" stroke="currentColor"></i>
                </div>
                <p class="review-text">${t.text}</p>
                <div class="review-author">
                    <h4>${t.name}</h4>
                    <p>${t.area}</p>
                </div>
            </div>
        `;
        slider.appendChild(card);
    });
    lucide.createIcons();

    let currentSlide = 0;
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentSlide < testimonials.length - 1) currentSlide++;
        else currentSlide = 0;
        updateSlider();
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentSlide > 0) currentSlide--;
        else currentSlide = testimonials.length - 1;
        updateSlider();
    });

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // 9. FAQ ACCORDION LOGIC
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const currentlyExpanded = document.querySelector('.accordion-item.expanded');
            if (currentlyExpanded && currentlyExpanded !== item) {
                currentlyExpanded.classList.remove('expanded');
            }
            item.classList.toggle('expanded');
        });
    });

    // 10. SCROLL REVEAL & STATS COUNTER ANIMATION
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate Numbers
                if (entry.target.classList.contains('counter') && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = +entry.target.getAttribute('data-target');
                    let count = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    const updateCount = () => {
                        count += increment;
                        let suffix = '+';
                        if (target === 45) suffix = '';

                        if (count < target) {
                            entry.target.innerText = Math.ceil(count).toLocaleString() + suffix;
                            requestAnimationFrame(updateCount);
                        } else {
                            entry.target.innerText = target.toLocaleString() + suffix;
                        }
                    };
                    updateCount();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal, .fade-in, .fade-in-right, .counter').forEach(el => {
        observer.observe(el);
    });

    // 11. ASSET PROTECTION (Disable Right-click & Common Shortcuts)
    // Part of the "protecting site assets" goal from session 37b1634e
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' || e.target.closest('.video-container')) {
            e.preventDefault();
            return false;
        }
    });

    document.addEventListener('keydown', (e) => {
        // Disable Ctrl+S, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+C
        if (
            (e.ctrlKey && (e.key === 's' || e.key === 'u')) ||
            (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'c' || e.key === 'C' || e.key === 'j' || e.key === 'J')) ||
            (e.key === 'F12')
        ) {
            e.preventDefault();
            return false;
        }
    });

    // 4. WHY NEO SEARCH SPOTLIGHT EFFECT
    const whyCards = document.querySelectorAll('.why-item');
    whyCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

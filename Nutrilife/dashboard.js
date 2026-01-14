// Dashboard interactive functionality

// Update welcome message with user name if available
document.addEventListener('DOMContentLoaded', function() {
    // Get user name from localStorage or use default
    const userName = localStorage.getItem('userName') || 'Demo User';
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.textContent = `Welcome back, ${userName}! 👋`;
    }

    // Update progress bar animation
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Animate progress bar on load
        setTimeout(() => {
            progressFill.style.transition = 'width 1s ease-in-out';
        }, 100);
    }

    // Handle meal view buttons
    const mealViewButtons = document.querySelectorAll('.meal-view-btn');
    mealViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mealItem = this.closest('.meal-item');
            const mealName = mealItem.querySelector('.meal-name').textContent;
            console.log('Viewing meal:', mealName);
            // Add your meal detail view logic here
            alert(`Viewing details for: ${mealName}`);
        });
    });

    // Handle quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const label = this.querySelector('.quick-action-label').textContent;
            console.log('Quick action:', label);
            
            if (label === 'Track Your Meals') {
                // Scroll to track meals section or open modal
                const trackSection = document.querySelector('.cta-green');
                if (trackSection) {
                    trackSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else if (label === 'Get Recommendations') {
                // Scroll to recommendations section or open modal
                const recSection = document.querySelector('.cta-blue');
                if (recSection) {
                    recSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    // Handle CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ctaCard = this.closest('.cta-card');
            const ctaTitle = ctaCard.querySelector('.cta-title').textContent;
            
            if (ctaTitle === 'Track Your Meals') {
                console.log('Opening meal tracking...');
                alert('Meal tracking feature coming soon!');
            } else if (ctaTitle === 'Get Recommendations') {
                console.log('Getting recommendations...');
                alert('AI recommendations feature coming soon!');
            }
        });
    });

    // Handle full plan button
    const fullPlanBtn = document.querySelector('.full-plan-btn');
    if (fullPlanBtn) {
        fullPlanBtn.addEventListener('click', function() {
            console.log('Viewing full diet plan...');
            alert('Full diet plan feature coming soon!');
        });
    }

    // Handle navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // If it's a link to another page, let it navigate normally
            if (this.href && (this.href.includes('dashboard.html') || this.href.includes('diet-plan.html') || this.href.includes('appointments.html') || this.href.includes('leaderboard.html') || this.href.includes('dietician.html'))) {
                return; // Allow normal navigation
            }
            
            // For other items, prevent default and show message
            if (this.href === '#' || !this.href) {
                e.preventDefault();
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                const navText = this.querySelector('span').textContent;
                console.log('Navigating to:', navText);
                alert(`${navText} feature coming soon!`);
            }
        });
    });

    // Animate metric cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe metric cards
    document.querySelectorAll('.metric-card, .content-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Update calorie consumption (example dynamic update)
    updateCalorieProgress();
});

// Function to update calorie progress
function updateCalorieProgress() {
    const consumed = 1450;
    const target = 2200;
    const percentage = Math.round((consumed / target) * 100);
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    // Update consumed text
    const consumedText = document.querySelector('.metric-value-small');
    if (consumedText) {
        consumedText.textContent = `${consumed.toLocaleString()} consumed`;
    }
}

// Function to simulate real-time updates (optional)
function simulateRealTimeUpdates() {
    setInterval(() => {
        // This could update metrics in real-time
        // For now, it's just a placeholder
        console.log('Updating dashboard metrics...');
    }, 60000); // Update every minute
}

// Initialize real-time updates (optional - uncomment if needed)
// simulateRealTimeUpdates();

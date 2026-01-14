// Diet Plan interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Download PDF button
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Downloading PDF...');
            // In a real application, this would generate and download a PDF
            alert('PDF download feature coming soon! This would generate a PDF of your diet plan.');
            
            // Simulate download (you can implement actual PDF generation here)
            // Example: window.open('data:application/pdf;base64,...', '_blank');
        });
    }

    // Regenerate Plan button
    const regenerateBtn = document.querySelector('.btn-regenerate');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', function() {
            const confirmed = confirm('Are you sure you want to regenerate your diet plan? This will create a new plan based on your current goals.');
            
            if (confirmed) {
                // Disable button and show loading state
                this.disabled = true;
                const originalText = this.innerHTML;
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="spinning">
                        <path d="M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C12.209 3 14.209 4.209 15.5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M17 2V6H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Regenerating...
                `;
                
                // Simulate API call
                setTimeout(() => {
                    alert('Your diet plan has been regenerated! The page will refresh to show your new plan.');
                    // In a real application, you would reload the data or redirect
                    // window.location.reload();
                    
                    // Reset button
                    this.disabled = false;
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    }

    // Add animation to meal cards on scroll
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

    // Observe meal cards
    document.querySelectorAll('.meal-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('.diet-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove active class from all rows
            tableRows.forEach(r => r.classList.remove('active'));
            // Add active class to clicked row
            this.classList.add('active');
            
            const day = this.querySelector('.day-cell').textContent;
            console.log('Selected day:', day);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Calculate and update nutrition summary based on selected meals
    updateNutritionSummary();
});

// Function to update nutrition summary (can be enhanced with real data)
function updateNutritionSummary() {
    // In a real application, this would calculate totals from selected meals
    const summary = {
        calories: 2200,
        protein: 165,
        carbs: 220,
        fats: 65
    };

    // Animate numbers on load
    animateValue('.summary-box:nth-child(1) .summary-value', 0, summary.calories, 1000);
    animateValue('.summary-box:nth-child(2) .summary-value', 0, summary.protein, 1000, 'g');
    animateValue('.summary-box:nth-child(3) .summary-value', 0, summary.carbs, 1000, 'g');
    animateValue('.summary-box:nth-child(4) .summary-value', 0, summary.fats, 1000, 'g');
}

// Function to animate numeric values
function animateValue(selector, start, end, duration, suffix = '') {
    const element = document.querySelector(selector);
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

// Add CSS for spinning animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spinning {
        animation: spin 1s linear infinite;
    }
    .diet-table tbody tr.active {
        background-color: #F0FDF4 !important;
        border-left: 3px solid var(--primary-green);
    }
`;
document.head.appendChild(style);

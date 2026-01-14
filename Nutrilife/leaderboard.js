// Leaderboard interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    const monthBtn = document.querySelector('.btn-month');
    const prevMonthsBtn = document.querySelector('.btn-secondary');
    const rankingRows = document.querySelectorAll('.ranking-row');

    // Month selector button
    if (monthBtn) {
        monthBtn.addEventListener('click', function() {
            console.log('Opening month selector...');
            // In a real application, this would open a date picker
            alert('Month selector feature - would open a calendar picker');
        });
    }

    // View Previous Months button
    if (prevMonthsBtn) {
        prevMonthsBtn.addEventListener('click', function() {
            console.log('Viewing previous months...');
            alert('Previous months feature - would show historical leaderboards');
        });
    }

    // Animate progress bars on load
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });

    // Animate ranking rows on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    // Observe ranking rows
    rankingRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            observer.observe(row);
        }, index * 50);
    });

    // Animate podium cards
    const podiumCards = document.querySelectorAll('.podium-card');
    podiumCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Highlight user's rank on scroll
    const userRank = document.querySelector('.user-rank');
    if (userRank) {
        const scrollToUser = () => {
            userRank.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };

        // Add a button or auto-scroll after a delay
        setTimeout(() => {
            // Optional: Auto-scroll to user rank after 2 seconds
            // scrollToUser();
        }, 2000);
    }

    // Add click handler to ranking rows for details
    rankingRows.forEach(row => {
        row.addEventListener('click', function() {
            const rank = this.dataset.rank;
            const name = this.querySelector('.rank-name').textContent.trim();
            console.log(`Viewing details for rank #${rank}: ${name}`);
            // In a real application, this would show user profile or details
        });

        // Add cursor pointer
        row.style.cursor = 'pointer';
    });

    // Animate achievement items
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });

    // Animate category items
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Update progress stats dynamically (if needed)
    updateProgressStats();
});

// Function to update progress stats
function updateProgressStats() {
    // In a real application, this would fetch data from an API
    const stats = {
        streak: 22,
        rank: 12,
        totalUsers: 150
    };

    // Animate number counting
    const streakValue = document.querySelector('.stat-value');
    if (streakValue && streakValue.textContent.includes('days')) {
        animateNumber(streakValue, 0, stats.streak, 1000, ' days');
    }
}

// Function to animate number counting
function animateNumber(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Add smooth scroll behavior
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

// Appointments page interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.btn-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dietitianCards = document.querySelectorAll('.dietitian-card');
    const joinBtn = document.querySelector('.btn-join');
    const viewSlotsButtons = document.querySelectorAll('.btn-slots');

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter;

        dietitianCards.forEach(card => {
            const name = card.dataset.name;
            const specialty = card.dataset.specialty;
            const available = card.dataset.available;
            const price = parseInt(card.dataset.price);

            let matchesSearch = true;
            let matchesFilter = true;

            // Search filter
            if (searchTerm) {
                matchesSearch = name.includes(searchTerm) || specialty.includes(searchTerm);
            }

            // Quick filter
            if (activeFilter) {
                switch (activeFilter) {
                    case 'today':
                        // Check if available today (simplified - in real app, check actual date)
                        matchesFilter = available.includes(getTodayDay().toLowerCase());
                        break;
                    case 'weekend':
                        matchesFilter = available.includes('sat') || available.includes('sun');
                        break;
                    case 'video':
                        // All support video consultation in this example
                        matchesFilter = true;
                        break;
                    case 'budget':
                        matchesFilter = price <= 50;
                        break;
                    default:
                        matchesFilter = true;
                }
            }

            // Show/hide card
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Show message if no results
        const visibleCards = Array.from(dietitianCards).filter(card => card.style.display !== 'none');
        if (visibleCards.length === 0) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    }

    // Get today's day name
    function getTodayDay() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    }

    // Show no results message
    function showNoResultsMessage() {
        let noResultsMsg = document.getElementById('noResultsMessage');
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMessage';
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.textContent = 'No dietitians found matching your criteria.';
            document.getElementById('dietitiansList').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    }

    // Hide no results message
    function hideNoResultsMessage() {
        const noResultsMsg = document.getElementById('noResultsMessage');
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }

    // Search input event
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Search button click
    searchBtn.addEventListener('click', performSearch);

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
            performSearch();
        });
    });

    // Join Consultation button
    if (joinBtn) {
        joinBtn.addEventListener('click', function() {
            const appointmentCard = this.closest('.appointment-card');
            const dietitianName = appointmentCard.querySelector('.dietitian-name').textContent;
            
            console.log('Joining consultation with:', dietitianName);
            alert(`Joining consultation with ${dietitianName}...\n\nIn a real application, this would open a video call interface.`);
        });
    }

    // View Available Slots buttons
    viewSlotsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const dietitianCard = this.closest('.dietitian-card');
            const dietitianName = dietitianCard.querySelector('.dietitian-name').textContent;
            
            console.log('Viewing slots for:', dietitianName);
            alert(`Viewing available slots for ${dietitianName}...\n\nIn a real application, this would show a calendar with available time slots.`);
        });
    });

    // Initialize card animations
    dietitianCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add smooth scroll for filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Scroll to dietitians section if on mobile
            if (window.innerWidth <= 968) {
                const dietitiansSection = document.querySelector('.dietitians-section');
                if (dietitiansSection) {
                    dietitiansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});

// Add CSS for no results message
const style = document.createElement('style');
style.textContent = `
    .no-results-message {
        text-align: center;
        padding: 40px 20px;
        color: var(--text-gray);
        font-size: 16px;
        background-color: var(--bg-white);
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Dietician selection and assignment functionality

document.addEventListener('DOMContentLoaded', function() {
    const dieticianCards = document.querySelectorAll('.dietician-card');
    const confirmBtn = document.getElementById('confirmBtn');
    const assignedBanner = document.getElementById('assignedBanner');
    let selectedDietician = 'sarah-mitchell'; // Default selected

    // Handle dietician card selection
    dieticianCards.forEach(card => {
        const selectBtn = card.querySelector('.btn-select');
        const selectedBtn = card.querySelector('.btn-selected');
        
        if (selectBtn) {
            selectBtn.addEventListener('click', function() {
                selectDietician(card);
            });
        }

        // Also allow clicking the card itself
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (!e.target.closest('.btn')) {
                if (!card.classList.contains('selected')) {
                    selectDietician(card);
                }
            }
        });
    });

    // Function to select a dietician
    function selectDietician(card) {
        // Remove selected class from all cards
        dieticianCards.forEach(c => {
            c.classList.remove('selected');
            const selectBtn = c.querySelector('.btn-select');
            const selectedBtn = c.querySelector('.btn-selected');
            
            if (selectBtn && selectedBtn) {
                // Switch buttons
                selectBtn.style.display = 'flex';
                selectedBtn.style.display = 'none';
            }
        });

        // Add selected class to clicked card
        card.classList.add('selected');
        selectedDietician = card.dataset.id;
        const dieticianName = card.dataset.name;

        // Switch buttons
        const selectBtn = card.querySelector('.btn-select');
        const selectedBtn = card.querySelector('.btn-selected');
        
        if (selectBtn && selectedBtn) {
            selectBtn.style.display = 'none';
            selectedBtn.style.display = 'flex';
        }

        // Update assigned banner
        updateAssignedBanner(dieticianName);

        // Enable confirm button
        if (confirmBtn) {
            confirmBtn.disabled = false;
        }

        // Scroll to banner
        if (assignedBanner) {
            assignedBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        console.log('Selected dietician:', dieticianName);
    }

    // Update assigned banner
    function updateAssignedBanner(name) {
        if (assignedBanner) {
            const bannerText = assignedBanner.querySelector('.banner-text');
            if (bannerText) {
                bannerText.textContent = `${name} is your active dietician. You can change your assignment anytime.`;
            }
        }
    }

    // Confirm assignment button
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const selectedCard = document.querySelector('.dietician-card.selected');
            if (!selectedCard) {
                alert('Please select a dietician first.');
                return;
            }

            const dieticianName = selectedCard.dataset.name;
            const dieticianId = selectedCard.dataset.id;

            // Disable button and show loading
            this.disabled = true;
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="spinning">
                    <circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" stroke-dasharray="24" stroke-dashoffset="24">
                        <animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Confirming...
            `;

            // Simulate API call
            setTimeout(() => {
                // Store selected dietician
                localStorage.setItem('selectedDietician', JSON.stringify({
                    id: dieticianId,
                    name: dieticianName
                }));

                // Show success message
                alert(`Successfully assigned ${dieticianName} as your dietician!`);
                
                // Reset button
                this.disabled = false;
                this.innerHTML = originalText;

                // Optional: Redirect to dashboard
                // window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Load previously selected dietician
    const savedDietician = localStorage.getItem('selectedDietician');
    if (savedDietician) {
        try {
            const dietician = JSON.parse(savedDietician);
            const card = document.querySelector(`[data-id="${dietician.id}"]`);
            if (card && !card.classList.contains('selected')) {
                selectDietician(card);
            }
        } catch (e) {
            console.error('Error loading saved dietician:', e);
        }
    }

    // Animate cards on load
    dieticianCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animate flow steps
    const flowSteps = document.querySelectorAll('.flow-step');
    flowSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
    });

    // Check if confirm button should be enabled
    if (confirmBtn) {
        const hasSelected = document.querySelector('.dietician-card.selected');
        if (!hasSelected) {
            confirmBtn.disabled = true;
        }
    }
});

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
`;
document.head.appendChild(style);

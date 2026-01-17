// Initial data
const foodLog = [
    {
        id: 1,
        name: 'Oatmeal with berries',
        category: 'breakfast',
        time: '08:30 AM',
        calories: 320,
        protein: 12,
        carbs: 58,
        fats: 6
    },
    {
        id: 2,
        name: 'Greek Yogurt',
        category: 'breakfast',
        time: '08:45 AM',
        calories: 150,
        protein: 17,
        carbs: 12,
        fats: 4
    },
    {
        id: 3,
        name: 'Grilled Chicken Salad',
        category: 'lunch',
        time: '01:15 PM',
        calories: 380,
        protein: 42,
        carbs: 15,
        fats: 18
    },
    {
        id: 4,
        name: 'Apple with Almond Butter',
        category: 'snack',
        time: '04:00 PM',
        calories: 220,
        protein: 6,
        carbs: 28,
        fats: 12
    }
];

const commonFoods = [
    {
        name: 'Banana',
        calories: 105,
        protein: 1,
        carbs: 27,
        fats: 0
    },
    {
        name: 'Chicken Breast (100g)',
        calories: 165,
        protein: 31,
        carbs: 0,
        fats: 3.6
    },
    {
        name: 'Brown Rice (1 cup)',
        calories: 216,
        protein: 5,
        carbs: 45,
        fats: 2
    },
    {
        name: 'Salmon (100g)',
        calories: 208,
        protein: 20,
        carbs: 0,
        fats: 13
    },
    {
        name: 'Avocado',
        calories: 240,
        protein: 3,
        carbs: 13,
        fats: 22
    }
];

// State
let currentFoodLog = [...foodLog];
let targetCalories = 2200;

// Initialize the page
function init() {
    renderFoodEntries();
    renderCommonFoods();
    updateCalorieStats();
    attachEventListeners();
}

// Render food entries
function renderFoodEntries() {
    const foodEntriesContainer = document.getElementById('foodEntries');
    
    if (currentFoodLog.length === 0) {
        foodEntriesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-light);">
                <p>No food logged yet. Add your first meal!</p>
            </div>
        `;
        return;
    }

    foodEntriesContainer.innerHTML = currentFoodLog.map(food => `
        <div class="food-entry" data-id="${food.id}">
            <div class="food-entry-header">
                <div class="food-entry-left">
                    <div>
                        <div class="food-name">${food.name}</div>
                        <div class="food-time">${food.time}</div>
                    </div>
                    <span class="food-tag ${food.category}">${capitalizeFirst(food.category)}</span>
                </div>
                <button class="delete-btn" onclick="deleteFood(${food.id})">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4H12M4 6H16M14 6L13.5 14.5C13.5 15.3284 12.8284 16 12 16H8C7.17157 16 6.5 15.3284 6.5 14.5L6 6M9 9V13M11 9V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="food-nutrients">
                <div class="nutrient-item">
                    <span class="nutrient-value">${food.calories}</span>
                    <span class="nutrient-label">Calories</span>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-value">${food.protein}g</span>
                    <span class="nutrient-label">Protein</span>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-value">${food.carbs}g</span>
                    <span class="nutrient-label">Carbs</span>
                </div>
                <div class="nutrient-item">
                    <span class="nutrient-value">${food.fats}g</span>
                    <span class="nutrient-label">Fats</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render common foods
function renderCommonFoods() {
    const commonFoodsContainer = document.getElementById('commonFoodsList');
    
    commonFoodsContainer.innerHTML = commonFoods.map((food, index) => `
        <div class="common-food-item" data-index="${index}">
            <div class="food-info">
                <div class="food-info-name">${food.name}</div>
                <div class="food-info-details">
                    ${food.calories} cal • P: ${food.protein}g • C: ${food.carbs}g • F: ${food.fats}g
                </div>
            </div>
            <button class="add-btn" onclick="addCommonFood(${index})">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3V13" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <path d="M3 8H13" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `).join('');
}

// Update calorie statistics
function updateCalorieStats() {
    const totalConsumed = currentFoodLog.reduce((sum, food) => sum + food.calories, 0);
    const remaining = targetCalories - totalConsumed;
    const percentage = (totalConsumed / targetCalories) * 100;

    document.getElementById('consumed').textContent = totalConsumed;
    document.getElementById('target').textContent = targetCalories;
    document.getElementById('remaining').textContent = Math.max(0, remaining);
    document.getElementById('progressFill').style.width = `${Math.min(percentage, 100)}%`;
    document.getElementById('progressText').textContent = `${percentage.toFixed(1)}% of daily target`;
}

// Add common food to log
function addCommonFood(index) {
    const food = commonFoods[index];
    const now = new Date();
    const hours = now.getHours();
    let category = 'snack';
    
    // Determine meal category based on time
    if (hours >= 6 && hours < 11) {
        category = 'breakfast';
    } else if (hours >= 11 && hours < 15) {
        category = 'lunch';
    } else if (hours >= 15 && hours < 18) {
        category = 'snack';
    } else {
        category = 'dinner';
    }

    const newFood = {
        id: Date.now(),
        name: food.name,
        category: category,
        time: formatTime(now),
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fats: food.fats
    };

    currentFoodLog.push(newFood);
    renderFoodEntries();
    updateCalorieStats();
    
    // Show feedback
    showNotification(`Added ${food.name} to your food log!`);
}

// Delete food from log
function deleteFood(id) {
    const foodItem = currentFoodLog.find(food => food.id === id);
    if (foodItem && confirm(`Remove ${foodItem.name} from your food log?`)) {
        currentFoodLog = currentFoodLog.filter(food => food.id !== id);
        renderFoodEntries();
        updateCalorieStats();
        showNotification(`Removed ${foodItem.name} from your food log`);
    }
}

// Attach event listeners
function attachEventListeners() {
    // Add Food button
    document.getElementById('addFoodBtn').addEventListener('click', () => {
        showNotification('Add Food functionality coming soon!');
    });

    // Add Custom Food button
    document.getElementById('addCustomBtn').addEventListener('click', () => {
        showNotification('Add Custom Food functionality coming soon!');
    });

    // Search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            // Search functionality can be implemented here
        }
    });
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: var(--primary-green);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

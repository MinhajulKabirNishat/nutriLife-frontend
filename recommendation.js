// User health data (can be fetched from localStorage or API)
const userData = {
    currentWeight: 68,
    targetWeight: 62,
    bmi: 24.9,
    goal: 'Weight Loss',
    age: 25,
    height: 170,
    activityLevel: 'moderate',
    dietaryPreferences: 'none'
};

// State
let isGenerating = false;
let isLiked = false;
let planGenerated = false;

// Initialize the page
function init() {
    loadUserData();
    attachEventListeners();
    checkIfPlanExists();
}

// Load user data from storage or use defaults
function loadUserData() {
    // Try to get data from localStorage
    const storedData = localStorage.getItem('nutriLifeUserData');
    
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        Object.assign(userData, parsedData);
    }

    // Update UI with user data
    document.getElementById('currentWeight').textContent = `${userData.currentWeight} kg`;
    document.getElementById('targetWeight').textContent = `${userData.targetWeight} kg`;
    document.getElementById('bmi').textContent = userData.bmi;
    document.getElementById('goalBadge').textContent = userData.goal;
}

// Check if plan already exists
function checkIfPlanExists() {
    const existingPlan = localStorage.getItem('nutriLifeDietPlan');
    
    if (existingPlan) {
        planGenerated = true;
        // Could show a message or modify the button text
    }
}

// Attach event listeners
function attachEventListeners() {
    // Heart button
    const heartBtn = document.getElementById('heartBtn');
    heartBtn.addEventListener('click', toggleLike);

    // Generate button
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generatePlan);

    // Regenerate button (if exists)
    const regenerateBtn = document.getElementById('regenerateBtn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', regeneratePlan);
    }
}

// Toggle like/favorite
function toggleLike() {
    isLiked = !isLiked;
    const heartBtn = document.getElementById('heartBtn');
    
    if (isLiked) {
        heartBtn.classList.add('liked');
        showNotification('Added to favorites!');
    } else {
        heartBtn.classList.remove('liked');
        showNotification('Removed from favorites');
    }
}

// Generate diet plan
async function generatePlan() {
    if (isGenerating) return;

    isGenerating = true;
    const generateBtn = document.getElementById('generateBtn');
    const loadingState = document.getElementById('loadingState');
    
    // Disable button
    generateBtn.disabled = true;
    generateBtn.style.display = 'none';
    loadingState.style.display = 'flex';

    // Simulate AI processing with multiple stages
    const stages = [
        'Analyzing your health profile...',
        'Calculating calorie requirements...',
        'Creating personalized meal plan...',
        'Optimizing macro distribution...',
        'Finalizing your diet plan...'
    ];

    for (let i = 0; i < stages.length; i++) {
        await delay(800);
        document.querySelector('.loading-text').textContent = stages[i];
    }

    // Wait a bit more
    await delay(1000);

    // Generate the plan data
    const generatedPlan = generatePlanData();
    
    // Save to localStorage
    localStorage.setItem('nutriLifeDietPlan', JSON.stringify(generatedPlan));
    localStorage.setItem('nutriLifeDietPlanDate', new Date().toISOString());

    // Hide loading, show preview
    loadingState.style.display = 'none';
    showPlanPreview(generatedPlan);
    
    isGenerating = false;
    planGenerated = true;
    
    showNotification('Your personalized diet plan is ready!');
}

// Generate plan data based on user profile
function generatePlanData() {
    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    // For simplicity, using estimated values based on user data
    const baseCalories = calculateCalories();
    
    const plan = {
        dailyCalories: baseCalories,
        macroSplit: {
            carbs: 40,
            protein: 30,
            fats: 30
        },
        meals: {
            total: 5,
            main: 3,
            snacks: 2
        },
        waterIntake: 2.5, // liters
        mealPlan: generateMealPlan(baseCalories),
        tips: [
            'Eat slowly and mindfully',
            'Stay hydrated throughout the day',
            'Include a variety of colorful vegetables',
            'Plan your meals in advance',
            'Get adequate sleep (7-9 hours)'
        ]
    };

    return plan;
}

// Calculate daily calorie target
function calculateCalories() {
    // Simplified calculation
    const { currentWeight, targetWeight, activityLevel, goal } = userData;
    
    let baseCalories = 2000;
    
    // Adjust based on activity level
    const activityMultiplier = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'extra-active': 1.9
    };
    
    baseCalories *= activityMultiplier[activityLevel] || 1.55;
    
    // Adjust based on goal
    if (goal.toLowerCase().includes('loss')) {
        baseCalories -= 500; // Deficit for weight loss
    } else if (goal.toLowerCase().includes('gain')) {
        baseCalories += 500; // Surplus for weight gain
    }
    
    return Math.round(baseCalories);
}

// Generate a sample meal plan
function generateMealPlan(calories) {
    const caloriesPerMeal = Math.round(calories / 5);
    
    return {
        breakfast: {
            calories: Math.round(caloriesPerMeal * 1.3),
            items: ['Oatmeal with berries', 'Greek yogurt', 'Green tea']
        },
        morningSnack: {
            calories: caloriesPerMeal,
            items: ['Apple with almond butter']
        },
        lunch: {
            calories: Math.round(caloriesPerMeal * 1.4),
            items: ['Grilled chicken salad', 'Quinoa', 'Mixed vegetables']
        },
        afternoonSnack: {
            calories: caloriesPerMeal,
            items: ['Protein shake', 'Banana']
        },
        dinner: {
            calories: Math.round(caloriesPerMeal * 1.3),
            items: ['Baked salmon', 'Brown rice', 'Steamed broccoli']
        }
    };
}

// Show plan preview
function showPlanPreview(plan) {
    const planPreview = document.getElementById('planPreview');
    
    // Update preview values
    document.getElementById('calorieTarget').textContent = `${plan.dailyCalories} kcal`;
    
    // Show the preview with animation
    planPreview.style.display = 'block';
    
    // Scroll to preview
    setTimeout(() => {
        planPreview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Regenerate plan
async function regeneratePlan() {
    if (confirm('Are you sure you want to generate a new plan? This will replace your current plan.')) {
        // Hide preview
        document.getElementById('planPreview').style.display = 'none';
        
        // Show generate section again
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.style.display = 'inline-flex';
        generateBtn.disabled = false;
        document.getElementById('btnText').textContent = 'Regenerate My Diet Plan';
        
        // Generate new plan
        await generatePlan();
    }
}

// Utility functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        max-width: 320px;
    `;
    notification.textContent = message;

    // Add animation styles if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
    
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

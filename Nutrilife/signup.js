// Form validation and submission
const form = document.getElementById('signupForm');
const inputs = form.querySelectorAll('.form-input, .form-select');

// Real-time validation
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });

    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

// Validate individual field
function validateField(field) {
    const formGroup = field.closest('.form-group');
    let isValid = true;
    let errorMessage = '';

    // Remove previous error state
    field.classList.remove('error');
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    formGroup.classList.remove('has-error');

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Specific validations
    if (field.value.trim()) {
        switch (field.type) {
            case 'number':
                const numValue = parseFloat(field.value);
                if (isNaN(numValue) || numValue < 0) {
                    isValid = false;
                    errorMessage = 'Please enter a valid number';
                } else if (field.id === 'age' && (numValue < 1 || numValue > 120)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid age';
                } else if (field.id === 'weight' && (numValue < 20 || numValue > 300)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid weight (20-300 kg)';
                } else if (field.id === 'height' && (numValue < 50 || numValue > 250)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid height (50-250 cm)';
                }
                break;
            case 'text':
                if (field.id === 'fullName' && field.value.trim().length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                }
                break;
        }

        // Select validation
        if (field.tagName === 'SELECT' && field.value === '') {
            if (field.hasAttribute('required')) {
                isValid = false;
                errorMessage = 'Please select an option';
            }
        }
    }

    // Show error if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        formGroup.appendChild(errorDiv);
        formGroup.classList.add('has-error');
    }

    return isValid;
}

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // Disable submit button
        const submitButton = form.querySelector('.btn-submit');
        submitButton.disabled = true;
        submitButton.textContent = 'Creating Account...';

        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            age: document.getElementById('age').value,
            weight: document.getElementById('weight').value,
            height: document.getElementById('height').value,
            gender: document.getElementById('gender').value,
            activityLevel: document.getElementById('activityLevel').value,
            dietaryPreferences: document.getElementById('dietaryPreferences').value,
            healthGoals: document.getElementById('healthGoals').value
        };

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Store user name in localStorage for dashboard
            localStorage.setItem('userName', formData.fullName);
            localStorage.setItem('userData', JSON.stringify(formData));
            
            // Show success message
            showSuccessMessage();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = 'Create My Account';

            // Redirect to dashboard after success
            console.log('Form submitted:', formData);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }, 1500);
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
});

// Show success message
function showSuccessMessage() {
    // Remove existing success message if any
    const existingSuccess = form.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.textContent = 'Account created successfully! Redirecting...';
    form.insertBefore(successDiv, form.firstChild);

    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Clear pre-filled values on first interaction
inputs.forEach(input => {
    if (input.type === 'text' || input.type === 'number') {
        input.addEventListener('focus', function() {
            if (this.value && (this.id === 'fullName' || this.id === 'age' || this.id === 'weight' || this.id === 'height')) {
                this.select();
            }
        }, { once: true });
    }
});

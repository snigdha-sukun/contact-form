const successMsg = document.getElementById('success-msg');

const form = document.getElementById('form');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.match(emailRegex);
};

function resetErrors() {
    const inputTxt = document.querySelectorAll('.input-box');
    const errorMessages = document.querySelectorAll('.error-msg');

    inputTxt.forEach((input) => {
       input.classList.remove('input-err');
    });

    errorMessages.forEach((error) => {
        error.style.display = 'none';
    });
}

function setError(errorMessage, inputField) {
    errorMessage.style.display = 'block';
    if (inputField) {
        inputField.classList.add('input-err');
    }
}

function validateFields(data) {
    let isValid = true;
    for (const [key, value] of Object.entries(data)) {
        if (value === '') {
            isValid = false;
            const errorMessage = document.getElementById(`${key}-required-err`);
            const inputField = document.getElementById(key);
            setError(errorMessage, inputField);
        }
    }

    if (data.email && !validateEmail(data.email)) {
        const errorMessage = document.getElementById('email-invalid-err');
        const inputField = document.getElementById('email');
        setError(errorMessage, inputField);
    }

    const queryType = document.querySelector('input[name="query-type"]:checked');
    if (!queryType) {
        const errorMessage = document.getElementById('query-type-required-err');
        setError(errorMessage);
    }
    const consent = document.querySelector('input[name="consent"]:checked');
    if (!consent) {
        const errorMessage = document.getElementById('consent-required-err');
        setError(errorMessage);
    }

    return isValid;
}

function handleSubmit(e) {
    e.preventDefault(e);
    resetErrors();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if(validateFields(data)) {
        successMsg.style.display = 'block';
        form.reset();
    }
}

form.addEventListener('submit', handleSubmit);
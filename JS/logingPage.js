
    document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("input[type='password']");

    form.addEventListener("submit", (event) => {
    event.preventDefault();  // Prevent form submission for validation

    // Reset any previous error messages
    resetErrorStyles();

    // Validate email and password fields
    if (!validateEmail(emailInput.value)) {
    setError(emailInput, "Please enter a valid email address");
    return;
}

    if (passwordInput.value.trim() === "") {
    setError(passwordInput, "Password cannot be empty");
    return;
}

    // If validations pass
    alert("Login successful!"); // You can replace this with actual login logic
});

    // Function to validate email format
    function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

    // Function to show error message and style
    function setError(input, message) {
    input.style.borderColor = "red";
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error");
    errorSpan.style.color = "red";
    errorSpan.innerText = message;
    input.parentNode.appendChild(errorSpan);
}

    // Function to reset error styles
    function resetErrorStyles() {
    const errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach((error) => error.remove());
    emailInput.style.borderColor = "#333";
    passwordInput.style.borderColor = "#333";
}
});


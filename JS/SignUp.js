document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        resetErrorStyles(); // Clear any previous errors

        // Validate form fields
        if (usernameInput.value.trim() === "") {
            setError(usernameInput, "Username cannot be empty");
            return;
        }

        if (!validateEmail(emailInput.value)) {
            setError(emailInput, "Please enter a valid email address");
            return;
        }

        if (passwordInput.value.length < 6) {
            setError(passwordInput, "Password must be at least 6 characters");
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            setError(confirmPasswordInput, "Passwords do not match");
            return;
        }

        alert("Account created successfully!"); // Replace with actual sign-up logic
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
        [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.style.borderColor = "#333";
        });
    }
});

$(document).ready(function () {
    $("#signupForm").submit(function (e) {
        e.preventDefault();

        // Gather form data
        const email = $("#email").val();
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();
        const role = $("#role").val();

        // Validate passwords match
        if (password !== confirmPassword) {
            $("#responseMessage").text("Passwords do not match.").css("color", "red");
            return;
        }

        // Prepare data to send
        const formData = {
            email: email,
            password: password,
            role: role
        };

        // AJAX request to backend
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/signUp",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                $("#responseMessage").text("Registration successful!").css("color", "green");
            },
            error: function (xhr, status, error) {
                $("#responseMessage").text("Error: " + xhr.responseText).css("color", "red");
            }
        });
    });
});

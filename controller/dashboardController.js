document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".content-section");
    const links = document.querySelectorAll(".list-group-item");

    // Function to show the selected section
    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove("active");
            if (section.id === id) {
                section.classList.add("active");
            }
        });
    }

    // Mock Data - Replace with actual API calls to your backend
    const liveUserCount = 120; // Example live user count
    const memberCount = 50; // Example member count

    // Function to update live user and member count
    function updateStats() {
        document.getElementById('liveUserCount').textContent = liveUserCount;
        document.getElementById('memberCount').textContent = memberCount;
    }

    // Bar Chart Data (Replace with your actual data)
    const cropData = {
        labels: ['Crop A', 'Crop B', 'Crop C', 'Crop D', 'Crop E'], // Crop names
        datasets: [{
            label: 'Crop Production (kg)',
            data: [500, 800, 600, 400, 700], // Example production data in kilograms
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Function to initialize the bar chart
    function initializeChart() {
        const ctx = document.getElementById('cropChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: cropData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initialize the stats and chart when the page loads
    window.onload = function() {
        updateStats(); // Update live user count and member count
        initializeChart(); // Initialize the bar chart
    };

    // Event listener for navigation clicks
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            showSection(targetId);
        });
    });

    // Show the first section by default
    if (sections.length > 0) {
        sections[0].classList.add("active");
    }
});
const incomeData = [10, 12, 8, 15, 20, 18, 16, 22, 25, 21, 18, 20];

const ctx = $('#myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Crops in Season',
            data: incomeData,
            // backgroundColor:[
            //     '#cce5ff'
            // ],
            borderColor: [
                '#66b0ff'
            ],
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true
    }
});
document.getElementById('navLogOut').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Show SweetAlert confirmation for logout
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to log out of your account.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745', // Green color for confirmation
        cancelButtonColor: '#dc3545',  // Red color for cancellation
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Show a 'Logging out' message with animation
            Swal.fire({
                title: 'Logging out...',
                text: 'Please wait while we log you out.',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000, // Display for 2 seconds
                willClose: () => {
                    // Clear session or local storage (optional)
                    sessionStorage.clear();  // Clears session storage
                    localStorage.clear();    // Clears local storage

                    // Close all windows/tabs (if possible)
                    if (window.close) {
                        window.close();  // This will only work if the window was opened by JavaScript
                    }

                    // Redirect to the Sign-In page after 2 seconds
                    window.location.href = 'SignIn.html'; // Redirect to Sign-In page
                }
            });
        }
    });
});

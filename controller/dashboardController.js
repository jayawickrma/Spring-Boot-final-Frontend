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

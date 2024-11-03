document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    // Hide all sections initially
    sections.forEach(section => section.style.display = 'none');

    // Display the "Home" section or default section on page load
    const defaultSection = document.querySelector('#fieldSection');
    if (defaultSection) defaultSection.style.display = 'block';

    // Event listener for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Hide all sections
            sections.forEach(section => section.style.display = 'none');

            // Determine which section to display based on link's href attribute
            const targetSectionId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) targetSection.style.display = 'block';
        });
    });
});

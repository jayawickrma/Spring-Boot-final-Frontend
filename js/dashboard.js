document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    // Hide all sections initially and set full-page layout
    sections.forEach(section => {
        section.style.display = 'none';
        section.style.width = '100vw'; // Adjust to full viewport width
        section.style.height = '100vh'; // Full viewport height
        section.style.justifyContent = 'center';
        section.style.alignItems = 'center';
        section.style.flexDirection = 'column';
        section.style.overflowY = 'auto'; // Enable scrolling if content exceeds height
    });

    // Display the "Home" section or default section on page load
    const defaultSection = document.querySelector('#homeSection');
    if (defaultSection) {
        defaultSection.style.display = 'flex'; // Display as flex for full-page layout
    }

    // Event listener for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Hide all sections
            sections.forEach(section => section.style.display = 'none');

            // Determine which section to display based on link's href attribute
            const targetSectionId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                targetSection.style.display = 'flex'; // Display as flex for full-page layout
            }
        });
    });
});

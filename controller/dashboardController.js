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

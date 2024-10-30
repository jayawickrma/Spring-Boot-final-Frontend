// Content for each dashboard section
const sections = {
    field: "<h2>Field Management</h2><p>Manage field layouts, soil quality, irrigation systems, and planting schedules.</p>",
    crops: "<h2>Crops</h2><p>Monitor crop types, growth stages, fertilization schedules, and pest management.</p>",
    staff: "<h2>Staff Management</h2><p>Track staff duties, assign roles, and maintain daily schedules.</p>",
    monitoring: "<h2>Monitoring</h2><p>Real-time monitoring of field conditions, weather, and crop health using IoT sensors.</p>",
    vehicle: "<h2>Vehicle Management</h2><p>Oversee the maintenance, scheduling, and usage of vehicles.</p>",
    equipment: "<h2>Equipment Management</h2><p>Track equipment status, service schedules, and allocate tools.</p>"
};

// Function to load content based on selection
function loadContent(section) {
    const contentArea = document.getElementById("content");
    contentArea.innerHTML = sections[section] || "Select an option from the sidebar to display information here.";
}
function logout() {
    alert("You have been logged out.");
    // Redirect to login page or handle logout logic here
}

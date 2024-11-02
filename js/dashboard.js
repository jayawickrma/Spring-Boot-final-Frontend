// scripts.js

function logout() {
    // Clear session or perform logout logic here
    alert("Logging out...");
    // Redirect to the login page or home
    window.location.href = '/login.html';
}
function loadPage(page) {
    const contentDiv = document.getElementById("content");

    // Clear current content
    contentDiv.innerHTML = '';

    switch (page) {
        case "home":
            contentDiv.innerHTML = `<h2>Home</h2><p>Welcome to the Green Shadow.</p>`;

            break;

        case "field":
            contentDiv.innerHTML = `
                <h2>Staff Management</h2>
                <form id="staffForm">
                    <input type="text" placeholder="Staff Name" required>
                    <input type="text" placeholder="Designation" required>
                    <button type="submit">Add Staff</button>
                </form>
                <table>
                    <thead>
                        <tr><th>Name</th><th>Designation</th><th>Actions</th></tr>
                    </thead>
                    <tbody id="staffTableBody"></tbody>
                </table>`;
            break;

        case "crop":
            contentDiv.innerHTML = `<h2>CROPS</h2><p>Manage your Crops here.</p>`;
            break;

        case "staff":
            contentDiv.innerHTML = `<h2>STAFF</h2><p>View Staff here.</p>`;
            break;

        case "logs":
            contentDiv.innerHTML = `<h2>LOG SERVICE</h2><p>View Log Services here.</p>`;
            break;

        case "vehicle":
            contentDiv.innerHTML = `<h2>VEHICLES</h2><p>View Vehicles here.</p>`;
            break;

        case "equipment":
            contentDiv.innerHTML = `<h2>EQUIPMENTS</h2><p>View Equipments here.</p>`;
            break;

        default:
            contentDiv.innerHTML = `<h2>Welcome</h2><p>Select an option from the sidebar to get started.</p>`;
            break;
    }
    // scripts.js


}

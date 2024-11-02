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
               <div class="main-container">
        <h2>Field Management</h2>
        
        <!-- Field Form -->
        <form id="fieldForm" class="field-form">
            <input type="text" id="fieldCode" placeholder="Field Code" required>
            <input type="text" id="fieldName" placeholder="Field Name" required>
            <input type="text" id="fieldLocation" placeholder="Field Location (Coordinate)" required>
            <input type="text" id="fieldSize" placeholder="Extent Size of the Field" required>
                <select name="crop" id="crop">
                    <option value="">Select Crop ID</option>
                </select>
                <select name="staff" id="staff">
                    <option value="">Select Staff ID</option>
                </select>
            <label for="fieldImage1">Field Image 1:</label>
            <input type="file" id="fieldImage1" required>
            <label for="fieldImage2">Field Image 2:</label>
            <input type="file" id="fieldImage2" required>
            <button type="submit" class="add-btn">Add Field</button>
        </form>

        <!-- Field Table -->
        <table id="fieldTable" class="field-table">
            <thead>
                <tr>
                    <th>Field Code</th>
                    <th>Field Name</th>
                    <th>Location</th>
                    <th>Size</th>
                    <th>Crops</th>
                    <th>Staff</th>
                    <th>Image 1</th>
                    <th>Image 2</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="fieldTableBody"></tbody>
        </table>
    </div>
`;
            break;

        case "crop":
            contentDiv.innerHTML = `<div class="main-container">
    <h2>Crop Management</h2>

    <form id="cropForm" class="field-form">
        <label for="cropCode">Crop Code:</label>
        <input type="text" id="cropCode" name="cropCode" placeholder="Enter Crop Code" required>

        <label for="commonName">Crop Common Name:</label>
        <input type="text" id="commonName" name="commonName" placeholder="Enter Common Name" required>

        <label for="scientificName">Crop Scientific Name:</label>
        <input type="text" id="scientificName" name="scientificName" placeholder="Enter Scientific Name" required>

        <label for="cropImage">Crop Image:</label>
        <input type="file" id="cropImage" name="cropImage" accept="image/*" required>

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" placeholder="Enter Category" required>

        <label for="season">Crop Season:</label>
        <input type="text" id="season" name="season" placeholder="Enter Season" required>

        <label for="field">Field:</label>
        <select id="field" name="field">
            <option value="">Select Field</option>
            <!-- Add field options dynamically if needed -->
        </select>

        <button type="submit" class="add-btn">Add Crop</button>
    </form>

    <h3>Crop List</h3>
    <table class="field-table">
        <thead>
            <tr>
                <th>Crop Code</th>
                <th>Common Name</th>
                <th>Scientific Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Season</th>
                <th>Field</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="cropTableBody">
            <!-- Rows will be added dynamically -->
        </tbody>
    </table>
</div>`;
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

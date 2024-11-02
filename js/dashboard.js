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

            // field page statring

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

            // crop page starting

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

            // staff page starting

        case "staff":
            contentDiv.innerHTML = `
<div class="main-container">
    <h2>Staff Management</h2>

    <form id="staffForm" class="field-form">
        <label for="staffId">ID:</label>
        <input type="text" id="staffId" name="staffId" placeholder="Enter Staff ID" required>

        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required>

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" required>

        <label for="designation">Designation:</label>
        <input type="text" id="designation" name="designation" placeholder="Enter Designation" required>

        <label for="gender">Gender:</label>
        <select id="gender" name="gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>

        <label for="joinedDate">Joined Date:</label>
        <input type="date" id="joinedDate" name="joinedDate" required>

        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" required>

        <label for="address1">Address Line 01:</label>
        <input type="text" id="address1" name="address1" placeholder="Enter Address Line 01" required>

        <label for="address2">Address Line 02:</label>
        <input type="text" id="address2" name="address2" placeholder="Enter Address Line 02">

        <label for="address3">Address Line 03:</label>
        <input type="text" id="address3" name="address3" placeholder="Enter Address Line 03">

        <label for="address4">Address Line 04:</label>
        <input type="text" id="address4" name="address4" placeholder="Enter Address Line 04">

        <label for="address5">Address Line 05:</label>
        <input type="text" id="address5" name="address5" placeholder="Enter Address Line 05">

        <label for="contactNo">Contact No.:</label>
        <input type="text" id="contactNo" name="contactNo" placeholder="Enter Contact No." required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter Email" required>

        <label for="role">Role:</label>
        <input type="text" id="role" name="role" placeholder="Enter Role" required>

        <label for="field">Field:</label>
        <select id="field" name="field" required>
            <option value="">Select Field</option>
            <!-- Add field options dynamically if needed -->
        </select>

        <label for="vehicle">Vehicle:</label>
        <input type="text" id="vehicle" name="vehicle" placeholder="Enter Vehicle Information">

        <button type="submit" class="add-btn">Add Staff</button>
    </form>

    <h3>Staff List</h3>
    <table class="field-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Joined Date</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Contact No.</th>
                <th>Email</th>
                <th>Role</th>
                <th>Field</th>
                <th>Vehicle</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="staffTableBody">
            <!-- Rows will be added dynamically -->
        </tbody>
    </table>
</div>`;
            break;

            // logs page starting

        case "logs":
            contentDiv.innerHTML = `<div class="main-container">
    <h2>Log Management</h2>

    <form id="logForm" class="field-form">
        <label for="logCode">Log Code:</label>
        <input type="text" id="logCode" name="logCode" placeholder="Enter Log Code" required>

        <label for="logDate">Log Date:</label>
        <input type="date" id="logDate" name="logDate" required>

        <label for="logDetails">Log Details / Observation:</label>
        <textarea id="logDetails" name="logDetails" rows="4" placeholder="Enter Log Details" required></textarea>

        <label for="observedImage">Observed Image Field:</label>
        <input type="file" id="observedImage" name="observedImage" accept="image/*" required>

        <select name="crop" id="crop">
        <option value="">Select your Crop type</option>
</select>

        <select name="staff" id="staff">
        <option value="">Select the Staff</option>
</select>

        <button type="submit" class="add-btn">Add Log</button>
    </form>

    <h3>Log List</h3>
    <table class="field-table">
        <thead>
            <tr>
                <th>Log Code</th>
                <th>Log Date</th>
                <th>Log Details</th>
                <th>Observed Image</th>
                <th>Crop</th>
                <th>Staff</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="logTableBody">
            <!-- Rows will be added dynamically -->
        </tbody>
    </table>
</div>`;
            break;

            // vehicle page starting

        case "vehicle":
            contentDiv.innerHTML = `<h2>VEHICLES</h2><p>View Vehicles here.</p>`;
            break;

            // equipment page starting

        case "equipment":
            contentDiv.innerHTML = `<h2>EQUIPMENTS</h2><p>View Equipments here.</p>`;
            break;

        default:
            contentDiv.innerHTML = `<h2>Welcome</h2><p>Select an option from the sidebar to get started.</p>`;
            break;
    }
    // scripts.js


}

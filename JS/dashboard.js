function loadContent(page) {
    const contentDiv = document.getElementById("content");

    if (page === "field") {
        // Inject Field Management content into #content div
        contentDiv.innerHTML = `
            <div class="field-management-container">
              <h2>Field Management</h2>
              
              <!-- Search Panel -->
              <div class="search-panel">
                <input type="text" id="searchInput" placeholder="Search fields by code or name..." onkeyup="searchField()">
              </div>

              <!-- Add Field Form -->
              <form id="fieldForm">
                <input type="text" id="fieldCode" placeholder="Field Code" required>
                <input type="text" id="fieldName" placeholder="Field Name" required>
                <input type="text" id="fieldLocation" placeholder="Location" required>
                <input type="number" id="extentSize" placeholder="Extent Size (in acres)" required>
                <input type="text" id="crop" placeholder="Crop Type" required>
                <input type="text" id="staff" placeholder="Assigned Staff" required>
                <textarea id="log" placeholder="Field Log"></textarea>
                <!-- Image Upload Input -->
                <input type="file" id="fieldImage" accept="image/*">
                <button type="submit">Add Field</button>
              </form>

              <!-- Fields Table -->
              <table id="fieldsTable">
                <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Extent Size</th>
                  <th>Crop</th>
                  <th>Staff</th>
                  <th>Log</th>
                  <th>Image</th> <!-- New column for image -->
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody id="tableBody"></tbody>
              </table>
            </div>
        `;

        // Re-initialize event listeners after injecting new content
        document.getElementById("fieldForm").addEventListener("submit", addOrUpdateField);
        // document.getElementById("fieldForm").addEventListener("submit", addOrUpdateField);

        let editingRow = null; // Variable to track if a row is being edited

        function addOrUpdateField(event) {
            event.preventDefault();

            const fieldCode = document.getElementById("fieldCode").value;
            const fieldName = document.getElementById("fieldName").value;
            const fieldLocation = document.getElementById("fieldLocation").value;
            const extentSize = document.getElementById("extentSize").value;
            const crop = document.getElementById("crop").value;
            const staff = document.getElementById("staff").value;
            const log = document.getElementById("log").value;
            const fieldImage = document.getElementById("fieldImage").files[0];

            if (editingRow) {
                // If editing, update the existing row
                updateRow(editingRow, fieldCode, fieldName, fieldLocation, extentSize, crop, staff, log, fieldImage);
            } else {
                // If not editing, add a new row
                addRow(fieldCode, fieldName, fieldLocation, extentSize, crop, staff, log, fieldImage);
            }

            // Reset form and editing state
            document.getElementById("fieldForm").reset();
            editingRow = null;
        }

        function addRow(code, name, location, extent, crop, staff, log, imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;

                const tableBody = document.getElementById("tableBody");
                const row = document.createElement("tr");

                row.innerHTML = `
      <td>${code}</td>
      <td>${name}</td>
      <td>${location}</td>
      <td>${extent}</td>
      <td>${crop}</td>
      <td>${staff}</td>
      <td>${log}</td>
      <td><img src="${imageUrl}" alt="Field Image" class="field-image"></td>
      <td>
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
      </td>
    `;

                tableBody.appendChild(row);
            };

            if (imageFile) {
                reader.readAsDataURL(imageFile);
            } else {
                alert("Please upload an image.");
            }
        }

        function updateRow(row, code, name, location, extent, crop, staff, log, imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;

                row.cells[0].innerText = code;
                row.cells[1].innerText = name;
                row.cells[2].innerText = location;
                row.cells[3].innerText = extent;
                row.cells[4].innerText = crop;
                row.cells[5].innerText = staff;
                row.cells[6].innerText = log;
                row.cells[7].innerHTML = `<img src="${imageUrl}" alt="Field Image" class="field-image">`;

                editingRow = null;
            };

            if (imageFile) {
                reader.readAsDataURL(imageFile);
            } else {
                alert("Please upload an image.");
            }
        }

        function editRow(button) {
            const row = button.closest("tr");

            // Populate form with row data
            document.getElementById("fieldCode").value = row.cells[0].innerText;
            document.getElementById("fieldName").value = row.cells[1].innerText;
            document.getElementById("fieldLocation").value = row.cells[2].innerText;
            document.getElementById("extentSize").value = row.cells[3].innerText;
            document.getElementById("crop").value = row.cells[4].innerText;
            document.getElementById("staff").value = row.cells[5].innerText;
            document.getElementById("log").value = row.cells[6].innerText;

            editingRow = row;
        }

        function deleteRow(button) {
            const row = button.closest("tr");
            row.remove();
        }

        function searchField() {
            const searchInput = document.getElementById("searchInput").value.toLowerCase();
            const rows = document.querySelectorAll("#fieldsTable tbody tr");

            rows.forEach(row => {
                const code = row.cells[0].innerText.toLowerCase();
                const name = row.cells[1].innerText.toLowerCase();

                if (code.includes(searchInput) || name.includes(searchInput)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        }

    }


    if (page === "crops") {
        contentDiv.innerHTML = `
        <div class="crop-management-container">
            <h2>Crop Management</h2>
            
            <div class="search-panel">
                <input type="text" id="cropSearchInput" placeholder="Search crops by code or name..." onkeyup="searchCrop()">
            </div>

            <form id="cropForm">
                <input type="text" id="cropCode" placeholder="Crop Code" required>
                <input type="text" id="scientificName" placeholder="Scientific Name" required>
                <input type="text" id="category" placeholder="Category" required>
                <input type="text" id="cropSeason" placeholder="Crop Season" required>
                <input type="text" id="fieldId" placeholder="Field ID" required>
                <input type="text" id="logId" placeholder="Log ID" required>
                <input type="file" id="cropImage" accept="image/*">
                <button type="submit">Add Crop</button>
            </form>

            <table id="cropsTable">
                <thead>
                    <tr>
                        <th>Crop Code</th>
                        <th>Scientific Name</th>
                        <th>Category</th>
                        <th>Season</th>
                        <th>Field ID</th>
                        <th>Log ID</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="cropTableBody"></tbody>
            </table>
        </div>
    `;

        document.getElementById("cropForm").addEventListener("submit", addOrUpdateCrop);
    }

    let editingRows = null;

    function addOrUpdateCrop(event) {
        event.preventDefault();

        const cropCode = document.getElementById("cropCode").value;
        const scientificName = document.getElementById("scientificName").value;
        const category = document.getElementById("category").value;
        const cropSeason = document.getElementById("cropSeason").value;
        const fieldId = document.getElementById("fieldId").value;
        const logId = document.getElementById("logId").value;
        const cropImage = document.getElementById("cropImage").files[0];

        if (editingRow) {
            updateCropRow(editingRow, cropCode, scientificName, category, cropSeason, fieldId, logId, cropImage);
        } else {
            addCropRow(cropCode, scientificName, category, cropSeason, fieldId, logId, cropImage);
        }

        document.getElementById("cropForm").reset();
        editingRow = null;
    }

// Function to add a new crop row
    function addCropRow(code, name, category, season, fieldId, logId, imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;

            const tableBody = document.getElementById("cropTableBody");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${code}</td>
            <td>${name}</td>
            <td>${category}</td>
            <td>${season}</td>
            <td>${fieldId}</td>
            <td>${logId}</td>
            <td><img src="${imageUrl}" alt="Crop Image" class="crop-image"></td>
            <td>
                <button onclick="editCropRow(this)">Edit</button>
                <button onclick="deleteCropRow(this)">Delete</button>
            </td>
        `;

            tableBody.appendChild(row);
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            alert("Please upload an image.");
        }
    }

// Function to update an existing crop row
    function updateCropRow(row, code, name, category, season, fieldId, logId, imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageUrl = e.target.result;

            row.cells[0].innerText = code;
            row.cells[1].innerText = name;
            row.cells[2].innerText = category;
            row.cells[3].innerText = season;
            row.cells[4].innerText = fieldId;
            row.cells[5].innerText = logId;
            row.cells[6].innerHTML = `<img src="${imageUrl}" alt="Crop Image" class="crop-image">`;

            editingRow = null;
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            alert("Please upload an image.");
        }
    }

// Function to edit a crop row
    window.editCropRow = function (button) {
        const row = button.closest("tr");

        document.getElementById("cropCode").value = row.cells[0].innerText;
        document.getElementById("scientificName").value = row.cells[1].innerText;
        document.getElementById("category").value = row.cells[2].innerText;
        document.getElementById("cropSeason").value = row.cells[3].innerText;
        document.getElementById("fieldId").value = row.cells[4].innerText;
        document.getElementById("logId").value = row.cells[5].innerText;

        editingRow = row;
    }

// Function to delete a crop row
    window.deleteCropRow = function (button) {
        const row = button.closest("tr");
        row.remove();
    }

// Function to search crops in the table by code or scientific name
    window.searchCrop = function () {
        const searchInput = document.getElementById("cropSearchInput").value.toLowerCase();
        const rows = document.querySelectorAll("#cropsTable tbody tr");

        rows.forEach(row => {
            const code = row.cells[0].innerText.toLowerCase();
            const name = row.cells[1].innerText.toLowerCase();

            row.style.display = code.includes(searchInput) || name.includes(searchInput) ? "" : "none";
        });

    }

    if (page === "staff") {
        contentDiv.innerHTML = `
        <div class="staff-management-container">
            <h2>Staff Management</h2>
            
            <form id="staffForm">
                <input type="text" id="staffCode" placeholder="Staff Code" required>
                <input type="text" id="firstName" placeholder="First Name" required>
                <input type="text" id="lastName" placeholder="Last Name" required>
                <input type="text" id="designation" placeholder="Designation" required>
                <input type="text" id="gender" placeholder="Gender" required>
                <input type="text" id="joinedDate" placeholder="Joined Date" required>
                <input type="text" id="dob" placeholder="Date of Birth" required>
                <input type="text" id="buildingNumber" placeholder="Building Number" required>
                <input type="text" id="lane" placeholder="Lane" required>
                <input type="text" id="city" placeholder="City" required>
                <input type="text" id="state" placeholder="State" required>
                <input type="text" id="postalCode" placeholder="Postal Code" required>
                <input type="text" id="contactNumber" placeholder="Contact Number" required>
                <input type="email" id="email" placeholder="Email" required>
                <input type="text" id="role" placeholder="Role" required>
                <input type="text" id="field" placeholder="Field" required>
                <input type="text" id="logs" placeholder="Logs" required>
                <input type="text" id="vehicle" placeholder="Vehicle" required>
                <input type="text" id="equipment" placeholder="Equipment" required>
                <button type="submit">Add Staff</button>
            </form>

            <table id="staffTable">
                <thead>
                    <tr>
                        <th>Staff Code</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Joined Date</th>
                        <th>DOB</th>
                        <th>Building No</th>
                        <th>Lane</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                        <th>Contact No</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Field</th>
                        <th>Logs</th>
                        <th>Vehicle</th>
                        <th>Equipment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="staffTableBody"></tbody>
            </table>
        </div>
    `;

        // Initialize event listener for the form submission
        document.getElementById("staffForm").addEventListener("submit", addOrUpdateStaff);
    }

    let editingRow = null;

// Function to add or update staff details
    function addOrUpdateStaff(event) {
        event.preventDefault();

        const staffData = {
            staffCode: document.getElementById("staffCode").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            designation: document.getElementById("designation").value,
            gender: document.getElementById("gender").value,
            joinedDate: document.getElementById("joinedDate").value,
            dob: document.getElementById("dob").value,
            buildingNumber: document.getElementById("buildingNumber").value,
            lane: document.getElementById("lane").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            postalCode: document.getElementById("postalCode").value,
            contactNumber: document.getElementById("contactNumber").value,
            email: document.getElementById("email").value,
            role: document.getElementById("role").value,
            field: document.getElementById("field").value,
            logs: document.getElementById("logs").value,
            vehicle: document.getElementById("vehicle").value,
            equipment: document.getElementById("equipment").value
        };

        if (editingRow) {
            updateStaffRow(editingRow, staffData);
        } else {
            addStaffRow(staffData);
        }

        document.getElementById("staffForm").reset();
        editingRow = null;
    }

// Function to add a new row for a staff member
    function addStaffRow(data) {
        const tableBody = document.getElementById("staffTableBody");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${data.staffCode}</td>
        <td>${data.firstName}</td>
        <td>${data.lastName}</td>
        <td>${data.designation}</td>
        <td>${data.gender}</td>
        <td>${data.joinedDate}</td>
        <td>${data.dob}</td>
        <td>${data.buildingNumber}</td>
        <td>${data.lane}</td>
        <td>${data.city}</td>
        <td>${data.state}</td>
        <td>${data.postalCode}</td>
        <td>${data.contactNumber}</td>
        <td>${data.email}</td>
        <td>${data.role}</td>
        <td>${data.field}</td>
        <td>${data.logs}</td>
        <td>${data.vehicle}</td>
        <td>${data.equipment}</td>
        <td>
            <button onclick="editStaffRow(this)">Edit</button>
            <button onclick="deleteStaffRow(this)">Delete</button>
        </td>
    `;

        tableBody.appendChild(row);
    }

// Function to update an existing staff row
    function updateStaffRow(row, data) {
        const cells = row.children;

        cells[0].innerText = data.staffCode;
        cells[1].innerText = data.firstName;
        cells[2].innerText = data.lastName;
        cells[3].innerText = data.designation;
        cells[4].innerText = data.gender;
        cells[5].innerText = data.joinedDate;
        cells[6].innerText = data.dob;
        cells[7].innerText = data.buildingNumber;
        cells[8].innerText = data.lane;
        cells[9].innerText = data.city;
        cells[10].innerText = data.state;
        cells[11].innerText = data.postalCode;
        cells[12].innerText = data.contactNumber;
        cells[13].innerText = data.email;
        cells[14].innerText = data.role;
        cells[15].innerText = data.field;
        cells[16].innerText = data.logs;
        cells[17].innerText = data.vehicle;
        cells[18].innerText = data.equipment;

        editingRow = null;
    }

// Function to edit an existing row
    window.editStaffRow = function (button) {
        const row = button.closest("tr");
        const cells = row.children;

        document.getElementById("staffCode").value = cells[0].innerText;
        document.getElementById("firstName").value = cells[1].innerText;
        document.getElementById("lastName").value = cells[2].innerText;
        document.getElementById("designation").value = cells[3].innerText;
        document.getElementById("gender").value = cells[4].innerText;
        document.getElementById("joinedDate").value = cells[5].innerText;
        document.getElementById("dob").value = cells[6].innerText;
        document.getElementById("buildingNumber").value = cells[7].innerText;
        document.getElementById("lane").value = cells[8].innerText;
        document.getElementById("city").value = cells[9].innerText;
        document.getElementById("state").value = cells[10].innerText;
        document.getElementById("postalCode").value = cells[11].innerText;
        document.getElementById("contactNumber").value = cells[12].innerText;
        document.getElementById("email").value = cells[13].innerText;
        document.getElementById("role").value = cells[14].innerText;
        document.getElementById("field").value = cells[15].innerText;
        document.getElementById("logs").value = cells[16].innerText;
        document.getElementById("vehicle").value = cells[17].innerText;
        document.getElementById("equipment").value = cells[18].innerText;

        editingRow = row;
    }

// Function to delete a staff row
    window.deleteStaffRow = function (button) {
        const row = button.closest("tr");
        row.remove();
    }




}


// Load the relevant JavaScript for field CRUD operations after loading the content

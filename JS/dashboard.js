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
}

// Load the relevant JavaScript for field CRUD operations after loading the content
document.head.appendChild(document.createElement("script")).src = "../JS/fieldCrud.js";

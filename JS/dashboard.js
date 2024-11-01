const apiUrl = "https://your-api-url.com"; // Replace with your API URL

function loadContent(page) {
    const contentDiv = document.getElementById("content");

    if (page === "field") {
        // Inject Field Management content into #content div
        contentDiv.innerHTML = `
            <div class="field-management-container">
                <h2>Field Management</h2>
                <div class="search-panel">
                    <input type="text" id="searchInput" placeholder="Search fields by code or name..." onkeyup="searchField()">
                </div>
                <form id="fieldForm">
                    <input type="text" id="fieldCode" placeholder="Field Code" required>
                    <input type="text" id="fieldName" placeholder="Field Name" required>
                    <input type="text" id="fieldLocation" placeholder="Location" required>
                    <input type="number" id="extentSize" placeholder="Extent Size (in acres)" required>
                    <input type="text" id="crop" placeholder="Crop Type" required>
                    <input type="text" id="staff" placeholder="Assigned Staff" required>
                    <textarea id="log" placeholder="Field Log"></textarea>
                    <input type="file" id="fieldImage" accept="image/*">
                    <button type="submit">Add Field</button>
                </form>
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
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody"></tbody>
                </table>
            </div>
        `;
        document.getElementById("fieldForm").addEventListener("submit", addOrUpdateField);
        let editingRow = null;

        function addOrUpdateField(event) {
            event.preventDefault();
            const fieldData = new FormData();
            fieldData.append("code", document.getElementById("fieldCode").value);
            fieldData.append("name", document.getElementById("fieldName").value);
            fieldData.append("location", document.getElementById("fieldLocation").value);
            fieldData.append("extentSize", document.getElementById("extentSize").value);
            fieldData.append("crop", document.getElementById("crop").value);
            fieldData.append("staff", document.getElementById("staff").value);
            fieldData.append("log", document.getElementById("log").value);
            const imageFile = document.getElementById("fieldImage").files[0];
            if (imageFile) fieldData.append("image", imageFile);

            if (editingRow) {
                updateField(editingRow.dataset.id, fieldData);
            } else {
                addField(fieldData);
            }

            document.getElementById("fieldForm").reset();
            editingRow = null;
        }

        function addField(data) {
            fetch(`${apiUrl}/fields`, {
                method: "POST",
                body: data
            })
                .then(response => response.json())
                .then(field => {
                    addRowToTable(field);
                })
                .catch(error => console.error("Error adding field:", error));
        }

        function updateField(id, data) {
            fetch(`${apiUrl}/fields/${id}`, {
                method: "PUT",
                body: data
            })
                .then(response => response.json())
                .then(field => {
                    updateRowInTable(field);
                })
                .catch(error => console.error("Error updating field:", error));
        }

        function addRowToTable(field) {
            const tableBody = document.getElementById("tableBody");
            const row = document.createElement("tr");
            row.dataset.id = field.id; // Store the ID for later updates
            row.innerHTML = `
                <td>${field.code}</td>
                <td>${field.name}</td>
                <td>${field.location}</td>
                <td>${field.extentSize}</td>
                <td>${field.crop}</td>
                <td>${field.staff}</td>
                <td>${field.log}</td>
                <td><img src="${field.imageUrl}" alt="Field Image" class="field-image"></td>
                <td>
                    <button onclick="editRow(this)">Edit</button>
                    <button onclick="deleteRow(this)">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        }

        function updateRowInTable(field) {
            const row = document.querySelector(`tr[data-id='${field.id}']`);
            if (row) {
                row.cells[0].innerText = field.code;
                row.cells[1].innerText = field.name;
                row.cells[2].innerText = field.location;
                row.cells[3].innerText = field.extentSize;
                row.cells[4].innerText = field.crop;
                row.cells[5].innerText = field.staff;
                row.cells[6].innerText = field.log;
                row.cells[7].innerHTML = `<img src="${field.imageUrl}" alt="Field Image" class="field-image">`;
            }
        }

        window.editRow = function (button) {
            const row = button.closest("tr");
            document.getElementById("fieldCode").value = row.cells[0].innerText;
            document.getElementById("fieldName").value = row.cells[1].innerText;
            document.getElementById("fieldLocation").value = row.cells[2].innerText;
            document.getElementById("extentSize").value = row.cells[3].innerText;
            document.getElementById("crop").value = row.cells[4].innerText;
            document.getElementById("staff").value = row.cells[5].innerText;
            document.getElementById("log").value = row.cells[6].innerText;
            editingRow = row;
        };

        window.deleteRow = function (button) {
            const row = button.closest("tr");
            const id = row.dataset.id;

            fetch(`${apiUrl}/fields/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    row.remove();
                })
                .catch(error => console.error("Error deleting field:", error));
        };

        window.searchField = function () {
            const searchInput = document.getElementById("searchInput").value.toLowerCase();
            const rows = document.querySelectorAll("#fieldsTable tbody tr");
            rows.forEach(row => {
                const code = row.cells[0].innerText.toLowerCase();
                const name = row.cells[1].innerText.toLowerCase();
                row.style.display = (code.includes(searchInput) || name.includes(searchInput)) ? "" : "none";
            });
        };
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
        let editingRow = null;

        function addOrUpdateCrop(event) {
            event.preventDefault();
            const cropData = new FormData();
            cropData.append("code", document.getElementById("cropCode").value);
            cropData.append("scientificName", document.getElementById("scientificName").value);
            cropData.append("category", document.getElementById("category").value);
            cropData.append("season", document.getElementById("cropSeason").value);
            cropData.append("fieldId", document.getElementById("fieldId").value);
            cropData.append("logId", document.getElementById("logId").value);
            const imageFile = document.getElementById("cropImage").files[0];
            if (imageFile) cropData.append("image", imageFile);

            if (editingRow) {
                updateCrop(editingRow.dataset.id, cropData);
            } else {
                addCrop(cropData);
            }

            document.getElementById("cropForm").reset();
            editingRow = null;
        }

        function addCrop(data) {
            fetch(`${apiUrl}/crops`, {
                method: "POST",
                body: data
            })
                .then(response => response.json())
                .then(crop => {
                    addCropRowToTable(crop);
                })
                .catch(error => console.error("Error adding crop:", error));
        }

        function updateCrop(id, data) {
            fetch(`${apiUrl}/crops/${id}`, {
                method: "PUT",
                body: data
            })
                .then(response => response.json())
                .then(crop => {
                    updateCropRowInTable(crop);
                })
                .catch(error => console.error("Error updating crop:", error));
        }

        function addCropRowToTable(crop) {
            const tableBody = document.getElementById("cropTableBody");
            const row = document.createElement("tr");
            row.dataset.id = crop.id; // Store the ID for later updates
            row.innerHTML = `
                <td>${crop.code}</td>
                <td>${crop.scientificName}</td>
                <td>${crop.category}</td>
                <td>${crop.season}</td>
                <td>${crop.fieldId}</td>
                <td>${crop.logId}</td>
                <td><img src="${crop.imageUrl}" alt="Crop Image" class="crop-image"></td>
                <td>
                    <button onclick="editCropRow(this)">Edit</button>
                    <button onclick="deleteCropRow(this)">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        }

        function updateCropRowInTable(crop) {
            const row = document.querySelector(`tr[data-id='${crop.id}']`);
            if (row) {
                row.cells[0].innerText = crop.code;
                row.cells[1].innerText = crop.scientificName;
                row.cells[2].innerText = crop.category;
                row.cells[3].innerText = crop.season;
                row.cells[4].innerText = crop.fieldId;
                row.cells[5].innerText = crop.logId;
                row.cells[6].innerHTML = `<img src="${crop.imageUrl}" alt="Crop Image" class="crop-image">`;
            }
        }

        window.editCropRow = function (button) {
            const row = button.closest("tr");
            document.getElementById("cropCode").value = row.cells[0].innerText;
            document.getElementById("scientificName").value = row.cells[1].innerText;
            document.getElementById("category").value = row.cells[2].innerText;
            document.getElementById("cropSeason").value = row.cells[3].innerText;
            document.getElementById("fieldId").value = row.cells[4].innerText;
            document.getElementById("logId").value = row.cells[5].innerText;
            editingRow = row;
        };

        window.deleteCropRow = function (button) {
            const row = button.closest("tr");
            const id = row.dataset.id;

            fetch(`${apiUrl}/crops/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    row.remove();
                })
                .catch(error => console.error("Error deleting crop:", error));
        };

        window.searchCrop = function () {
            const searchInput = document.getElementById("cropSearchInput").value.toLowerCase();
            const rows = document.querySelectorAll("#cropsTable tbody tr");
            rows.forEach(row => {
                const code = row.cells[0].innerText.toLowerCase();
                const name = row.cells[1].innerText.toLowerCase();
                row.style.display = (code.includes(searchInput) || name.includes(searchInput)) ? "" : "none";
            });
        };
    }
}

document.getElementById("fieldForm").addEventListener("submit", addOrUpdateField);

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

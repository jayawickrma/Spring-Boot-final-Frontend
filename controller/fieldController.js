document.getElementById("fieldForm").addEventListener("submit", function (e) {
    e.preventDefault();
    addField();
});

let fields = []; // Array to store field data

function addField() {
    // Capture form data
    const fieldCode = document.getElementById("fieldCode").value;
    const fieldName = document.getElementById("fieldName").value;
    const fieldLocation = document.getElementById("fieldLocation").value;
    const fieldSize = document.getElementById("fieldSize").value;
    const crop = document.getElementById("crop").value;
    const staff = document.getElementById("staff").value;
    const fieldImage1 = document.getElementById("fieldImage1").files[0]?.name || '';
    const fieldImage2 = document.getElementById("fieldImage2").files[0]?.name || '';

    // Add field data to fields array
    const field = {
        fieldCode,
        fieldName,
        fieldLocation,
        fieldSize,
        crop,
        staff,
        fieldImage1,
        fieldImage2
    };

    fields.push(field);
    updateTable();
    clearForm();
}

function updateTable() {
    const fieldTableBody = document.getElementById("fieldTableBody");
    fieldTableBody.innerHTML = ''; // Clear existing rows

    fields.forEach((field, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${field.fieldCode}</td>
            <td>${field.fieldName}</td>
            <td>${field.fieldLocation}</td>
            <td>${field.fieldSize}</td>
            <td>${field.crop}</td>
            <td>${field.staff}</td>
            <td>${field.fieldImage1}</td>
            <td>${field.fieldImage2}</td>
            <td>
                <button onclick="editField(${index})">Edit</button>
                <button onclick="deleteField(${index})">Delete</button>
            </td>
        `;
        fieldTableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById("fieldForm").reset();
}

function deleteField(index) {
    fields.splice(index, 1); // Remove the field at the specified index
    updateTable(); // Refresh table
}

function editField(index) {
    const field = fields[index];

    // Populate form with selected field's data
    document.getElementById("fieldCode").value = field.fieldCode;
    document.getElementById("fieldName").value = field.fieldName;
    document.getElementById("fieldLocation").value = field.fieldLocation;
    document.getElementById("fieldSize").value = field.fieldSize;
    document.getElementById("crop").value = field.crop;
    document.getElementById("staff").value = field.staff;

    // Replace "Add" button with "Update" button
    const submitButton = document.querySelector(".add-btn");
    submitButton.textContent = "Update Field";
    submitButton.onclick = function () {
        updateField(index);
    };
}

function updateField(index) {
    // Update field data with form values
    fields[index] = {
        fieldCode: document.getElementById("fieldCode").value,
        fieldName: document.getElementById("fieldName").value,
        fieldLocation: document.getElementById("fieldLocation").value,
        fieldSize: document.getElementById("fieldSize").value,
        crop: document.getElementById("crop").value,
        staff: document.getElementById("staff").value,
        fieldImage1: document.getElementById("fieldImage1").files[0]?.name || fields[index].fieldImage1,
        fieldImage2: document.getElementById("fieldImage2").files[0]?.name || fields[index].fieldImage2
    };

    updateTable(); // Refresh table
    clearForm();

    // Revert "Update" button to "Add" button
    const submitButton = document.querySelector(".add-btn");
    submitButton.textContent = "Add Field";
    submitButton.onclick = function (e) {
        e.preventDefault();
        addField();
    };
}

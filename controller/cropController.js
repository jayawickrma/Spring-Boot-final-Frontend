document.getElementById("cropForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    addCrop();
});

let crops = []; // Array to store crop data

function addCrop() {
    // Capture form data
    const cropCode = document.getElementById("cropCode").value;
    const commonName = document.getElementById("commonName").value;
    const scientificName = document.getElementById("scientificName").value;
    const cropImage = document.getElementById("cropImage").files[0]?.name || '';
    const category = document.getElementById("category").value;
    const season = document.getElementById("season").value;
    const field = document.getElementById("field").value;

    // Add crop data to the crops array
    const crop = {
        cropCode,
        commonName,
        scientificName,
        cropImage,
        category,
        season,
        field
    };

    crops.push(crop);
    updateTable();
    clearForm();
}

function updateTable() {
    const cropTableBody = document.getElementById("cropTableBody");
    cropTableBody.innerHTML = ''; // Clear existing rows

    crops.forEach((crop, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${crop.cropCode}</td>
            <td>${crop.commonName}</td>
            <td>${crop.scientificName}</td>
            <td><img src="${crop.cropImage}" alt="Crop Image" width="50"></td>
            <td>${crop.category}</td>
            <td>${crop.season}</td>
            <td>${crop.field}</td>
            <td>
                <button onclick="editCrop(${index})">Edit</button>
                <button onclick="deleteCrop(${index})">Delete</button>
            </td>
        `;
        cropTableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById("cropForm").reset();
}

function deleteCrop(index) {
    crops.splice(index, 1); // Remove the crop at the specified index
    updateTable(); // Refresh table
}

function editCrop(index) {
    const crop = crops[index];

    // Populate form with selected crop's data
    document.getElementById("cropCode").value = crop.cropCode;
    document.getElementById("commonName").value = crop.commonName;
    document.getElementById("scientificName").value = crop.scientificName;
    document.getElementById("category").value = crop.category;
    document.getElementById("season").value = crop.season;
    document.getElementById("field").value = crop.field;

    // Replace "Add" button with "Update" button
    const submitButton = document.querySelector(".add-btn");
    submitButton.textContent = "Update Crop";
    submitButton.onclick = function () {
        updateCrop(index);
    };
}

function updateCrop(index) {
    // Update crop data with form values
    crops[index] = {
        cropCode: document.getElementById("cropCode").value,
        commonName: document.getElementById("commonName").value,
        scientificName: document.getElementById("scientificName").value,
        cropImage: document.getElementById("cropImage").files[0]?.name || crops[index].cropImage,
        category: document.getElementById("category").value,
        season: document.getElementById("season").value,
        field: document.getElementById("field").value
    };

    updateTable(); // Refresh table
    clearForm();

    // Revert "Update" button to "Add" button
    const submitButton = document.querySelector(".add-btn");
    submitButton.textContent = "Add Crop";
    submitButton.onclick = function (e) {
        e.preventDefault();
        addCrop();
    };
}

import equipmentModel from "../Model/equipmentModel.js";

let editEquipmentId = -1;

$(document).ready(function () {
    loadEquipments();

    // Save or Update Equipment
    $('#equipmentForm').on('submit', function (e) {
        e.preventDefault();
        const fieldList = $('#efield').val().split(',') || [];
        const equipmentData = {
            equipmentCode: editEquipmentId === -1 ? null : editEquipmentId, // Null for new records
            name: $('#equipmentName').val(),
            type: $('#equipmentType').val(),
            status: $('#equipmentStatus').val(),
            availableCount: parseInt($('#availableCount').val(), 10),
            fieldList
        };

        if (editEquipmentId === -1) {
            saveEquipment(equipmentData);
        } else {
            updateEquipment(equipmentData);
        }
    });

    // Add New Equipment
    $('#addEquipmentBtn').on('click', function () {
        resetForm();
        editEquipmentId = -1;
        $('#equipmentModalLabel').text('Add Equipment');
    });
});

// Save Equipment Function
function saveEquipment(data) {
    $.ajax({
        url: "http://localhost:8080/springFinal/api/v1/equipments",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
        success: function () {
            Swal.fire("Success", "Equipment added successfully!", "success");
            $('#equipmentModal').modal('hide');
            loadEquipments();
        },
        error: handleAjaxError
    });
}

// Update Equipment Function
function updateEquipment(data) {
    $.ajax({
        url: `http://localhost:8080/springFinal/api/v1/equipments/${data.equipmentCode}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
        success: function () {
            Swal.fire("Success", "Equipment updated successfully!", "success");
            $('#equipmentModal').modal('hide');
            loadEquipments();
        },
        error: handleAjaxError
    });
}

// Load Equipments Function
function loadEquipments() {
    $.ajax({
        url: "http://localhost:8080/springFinal/api/v1/equipments",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
        success: function (data) {
            renderEquipments(data);
        },
        error: handleAjaxError
    });
}

// Render Equipments
function renderEquipments(equipments) {
    $('#equipmentTable tbody').empty();
    equipments.forEach(equipment => {
        $('#equipmentTable tbody').append(`
            <tr>
                <td>${equipment.equipmentCode}</td>
                <td>${equipment.name}</td>
                <td>${equipment.type}</td>
                <td>${equipment.status}</td>
                <td>${equipment.availableCount}</td>
                <td>${equipment.fieldList.join(', ')}</td>
                <td>
                    <button class="btn btn-primary edit-equipment-btn" data-id="${equipment.equipmentCode}">Edit</button>
                    <button class="btn btn-danger delete-equipment-btn" data-id="${equipment.equipmentCode}">Delete</button>
                </td>
            </tr>
        `);
    });

    // Attach Edit and Delete Handlers
    $('.edit-equipment-btn').on('click', function () {
        const id = $(this).data('id');
        editEquipment(id);
    });

    $('.delete-equipment-btn').on('click', function () {
        const id = $(this).data('id');
        deleteEquipment(id);
    });
}

// Edit Equipment
function editEquipment(id) {
    $.ajax({
        url: `http://localhost:8080/springFinal/api/v1/equipments/${id}`,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
        success: function (data) {
            $('#equipmentName').val(data.name);
            $('#equipmentType').val(data.type);
            $('#equipmentStatus').val(data.status);
            $('#availableCount').val(data.availableCount);
            $('#efield').val(data.fieldList.join(', '));
            editEquipmentId = data.equipmentCode;
            $('#equipmentModalLabel').text('Edit Equipment');
            $('#equipmentModal').modal('show');
        },
        error: handleAjaxError
    });
}

// Delete Equipment
function deleteEquipment(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This will permanently delete the equipment.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:8080/springFinal/api/v1/equipments/${id}`,
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                },
                success: function () {
                    Swal.fire("Deleted!", "Equipment deleted successfully.", "success");
                    loadEquipments();
                },
                error: handleAjaxError
            });
        }
    });
}

// Reset Form
function resetForm() {
    $('#equipmentForm')[0].reset();
    $('#efield').val('');
}

// Handle AJAX Errors
function handleAjaxError(xhr) {
    const errorMessages = {
        400: "Bad Request. Please verify your input.",
        401: "Unauthorized. Please log in.",
        403: "Forbidden. You do not have access.",
        404: "Resource not found.",
        500: "Server error. Try again later."
    };
    Swal.fire("Error", errorMessages[xhr.status] || "An unexpected error occurred.", "error");
}

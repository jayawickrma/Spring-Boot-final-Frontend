import {equipmentData} from "../db/db.js";
$(document).ready(function() {

    let editIndex = -1;

    // Handle form submission for creating/updating equipment
    $('#equipmentForm').submit(function(e) {
        e.preventDefault();

        const equipment = {
            equipmentId: editIndex === -1 ? generateEquipmentId() : equipmentData[editIndex].equipmentId,
            equipmentName: $('#equipmentName').val(),
            equipmentType: $('#equipmentType').val(),
            status: $('#status').val(),
            availableCount: $('#availableCount').val(),
            field: $('#field').val(),
        };

        if (editIndex === -1) {
            equipmentData.push(equipment);
        } else {
            equipmentData[editIndex] = equipment;
            editIndex = -1; // Reset after update
        }

        $('#equipmentForm')[0].reset();
        $('#equipmentModal').modal('hide');
        updateEquipmentTable();
        $('#saveBtn').text('Save Equipment');
        $('#addEquipmentBtn').prop('disabled', false);
    });

    // Update the Equipment Table
    function updateEquipmentTable() {
        const tableBody = $('#equipmentTable tbody');
        tableBody.empty();

        equipmentData.forEach((equipment, index) => {
            tableBody.append(`
          <tr data-index="${index}">
            <td>${equipment.equipmentId}</td>
            <td>${equipment.equipmentName}</td>
            <td>${equipment.equipmentType}</td>
            <td>${equipment.status}</td>
            <td>${equipment.availableCount}</td>
            <td>${equipment.field}</td>  <!-- Display the field value here -->
            <td>
              <button class="btn btn-warning btn-sm edit-btn">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
          </tr>
        `);
        });
    }

    // Edit Equipment
    $('#equipmentTable').on('click', '.edit-btn', function() {
        editIndex = $(this).closest('tr').data('index');
        const equipment = equipmentData[editIndex];

        $('#equipmentName').val(equipment.equipmentName);
        $('#equipmentType').val(equipment.equipmentType);
        $('#status').val(equipment.status);
        $('#availableCount').val(equipment.availableCount);
        $('#field').val(equipment.field);  // Populate the field input here

        $('#equipmentModal').modal('show');
        $('#saveBtn').text('Update Equipment');
        $('#addEquipmentBtn').prop('disabled', true);
    });

    // Delete Equipment
    $('#equipmentTable').on('click', '.delete-btn', function() {
        const index = $(this).closest('tr').data('index');
        equipmentData.splice(index, 1);
        updateEquipmentTable();
    });

    // Generate unique Equipment ID
    function generateEquipmentId() {
        return 'EQUIP' + (equipmentData.length + 1);
    }
});
import {equipmentList} from "../db/db";


$(document).ready(function() {


    // Function to refresh the equipment table
    function refreshEquipmentTable() {
        const equipmentTableBody = $('#equipmentTableBody');
        equipmentTableBody.empty(); // Clear existing table body

        equipmentList.forEach((equipment, index) => {
            const row = `
                <tr>
                    <td>${equipment.equipmentId}</td>
                    <td>${equipment.equipmentName}</td>
                    <td>${equipment.equipmentType}</td>
                    <td>${equipment.purchaseDate}</td>
                    <td>${equipment.status}</td>
                    <td>${equipment.remarks}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            equipmentTableBody.append(row);
        });
    }

    // Add Equipment
    $('.add-btn').click(function(e) {
        e.preventDefault(); // Prevent the default form submission

        const equipmentId = $('#equipmentId').val();
        const equipmentName = $('#equipmentName').val();
        const equipmentType = $('#equipmentType').val();
        const purchaseDate = $('#purchaseDate').val();
        const status = $('#status').val();
        const remarks = $('#remarks').val();

        // Create a new equipment entry object
        const newEquipment = {
            equipmentId,
            equipmentName,
            equipmentType,
            purchaseDate,
            status,
            remarks
        };

        equipmentList.push(newEquipment); // Add new equipment to the array
        refreshEquipmentTable(); // Refresh the table
        clearForm(); // Clear form fields
    });

    // Edit Equipment
    $(document).on('click', '.edit-btn', function() {
        const index = $(this).data('index');
        const equipment = equipmentList[index];

        $('#equipmentId').val(equipment.equipmentId);
        $('#equipmentName').val(equipment.equipmentName);
        $('#equipmentType').val(equipment.equipmentType);
        $('#purchaseDate').val(equipment.purchaseDate);
        $('#status').val(equipment.status);
        $('#remarks').val(equipment.remarks);

        // Update the Add button to Save
        $('.add-btn').text('Save').off('click').click(function(e) {
            e.preventDefault();

            // Create an updated equipment entry object
            const updatedEquipment = {
                equipmentId: $('#equipmentId').val(),
                equipmentName: $('#equipmentName').val(),
                equipmentType: $('#equipmentType').val(),
                purchaseDate: $('#purchaseDate').val(),
                status: $('#status').val(),
                remarks: $('#remarks').val()
            };

            equipmentList[index] = updatedEquipment; // Update the equipment in the array
            refreshEquipmentTable(); // Refresh the table
            clearForm(); // Clear form fields
            $('.add-btn').text('Add Equipment'); // Reset button text
        });
    });

    // Delete Equipment
    $(document).on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        equipmentList.splice(index, 1); // Remove equipment from array
        refreshEquipmentTable(); // Refresh the table
    });

    // Function to clear the form fields
    function clearForm() {
        $('#equipmentId').val('');
        $('#equipmentName').val('');
        $('#equipmentType').val('');
        $('#purchaseDate').val('');
        $('#status').val('');
        $('#remarks').val(''); // Reset remarks
    }
});

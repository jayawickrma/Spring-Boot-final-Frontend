$(document).ready(function () {
    const equipmentForm = $('#equipmentForm');
    const equipmentTableBody = $('#equipmentTableBody');

    // Sample equipment data array
    let equipmentData = [];

    // Function to render equipment table
    function renderEquipmentTable() {
        equipmentTableBody.empty();
        equipmentData.forEach((equipment, index) => {
            const row = `
        <tr>
          <td>${equipment.equipmentId}</td>
          <td>${equipment.equipmentName}</td>
          <td>${equipment.equipmentType}</td>
          <td>${equipment.purchaseDate}</td>
          <td>${equipment.status}</td>
          <td>${equipment.remarks || 'N/A'}</td>
          <td>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          </td>
        </tr>
      `;
            equipmentTableBody.append(row);
        });
    }

    // Handle form submission
    equipmentForm.on('submit', function (e) {
        e.preventDefault();

        const newEquipment = {
            equipmentId: $('#equipmentId').val(),
            equipmentName: $('#equipmentName').val(),
            equipmentType: $('#equipmentType').val(),
            purchaseDate: $('#purchaseDate').val(),
            status: $('#status').val(),
            remarks: $('#remarks').val()
        };

        equipmentData.push(newEquipment);
        renderEquipmentTable();

        // Reset the form
        equipmentForm[0].reset();
    });

    // Handle edit and delete actions
    equipmentTableBody.on('click', '.edit-btn', function () {
        const index = $(this).data('index');
        const equipment = equipmentData[index];

        $('#equipmentId').val(equipment.equipmentId);
        $('#equipmentName').val(equipment.equipmentName);
        $('#equipmentType').val(equipment.equipmentType);
        $('#purchaseDate').val(equipment.purchaseDate);
        $('#status').val(equipment.status);
        $('#remarks').val(equipment.remarks || '');

        // Remove the equipment from the array for re-adding after edit
        equipmentData.splice(index, 1);
        renderEquipmentTable();
    });

    equipmentTableBody.on('click', '.delete-btn', function () {
        const index = $(this).data('index');
        equipmentData.splice(index, 1);
        renderEquipmentTable();
    });
});
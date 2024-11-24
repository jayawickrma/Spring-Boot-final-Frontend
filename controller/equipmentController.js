$(document).ready(function () {
    var equipmentList = [];
    var editEquipmentIndex = -1;

    // Save or Update Equipment
    $('#equipmentForm').submit(function (e) {
        e.preventDefault();
        var name = $('#equipmentName').val();
        var type = $('#equipmentType').val();
        var status = $('#equipmentStatus').val();
        var count = $('#equipmentCount').val();
        var field = $('#equipmentField').val();

        if (editEquipmentIndex === -1) {
            var newEquipment = {
                id: equipmentList.length + 1,
                name: name,
                type: type,
                status: status,
                count: count,
                field: field,
            };
            equipmentList.push(newEquipment);
        } else {
            equipmentList[editEquipmentIndex] = {
                ...equipmentList[editEquipmentIndex],
                name: name,
                type: type,
                status: status,
                count: count,
                field: field,
            };
            editEquipmentIndex = -1;
        }

        $('#equipmentModal').modal('hide');
        $('#equipmentForm')[0].reset();
        renderEquipmentTable();
    });

    // Render Equipment Table
    function renderEquipmentTable() {
        $('#equipmentTable tbody').empty();
        equipmentList.forEach((equipment) => {
            $('#equipmentTable tbody').append(`
        <tr>
          <td>${equipment.id}</td>
          <td>${equipment.name}</td>
          <td>${equipment.type}</td>
          <td>${equipment.status}</td>
          <td>${equipment.count}</td>
          <td>${equipment.field}</td>
          <td>
            <button class="btn btn-primary edit-equipment-btn" data-id="${equipment.id}">Edit</button>
            <button class="btn btn-danger delete-equipment-btn" data-id="${equipment.id}">Delete</button>
          </td>
        </tr>
      `);
        });
    }

    // Edit Equipment
    $(document).on('click', '.edit-equipment-btn', function () {
        var id = $(this).data('id');
        editEquipmentIndex = equipmentList.findIndex((equipment) => equipment.id === id);
        var equipment = equipmentList[editEquipmentIndex];
        $('#equipmentName').val(equipment.name);
        $('#equipmentType').val(equipment.type);
        $('#equipmentStatus').val(equipment.status);
        $('#equipmentCount').val(equipment.count);
        $('#equipmentField').val(equipment.field);
        $('#equipmentModalLabel').text('Edit Equipment');
        $('#equipmentModal').modal('show');
    });

    // Delete Equipment
    $(document).on('click', '.delete-equipment-btn', function () {
        var id = $(this).data('id');
        equipmentList = equipmentList.filter((equipment) => equipment.id !== id);
        renderEquipmentTable();
    });
});

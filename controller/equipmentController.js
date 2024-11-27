$(document).ready(function () {
    let currentEditID = null;

    // Load equipment data and populate the table
    function loadEquipment() {
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/equipments',
            method: 'GET',
            dataType: 'application/json',
            success: function (data) {
                const tableBody = $('#equipmentTable tbody');
                tableBody.empty();
                data.forEach((equipment) => {
                    tableBody.append(`
                        <tr data-id="${equipment.equipmentCode}">
                            <td>${equipment.equipmentCode}</td>
                            <td>${equipment.name}</td>
                            <td>${equipment.type}</td>
                            <td>${equipment.status}</td>
                            <td>${equipment.availableCount}</td>
                            <td>${equipment.fieldList.join(', ')}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-equipment">Edit</button>
                                <button class="btn btn-danger btn-sm delete-equipment">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                alert('Failed to load equipment data.');
            }
        });
    }

    // Add or update equipment
    $('#equipmentForm').on('submit', function (e) {
        e.preventDefault();
        const equipmentData = {
            name: $('#equipmentName').val(),
            type: $('#equipmentType').val(),
            status: $('#status').val(),
            availableCount: parseInt($('#availableCount').val()),
            fieldList: $('#field').val().split(',').map((field) => field.trim())
        };

        const url = currentEditID
            ? `http://localhost:8080/api/v1/equipments/${currentEditID}`
            : 'http://localhost:8080/api/v1/equipments';

        const method = currentEditID ? 'PUT' : 'POST';

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(equipmentData),
            success: function () {
                $('#equipmentModal').modal('hide');
                loadEquipment();
                alert(currentEditID ? 'Equipment updated successfully!' : 'Equipment added successfully!');
                $('#equipmentForm')[0].reset();
                currentEditID = null;
            },
            error: function () {
                alert('Failed to save equipment data.');
            }
        });
    });

    // Edit equipment
    $(document).on('click', '.edit-equipment', function () {
        const row = $(this).closest('tr');
        currentEditID = row.data('id');

        $.ajax({
            url: `http://localhost:8080/api/v1/equipments/${currentEditID}`,
            method: 'GET',
            success: function (equipment) {
                $('#equipmentName').val(equipment.name);
                $('#equipmentType').val(equipment.type);
                $('#status').val(equipment.status);
                $('#availableCount').val(equipment.availableCount);
                $('#field').val(equipment.fieldList.join(', '));

                $('#equipmentModal').modal('show');
            },
            error: function () {
                alert('Failed to load equipment details.');
            }
        });
    });

    // Delete equipment
    $(document).on('click', '.delete-equipment', function () {
        const equipmentId = $(this).closest('tr').data('id');

        if (confirm('Are you sure you want to delete this equipment?')) {
            $.ajax({
                url: `http://localhost:8080/api/v1/equipments/${equipmentId}`,
                method: 'DELETE',
                success: function () {
                    loadEquipment();
                    alert('Equipment deleted successfully!');
                },
                error: function () {
                    alert('Failed to delete equipment.');
                }
            });
        }
    });

    // Handle "Add New Equipment" button click
    $('#addEquipmentBtn').on('click', function () {
        currentEditID = null;
        $('#equipmentForm')[0].reset();
        $('#equipmentModal').modal('show');
    });

    // Initial load of equipment data
    loadEquipment();
});

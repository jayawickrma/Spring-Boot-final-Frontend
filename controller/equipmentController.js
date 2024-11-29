$(document).ready(function () {
    var editIndex = -1;

    // Fetch and load data from the backend
    function loadEquipment() {
        $.ajax({
            url: "http://localhost:8080/springFinal/api/v1/equipments",
            method: "GET",
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
            },
            success: function (data) {
                renderEquipmentTable(data);
            },
            error: function () {
                alert("Failed to load equipment!");
            }
        });
    }

    // Render Equipment Table
    function renderEquipmentTable(equipmentList) {
        $('#equipmentTable tbody').empty();
        equipmentList.forEach((equipment, index) => {
            $('#equipmentTable tbody').append(`
                <tr>
                    <td>${equipment.equipmentCode}</td>
                    <td>${equipment.name}</td>
                    <td>${equipment.type}</td>
                    <td>${equipment.status}</td>
                    <td>${equipment.availableCount}</td>
                    <td>${equipment.fieldList}</td>
                    <td>
                        <button class="btn btn-primary edit-equipment-btn" data-id="${equipment.equipmentCode}" data-index="${index}">Edit</button>
                        <button class="btn btn-danger delete-equipment-btn" data-id="${equipment.equipmentCode}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Save or Update Equipment
    $('#equipmentForm').submit(function (e) {
        e.preventDefault();

        var equipmentData = {
            equipmentCode: editIndex === -1 ? null : editIndex,
            name: $('#equipmentName').val(),
            type: $('#equipmentType').val(),
            status: $('#status').val(),
            availableCount: $('#availableCount').val(),
            fieldList: $('#field').val()
        };

        const url = editIndex === -1
            ? "http://localhost:8080/springFinal/api/v1/equipments"
            : `http://localhost:8080/springFinal/api/v1/equipments/${editIndex}`;
        const method = editIndex === -1 ? "POST" : "PUT";

        $.ajax({
            url: url,
            method: method,
            contentType: "application/json",
            data: JSON.stringify(equipmentData),
            success: function () {
                $('#equipmentModal').modal('hide');
                $('#equipmentForm')[0].reset();
                loadEquipment();
            },
            error: function () {
                alert("Failed to save equipment!");
            }
        });
    });

    // Edit Equipment
    $(document).on('click', '.edit-equipment-btn', function () {
        const id = $(this).data("id");
        editIndex = id;

        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/equipments/${id}`,
            method: "GET",
            success: function (equipment) {
                $('#equipmentName').val(equipment.name);
                $('#equipmentType').val(equipment.type);
                $('#status').val(equipment.status);
                $('#availableCount').val(equipment.availableCount);
                $('#field').val(equipment.fieldList);

                $('#equipmentModalLabel').text('Edit Equipment');
                $('#equipmentModal').modal('show');
            },
            error: function () {
                alert("Failed to fetch equipment data!");
            }
        });
    });

    // Delete Equipment
    $(document).on('click', '.delete-equipment-btn', function () {
        const id = $(this).data("id");

        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/equipments/${id}`,
            method: "DELETE",
            success: function () {
                loadEquipment();
            },
            error: function () {
                alert("Failed to delete equipment!");
            }
        });
    });

    // Initial Load
    loadEquipment();
});

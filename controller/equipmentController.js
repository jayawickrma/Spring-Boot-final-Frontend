$(document).ready(function () {
    $(document).ready(function () {
        const apiUrl = "http://localhost:8080/springFinal/api/v1/equipments";
        let editIndex = -1;

        // Common AJAX Headers
        function getHeaders() {
            return {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            };
        }

        // Fetch and Load Equipment Data
        function loadEquipment() {
            $.ajax({
                url: apiUrl,
                method: "GET",
                headers: getHeaders(),
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
                        <button class="btn btn-primary edit-equipment-btn" data-id="${equipment.equipmentCode}">Edit</button>
                        <button class="btn btn-danger delete-equipment-btn" data-id="${equipment.equipmentCode}">Delete</button>
                    </td>
                </tr>
            `);
            });
        }

        // Save Equipment (POST)
        function saveEquipment() {
            var Data = {
                name: $('#equipmentName').val(),
                type: $('#equipmentType').val(),
                status: $('#status').val(),
                availableCount: $('#availableCount').val(),
                fieldList: $('#field').val()
            };
            $.ajax({
                url: apiUrl,
                method: "POST",
                headers: getHeaders(),
                contentType: "application/json",
                data: JSON.stringify(Data),
                success: function () {
                    $('#equipmentModal').modal('hide');
                    $('#equipmentForm')[0].reset();
                    loadEquipment();
                    alert("Equipment saved successfully!");
                },
                error: function () {
                    alert("Failed to save equipment!");
                }
            });
        }

        // Update Equipment (PUT)
        function updateEquipment(equipmentData, id) {
            $.ajax({
                url: `${apiUrl}/${id}`,
                method: "PUT",
                headers: getHeaders(),
                contentType: "application/json",
                data: JSON.stringify(equipmentData),
                success: function () {
                    $('#equipmentModal').modal('hide');
                    $('#equipmentForm')[0].reset();
                    loadEquipment();
                    alert("Equipment updated successfully!");
                },
                error: function () {
                    alert("Failed to update equipment!");
                }
            });
        }

        // Delete Equipment
        function deleteEquipment(id) {
            $.ajax({
                url: `${apiUrl}/${id}`,
                method: "DELETE",
                headers: getHeaders(),
                success: function () {
                    loadEquipment();
                    alert("Equipment deleted successfully!");
                },
                error: function () {
                    alert("Failed to delete equipment!");
                }
            });
        }

        // Edit Equipment (Fetch details and open modal)
        function editEquipment(id) {
            $.ajax({
                url: `${apiUrl}/${id}`,
                method: "GET",
                headers: getHeaders(),
                success: function (equipment) {
                    $('#equipmentName').val(equipment.name);
                    $('#equipmentType').val(equipment.type);
                    $('#status').val(equipment.status);
                    $('#availableCount').val(equipment.availableCount);
                    $('#field').val(equipment.fieldList);

                    $('#equipmentModalLabel').text('Edit Equipment');
                    $('#equipmentModal').modal('show');
                    editIndex = id;
                },
                error: function () {
                    alert("Failed to fetch equipment data!");
                }
            });
        }

        // Handle Form Submission
        $('#equipmentForm').submit(function (e) {
            e.preventDefault();

            var equipmentData = {
                name: $('#equipmentName').val(),
                type: $('#equipmentType').val(),
                status: $('#status').val(),
                availableCount: $('#availableCount').val(),
                fieldList: $('#field').val()
            };

            if (editIndex === -1) {
                saveEquipment(equipmentData); // Save new equipment
            } else {
                updateEquipment(equipmentData, editIndex); // Update existing equipment
            }
        });

        // Add Equipment Button Click
        $('#addEquipmentBtn').click(function () {
            $('#equipmentForm')[0].reset();
            $('#equipmentModalLabel').text('Add Equipment');
            $('#equipmentModal').modal('show');
            editIndex = -1; // Reset edit index for new entry
        });

        // Edit Equipment Button Click
        $(document).on('click', '.edit-equipment-btn', function () {
            const id = $(this).data("id");
            editEquipment(id);
        });

        // Delete Equipment Button Click
        $(document).on('click', '.delete-equipment-btn', function () {
            const id = $(this).data("id");
            if (confirm("Are you sure you want to delete this equipment?")) {
                deleteEquipment(id);
            }
        });

        // Initial Data Load
        loadEquipment();
    });
});

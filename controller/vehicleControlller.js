$(document).ready(function () {
    var editIndex = -1;

    // Fetch and load data from the backend
    function loadVehicles() {
        $.ajax({
            url: "http://localhost:8080/springFinal/api/v1/lvehicles",
            method: "GET",
            success: function (data) {
                renderVehicleTable(data);
            },
            error: function () {
                alert("Failed to load vehicles!");
            }
        });
    }

    // Render Vehicle Table
    function renderVehicleTable(vehicles) {
        $('#vehicleTable tbody').empty();
        vehicles.forEach((vehicle, index) => {
            $('#vehicleTable tbody').append(`
                <tr>
                    <td>${vehicle.vehicleCode}</td>
                    <td>${vehicle.licensePlateNumber}</td>
                    <td>${vehicle.name}</td>
                    <td>${vehicle.category}</td>
                    <td>${vehicle.fuelType}</td>
                    <td>${vehicle.remark}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.memberCode}</td>
                    <td>
                        <button class="btn btn-primary edit-vehicle-btn" data-id="${vehicle.vehicleCode}" data-index="${index}">Edit</button>
                        <button class="btn btn-danger delete-vehicle-btn" data-id="${vehicle.vehicleCode}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Save or Update Vehicle
    $('#vehicleForm').submit(function (e) {
        e.preventDefault();

        const vehicle = {
            licensePlateNumber: $('#licensePlate').val(),
            name: $('#vehicleName').val(),
            category: $('#vehicleCategory').val(),
            fuelType: $('#fuelType').val(),
            remark: $('#remark').val(),
            status: $('#status').val(),
            memberCode: $('#staffId').val()
        };

        const url = editIndex === -1
            ? "http://localhost:8080/springFinal/api/v1/lvehicles"
            : `http://localhost:8080/springFinal/api/v1/lvehicles/${editIndex}`;
        const method = editIndex === -1 ? "POST" : "PUT";

        $.ajax({
            url: url,
            method: method,
            contentType: "application/json",
            data: JSON.stringify(vehicle),
            success: function () {
                $('#vehicleModal').modal('hide');
                $('#vehicleForm')[0].reset();
                loadVehicles();
            },
            error: function () {
                alert("Failed to save vehicle!");
            }
        });
    });

    // Edit Vehicle
    $(document).on('click', '.edit-vehicle-btn', function () {
        const id = $(this).data("id");
        editIndex = id;

        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/lvehicles/${id}`,
            method: "GET",
            success: function (vehicle) {
                $('#licensePlate').val(vehicle.licensePlateNumber);
                $('#vehicleName').val(vehicle.name);
                $('#vehicleCategory').val(vehicle.category);
                $('#fuelType').val(vehicle.fuelType);
                $('#remark').val(vehicle.remark);
                $('#status').val(vehicle.status);
                $('#staffId').val(vehicle.memberCode);

                $('#vehicleModalLabel').text('Edit Vehicle');
                $('#vehicleModal').modal('show');
            },
            error: function () {
                alert("Failed to fetch vehicle data!");
            }
        });
    });

    // Delete Vehicle
    $(document).on('click', '.delete-vehicle-btn', function () {
        const id = $(this).data("id");

        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/lvehicles/${id}`,
            method: "DELETE",
            success: function () {
                loadVehicles();
            },
            error: function () {
                alert("Failed to delete vehicle!");
            }
        });
    });

    // Initial Load
    loadVehicles();
});

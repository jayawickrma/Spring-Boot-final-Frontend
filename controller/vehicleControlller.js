import vehicles from "../Model/vehicleModel.js";
$(document).ready(function () {
    var editIndex = -1;

    // Fetch and load data from the backend
    function loadVehicles() {
        $.ajax({
            url: "http://localhost:8080/springFinal/api/v1/vehicles",
            method: "GET",
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
            },
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
            console.log(vehicle.licensePlateNumber)
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

        var formData = new FormData();
        formData.append('licencePlateNumber', $('#licensePlate').val());
        formData.append('name', $('#vehicleName').val());
        formData.append('category', $('#vehicleCategory').val());
        formData.append('fuelType', $('#fuelType').val());
        formData.append('remark', $('#remark').val());
        formData.append('status', $('#status').val());
        formData.append('memberCode', $('#staffId').val());

        const url = editIndex === -1
            ? "http://localhost:8080/springFinal/api/v1/vehicles"
            : `http://localhost:8080/springFinal/api/v1/vehicles/${editIndex}`;
        const method = editIndex === -1 ? "POST" : "PUT";

        $.ajax({
            url: url,
            method: method,
            contentType: false,
            processData: false,
            data: formData,
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
            url: `http://localhost:8080/springFinal/api/v1/vehicles/${id}`,
            method: "GET",
            success: function (vehicle) {
                $('#licensePlate').val(vehicle.licencePlateNumber);
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
            url: `http://localhost:8080/springFinal/api/v1/vehicles/${id}`,
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

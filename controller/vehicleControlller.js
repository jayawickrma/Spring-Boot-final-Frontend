$(document).ready(function () {
    var editIndex = -1;

    // Load Vehicles
    function loadVehicles() {
        $.ajax({
            url: "http://localhost:8080/springFinal/api/v1/vehicles",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
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
        vehicles.forEach(vehicle => {
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
                        <button class="btn btn-primary edit-vehicle-btn" data-id="${vehicle.vehicleCode}">Edit</button>
                        <button class="btn btn-danger delete-vehicle-btn" data-id="${vehicle.vehicleCode}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }


    // Save Vehicle Details (Create Vehicle)
    function saveVehicleDetails() {
        var data = {
            vehicleCode:"1",
            licensePlateNumber : $('#licensePlate').val(),
            name:$('#vehicleName').val(),
            category : $('#vehicleCategory').val(),
            fuelType : $('#fuelType').val(),
            remark : $('#remark').val(),
            status:$('#status').val(),
            memberCode : $('#staffId').val()
        }

        $.ajax({
            url: "http://localhost:8080/springFinal/api/v1/vehicles",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            },
            success: function () {
                $('#vehicleModal').modal('hide');
                $('#vehicleForm')[0].reset();
                loadVehicles();
                alert("Vehicle saved successfully!");
            },
            error: function () {
                alert("Failed to save vehicle details!");
            }
        });
    }

    // Update Vehicle Details
    function updateVehicleDetails(formData, vehicleCode) {
        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/vehicles/${vehicleCode}`,
            method: "PUT",
            contentType: false,
            processData: false,
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            },
            success: function () {
                $('#vehicleModal').modal('hide');
                $('#vehicleForm')[0].reset();
                loadVehicles();
                alert("Vehicle updated successfully!");
            },
            error: function () {
                alert("Failed to update vehicle details!");
            }
        });
    }

    // Form Submit for Vehicle Details
    $('#vehicleForm').submit(function (e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('licensePlateNumber', $('#licensePlate').val());
        formData.append('name', $('#vehicleName').val());
        formData.append('category', $('#vehicleCategory').val());
        formData.append('fuelType', $('#fuelType').val());
        formData.append('remark', $('#remark').val());
        formData.append('status', $('#status').val());
        formData.append('memberCode', $('#staffId').val());

        if (editIndex === -1) {
            // Save new vehicle
            saveVehicleDetails(formData);
        } else {
            // Update existing vehicle
            updateVehicleDetails(formData, editIndex);
        }
    });

    // Edit Vehicle
    $(document).on('click', '.edit-vehicle-btn', function () {
        const id = $(this).data("id");
        editIndex = id;

        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/vehicles/${id}`,
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

        if (confirm("Are you sure you want to delete this vehicle?")) {
            $.ajax({
                url: `http://localhost:8080/springFinal/api/v1/vehicles/${id}`,
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                },
                success: function () {
                    loadVehicles();
                    alert("Vehicle deleted successfully!");
                },
                error: function () {
                    alert("Failed to delete vehicle!");
                }
            });
        }
    });

    // Load vehicles initially
    loadVehicles();
});
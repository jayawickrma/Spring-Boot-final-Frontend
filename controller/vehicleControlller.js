$(document).ready(function () {
    var vehicles = [];
    var editIndex = -1;

    // Save or Update Vehicle
    $('#vehicleForm').submit(function (e) {
        e.preventDefault();

        var licensePlate = $('#licensePlate').val();
        var name = $('#vehicleName').val();
        var category = $('#vehicleCategory').val();
        var fuelType = $('#fuelType').val();
        var remark = $('#remark').val();
        var status = $('#status').val();
        var staffId = $('#staffId').val(); // Get Staff ID

        if (editIndex === -1) {
            // Add new vehicle
            var newVehicle = {
                id: vehicles.length + 1,
                licensePlate: licensePlate,
                name: name,
                category: category,
                fuelType: fuelType,
                remark: remark,
                status: status,
                staffId: staffId, // Store Staff ID
            };
            vehicles.push(newVehicle);
        } else {
            // Update existing vehicle
            vehicles[editIndex].licensePlate = licensePlate;
            vehicles[editIndex].name = name;
            vehicles[editIndex].category = category;
            vehicles[editIndex].fuelType = fuelType;
            vehicles[editIndex].remark = remark;
            vehicles[editIndex].status = status;
            vehicles[editIndex].staffId = staffId; // Update Staff ID
            editIndex = -1;
        }

        $('#vehicleModal').modal('hide');
        $('#vehicleForm')[0].reset();
        renderVehicleTable();
    });

    // Render Vehicle Table
    function renderVehicleTable() {
        $('#vehicleTable tbody').empty();
        vehicles.forEach((vehicle, index) => {
            $('#vehicleTable tbody').append(`
        <tr>
          <td>${vehicle.licensePlate}</td>
          <td>${vehicle.name}</td>
          <td>${vehicle.category}</td>
          <td>${vehicle.fuelType}</td>
          <td>${vehicle.remark}</td>
          <td>${vehicle.status}</td>
          <td>${vehicle.staffId}</td> <!-- Display Staff ID -->
          <td>
            <button class="btn btn-primary edit-vehicle-btn" data-index="${index}">Edit</button>
            <button class="btn btn-danger delete-vehicle-btn" data-index="${index}">Delete</button>
          </td>
        </tr>
      `);
        });
    }

    // Edit Vehicle
    $(document).on('click', '.edit-vehicle-btn', function () {
        editIndex = $(this).data('index');
        var vehicle = vehicles[editIndex];

        $('#licensePlate').val(vehicle.licensePlate);
        $('#vehicleName').val(vehicle.name);
        $('#vehicleCategory').val(vehicle.category);
        $('#fuelType').val(vehicle.fuelType);
        $('#remark').val(vehicle.remark);
        $('#status').val(vehicle.status);
        $('#staffId').val(vehicle.staffId); // Set Staff ID in the form

        $('#vehicleModalLabel').text('Edit Vehicle');
        $('#vehicleModal').modal('show');
    });

    // Delete Vehicle
    $(document).on('click', '.delete-vehicle-btn', function () {
        var index = $(this).data('index');
        vehicles.splice(index, 1);
        renderVehicleTable();
    });
});

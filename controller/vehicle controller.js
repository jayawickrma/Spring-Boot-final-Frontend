import{vehicleList} from "../db/db";

$(document).ready(function() {


    // Function to refresh the vehicle table
    function refreshVehicleTable() {
        const vehicleTableBody = $('#vehicleTableBody');
        vehicleTableBody.empty(); // Clear existing table body

        vehicleList.forEach((vehicle, index) => {
            const row = `
                <tr>
                    <td>${vehicle.licensePlate}</td>
                    <td>${vehicle.vehicleName}</td>
                    <td>${vehicle.category}</td>
                    <td>${vehicle.fuelType}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.staff}</td>
                    <td>${vehicle.remarks}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            vehicleTableBody.append(row);
        });
    }

    // Add Vehicle
    $('.add-btn').click(function(e) {
        e.preventDefault(); // Prevent the default form submission

        const licensePlate = $('#licensePlate').val();
        const vehicleName = $('#vehicleName').val();
        const category = $('#category').val();
        const fuelType = $('#fuelType').val();
        const status = $('#status').val();
        const staff = $('#selectStaff').val(); // Get selected staff member
        const remarks = $('#remarks').val();

        // Create a new vehicle entry object
        const newVehicle = {
            licensePlate,
            vehicleName,
            category,
            fuelType,
            status,
            staff,
            remarks
        };

        vehicleList.push(newVehicle); // Add new vehicle to the array
        refreshVehicleTable(); // Refresh the table
        clearForm(); // Clear form fields
    });

    // Edit Vehicle
    $(document).on('click', '.edit-btn', function() {
        const index = $(this).data('index');
        const vehicle = vehicleList[index];

        $('#licensePlate').val(vehicle.licensePlate);
        $('#vehicleName').val(vehicle.vehicleName);
        $('#category').val(vehicle.category);
        $('#fuelType').val(vehicle.fuelType);
        $('#status').val(vehicle.status);
        $('#selectStaff').val(vehicle.staff); // Set selected staff member
        $('#remarks').val(vehicle.remarks);

        // Update the Add button to Save
        $('.add-btn').text('Save').off('click').click(function(e) {
            e.preventDefault();

            // Create an updated vehicle entry object
            const updatedVehicle = {
                licensePlate: $('#licensePlate').val(),
                vehicleName: $('#vehicleName').val(),
                category: $('#category').val(),
                fuelType: $('#fuelType').val(),
                status: $('#status').val(),
                staff: $('#selectStaff').val(),
                remarks: $('#remarks').val()
            };

            vehicleList[index] = updatedVehicle; // Update the vehicle in the array
            refreshVehicleTable(); // Refresh the table
            clearForm(); // Clear form fields
            $('.add-btn').text('Add Vehicle'); // Reset button text
        });
    });

    // Delete Vehicle
    $(document).on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        vehicleList.splice(index, 1); // Remove vehicle from array
        refreshVehicleTable(); // Refresh the table
    });

    // Function to clear the form fields
    function clearForm() {
        $('#licensePlate').val('');
        $('#vehicleName').val('');
        $('#category').val('');
        $('#fuelType').val('');
        $('#status').val('');
        $('#selectStaff').val(''); // Reset selected staff
        $('#remarks').val(''); // Reset remarks
    }
});

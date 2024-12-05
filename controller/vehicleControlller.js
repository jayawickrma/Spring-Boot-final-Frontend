$(document).ready(function () {
    const apiUrl = 'http://localhost:8080/springFinal/api/v1/vehicles';
    let editVehicleId = null; // Tracks the vehicle being edited

    // Load all vehicles into the table
    function loadVehicles() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function (data) {
                const vehicleTableBody = $("#vehicleTable tbody");
                vehicleTableBody.empty(); // Clear table before appending
                data.forEach(vehicle => {
                    vehicleTableBody.append(`
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
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${vehicle.vehicleCode}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${vehicle.vehicleCode}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
                attachHandlers();
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load vehicles. Please try again later.',
                });
            }
        });
    }

    // Save or Update Vehicle
    $('#vehicleForm').on('submit', function (e) {
        e.preventDefault();

        const vehicleData = {
            licensePlateNumber: $('#licensePlate').val(),
            name: $('#vehicleName').val(),
            category: $('#vehicleCategory').val(),
            fuelType: $('#fuelType').val(),
            remark: $('#remark').val(),
            status: $('#status').val(),
            memberCode: $('#staffId').val()
        };

        const method = editVehicleId ? 'PUT' : 'POST';
        const url = editVehicleId ? `${apiUrl}/${editVehicleId}` : apiUrl;

        $.ajax({
            url: url,
            type: method,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(vehicleData),
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: `Vehicle ${editVehicleId ? 'updated' : 'added'} successfully!`,
                    timer: 1500,
                    showConfirmButton: false
                });
                $('#vehicleModal').modal('hide');
                loadVehicles();
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Failed to ${editVehicleId ? 'update' : 'add'} vehicle. Please try again.`,
                });
            }
        });
    });

    // Attach Event Handlers for Edit and Delete
    function attachHandlers() {
        // Edit functionality
        $('.edit-btn').on('click', function () {
            const vehicleCode = $(this).data('id');
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function (response) {
                    response.forEach(vehicle => {
                        if (vehicle.vehicleCode === vehicleCode) {
                            $('#licensePlate').val(vehicle.licensePlateNumber);
                            $('#vehicleName').val(vehicle.name);
                            $('#vehicleCategory').val(vehicle.category);
                            $('#fuelType').val(vehicle.fuelType);
                            $('#remark').val(vehicle.remark);
                            $('#status').val(vehicle.status);
                            $('#staffId').val(vehicle.memberCode);
                            editVehicleId = vehicle.vehicleCode;

                            $('#vehicleModalLabel').text('Edit Vehicle');
                            $('#vehicleModal').modal('show');
                        }
                    });
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch vehicle details.',
                    });
                }
            });
        });

        // Delete functionality
        $('.delete-btn').on('click', function () {
            const vehicleCode = $(this).data('id');
            Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: `${apiUrl}/${vehicleCode}`,
                        type: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                        },
                        success: function () {
                            Swal.fire({
                                icon: 'success',
                                title: 'Vehicle deleted successfully!',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            loadVehicles();
                        },
                        error: function () {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to delete vehicle. Please try again.',
                            });
                        }
                    });
                }
            });
        });
    }

    // Add Vehicle Button
    $('#vehicleSaveBtn').on('click', function () {
        $('#vehicleForm')[0].reset();
        editVehicleId = null;
        $('#vehicleModalLabel').text('Add Vehicle');
    });

    // Initialize vehicle list
    loadVehicles();
});

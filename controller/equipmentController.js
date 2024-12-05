$(document).ready(function () {
    const equipmentApiUrl = 'http://localhost:8080/springFinal/api/v1/equipments';
    let editEquipmentId = null; // Tracks the equipment being edited

    // Load all equipment into the table
    function loadEquipments() {
        $.ajax({
            url: equipmentApiUrl,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function (data) {
                const equipmentTableBody = $("#equipmentTable tbody");
                equipmentTableBody.empty(); // Clear table before appending
                data.forEach(equipment => {
                    equipmentTableBody.append(`
                        <tr>
                            <td>${equipment.equipmentCode}</td>
                            <td>${equipment.name}</td>
                            <td>${equipment.type}</td>
                            <td>${equipment.status}</td>
                            <td>${equipment.availableCount}</td>
                            <td>${equipment.fieldList.join(', ')}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-equipment-btn" data-id="${equipment.equipmentCode}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-equipment-btn" data-id="${equipment.equipmentCode}">Delete</button>
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
                    text: 'Failed to load equipment. Please try again later.',
                });
            }
        });
    }

    // Save or Update Equipment
    $('#equipmentForm').on('submit', function (e) {
        e.preventDefault();

        const fieldList = $('#efield').val().split(',').map(field => field.trim());
        const equipmentData = {
            name: $('#equipmentName').val(),
            type: $('#equipmentType').val(),
            status: $('#equipmentStatus').val(),
            availableCount: parseInt($('#availableCount').val(), 10),
            fieldList
        };

        const method = editEquipmentId ? 'PUT' : 'POST';
        const url = editEquipmentId ? `${equipmentApiUrl}/${editEquipmentId}` : equipmentApiUrl;

        $.ajax({
            url: url,
            type: method,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            contentType: 'application/json',
            data: JSON.stringify(equipmentData),
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: `Equipment ${editEquipmentId ? 'updated' : 'added'} successfully!`,
                    timer: 1500,
                    showConfirmButton: false
                });
                $('#equipmentModal').modal('hide');
                loadEquipments();
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Failed to ${editEquipmentId ? 'update' : 'add'} equipment. Please try again.`,
                });
            }
        });
    });

    // Attach Event Handlers for Edit and Delete
    function attachHandlers() {
        // Edit functionality
        $('.edit-equipment-btn').on('click', function () {
            const equipmentCode = $(this).data('id');
            $.ajax({
                url: `${equipmentApiUrl}`,
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function (response) {
                    response.forEach((equipment)=>{
                        if (equipment.equipmentCode===equipmentCode) {
                            $('#equipmentName').val(equipment.name);
                            $('#equipmentType').val(equipment.type);
                            $('#equipmentStatus').val(equipment.status);
                            $('#availableCount').val(equipment.availableCount);
                            $('#efield').val(equipment.fieldList.join(', '));
                            editEquipmentId = equipment.equipmentCode;

                            $('#equipmentModalLabel').text('Edit Equipment');
                            $('#equipmentModal').modal('show');
                        }
                    })
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch equipment details.',
                    });
                }
            });
        });

        // Delete functionality
        $('.delete-equipment-btn').on('click', function () {
            const equipmentCode = $(this).data('id');
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
                        url: `${equipmentApiUrl}/${equipmentCode}`,
                        type: 'DELETE',
                        contentType: 'application/json',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                        },
                        success: function () {
                            Swal.fire({
                                icon: 'success',
                                title: 'Equipment deleted successfully!',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            loadEquipments();
                        },
                        error: function () {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to delete equipment. Please try again.',
                            });
                        }
                    });
                }
            });
        });
    }

    // Add Equipment Button
    $('#addEquipmentBtn').on('click', function () {
        $('#equipmentForm')[0].reset();
        editEquipmentId = null;
        $('#equipmentModalLabel').text('Add Equipment');
    });

    // Initialize equipment list
    loadEquipments();
});

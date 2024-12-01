$(document).ready(function () {
    const apiUrl = 'http://localhost:8080/springFinal/api/v1/crops';
    let editCropId = null; // Tracks the crop being edited

    // Load all crops into the table
    function loadCrops() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function (data) {
                const cropTableBody = $("#cropTable tbody");
                cropTableBody.empty(); // Clear table before appending
                data.forEach(crop => {
                    cropTableBody.append(`
                        <tr>
                            <td>${crop.cropCode}</td>
                            <td>${crop.cropName}</td>
                            <td>${crop.category}</td>
                            <td>${crop.season}</td>
                            <td>${crop.scientificName}</td>
                            <td>
                                <img src="data:image/jpeg;base64,${crop.cropImage}" 
                                     alt="Crop Image" class="crop-image" 
                                     style="width: 50px; cursor: pointer;">
                            </td>
                            <td>${crop.fieldList ? crop.fieldList.join(', ') : 'N/A'}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${crop.cropCode}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${crop.cropCode}">Delete</button>
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
                    text: 'Failed to load crops.',
                });
            }
        });
    }

    // Save or Update Crop
    $('#cropForm').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cropName', $('#cropName').val());
        formData.append('category', $('#category').val());
        formData.append('season', $('#Season').val());
        formData.append('scientificName', $('#ScientificName').val());
        formData.append('cropImage', $('#CropImage')[0].files[0]);
        formData.append('fieldList', $('#field').val());

        if (editCropId) {
            $.ajax({
                url: `${apiUrl}/${editCropId}`,
                type: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'Crop has been updated successfully!',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    $('#cropModal').modal('hide');
                    loadCrops();
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update crop.',
                    });
                }
            });
        } else {
            $.ajax({
                url: apiUrl,
                type: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'Crop has been saved successfully!',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    $('#cropModal').modal('hide');
                    loadCrops();
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to save crop.',
                    });
                }
            });
        }
    });

    // Attach Event Handlers for Edit and Delete
    function attachHandlers() {
        $('.edit-btn').on('click', function () {
            const cropCode = $(this).data('id');
            $.ajax({
                url: `${apiUrl}/${cropCode}`,
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function (crop) {
                    $('#cropName').val(crop.cropName);
                    $('#category').val(crop.category);
                    $('#Season').val(crop.season);
                    $('#ScientificName').val(crop.scientificName);
                    $('#field').val(crop.fieldList ? crop.fieldList.join(', ') : '');
                    editCropId = crop.cropCode;

                    $('#cropModalLabel').text('Edit Crop');
                    $('#cropModal').modal('show');
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to fetch crop details.',
                    });
                }
            });
        });

        $('.delete-btn').on('click', function () {
            const cropCode = $(this).data('id');
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: `${apiUrl}/${cropCode}`,
                        type: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                        },
                        success: function () {
                            Swal.fire({
                                icon: 'success',
                                title: 'Crop has been deleted successfully!',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            loadCrops();
                        },
                        error: function () {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to delete crop.',
                            });
                        }
                    });
                }
            });
        });
    }

    // Add Crop Button
    $('#cropSaveBtn').on('click', function () {
        $('#cropForm')[0].reset();
        editCropId = null;
        $('#cropModalLabel').text('Add Crop');
    });

    // Initialize crop list
    loadCrops();
});

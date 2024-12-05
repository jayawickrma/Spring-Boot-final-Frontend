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
                                     style="width: 50px; cursor: pointer;" onclick="showImagePopup('${crop.cropImage}')">
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
                    text: 'Failed to load crops. Please try again later.',
                });
            }
        });
    }

    // Function to show image in popup
    window.showImagePopup = function (base64Image) {
        Swal.fire({
            title: 'Crop Image',
            imageUrl: 'data:image/jpeg;base64,' + base64Image,
            imageAlt: 'Crop Image',
            width: '400px',
            showCloseButton: true,
            showConfirmButton: false
        });
    };

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

        const method = editCropId ? 'PUT' : 'POST';
        const url = editCropId ? `${apiUrl}/${editCropId}` : apiUrl;

        $.ajax({
            url: url,
            type: method,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: `Crop ${editCropId ? 'updated' : 'added'} successfully!`,
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
                    text: `Failed to ${editCropId ? 'update' : 'add'} crop. Please try again.`,
                });
            }
        });
    });

    // Attach Event Handlers for Edit and Delete
    function attachHandlers() {
        // Edit functionality
        $('.edit-btn').on('click', function () {
            const cropCode = $(this).data('id');
            $.ajax({
                url: apiUrl,
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function (response) {
                    response.forEach((crop) =>{
                        if (crop.cropCode === cropCode) {
                            $('#cropName').val(crop.cropName);
                            $('#category').val(crop.category);
                            $('#Season').val(crop.season);
                            $('#ScientificName').val(crop.scientificName);
                            $('#field').val(crop.fieldList? crop.fieldList.join(', ') : '');
                            editCropId = crop.cropCode;

                            $('#cropModalLabel').text('Edit Crop');
                            $('#cropModal').modal('show');
                        }
                    })
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

        // Delete functionality
        $('.delete-btn').on('click', function () {
            const cropCode = $(this).data('id');
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
                        url: `${apiUrl}/${cropCode}`,
                        type: 'DELETE',
                        contentType: 'application/json',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                        },
                        success: function () {
                            Swal.fire({
                                icon: 'success',
                                title: 'Crop deleted successfully!',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            loadCrops();
                        },
                        error: function () {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to delete crop. Please try again.',
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

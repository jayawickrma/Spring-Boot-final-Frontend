$(document).ready(function () {
    const apiUrl = 'http://localhost:8080/springFinal/api/v1/crops';

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
                                     style="width: 50px; cursor: pointer;" 
                                     data-image="${crop.cropImage}">
                            </td>
                            <td>${crop.fieldList ? crop.fieldList.join(', ') : 'N/A'}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${crop.cropCode}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${crop.cropCode}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
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

    // Save a new crop
    function saveCrop() {
        const formData = new FormData();
        formData.append("cropName",$("#cropName").val());
        formData.append("scientificName",$("#category").val());
        formData.append("category",$("#Season").val());
        formData.append("season",$("#ScientificName").val());
        formData.append("cropImage",$("#CropImage").val());
        formData.append("fieldList",$("#field").val());
        console.log(formData)
        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },

            success: function () {
                $("#cropModal").modal('hide');
                loadCrops();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Crop added successfully!',
                });
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add crop.',
                });
            }
        });
    }

    // Update an existing crop
    function updateCrop(cropId) {
        const formData = new FormData($("#cropForm")[0]);
        $.ajax({
            url: `${apiUrl}/${cropId}`,
            type: 'PUT',
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            data: formData,
            success: function () {
                $("#cropModal").modal('hide');
                loadCrops();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Crop updated successfully!',
                });
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update crop.',
                });
            }
        });
    }

    // Delete a crop
    $(document).on("click", ".delete-btn", function () {
        const cropId = $(this).data("id");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${apiUrl}/${cropId}`,
                    type: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                    },
                    success: function () {
                        loadCrops();
                        Swal.fire(
                            'Deleted!',
                            'Crop has been deleted.',
                            'success'
                        );
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

    // Handle Add/Edit form submission
    $("#cropForm").submit(function (e) {
        e.preventDefault();

        const isEdit = $("#cropForm").data("edit");
        const cropId = isEdit ? $("#cropForm").data("id") : null;

        if (isEdit) {
            updateCrop(cropId);
        } else {
            saveCrop();
        }
    });

    // Open Add/Edit modal
    $("#addCropBtn").click(function () {
        $("#cropForm")[0].reset();
        $("#cropForm").data("edit", false);
        $("#cropModalLabel").text("Add Crop");
        $("#cropModal").modal("show");
    });

    // Open Edit modal
    $(document).on("click", ".edit-btn", function () {
        const cropId = $(this).data("id");

        // Fetch crop details and populate the form
        $.ajax({
            url: `${apiUrl}/${cropId}`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function (crop) {
                $("#cropName").val(crop.cropName);
                $("#ScientificName").val(crop.scientificName);
                $("#category").val(crop.category);
                $("#Season").val(crop.season);
                $("#fieldList").val(crop.fieldList ? crop.fieldList.join(', ') : '');
                $("#cropForm").data("edit", true).data("id", crop.cropCode);
                $("#cropModalLabel").text("Edit Crop");
                $("#cropModal").modal("show");
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load crop details.',
                });
            }
        });
    });

    // Image popup viewer
    $(document).on('click', '.crop-image', function () {
        const imageUrl = `data:image/jpeg;base64,${$(this).data('image')}`;
        Swal.fire({
            title: 'Crop Image',
            imageUrl: imageUrl,
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: 'Crop Image',
        });
    });

    // Load crops initially
    loadCrops();
});

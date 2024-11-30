import {cropModel}from "Model/cropModel.js"
$(document).ready(function () {

    const apiUrl = 'http://localhost:8080/springFinal/api/v1/crops';

    // Load crops into the table
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

    // Save Crop
    function saveCrop(){
        let formData =new FormData(this);
        formData.append("cropName",$('#cropName').val());
        formData.append("scientificName",$("#ScientificName").val());
        formData.append("category",$("#category").val());
        formData.append("season",$("#Season").val());
        formData.append("cropImage",$("#CropImage").val());
        formData.append("fieldList",$("#field").val());

        $.ajax({
            url:"http://localhost:8080/springFinal/api/v1/crops",
            type:"POST",
            data:formData,
            processData:false,
            contentType:false,
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function() {
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                resolve();
            },
            error: function(xhr, status, error) {
                switch (xhr.status) {
                    case 400:
                        Swal.fire("Bad Request", "The request was invalid. Please check your input and try again.", "error");
                        break;
                    case 401:
                        Swal.fire("Unauthorized", "You are not authorized to perform this action.", "warning");
                        break;
                    case 403:
                        Swal.fire("Forbidden", "You do not have permission to access this resource.", "error");
                        break;
                    case 404:
                        Swal.fire("Not Found", "The requested resource could not be found.", "info");
                        break;
                    case 500:
                        Swal.fire("Server Error", "An error occurred on the server. Please try again later.", "error");
                        break;
                    default:
                        Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
                        break;
                }
                reject(error);
            }
        })

    }



    // Update Crop
    function updateCrop(formData, cropId) {
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


    // Delete Crop
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

    // Handle Form Submission
    $("#cropForm").submit(function (e) {
        e.preventDefault();

        const isEdit = $("#cropForm").data("edit");
        const cropId = isEdit ? $("#cropForm").data("id") : null;

        const formData = new FormData(this);
        formData.append("cropName", $("#cropName").val());
        formData.append("scientificName", $("#ScientificName").val());
        formData.append("category", $("#category").val());
        formData.append("season", $("#Season").val());

        const cropImageInput = $("#cropImage")[0];
        if (cropImageInput && cropImageInput.files && cropImageInput.files.length > 0) {
            formData.append("cropImage", cropImageInput.files[0]); // File upload
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please select a crop image before saving.',
            });
            return;
        }

        formData.append("fieldList", $("#fieldList").val());

        if (isEdit) {
            updateCrop(formData, cropId);
        } else {
            saveCrop();
        }
    });

    // Open Add/Edit Modal
    $("#addCropBtn").click(function () {
        $("#cropForm")[0].reset();
        $("#cropForm").data("edit", false);
        $("#cropModalLabel").text("Add Crop");
        $("#cropModal").modal("show");
    });

    // Image Popup Viewer
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

    // Initial Table Load
    loadCrops();
});

// $(document).ready(function () {
//
//     // Load crops into the table
//     function loadCrops() {
//         console.log(localStorage.getItem('jwtToken'))
//         $.ajax({
//             url: 'http://localhost:8080/springFinal/api/v1/crops', // Backend endpoint for fetching crops
//             type: 'GET',
//             dataType: 'json',
//             headers: {
//                 'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
//             },
//             success: function (data) {
//                 const cropTableBody = $("#cropTable tbody");
//                 cropTableBody.empty(); // Clear table before appending
//                 data.forEach(crop => {
//                     cropTableBody.append(`
//                         <tr>
//                             <td>${crop.cropCode}</td>
//                             <td>${crop.cropName}</td>
//                             <td>${crop.season}</td>
//                             <td>${crop.scientificName}</td>
//                             <td>
//                                 <img src="data:image/jpeg;base64,${crop.cropImage}"
//                                      alt="Crop Image" class="crop-image"
//                                      style="width: 50px; cursor: pointer;"
//                                      data-image="${crop.cropImage}">
//                             </td>
//                             <td>${crop.fieldList ? crop.fieldList.join(', ') : 'N/A'}</td>
//                             <td>
//                                 <button class="btn btn-warning btn-sm edit-btn" data-id="${crop.cropCode}">Edit</button>
//                                 <button class="btn btn-danger btn-sm delete-btn" data-id="${crop.cropCode}">Delete</button>
//                             </td>
//                         </tr>
//                     `);
//                 });
//             },
//             error: function () {
//                 alert("Failed to load crops.");
//             }
//         });
//     }
//
//     // Open Add/Edit Modal
//     $("#cropSaveBtn, .edit-btn").click(function () {
//         const isEdit = $(this).hasClass("edit-btn");
//         const cropId = isEdit ? $(this).data("id") : null;
//
//         if (isEdit) {
//             // Load crop details into the form for editing
//             $.ajax({
//                 url: `http://localhost:8080/springFinal/api/v1/crops/${cropCode}`,
//                 type: 'GET',
//
//                 success: function (crop) {
//                     $("#cropName").val(crop.cropName);
//                     $("#ScientificName").val(crop.scientificName);
//                     $("#category").val(crop.category)
//                     $("#Season").val(crop.season);
//                     $("#field").val(crop.fieldList ? crop.fieldList.join(', ') : '');
//                     $("#cropForm").data("edit", true).data("id", cropId);
//                     $("#cropModalLabel").text("Edit Crop");
//                     $("#cropModal").modal("show");
//                 }
//             });
//         } else {
//             // Open form for adding a new crop
//             $("#cropForm")[0].reset();
//             $("#cropForm").data("edit", false);
//             $("#cropModalLabel").text("Add Crop");
//             $("#cropModal").modal("show");
//         }
//     });
//
//     // Save Crop (Add/Update)
//     $("#cropForm").submit(function (e) {
//         e.preventDefault();
//
//         const formData = new FormData(this);
//         formData.append("cropName",$("#cropName").val());
//         formData.append("scientificName", $("#ScientificName").val());
//         formData.append("category",$("#category").val());
//         formData.append("season", $("#Season").val());
//         formData.append("cropImage",$("#cropImage").val());
//         formData.append("fieldList",$("#fieldList").val());
//         const isEdit = $("#cropForm").data("edit");
//         const cropId = isEdit ? $("#cropForm").data("id") : null;
//         const url = isEdit
//             ? `http://localhost:8080/springFinal/api/v1/crops/${cropId}`
//             : 'http://localhost:8080/springFinal/api/v1/crops';
//
//         $.ajax({
//             url: url,
//             type: isEdit ? 'PUT' : 'POST',
//             data: formData,
//             processData: false,
//             contentType: false,
//             headers: {
//                 'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
//             },
//             success: function () {
//                 $("#cropModal").modal('hide');
//                 loadCrops();
//                 alert(isEdit ? "Crop updated successfully!" : "Crop added successfully!");
//             },
//             error: function () {
//                 alert(isEdit ? "Failed to update crop." : "Failed to add crop.");
//             }
//         });
//     });
//
//     // Delete Crop
//     $(document).on("click", ".delete-btn", function () {
//         const cropId = $(this).data("id");
//         if (confirm("Are you sure you want to delete this crop?")) {
//             $.ajax({
//                 url: `http://localhost:8080/springFinal/api/v1/crops/${cropCode}`,
//                 type: 'DELETE',
//                 headers: {
//                     'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
//                 },
//                 success: function () {
//                     loadCrops();
//                     alert("Crop deleted successfully!");
//                 },
//                 error: function () {
//                     alert("Failed to delete crop.");
//                 }
//             });
//         }
//     });
//
//     // Image Popup Viewer
//     $(document).on('click', '.crop-image', function () {
//         const imageUrl = `data:image/jpeg;base64,${$(this).data('image')}`;
//         $('#popupImage').attr('src', imageUrl);
//         $('#imagePopup').fadeIn();
//     });
//
//     // Close Image Popup
//     $('#imagePopup .close').click(function () {
//         $('#imagePopup').fadeOut();
//     });
//
//     // Initial Table Load
//     loadCrops();
// });
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
                alert("Failed to load crops.");
            }
        });
    }

    // Save Crop
    function saveCrop() {
        const formData = new FormData($("#cropForm")[0]);
        formData.append("cropName", $("#cropName").val());
        formData.append("scientificName", $("#ScientificName").val());
        formData.append("category", $("#category").val());
        formData.append("season", $("#Season").val());
        formData.append("cropImage", $("#cropImage")[0].files[0]); // File upload
        formData.append("fieldList", $("#fieldList").val());

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
                alert("Crop added successfully!");
            },
            error: function () {
                alert("Failed to add crop.");
            }
        });
    }

    // Update Crop
    function updateCrop(formData, cropId) {
        $.ajax({
            url: `${apiUrl}/${cropId}`,
            type: 'PUT',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function () {
                $("#cropModal").modal('hide');
                loadCrops();
                alert("Crop updated successfully!");
            },
            error: function () {
                alert("Failed to update crop.");
            }
        });
    }

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
        formData.append("cropImage", $("#cropImage")[0].files[0]); // File upload
        formData.append("fieldList", $("#fieldList").val());

        if (isEdit) {
            updateCrop(formData, cropId);
        } else {
            saveCrop();
        }
    });

    // Open Add/Edit Modal
    $(document).on("click", ".edit-btn", function () {
        const cropId = $(this).data("id");

        // Load crop details into the form for editing
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
                $("#cropForm").data("edit", true).data("id", cropId);
                $("#cropModalLabel").text("Edit Crop");
                $("#cropModal").modal("show");
            },
            error: function () {
                alert("Failed to fetch crop details.");
            }
        });
    });

    // Open Modal for Adding Crop
    $("#addCropBtn").click(function () {
        $("#cropForm")[0].reset();
        $("#cropForm").data("edit", false);
        $("#cropModalLabel").text("Add Crop");
        $("#cropModal").modal("show");
    });

    // Delete Crop
    $(document).on("click", ".delete-btn", function () {
        const cropId = $(this).data("id");
        if (confirm("Are you sure you want to delete this crop?")) {
            $.ajax({
                url: `${apiUrl}/${cropId}`,
                type: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                success: function () {
                    loadCrops();
                    alert("Crop deleted successfully!");
                },
                error: function () {
                    alert("Failed to delete crop.");
                }
            });
        }
    });

    // Image Popup Viewer
    $(document).on('click', '.crop-image', function () {
        const imageUrl = `data:image/jpeg;base64,${$(this).data('image')}`;
        $('#popupImage').attr('src', imageUrl);
        $('#imagePopup').fadeIn();
    });

    // Close Image Popup
    $('#imagePopup .close').click(function () {
        $('#imagePopup').fadeOut();
    });

    // Initial Table Load
    loadCrops();
});

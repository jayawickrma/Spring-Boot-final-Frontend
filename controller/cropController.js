$(document).ready(function () {

    // Load crops into the table
    function loadCrops() {
        console.log(localStorage.getItem('jwtToken'))
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/crops', // Backend endpoint for fetching crops
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
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

    // Open Add/Edit Modal
    $("#cropSaveBtn, .edit-btn").click(function () {
        const isEdit = $(this).hasClass("edit-btn");
        const cropId = isEdit ? $(this).data("id") : null;

        if (isEdit) {
            // Load crop details into the form for editing
            $.ajax({
                url: `http://localhost:8080/springFinal/api/v1/crops/${cropCode}`,
                type: 'GET',
                success: function (crop) {
                    $("#cropName").val(crop.cropName);
                    $("#ScientificName").val(crop.scientificName);
                    $("#Season").val(crop.season);
                    $("#field").val(crop.fieldList ? crop.fieldList.join(', ') : '');
                    $("#cropForm").data("edit", true).data("id", cropId);
                    $("#cropModalLabel").text("Edit Crop");
                    $("#cropModal").modal("show");
                }
            });
        } else {
            // Open form for adding a new crop
            $("#cropForm")[0].reset();
            $("#cropForm").data("edit", false);
            $("#cropModalLabel").text("Add Crop");
            $("#cropModal").modal("show");
        }
    });

    // Save Crop (Add/Update)
    $("#cropForm").submit(function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const isEdit = $("#cropForm").data("edit");
        const cropId = isEdit ? $("#cropForm").data("id") : null;
        const url = isEdit
            ? `http://localhost:8080/springFinal/api/v1/crops/${cropId}`
            : 'http://localhost:8080/springFinal/api/v1/crops';

        $.ajax({
            url: url,
            type: isEdit ? 'PUT' : 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $("#cropModal").modal('hide');
                loadCrops();
                alert(isEdit ? "Crop updated successfully!" : "Crop added successfully!");
            },
            error: function () {
                alert(isEdit ? "Failed to update crop." : "Failed to add crop.");
            }
        });
    });

    // Delete Crop
    $(document).on("click", ".delete-btn", function () {
        const cropId = $(this).data("id");
        if (confirm("Are you sure you want to delete this crop?")) {
            $.ajax({
                url: `http://localhost:8080/springFinal/api/v1/crops/${cropCode}`,
                type: 'DELETE',
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

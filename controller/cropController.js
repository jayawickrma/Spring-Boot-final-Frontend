$(document).ready(function () {
    // Load crops into the table
    function loadCrops() {
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/crops', // Backend endpoint for fetching crops
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const cropTableBody = $("#cropTable tbody");
                cropTableBody.empty(); // Clear table before appending
                data.forEach(crop => {
                    cropTableBody.append(`
            <tr>
              <td>${crop.id}</td>
              <td>${crop.name}</td>
              <td>${crop.season}</td>
              <td>${crop.scientificName}</td>
              <td><img src="${crop.image}" alt="Crop Image" class="crop-image" style="width: 50px; cursor: pointer;" data-image="${crop.image}"></td>
              <td>${crop.field}</td>
              <td>
                <button class="btn btn-warning btn-sm edit-btn" data-id="${crop.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${crop.id}">Delete</button>
              </td>
            </tr>
          `);
                });
            }
        });
    }

    // Open image in popup
    $(document).on('click', '.crop-image', function () {
        const imageUrl = $(this).data('image');
        $('#popupImage').attr('src', imageUrl);
        $('#imagePopup').fadeIn();
    });

    // Close image popup
    $('#imagePopup .close').click(function () {
        $('#imagePopup').fadeOut();
    });

    // Save crop (Add or Update)
    $("#cropForm").submit(function (e) {
        e.preventDefault();
        const formData = new FormData(this); // Handles file upload
        const isEdit = $("#cropForm").data("edit");
        const url = isEdit ? `/updateCrop/${$("#cropForm").data("id")}` : 'http://localhost:8080/springFinal/api/v1/crops';
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $("#cropModal").modal('hide');
                loadCrops();
            }
        });
    });

    // Open Add Crop Modal
    $("#cropSaveBtn").click(function () {
        $("#cropForm")[0].reset();
        $("#cropForm").data("edit", false);
        $("#cropModalLabel").text("Add Crop");
    });

    // Open Edit Crop Modal
    $(document).on("click", ".edit-btn", function () {
        const cropId = $(this).data("id");
        $.ajax({
            url: `/getCrop/${cropId}`,
            type: 'GET',
            success: function (data) {
                $("#cropName").val(data.name);
                $("#Season").val(data.season);
                $("#ScientificName").val(data.scientificName);
                $("#field").val(data.field);
                $("#cropForm").data("edit", true).data("id", cropId);
                $("#cropModalLabel").text("Edit Crop");
                $("#cropModal").modal("show");
            }
        });
    });

    // Delete Crop
    $(document).on("click", ".delete-btn", function () {
        const cropId = $(this).data("id");
        if (confirm("Are you sure you want to delete this crop?")) {
            $.ajax({
                url: `/deleteCrop/${cropId}`,
                type: 'DELETE',
                success: function () {
                    loadCrops();
                }
            });
        }
    });

    // Initial load
    loadCrops();
});

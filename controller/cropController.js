import { LoadFieldCard } from './FieldController.js'; // Import LoadFieldCard

// Clear the modal when the "Add Crop" button is clicked
$('#newCropButton').on('click', function () {
    clearAddModal();
});

// SAVE CROP
$('#cropForm').on('submit', function (e) {
    e.preventDefault();

    // Retrieve form values
    let cropName = $('#cropName').val();
    let scientificName = $('#ScientificName').val();
    let season = $('#Season').val();
    let fieldIds = [];

    // Collect all field IDs from the main select and additional fields
    $('#field').val() && fieldIds.push($('#field').val()); // Add main select value if not empty
    $('#additionalField select').each(function () {
        let fields = $(this).val();
        fieldIds.push(fields);
    });

    // Remove empty values (if any)
    fieldIds = fieldIds.filter(id => id);

    let cropImageFile = $('#CropImage')[0].files[0];

    const formData = new FormData();
    formData.append("cropName", cropName);
    formData.append("scientificName", scientificName);
    formData.append("season", season);
    formData.append("cropImage", cropImageFile);
    formData.append("field", new Blob([JSON.stringify(fieldIds)], { type: "application/json" }));

    // Show confirmation before saving
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:8080/api/v1/crops",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    $('#cropForm')[0].reset();
                    $('#previewCrop').addClass('d-none');
                    $('#cropModal').modal('hide');
                    let loadCard = new LoadCards();
                    loadCard.loadAllCropCard();  // Reload the crop cards
                    Swal.fire("Saved!", "", "success");
                },
                error: function (xhr, status, error) {
                    alert("Failed to save crop.");
                }
            });
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

// Function to add dynamic field dropdown in the add modal
$('#addFieldButton').on('click', function () {
    let fieldCard = new LoadFieldCard(); // Initialize LoadFieldCard
    fieldCard.loadAllFieldCard().then(fieldCodes => {
        addDropdownUpdate('#additionalField', '#field', fieldCodes);
    }).catch(error => {
        console.error("Error loading field cards:", error);
    });
});

// Image preview functionality
$('#CropImage').on('change', function () {
    previewCropImage("#CropImage", "#previewCropImg");
});

// Preview image in modal when file input changes
function previewCropImage(imageInputId, imgPreviewId) {
    $(imageInputId).on('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $(imgPreviewId).attr('src', e.target.result).removeClass('d-none').show(); // Remove d-none and display the image
            };
            reader.readAsDataURL(file);
        } else {
            $(imgPreviewId).addClass('d-none');
        }
    });
}

// Function to add a new field dropdown in the update modal
function addDropdownUpdate(containerId, selectClass, options) {
    const $container = $('<div class="d-flex align-items-center mt-2"></div>');
    const $select = $('<select id="optionSelect" class="form-control me-2 text-white" style="background-color:#2B2B2B"></select>').addClass(selectClass);

    // Populate select options
    options.forEach(option => $select.append(`<option value="${option}" class="text-white">${option}</option>`));

    // Remove button
    const $removeBtn = $('<button class="btn btn-danger">Remove</button>');
    $removeBtn.on('click', function () {
        $container.remove();
    });

    $container.append($select).append($removeBtn);
    $(containerId).append($container);
}

// CROP CARD UPDATE
$('#updateFieldModalButton').on('click', async function () {
    let cropCode = $('#selectedCropCode').val();
    let cropName = $('#updateCropName').val();
    let scientificName = $('#updateScientificName').val();
    let season = $('#updateCropSeason').val();
    let cropImage = $('#updateCropImage')[0].files[0];

    const formData = new FormData();
    formData.append("cropName", cropName);
    formData.append("scientificName", scientificName);
    formData.append("season", season);

    if (!cropImage) {
        const previewImage = $('#updatePreview').attr('src');
        if (previewImage) {
            try {
                const response = await fetch(previewImage);
                const blob = await response.blob();
                formData.append("cropImage", blob);
            } catch (error) {
                Swal.fire('Error', 'Failed to process the image. Please try again.', 'error');
                return;
            }
        } else {
            Swal.fire('Error', 'No image provided!', 'error');
            return;
        }
    } else {
        formData.append("cropImage", cropImage);
    }

    Swal.fire({
        title: "Do you want to update the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Update",
        denyButtonText: `Don't update`
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:5050/api/v1/crops/${cropCode}`,
                type: "PUT",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    $('#updateCropForm')[0].reset();
                    $('#previewCrop').addClass('d-none');
                    $('#updateCropModal').modal('hide');
                    let loadAllCrops = new LoadCards();
                    loadAllCrops.loadAllCropCard();  // Reload the crop cards
                    Swal.fire("Updated!", "", "success");
                },
                error: function (xhr, status, error) {
                    Swal.fire("Failed crop update", "", "info");
                }
            });
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
});

// CROP DELETION CONFIRMATION
$(document).ready(function () {
    $(document).on('click', '.delete-button', function () {
        const cardId = $(this).data('card-id');
        $('#confirmCropDeleteButton').data('card-id', cardId);
        $('#confirmCropDeleteModal').modal('show');
    });
    $('#confirmCropDeleteButton').on('click', function () {
        const cardId = $(this).data('card-id');
        $.ajax({
            url: `http://localhost:5050/api/v1/crops/${cardId}`,
            type: 'DELETE',
            success: function (response) {
                $('#confirmCropDeleteModal').modal('hide');
                $(`.card[data-card-id="${cardId}"]`).remove();
                Swal.fire('Deleted!', 'Crop has been deleted.', 'success');
            },
            error: function (xhr, status, error) {
                Swal.fire('Error', 'Failed to delete crop.', 'error');
            }
        });
    });
});

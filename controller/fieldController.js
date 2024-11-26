$(document).ready(function () {
    let currentEditID = null; // Track the current row being edited

    // Load Fields into the Table
    function loadFields() {
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/fields', // Replace with your backend endpoint
            type: 'GET',
            dataType: 'json',
            success: function (fields) {
                const fieldTableBody = $('#fieldTable tbody');
                fieldTableBody.empty(); // Clear the table before appending rows
                fields.forEach((field, index) => {
                    fieldTableBody.append(`
                        <tr data-id="${field.id}">
                            <td>${index + 1}</td>
                            <td class="field-name">${field.fieldName}</td>
                            <td class="field-location">${field.location}</td>
                            <td class="field-size">${field.size}</td>
                            <td><img src="${field.image1}" class="field-image field-image1" style="width: 50px; cursor: pointer;" alt="Image 1"></td>
                            <td><img src="${field.image2}" class="field-image field-image2" style="width: 50px; cursor: pointer;" alt="Image 2"></td>
                            <td class="field-crop">${field.crop}</td>
                            <td class="field-staff">${field.staff}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-field">Edit</button>
                                <button class="btn btn-danger btn-sm delete-field">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                alert("Failed to load fields.");
            }
        });
    }

    // Add or Update Field Form Submission
    $('#fieldForm').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this); // Supports file upload
        const isEdit = currentEditID !== null;
        const url = isEdit
            ? `http://localhost:8080/springFinal/api/v1/fields/${currentEditID}` // Update field
            : 'http://localhost:8080/springFinal/api/v1/fields'; // Add new field

        $.ajax({
            url: url,
            type: isEdit ? 'PUT' : 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $('#fieldModal').modal('hide'); // Close the modal
                $('#fieldForm')[0].reset(); // Reset the form
                currentEditID = null; // Reset the edit ID
                loadFields(); // Reload the table
                alert(isEdit ? "Field updated successfully!" : "Field added successfully!");
            },
            error: function () {
                alert(isEdit ? "Failed to update field." : "Failed to add field.");
            }
        });
    });

    // Open Add Field Modal
    $('#fieldSaveBtn').click(function () {
        $('#fieldForm')[0].reset(); // Clear the form
        currentEditID = null; // Reset the edit ID
        $('#fieldModalLabel').text("Add Field");
        $('#fieldModal').modal('show'); // Show the modal
    });

    // Open Edit Field Modal
    $(document).on('click', '.edit-field', function () {
        const row = $(this).closest('tr');
        currentEditID = row.data('id');

        // Fetch field details from the backend
        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/fields/${currentEditID}`,
            type: 'GET',
            success: function (field) {
                $('#fieldName').val(field.fieldName);
                $('#location').val(field.location);
                $('#size').val(field.size);
                $('#crop').val(field.crop);
                $('#staff').val(field.staff);
                $('#fieldModalLabel').text("Edit Field");
                $('#fieldModal').modal('show'); // Show modal for editing
            },
            error: function () {
                alert("Failed to load field details.");
            }
        });
    });

    // Delete Field
    $(document).on('click', '.delete-field', function () {
        const fieldId = $(this).closest('tr').data('id');
        if (confirm('Are you sure you want to delete this field?')) {
            $.ajax({
                url: `http://localhost:8080/springFinal/api/v1/fields/${fieldId}`,
                type: 'DELETE',
                success: function () {
                    loadFields(); // Reload the table
                    alert("Field deleted successfully!");
                },
                error: function () {
                    alert("Failed to delete field.");
                }
            });
        }
    });

    // Show Image Popup
    $(document).on('click', '.field-image', function () {
        const src = $(this).attr('src'); // Get the image source
        $('#popupFieldImage').attr('src', src); // Set the popup image source
        $('#fieldImagePopup').fadeIn(); // Show the popup
    });

    // Close Image Popup
    $('#fieldImagePopup .close').on('click', function () {
        $('#fieldImagePopup').fadeOut(); // Hide the popup
    });

    // Initial Load
    loadFields();
});

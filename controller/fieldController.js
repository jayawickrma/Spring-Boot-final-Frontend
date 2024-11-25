$(document).ready(function () {
    let fieldID = 1; // Unique ID for fields
    let currentEditID = null; // Track which row is being edited

    // Add Field Form Submission
    $('#fieldForm').on('submit', function (e) {
        e.preventDefault();

        const fieldName = $('#fieldName').val();
        const location = $('#location').val();
        const size = $('#size').val();
        const crop = $('#crop').val();
        const staff = $('#staff').val();
        const image1 = $('#image1')[0].files[0] ? URL.createObjectURL($('#image1')[0].files[0]) : '';
        const image2 = $('#image2')[0].files[0] ? URL.createObjectURL($('#image2')[0].files[0]) : '';

        if (currentEditID) {
            // Update existing row
            const row = $(`tr[data-id="${currentEditID}"]`);
            row.find('.field-name').text(fieldName);
            row.find('.field-location').text(location);
            row.find('.field-size').text(size);
            row.find('.field-crop').text(crop);
            row.find('.field-staff').text(staff);
            row.find('.field-image1').attr('src', image1);
            row.find('.field-image2').attr('src', image2);

            currentEditID = null; // Reset current edit ID
        } else {
            // Add new row
            $('#fieldTable tbody').append(`
        <tr data-id="${fieldID}">
          <td>${fieldID}</td>
          <td class="field-name">${fieldName}</td>
          <td class="field-location">${location}</td>
          <td class="field-size">${size}</td>
          <td><img src="${image1}" class="field-image field-image1" style="width: 50px; cursor: pointer;display:-moz-popup" alt="Image 1"></td>
          <td><img src="${image2}" class="field-image field-image2" style="width: 50px; cursor: pointer;" alt="Image 2"></td>
          <td class="field-crop">${crop}</td>
          <td class="field-staff">${staff}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-field">Edit</button>
            <button class="btn btn-danger btn-sm delete-field">Delete</button>
          </td>
        </tr>
      `);
            fieldID++;
        }

        // Reset the form and close the modal
        $('#fieldModal').modal('hide');
        $('#fieldForm')[0].reset();
    });

    // Show the popup when an image is clicked
    $(document).on('click', '.field-image', function () {
        const src = $(this).attr('src'); // Get image source
        $('#popupFieldImage').attr('src', src); // Set popup image source
        $('#fieldImagePopup').fadeIn(); // Show popup
    });

    // Close the popup when the close button is clicked
    $('#fieldImagePopup .close').on('click', function () {
        $('#fieldImagePopup').fadeOut(); // Hide popup
    });

    // Edit Field
    $(document).on('click', '.edit-field', function () {
        const row = $(this).closest('tr');
        currentEditID = row.data('id');

        // Fill modal with existing data
        $('#fieldName').val(row.find('.field-name').text());
        $('#location').val(row.find('.field-location').text());
        $('#size').val(row.find('.field-size').text());
        $('#crop').val(row.find('.field-crop').text());
        $('#staff').val(row.find('.field-staff').text());

        $('#fieldModal').modal('show'); // Show modal for editing
    });

    // Delete Field
    $(document).on('click', '.delete-field', function () {
        if (confirm('Are you sure you want to delete this field?')) {
            $(this).closest('tr').remove();
        }
    });
});

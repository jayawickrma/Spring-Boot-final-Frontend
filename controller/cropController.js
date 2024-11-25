$(document).ready(function () {
    let cropId = 1;
    const cropTableBody = $('#cropTable tbody');

    // Handle form submission
    $('#cropForm').on('submit', function (e) {
        e.preventDefault();

        const cropName = $('#cropName').val();
        const season = $('#Season').val();
        const scientificName = $('#ScientificName').val();
        const field = $('#field').val();
        const imageFile = $('#CropImage')[0].files[0];

        if (!imageFile) {
            alert('Please select an image.');
            return;
        }

        const imageUrl = URL.createObjectURL(imageFile);

        // Add row to the table
        const rowHtml = `
        <tr>
          <td>${cropId++}</td>
          <td>${cropName}</td>
          <td>${season}</td>
          <td>${scientificName}</td>
          <td><img src="${imageUrl}" alt="${cropName}" class="table-image" style="width: 50px; height: 50px; cursor: pointer;"></td>
          <td>${field}</td>
          <td>
            <button class="btn btn-primary btn-sm update-btn">Update</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
          </td>
        </tr>
      `;
        cropTableBody.append(rowHtml);

        // Reset the form
        $('#cropForm')[0].reset();
        $('#cropModal').modal('hide');
    });

    // Handle image click to show popup
    $(document).on('click', '.table-image', function () {
        const src = $(this).attr('src');
        $('#popupImage').attr('src', src);
        $('#imagePopup').fadeIn();
    });

    // Close popup
    $('#imagePopup .close').on('click', function () {
        $('#imagePopup').fadeOut();
    });

    // Handle delete action
    $(document).on('click', '.delete-btn', function () {
        $(this).closest('tr').remove();
    });

    // Handle update action (optional: fill modal with data for updating)
    $(document).on('click', '.update-btn', function () {
        const row = $(this).closest('tr');
        const cropName = row.find('td:eq(1)').text();
        const season = row.find('td:eq(2)').text();
        const scientificName = row.find('td:eq(3)').text();
        const field = row.find('td:eq(5)').text();

        $('#cropName').val(cropName);
        $('#Season').val(season);
        $('#ScientificName').val(scientificName);
        $('#field').val(field);

        $('#cropModal').modal('show');
    });
});
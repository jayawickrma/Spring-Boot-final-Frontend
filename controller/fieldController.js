$(document).ready(function () {
    let fieldId = 1; // Incremental ID
    let editMode = false; // Flag to check if editing
    let currentRow; // Variable to store the row being edited

    // Handle form submission
    $('#fieldForm').on('submit', function (e) {
        e.preventDefault();

        const fieldName = $('#fieldName').val();
        const fieldLocation = $('#fieldLocation').val();
        const fieldSize = $('#fieldSize').val();
        const fieldImg1 = $('#fieldImg1')[0].files[0];
        const fieldImg2 = $('#fieldImg2')[0].files[0];

        if (editMode) {
            // Update existing row
            if (fieldImg1) {
                const img1URL = URL.createObjectURL(fieldImg1);
                currentRow.find('td:nth-child(5) img').attr('src', img1URL);
            }
            if (fieldImg2) {
                const img2URL = URL.createObjectURL(fieldImg2);
                currentRow.find('td:nth-child(6) img').attr('src', img2URL);
            }

            currentRow.find('td:nth-child(2)').text(fieldName);
            currentRow.find('td:nth-child(3)').text(fieldLocation);
            currentRow.find('td:nth-child(4)').text(fieldSize);

            editMode = false;
            currentRow = null;
        } else {
            // Add new row
            if (fieldImg1 && fieldImg2) {
                const img1URL = URL.createObjectURL(fieldImg1);
                const img2URL = URL.createObjectURL(fieldImg2);

                const newRow = `
                <tr id="field-${fieldId}">
                  <td>${fieldId}</td>
                  <td>${fieldName}</td>
                  <td>${fieldLocation}</td>
                  <td>${fieldSize}</td>
                  <td><img src="${img1URL}" class="table-image" data-bs-toggle="modal" data-bs-target="#imageModal" alt="Image 1"></td>
                  <td><img src="${img2URL}" class="table-image" data-bs-toggle="modal" data-bs-target="#imageModal" alt="Image 2"></td>
                  <td>
                    <button class="btn btn-warning btn-edit">Edit</button>
                    <button class="btn btn-danger btn-delete">Delete</button>
                  </td>
                </tr>
              `;
                $('#fieldTable tbody').append(newRow);
                fieldId++;
            } else {
                alert('Please upload both images!');
                return;
            }
        }

        $('#fieldForm')[0].reset();
        $('#fieldModal').modal('hide'); // Close modal
    });

    // Handle edit action
    $('#fieldTable').on('click', '.btn-edit', function () {
        editMode = true;
        currentRow = $(this).closest('tr');

        // Populate modal form with row data
        $('#fieldName').val(currentRow.find('td:nth-child(2)').text());
        $('#fieldLocation').val(currentRow.find('td:nth-child(3)').text());
        $('#fieldSize').val(currentRow.find('td:nth-child(4)').text());

        // Show modal
        $('#fieldModal').modal('show');
    });

    // Handle delete action
    $('#fieldTable').on('click', '.btn-delete', function () {
        $(this).closest('tr').remove();
    });

    // Show image popup
    $('#fieldTable').on('click', '.table-image', function () {
        const imageUrl = $(this).attr('src');
        $('#modalImage').attr('src', imageUrl);
    });
});

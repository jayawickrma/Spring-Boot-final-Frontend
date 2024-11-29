$(document).ready(function () {
    let currentEditID = null;

    // Function to load fields into the table
    function loadFields() {
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/fields',
            method: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('jwtToken')
            },
            success: function (data) {
                const fieldTableBody = $('#fieldTable tbody');
                fieldTableBody.empty();
                data.forEach((field) => {
                    fieldTableBody.append(`
            <tr data-id="${field.fieldCode}">
              <td>${field.fieldCode}</td>
              <td>${field.name}</td>
              <td>${field.location}</td>
              <td>${field.extentSize}</td>
              <td><img src="data:image/jpeg;base64,${field.fieldImage1}" style="width: 50px; cursor: pointer;" alt="Image1"></td>
              <td><img src="data:image/jpeg;base64,${field.fieldImage2}" style="width: 50px; cursor: pointer;" alt="Image2"></td>
              <td>${field.staffList.join(', ')}</td>
              <td>${field.cropsList.join(', ')}</td>
              <td>
                <button class="btn btn-warning btn-sm edit-field">Edit</button>
                <button class="btn btn-danger btn-sm delete-field">Delete</button>
              </td>
            </tr>
          `);
                });
            },
            error: function () {
                alert('Failed to load fields.');
            }
        });
    }

    // Function to handle form submission for Add/Edit
    $('#fieldForm').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const url = currentEditID
            ? `http://localhost:8080/api/v1/fields/${currentEditID}`
            : 'http://localhost:8080/api/v1/fields';
        const method = currentEditID ? 'PUT' : 'POST';

        $.ajax({
            url: url,
            method: method,
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $('#fieldModal').modal('hide');
                loadFields();
                alert('Field saved successfully!');
            },
            error: function () {
                alert('Failed to save field.');
            }
        });
    });

    // Function to handle edit button click
    $(document).on('click', '.edit-field', function () {
        const row = $(this).closest('tr');
        currentEditID = row.data('id');

        $.ajax({
            url: `http://localhost:8080/api/v1/fields/${currentEditID}`,
            method: 'GET',
            success: function (field) {
                $('#fieldCode').val(field.fieldCode);
                $('#fieldName').val(field.name);
                $('#location').val(field.location);
                $('#extentSize').val(field.extentSize);
                $('#staffList').val(field.staffList.join(', '));
                $('#cropsList').val(field.cropsList.join(', '));
                $('#fieldModal').modal('show');
            },
            error: function () {
                alert('Failed to load field details.');
            }
        });
    });

    // Function to handle delete button click
    $(document).on('click', '.delete-field', function () {
        const fieldId = $(this).closest('tr').data('id');

        if (confirm('Are you sure you want to delete this field?')) {
            $.ajax({
                url: `http://localhost:8080/api/v1/fields/${fieldId}`,
                method: 'DELETE',
                success: function () {
                    loadFields();
                    alert('Field deleted successfully!');
                },
                error: function () {
                    alert('Failed to delete field.');
                }
            });
        }
    });

    // Function to handle Add Field button click
    $('#addFieldBtn').on('click', function () {
        currentEditID = null;
        $('#fieldForm')[0].reset();
        $('#fieldModal').modal('show');
    });

    // Initial Load
    loadFields();
});

$(document).ready(function () {
    let currentEditID = null;

    // Load Fields Function
    function loadFields() {
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/fields',
            method: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
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
                            <td><img src="data:image/jpeg;base64,${field.fieldImage1}" style="width: 50px; cursor: pointer;" alt="Image1" onclick="showImagePopup('${field.fieldImage1}')"></td>
                            <td><img src="data:image/jpeg;base64,${field.fieldImage2}" style="width: 50px; cursor: pointer;" alt="Image2" onclick="showImagePopup('${field.fieldImage2}')"></td>
                            <td>${field.staffList.join(', ')}</td>
                            <td>${field.cropsList.join(', ')}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-field" data-id="${field.fieldCode}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-field" data-id="${field.fieldCode}">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                Swal.fire('Error', 'Failed to load fields.', 'error');
            }
        });
    }

    // Function to show image in popup
    window.showImagePopup = function (base64Image) {
        Swal.fire({
            title: 'Field Image',
            imageUrl: 'data:image/jpeg;base64,' + base64Image,
            imageAlt: 'Field Image',
            width: '400px',
            showCloseButton: true,
            showConfirmButton: false
        });
    };

    // Handle Add/Edit Form Submission
    $('#fieldForm').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        formData.append("fieldName", $('#fieldName').val());
        formData.append("fieldLocation", $('#location').val());
        formData.append("fieldSize", $('#extentSize').val());
        formData.append("fieldImg1", $('#fieldImage1')[0].files[0]);
        formData.append("fieldImg2", $('#fieldImage2')[0].files[0]);
        formData.append("cropId", $('#cropsList').val().split(','));
        formData.append("staffId", $('#staffList').val().split(','));

        const url = currentEditID
            ? `http://localhost:8080/springFinal/api/v1/fields/${currentEditID}`
            : 'http://localhost:8080/springFinal/api/v1/fields';
        const method = currentEditID ? 'PUT' : 'POST';

        $.ajax({
            url: url,
            method: method,
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
            },
            success: function () {
                $('#fieldModal').modal('hide');
                loadFields();
                Swal.fire('Success', 'Field saved successfully!', 'success');
            },
            error: function () {
                Swal.fire('Error', 'Failed to save field.', 'error');
            }
        });
    });

    // Edit Field
    $(document).on('click', '.edit-field', function () {
        const row = $(this).closest('tr');
        currentEditID = row.data('id');

        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/fields/${currentEditID}`,
            method: 'GET',
            success: function (field) {
                $('#fieldName').val(field.name);
                $('#location').val(field.location);
                $('#extentSize').val(field.extentSize);
                $('#staffList').val(field.staffList.join(', '));
                $('#cropsList').val(field.cropsList.join(', '));
                $('#fieldModal').modal('show');
            },
            error: function () {
                Swal.fire('Error', 'Failed to load field details.', 'error');
            }
        });
    });

    // Delete Field
    $(document).on('click', '.delete-field', function () {
        const fieldCode = $(this).data('id');
        console.log(fieldCode)

        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the field.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `http://localhost:8080/springFinal/api/v1/fields/${fieldCode}`,
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                    },
                    success: function () {
                        loadFields();
                        Swal.fire('Deleted!', 'Field has been deleted.', 'success');
                    },
                    error: function () {
                        Swal.fire('Error', 'Failed to delete field.', 'error');
                    }
                });
            }
        });
    });

    // Add Field Button Click
    $('#addFieldBtn').on('click', function () {
        currentEditID = null;
        $('#fieldForm')[0].reset();
        $('#fieldModal').modal('show');
    });

    // Load fields when the page loads
    loadFields();
});
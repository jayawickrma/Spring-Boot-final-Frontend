$(document).ready(function () {
    var fields = [];
    var editFieldIndex = -1;

    // Save or Update Field
    $('#fieldForm').submit(function (e) {
        e.preventDefault();
        var fieldName = $('#fieldName').val();
        var location = $('#location').val();
        var size = $('#size').val();
        var image1 = URL.createObjectURL($('#image1')[0].files[0]);
        var image2 = URL.createObjectURL($('#image2')[0].files[0]);
        var crop = $('#crop').val();
        var staff = $('#staff').val();

        if (editFieldIndex === -1) {
            var newField = {
                id: fields.length + 1,
                name: fieldName,
                location: location,
                size: size,
                image1: image1,
                image2: image2,
                crop: crop,
                staff: staff,
            };
            fields.push(newField);
        } else {
            fields[editFieldIndex] = {
                ...fields[editFieldIndex],
                name: fieldName,
                location: location,
                size: size,
                image1: image1,
                image2: image2,
                crop: crop,
                staff: staff,
            };
            editFieldIndex = -1;
        }

        $('#fieldModal').modal('hide');
        $('#fieldForm')[0].reset();
        renderFieldTable();
    });

    // Render Field Table
    function renderFieldTable() {
        $('#fieldTable tbody').empty();
        fields.forEach((field) => {
            $('#fieldTable tbody').append(`
        <tr>
          <td>${field.id}</td>
          <td>${field.name}</td>
          <td>${field.location}</td>
          <td>${field.size}</td>
          <td><img src="${field.image1}" class="table-img" onclick="showPopup('${field.image1}')"></td>
          <td><img src="${field.image2}" class="table-img" onclick="showPopup('${field.image2}')"></td>
          <td>${field.crop}</td>
          <td>${field.staff}</td>
          <td>
            <button class="btn btn-primary edit-field-btn" data-id="${field.id}">Edit</button>
            <button class="btn btn-danger delete-field-btn" data-id="${field.id}">Delete</button>
          </td>
        </tr>
      `);
        });
    }

    // Show Image Popup
    window.showPopup = function (src) {
        $('#popupFieldImage').attr('src', src);
        $('#fieldImagePopup').css('display', 'flex');
    };

    // Close Image Popup
    window.closePopup = function () {
        $('#fieldImagePopup').css('display', 'none');
    };

    // Edit Field
    $(document).on('click', '.edit-field-btn', function () {
        var id = $(this).data('id');
        editFieldIndex = fields.findIndex((field) => field.id === id);
        var field = fields[editFieldIndex];
        $('#fieldName').val(field.name);
        $('#location').val(field.location);
        $('#size').val(field.size);
        $('#crop').val(field.crop);
        $('#staff').val(field.staff);
        $('#fieldModalLabel').text('Edit Field');
        $('#fieldModal').modal('show');
    });

    // Delete Field
    $(document).on('click', '.delete-field-btn', function () {
        var id = $(this).data('id');
        fields = fields.filter((field) => field.id !== id);
        renderFieldTable();
    });
});

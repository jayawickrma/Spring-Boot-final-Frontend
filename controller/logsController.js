$(document).ready(function () {
    var logs = [];

    // Save Log
    $('#logForm').submit(function (e) {
        e.preventDefault();
        var logDate = $('#logDate').val();
        var logDetails = $('#logDetails').val();
        var logImage = $('#logImage')[0].files[0];
        var logStaff = $('#logStaff').val();
        var logCrop = $('#logCrop').val();
        var logField = $('#logField').val();

        var imageUrl = logImage ? URL.createObjectURL(logImage) : '';

        var newLog = {
            id: logs.length + 1,
            date: logDate,
            details: logDetails,
            image: imageUrl,
            staff: logStaff,
            crop: logCrop,
            field: logField,
        };
        logs.push(newLog);

        $('#logModal').modal('hide');
        $('#logForm')[0].reset();
        renderLogTable();
    });

    // Render Log Table
    function renderLogTable() {
        $('#logTable tbody').empty();
        logs.forEach((log) => {
            $('#logTable tbody').append(`
        <tr>
          <td>${log.date}</td>
          <td>${log.details}</td>
          <td>
            <img src="${log.image}"  class="table-img" " onclick="showPopup('${log.image}')">
          </td>
          <td>${log.staff}</td>
          <td>${log.crop}</td>
          <td>${log.field}</td>
          <td>
            <button class="btn btn-danger delete-log-btn" data-id="${log.id}">Delete</button>
          </td>
        </tr>
      `);
        });
    }

    // Show Popup Image
    window.showPopup = function (src) {
        $('#popupImage').attr('src', src);
        $('#imagePopup').fadeIn();
    };

    // Hide Popup Image
    $('#imagePopup .close').click(function () {
        $('#imagePopup').fadeOut();
    });

    // Delete Log
    $(document).on('click', '.delete-log-btn', function () {
        var id = $(this).data('id');
        logs = logs.filter((log) => log.id !== id);
        renderLogTable();
    });
});

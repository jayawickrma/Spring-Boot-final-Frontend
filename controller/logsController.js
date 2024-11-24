$(document).ready(function () {
    var logs = [];
    var editLogIndex = -1;

    // Save or Update Log
    $('#logForm').submit(function (e) {
        e.preventDefault();
        var logDate = $('#logDate').val();
        var logDetails = $('#logDetails').val();
        var logImage = $('#logImage')[0].files[0];
        var logStaff = $('#logStaff').val();
        var logCrop = $('#logCrop').val();
        var logField = $('#logField').val();

        var imageUrl = logImage ? URL.createObjectURL(logImage) : '';

        if (editLogIndex === -1) {
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
        } else {
            logs[editLogIndex] = {
                ...logs[editLogIndex],
                date: logDate,
                details: logDetails,
                image: imageUrl,
                staff: logStaff,
                crop: logCrop,
                field: logField,
            };
            editLogIndex = -1;
        }

        $('#logModal').modal('hide');
        $('#logForm')[0].reset();
        renderLogTable();
    });

    // Render Log Table
    function renderLogTable() {
        $('#logTable tbody').empty();
        logs.forEach((log, index) => {
            $('#logTable tbody').append(`
        <tr>
          <td>${log.date}</td>
          <td>${log.details}</td>
          <td>
            <img src="${log.image}" alt="Log Image" class="table-img" style="width:50px;height:auto;cursor:pointer;" onclick="showPopup('${log.image}')">
          </td>
          <td>${log.staff}</td>
          <td>${log.crop}</td>
          <td>${log.field}</td>
          <td>
            <button class="btn btn-primary edit-log-btn" data-id="${index}">Edit</button>
            <button class="btn btn-danger delete-log-btn" data-id="${index}">Delete</button>
          </td>
        </tr>
      `);
        });
    }

    // Show Popup Image
    window.showPopup = function (src) {
        $('#popupImage').attr('src', src);
        $('#imagePopup').show();
    };

    // Hide Popup Image
    $('#imagePopup .close').click(function () {
        $('#imagePopup').hide();
    });

    // Edit Log
    $(document).on('click', '.edit-log-btn', function () {
        var id = $(this).data('id');
        editLogIndex = id;
        var log = logs[id];
        $('#logDate').val(log.date);
        $('#logDetails').val(log.details);
        $('#logStaff').val(log.staff);
        $('#logCrop').val(log.crop);
        $('#logField').val(log.field);
        $('#logModalLabel').text('Edit Log');
        $('#logModal').modal('show');
    });

    // Delete Log
    $(document).on('click', '.delete-log-btn', function () {
        var id = $(this).data('id');
        logs.splice(id, 1);
        renderLogTable();
    });
});

import {logs} from "../db/db.js";
$(document).ready(function () {

    var editIndex = -1;

    // Save or Update Log
    $('#logForm').submit(function (e) {
        e.preventDefault();

        var logDate = $('#logDate').val();
        var logDetails = $('#logDetails').val();
        var logImage = $('#logImage')[0].files[0];
        var logStaff = $('#logStaff').val();
        var logCrop = $('#logCrop').val();
        var logField = $('#logField').val();

        var imageUrl = logImage ? URL.createObjectURL(logImage) : logs[editIndex]?.image || '';

        if (editIndex === -1) {
            // Add new log
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
            // Update existing log
            logs[editIndex].date = logDate;
            logs[editIndex].details = logDetails;
            logs[editIndex].image = imageUrl;
            logs[editIndex].staff = logStaff;
            logs[editIndex].crop = logCrop;
            logs[editIndex].field = logField;
            editIndex = -1;
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
            <button class="btn btn-primary edit-log-btn" data-index="${index}">Edit</button>
            <button class="btn btn-danger delete-log-btn" data-index="${index}">Delete</button>
          </td>
        </tr>
      `);
        });
    }

    // Edit Log
    $(document).on('click', '.edit-log-btn', function () {
        editIndex = $(this).data('index');
        var log = logs[editIndex];

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
        var index = $(this).data('index');
        logs.splice(index, 1);
        renderLogTable();
    });

    // Show Popup Image
    window.showPopup = function (src) {
        $('#popupImage').attr('src', src);
        $('#imagePopup').fadeIn();
    };

    // Hide Popup Image
    $('#imagePopup .close').click(function () {
        $('#imagePopup').fadeOut();
    });
});

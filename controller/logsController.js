$(document).ready(function () {
    const apiBaseUrl = "http://localhost:8080/springFinal/api/v1/logs";
    let editLogCode = null;

    // Load all logs
    function loadLogs() {
        $.ajax({
            url: apiBaseUrl,
            method: "GET",
            success: function (logs) {
                renderLogTable(logs);
            },
            error: function () {
                alert("Failed to fetch logs.");
            },
        });
    }

    // Render logs in the table
    function renderLogTable(logs) {
        const logTableBody = $('#logTable tbody');
        logTableBody.empty();

        logs.forEach(log => {
            logTableBody.append(`
                <tr>
                    <td>${log.logCode}</td>
                    <td>${log.logDate}</td>
                    <td>${log.logDetails}</td>
                    <td>
                        <img src="data:image/png;base64,${log.observedImage}" alt="Log Image" class="table-img" style="width:50px;height:auto;cursor:pointer;" onclick="showPopup('data:image/png;base64,${log.observedImage}')">
                    </td>
                    <td>${log.staffList.join(", ")}</td>
                    <td>${log.cropList.join(", ")}</td>
                    <td>${log.fieldList.join(", ")}</td>
                    <td>
                        <button class="btn btn-primary edit-log-btn" data-id="${log.logCode}">Edit</button>
                        <button class="btn btn-danger delete-log-btn" data-id="${log.logCode}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Show popup image
    window.showPopup = function (src) {
        $('#popupImage').attr('src', src);
        $('#imagePopup').fadeIn();
    };

    $('#imagePopup .close').click(function () {
        $('#imagePopup').fadeOut();
    });

    // Save or update log
    $('#logForm').submit(function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("logDate", $('#logDate').val());
        formData.append("logDetails", $('#logDetails').val());
        formData.append("logImg", $('#logImage')[0].files[0]);
        formData.append("field", $('#logField').val());
        formData.append("crop", $('#logCrop').val());
        formData.append("staff", $('#logStaff').val());

        if (editLogCode) {
            // Update log
            $.ajax({
                url: `${apiBaseUrl}/${editLogCode}`,
                method: "PUT",
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    alert("Log updated successfully.");
                    $('#logModal').modal('hide');
                    loadLogs();
                },
                error: function () {
                    alert("Failed to update log.");
                },
            });
        } else {
            // Create new log
            $.ajax({
                url: apiBaseUrl,
                method: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    alert("Log added successfully.");
                    $('#logModal').modal('hide');
                    $('#logForm')[0].reset();
                    loadLogs();
                },
                error: function () {
                    alert("Failed to add log.");
                },
            });
        }

        editLogCode = null; // Reset editLogCode
    });

    // Edit log
    $(document).on('click', '.edit-log-btn', function () {
        const logCode = $(this).data('id');
        editLogCode = logCode;

        $.ajax({
            url: `${apiBaseUrl}/${logCode}`,
            method: "GET",
            success: function (log) {
                $('#logDate').val(log.logDate);
                $('#logDetails').val(log.logDetails);
                $('#logStaff').val(log.staffList.join(", "));
                $('#logCrop').val(log.cropList.join(", "));
                $('#logField').val(log.fieldList.join(", "));

                $('#logModalLabel').text('Edit Log');
                $('#logModal').modal('show');
            },
            error: function () {
                alert("Failed to fetch log details.");
            },
        });
    });

    // Delete log
    $(document).on('click', '.delete-log-btn', function () {
        const logCode = $(this).data('id');

        if (confirm("Are you sure you want to delete this log?")) {
            $.ajax({
                url: `${apiBaseUrl}/${logCode}`,
                method: "DELETE",
                success: function () {
                    alert("Log deleted successfully.");
                    loadLogs();
                },
                error: function () {
                    alert("Failed to delete log.");
                },
            });
        }
    });

    // Initial load
    loadLogs();
});

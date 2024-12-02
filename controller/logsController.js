$(document).ready(function () {
    const API_URL = 'http://localhost:8080/springFinal/api/v1/logs';
    let currentLogId = null;

    // Load logs
    function loadLogs() {
        $.ajax({
            url: API_URL,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            },
            success: function (data) {
                const logTableBody = $('#logTable tbody');
                logTableBody.empty();
                data.forEach((log) => {
                    logTableBody.append(`
                        <tr data-id="${log.logCode}">
                            <td>${log.logCode}</td>
                            <td>${log.logDate}</td>
                            <td>${log.logDetails}</td>
                            <td><img src="data:image/jpeg;base64,${log.observedImage}" style="width: 50px; cursor: pointer;" alt="Log Image" /></td>
                            <td>${log.staffList.join(', ')}</td>
                            <td>${log.cropList.join(', ')}</td>
                            <td>${log.fieldList.join(', ')}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-log">Edit</button>
                                <button class="btn btn-danger btn-sm delete-log">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                Swal.fire('Error', 'Failed to load logs.', 'error');
            }
        });
    }

    // Save or update log
    $('#logForm').on('submit', function (e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('logDate', $('#logDate').val());
        formData.append('logDetails', $('#logDetails').val());
        formData.append('logImg', $('#logImage')[0].files[0]);
        formData.append('staff', $('#logStaff').val());
        formData.append('crop', $('#logCrop').val());
        formData.append('field', $('#logField').val());

        const method = currentLogId ? 'PUT' : 'POST';
        const url = currentLogId ? `${API_URL}/${currentLogId}` : API_URL;

        $.ajax({
            url: url,
            method: method,
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            },
            success: function () {
                $('#logModal').modal('hide');
                loadLogs();
                Swal.fire('Success', 'Log saved successfully!', 'success');
            },
            error: function () {
                Swal.fire('Error', 'Failed to save log.', 'error');
            }
        });
    });

    // Edit log
    $(document).on('click', '.edit-log', function () {
        const logId = $(this).closest('tr').data('id');
        currentLogId = logId;

        $.ajax({
            url: `${API_URL}/${logId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            },
            success: function (log) {
                $('#logDate').val(log.logDate);
                $('#logDetails').val(log.logDetails);
                $('#logStaff').val(log.staffList.join(', '));
                $('#logCrop').val(log.cropList.join(', '));
                $('#logField').val(log.fieldList.join(', '));
                $('#logModal').modal('show');
            },
            error: function () {
                Swal.fire('Error', 'Failed to load log details.', 'error');
            }
        });
    });

    // Delete log
    $(document).on('click', '.delete-log', function () {
        const logId = $(this).closest('tr').data('id');

        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the log.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${API_URL}/${logId}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    },
                    success: function () {
                        loadLogs();
                        Swal.fire('Deleted!', 'Log deleted successfully.', 'success');
                    },
                    error: function () {
                        Swal.fire('Error', 'Failed to delete log.', 'error');
                    }
                });
            }
        });
    });

    $('#addLogBtn').on('click', function () {
        currentLogId = null;
        $('#logForm')[0].reset();
        $('#logModal').modal('show');
    });

    loadLogs();
});

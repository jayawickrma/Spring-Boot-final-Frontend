$(document).ready(function() {
    let logEntries = []; // Array to hold log data

    // Function to refresh the log table
    function refreshLogTable() {
        const logTableBody = $('#logTableBody');
        logTableBody.empty(); // Clear the existing table body

        logEntries.forEach((log, index) => {
            const row = `
                <tr>
                    <td>${log.logDate}</td>
                    <td>${log.logDetails}</td>
                    <td>${log.field}</td>
                    <td>${log.crop}</td>
                    <td>${log.staff}</td>
                    <td><img src="${log.image}" alt="Log Image" style="width: 50px; height: auto;"></td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            logTableBody.append(row);
        });
    }

    // Add Log Entry
    $('.add-btn').click(function(e) {
        e.preventDefault(); // Prevent the default form submission

        const logDate = $('#logDate').val();
        const logDetails = $('#logDetails').val();
        const field = $('#selectField').val();
        const crop = $('#selectCrop').val();
        const staff = $('#selectStaff').val();
        const logImage = $('#logImage')[0].files[0]; // Get the file object

        // Create a new log entry object
        const newLogEntry = {
            logDate,
            logDetails,
            field,
            crop,
            staff,
            image: URL.createObjectURL(logImage) // Create a URL for the uploaded image
        };

        logEntries.push(newLogEntry); // Add new log entry to the array
        refreshLogTable(); // Refresh the table
        clearForm(); // Clear form fields
    });

    // Edit Log Entry
    $(document).on('click', '.edit-btn', function() {
        const index = $(this).data('index');
        const log = logEntries[index];

        $('#logDate').val(log.logDate);
        $('#logDetails').val(log.logDetails);
        $('#selectField').val(log.field);
        $('#selectCrop').val(log.crop);
        $('#selectStaff').val(log.staff);
        $('#logImage').val(''); // Reset file input (not displayed)

        // Update the Add button to Save
        $('.add-btn').text('Save').off('click').click(function(e) {
            e.preventDefault();

            const updatedLogEntry = {
                logDate: $('#logDate').val(),
                logDetails: $('#logDetails').val(),
                field: $('#selectField').val(),
                crop: $('#selectCrop').val(),
                staff: $('#selectStaff').val(),
                image: log.image // Keep the same image if not changed
            };

            // Check if a new image was uploaded
            const newImage = $('#logImage')[0].files[0];
            if (newImage) {
                updatedLogEntry.image = URL.createObjectURL(newImage); // Update the image URL
            }

            logEntries[index] = updatedLogEntry; // Update the log entry in the array
            refreshLogTable(); // Refresh the table
            clearForm(); // Clear form fields
            $('.add-btn').text('Add Log Entry'); // Reset button text
        });
    });

    // Delete Log Entry
    $(document).on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        logEntries.splice(index, 1); // Remove log entry from array
        refreshLogTable(); // Refresh the table
    });

    // Function to clear the form fields
    function clearForm() {
        $('#logDate').val('');
        $('#logDetails').val('');
        $('#selectField').val('');
        $('#selectCrop').val('');
        $('#selectStaff').val('');
        $('#logImage').val(''); // Reset file input
    }
});

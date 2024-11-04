document.addEventListener('DOMContentLoaded', function() {
    const logServiceForm = document.getElementById('logServiceForm');
    const logTableBody = document.getElementById('logTableBody');
    let logs = []; // Array to hold log entries
    let editingIndex = -1; // Track the index of the log entry being edited

    // Function to render logs in the table
    function renderLogs() {
        logTableBody.innerHTML = ''; // Clear existing rows

        logs.forEach((log, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
        <td>${log.logDate}</td>
        <td>${log.logDetails}</td>
        <td>${log.selectField}</td>
        <td>${log.selectCrop}</td>
        <td>${log.selectStaff}</td>
        <td><img src="${log.logImage}" alt="Log Image" width="50"></td>
        <td>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;

            logTableBody.appendChild(row);
        });
    }

    // Function to handle form submission
    logServiceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const logDate = document.getElementById('logDate').value;
        const logDetails = document.getElementById('logDetails').value;
        const selectField = document.getElementById('selectField').value;
        const selectCrop = document.getElementById('selectCrop').value;
        const selectStaff = document.getElementById('selectStaff').value;
        const logImageFile = document.getElementById('logImage').files[0];
        const logImageURL = logImageFile ? URL.createObjectURL(logImageFile) : '';

        const logData = {
            logDate,
            logDetails,
            selectField,
            selectCrop,
            selectStaff,
            logImage: logImageURL,
        };

        if (editingIndex >= 0) {
            // Update log entry
            logs[editingIndex] = logData;
            editingIndex = -1; // Reset editing index
        } else {
            // Add new log entry
            logs.push(logData);
        }

        renderLogs(); // Re-render the table
        logServiceForm.reset(); // Clear form fields
    });

    // Event listener for edit and delete actions
    logTableBody.addEventListener('click', function(event) {
        const target = event.target;
        const index = target.dataset.index; // Get the index from data attribute

        if (target.classList.contains('edit-btn')) {
            // Edit log entry
            const log = logs[index];
            document.getElementById('logDate').value = log.logDate;
            document.getElementById('logDetails').value = log.logDetails;
            document.getElementById('selectField').value = log.selectField;
            document.getElementById('selectCrop').value = log.selectCrop;
            document.getElementById('selectStaff').value = log.selectStaff;

            editingIndex = index; // Set editing index
        } else if (target.classList.contains('delete-btn')) {
            // Delete log entry
            logs.splice(index, 1); // Remove entry from logs array
            renderLogs(); // Re-render the table
        }
    });

    renderLogs(); // Initial render to populate table if any logs exist
});

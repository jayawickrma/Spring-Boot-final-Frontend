$(document).ready(function() {
    // Function to load staff data from the server
    function loadStaffData() {
        $.ajax({
            url: '/api/staff',
            type: 'GET',
            success: function(data) {
                populateStaffTable(data); // Populate table with data from the server
            },
            error: function(error) {
                console.error("Error loading staff data:", error);
            }
        });
    }

    // Function to populate staff table
    function populateStaffTable(staffList) {
        const staffTableBody = $('#staffTableBody');
        staffTableBody.empty();

        staffList.forEach(staff => {
            const row = `
                <tr>
                    <td>${staff.staffId}</td>
                    <td>${staff.firstName}</td>
                    <td>${staff.lastName}</td>
                    <td>${staff.designation}</td>
                    <td>${staff.gender}</td>
                    <td>${staff.joinedDate}</td>
                    <td>${staff.dob}</td>
                    <td>${staff.address}</td>
                    <td>${staff.contactNo}</td>
                    <td>${staff.email}</td>
                    <td>${staff.role}</td>
                    <td>${staff.field}</td>
                    <td>${staff.vehicle}</td>
                    <td>
                        <button class="edit-btn" data-id="${staff.staffId}">Edit</button>
                        <button class="delete-btn" data-id="${staff.staffId}">Delete</button>
                    </td>
                </tr>
            `;
            staffTableBody.append(row);
        });
    }

    // Function to clear the form
    function clearForm() {
        $('#staffSection input, #staffSection select').val('');
        $('.add-btn').text('Add Staff').removeData('id');
    }

    // Add or Update staff
    $('.add-btn').click(function(e) {
        e.preventDefault();

        const staffData = {
            staffId: $('#staffId').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            designation: $('#designation').val(),
            gender: $('#gender').val(),
            joinedDate: $('#joinedDate').val(),
            dob: $('#dob').val(),
            address: [
                $('#address1').val(),
                $('#address2').val(),
                $('#address3').val(),
                $('#address4').val(),
                $('#address5').val()
            ].filter(Boolean).join(', '),
            contactNo: $('#contactNo').val(),
            email: $('#email').val(),
            role: $('#role').val(),
            field: $('#field').val(),
            vehicle: $('#vehicle').val()
        };

        const staffId = $(this).data('id'); // Check if editing

        if (staffId) {
            // Update existing staff
            $.ajax({
                url: `/api/staff/${staffId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(staffData),
                success: function() {
                    loadStaffData(); // Reload data
                    clearForm();
                },
                error: function(error) {
                    console.error("Error updating staff:", error);
                }
            });
        } else {
            // Add new staff
            $.ajax({
                url: '/api/staff',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(staffData),
                success: function() {
                    loadStaffData(); // Reload data
                    clearForm();
                },
                error: function(error) {
                    console.error("Error adding staff:", error);
                }
            });
        }
    });

    // Edit button handler
    $(document).on('click', '.edit-btn', function() {
        const staffId = $(this).data('id');

        $.ajax({
            url: `/api/staff/${staffId}`,
            type: 'GET',
            success: function(staff) {
                $('#staffId').val(staff.staffId);
                $('#firstName').val(staff.firstName);
                $('#lastName').val(staff.lastName);
                $('#designation').val(staff.designation);
                $('#gender').val(staff.gender);
                $('#joinedDate').val(staff.joinedDate);
                $('#dob').val(staff.dob);

                const addresses = staff.address.split(', ');
                $('#address1').val(addresses[0] || '');
                $('#address2').val(addresses[1] || '');
                $('#address3').val(addresses[2] || '');
                $('#address4').val(addresses[3] || '');
                $('#address5').val(addresses[4] || '');

                $('#contactNo').val(staff.contactNo);
                $('#email').val(staff.email);
                $('#role').val(staff.role);
                $('#field').val(staff.field);
                $('#vehicle').val(staff.vehicle);

                $('.add-btn').text('Save Staff').data('id', staffId);
            },
            error: function(error) {
                console.error("Error fetching staff data:", error);
            }
        });
    });

    // Delete button handler
    $(document).on('click', '.delete-btn', function() {
        const staffId = $(this).data('id');

        $.ajax({
            url: `/api/staff/${staffId}`,
            type: 'DELETE',
            success: function() {
                loadStaffData(); // Reload data
            },
            error: function(error) {
                console.error("Error deleting staff:", error);
            }
        });
    });

    // Initial load of staff data
    loadStaffData();
});

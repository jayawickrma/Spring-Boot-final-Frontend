// Get all staff and populate table
function getAllStaff() {
    $.ajax({
        url: 'http://localhost:8080/springFinal/api/v1/staff', // Endpoint for getting all staff
        method: 'GET',
        success: function(response) {
            const tableBody = $('#staffTable tbody');
            tableBody.empty(); // Clear existing table rows
            response.forEach(staff => {
                const row = `
                        <tr data-memberCode="${staff.memberCode}">
                            <td>${staff.firstName}</td>
                            <td>${staff.lastName}</td>
                            <td>${staff.joinedDate}</td>
                            <td>${staff.dateOfBirth}</td>
                            <td>${staff.gender}</td>
                            <td>${staff.designation}</td>
                            <td>${staff.addressLine1}</td>
                            <td>${staff.addressLine2}</td>
                            <td>${staff.addressLine3}</td>
                            <td>${staff.addressLine4}</td>
                            <td>${staff.addressLine5}</td>
                            <td>${staff.contactNo}</td>
                            <td>${staff.email}</td>
                            <td>${staff.role}</td>
                            <td>${staff.vehicleList.join(", ")}</td>
                            <td>${staff.fieldList.join(", ")}</td>
                            <td>${staff.logList.join(", ")}</td>
                            <td>
                                <button class="btn btn-warning editBtn" data-memberCode="${staff.memberCode}">Edit</button>
                                <button class="btn btn-danger deleteBtn" data-memberCode="${staff.memberCode}">Delete</button>
                            </td>
                        </tr>
                    `;
                tableBody.append(row);
            });
        },
        error: function() {
            alert("Error fetching staff data.");
        }
    });
}

// Save staff
$('#staffForm').submit(function(event) {
    event.preventDefault(); // Prevent form submission

    const staffData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        joinedDate: $('#joinedDate').val(),
        dateOfBirth: $('#dateOfBirth').val(),
        gender: $('#gender').val(),
        designation: $('#designation').val(),
        addressLine1: $('#address').val(),
        addressLine2: $('#address2').val(),
        addressLine3: $('#address3').val(),
        addressLine4: $('#address4').val(),
        addressLine5: $('#address5').val(),
        contactNo: $('#contactNo').val(),
        email: $('#email').val(),
        role: $('#role').val(),
        vehicleList: [$('#vehicle').val()],
        fieldList: [$('#field').val()],
        logList: [$('#log').val()]
    };

    $.ajax({
        url: '/api/v1/staff',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(staffData),
        success: function() {
            $('#staffModal').modal('hide'); // Close modal
            getAllStaff(); // Refresh staff list
        },
        error: function() {
            alert("Error saving staff.");
        }
    });
});

// Edit staff
$(document).on('click', '.editBtn', function() {
    const memberCode = $(this).data('memberCode');

    $.ajax({
        url: `/api/v1/staff/${memberCode}`,
        method: 'GET',
        success: function(staff) {
            $('#firstName').val(staff.firstName);
            $('#lastName').val(staff.lastName);
            $('#joinedDate').val(staff.joinedDate);
            $('#dateOfBirth').val(staff.dateOfBirth);
            $('#gender').val(staff.gender);
            $('#designation').val(staff.designation);
            $('#address').val(staff.addressLine1);
            $('#address2').val(staff.addressLine2);
            $('#address3').val(staff.addressLine3);
            $('#address4').val(staff.addressLine4);
            $('#address5').val(staff.addressLine5);
            $('#contactNo').val(staff.contactNo);
            $('#email').val(staff.email);
            $('#role').val(staff.role);
            $('#vehicle').val(staff.vehicleList.join(", "));
            $('#field').val(staff.fieldList.join(", "));
            $('#log').val(staff.logList.join(", "));
            $('#staffForm').data('action', 'update');
            $('#staffForm').data('memberCode', memberCode);
            $('#staffModal').modal('show');
        },
        error: function() {
            alert("Error fetching staff details.");
        }
    });
});

// Update staff
$('#staffForm').submit(function(event) {
    event.preventDefault(); // Prevent form submission

    const staffData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        joinedDate: $('#joinedDate').val(),
        dateOfBirth: $('#dateOfBirth').val(),
        gender: $('#gender').val(),
        designation: $('#designation').val(),
        addressLine1: $('#address').val(),
        addressLine2: $('#address2').val(),
        addressLine3: $('#address3').val(),
        addressLine4: $('#address4').val(),
        addressLine5: $('#address5').val(),
        contactNo: $('#contactNo').val(),
        email: $('#email').val(),
        role: $('#role').val(),
        vehicleList: [$('#vehicle').val()],
        fieldList: [$('#field').val()],
        logList: [$('#log').val()]
    };

    const memberCode = $('#staffForm').data('memberCode');

    $.ajax({
        url: `/api/v1/staff/${memberCode}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(staffData),
        success: function() {
            $('#staffModal').modal('hide'); // Close modal
            getAllStaff(); // Refresh staff list
        },
        error: function() {
            alert("Error updating staff.");
        }
    });
});

// Delete staff
$(document).on('click', '.deleteBtn', function() {
    const memberCode = $(this).data('memberCode');

    if (confirm('Are you sure you want to delete this staff member?')) {
        $.ajax({
            url: `/api/v1/staff/${memberCode}`,
            method: 'DELETE',
            success: function() {
                getAllStaff(); // Refresh staff list
            },
            error: function() {
                alert("Error deleting staff.");
            }
        });
    }
});

// Call getAllStaff on page load
$(document).ready(function() {
    getAllStaff();
});
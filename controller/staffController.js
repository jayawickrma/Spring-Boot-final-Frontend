$(document).ready(function () {
    // Fetch and populate staff table
    function getAllStaff() {
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/staff',
            method: 'GET',
            dataType:'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function (response) {
                const tableBody = $('#staffTable tbody');
                tableBody.empty(); // Clear existing rows
                response.forEach((staff) => {
                    tableBody.append(`
                        <tr data-memberCode="${staff.memberCode}">
                            <td>${staff.memberCode}</td>
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
                        </tr>`)

                });
            },
            error: function () {
                alert("Failed to load staff data.");
            },
        });
    }

    // Add or update staff
    $('#staffForm').on('submit', function (event) {
        event.preventDefault();
        const memberCode = $(this).data('memberCode');
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
            logList: [$('#log').val()],
        };

        const method = memberCode ? 'PUT' : 'POST';
        const url = memberCode
            ? `http://localhost:8080/api/v1/staff/${memberCode}`
            : 'http://localhost:8080/api/v1/staff';

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(staffData),
            success: function () {
                $('#staffModal').modal('hide');
                getAllStaff();
            },
            error: function () {
                alert("Error while saving staff.");
            },
        });
    });

    // Populate form for editing staff
    $(document).on('click', '.editBtn', function () {
        const memberCode = $(this).data('memberCode');
        $.ajax({
            url: `http://localhost:8080/api/v1/staff/${memberCode}`,
            method: 'GET',
            success: function (staff) {
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
                $('#staffForm').data('memberCode', memberCode);
                $('#staffModal').modal('show');
            },
            error: function () {
                alert("Error while fetching staff details.");
            },
        });
    });

    // Delete staff
    $(document).on('click', '.deleteBtn', function () {
        const memberCode = $(this).data('memberCode');
        if (confirm("Are you sure you want to delete this staff member?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/staff/${memberCode}`,
                method: 'DELETE',
                success: function () {
                    getAllStaff();
                },
                error: function () {
                    alert("Error while deleting staff.");
                },
            });
        }
    });

    // Load staff data on page load
    getAllStaff();
});

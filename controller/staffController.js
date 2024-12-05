$(document).ready(function () {
    let editMemberCode=null
    // Fetch and populate staff table
    function getAllStaff() {
        $.ajax({
            url: 'http://localhost:8080/springFinal/api/v1/staff',
            method: 'GET',
            dataType: 'json',
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
                        </tr>`);
                });
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load staff data!',
                });
            },
        });
    }

    // Add or update staff
    $('#staffForm').on('submit', function (event) {
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

        const method = editMemberCode ? 'PUT' : 'POST';
        const url = editMemberCode
            ? `http://localhost:8080/springFinal/api/v1/staff/${editMemberCode}`
            : 'http://localhost:8080/springFinal/api/v1/staff';

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            data: JSON.stringify(staffData),
            success: function () {
                $('#staffModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Staff data saved successfully!',
                });
                getAllStaff();
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error while saving staff data.',
                });
            },
        });
    });

    // Populate form for editing staff
    $(document).on('click', '.editBtn', function () {
        console.log('edit button clicked')
        const memberCode = $(this).data('memberCode');
        $.ajax({
            url: `http://localhost:8080/springFinal/api/v1/staff`,
            method: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            success: function (response) {
                response.forEach((staff) => {
                    if (staff.memberCode === memberCode) {
                        console.log(staff.memberCode)
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

                        editMemberCode=staff.memberCode;

                        $('#staffModalLabel').text('Edit Staff');
                        $('#staffModal').modal('show');
                    }
                });
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Error while fetching staff details.',
                });
            },
        });
    });

    // Delete staff
    $(document).on('click', '.deleteBtn', function () {
        const memberCode = $(this).data('memberCode');
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `http://localhost:8080/springFinal/api/v1/staff/${memberCode}`,
                    method: 'DELETE',
                    contentType: 'application/json',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                    },
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Staff member has been deleted.',
                        });
                        getAllStaff();
                    },
                    error: function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Error while deleting staff.',
                        });
                    },
                });
            }
        });
    });

    // Load staff data on page load
    getAllStaff();
});

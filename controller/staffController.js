$(document).ready(function () {
    const API_URL = 'http://localhost:8080/springFinal/api/v1/staff';
    let currentStaffId = null;

    // Load all staff members
    function loadStaff() {
        $.ajax({
            url: API_URL,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            },
            success: function (data) {
                const staffTableBody = $('#staffTable tbody');
                staffTableBody.empty();
                data.forEach(staff => {
                    staffTableBody.append(`
                        <tr data-id="${staff.memberCode}">
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
                            <td>${staff.vehicleList.join(', ')}</td>
                            <td>${staff.fieldList.join(', ')}</td>
                            <td>${staff.logList.join(', ')}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-staff">Edit</button>
                                <button class="btn btn-danger btn-sm delete-staff">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                Swal.fire('Error', 'Failed to load staff data', 'error');
            }
        });
    }

    // Save or update staff
    $('#staffForm').on('submit', function (e) {
        e.preventDefault();

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
            vehicleList: $('#vehicle').val().split(','),
            fieldList: $('#field').val().split(','),
            logList: $('#log').val().split(',')
        };

        const method = currentStaffId ? 'PUT' : 'POST';
        const url = currentStaffId ? `${API_URL}/${currentStaffId}` : API_URL;

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(staffData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            },
            success: function () {
                $('#staffModal').modal('hide');
                loadStaff();
                Swal.fire('Success', 'Staff saved successfully', 'success');
            },
            error: function () {
                Swal.fire('Error', 'Failed to save staff', 'error');
            }
        });
    });

    // Edit staff
    $(document).on('click', '.edit-staff', function () {
        const staffId = $(this).closest('tr').data('id');
        currentStaffId = staffId;

        $.ajax({
            url: `${API_URL}/${staffId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            },
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
                $('#vehicle').val(staff.vehicleList.join(','));
                $('#field').val(staff.fieldList.join(','));
                $('#log').val(staff.logList.join(','));
                $('#staffModal').modal('show');
            },
            error: function () {
                Swal.fire('Error', 'Failed to load staff details', 'error');
            }
        });
    });

    // Delete staff
    $(document).on('click', '.delete-staff', function () {
        const staffId = $(this).closest('tr').data('id');

        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${API_URL}/${staffId}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    },
                    success: function () {
                        loadStaff();
                        Swal.fire('Deleted!', 'Staff has been deleted.', 'success');
                    },
                    error: function () {
                        Swal.fire('Error', 'Failed to delete staff', 'error');
                    }
                });
            }
        });
    });

    // Add staff button click
    $('#addStaffBtn').on('click', function () {
        currentStaffId = null;
        $('#staffForm')[0].reset();
        $('#staffModal').modal('show');
    });

    // Initial load
    loadStaff();
});

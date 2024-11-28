import { staffList } from "../db/db.js";

$(document).ready(function () {
    const apiUrl = "http://localhost:8080/springFinal/api/v1/vehicles"; // Adjust the base URL as needed

    let editIndex = -1;

    // Load all staff data on page load
    function loadStaffData() {
        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (data) {
                renderStaffTable(data);
            },
            error: function () {
                alert("Failed to load staff data.");
            }
        });
    }

    // Render Staff Table
    function renderStaffTable(data) {
        $('#staffTable tbody').empty();
        data.forEach((staff, index) => {
            $('#staffTable tbody').append(`
                <tr>
                    <td>${staff.firstName}</td>
                    <td>${staff.lastName}</td>
                    <td>${staff.joinedDate}</td>
                    <td>${staff.dateOfBirth}</td>
                    <td>${staff.gender}</td>
                    <td>${staff.designation}</td>
                    <td>${staff.addressLine1}</td>
                    <td>${staff.contactNo}</td>
                    <td>${staff.email}</td>
                    <td>${staff.role}</td>
                    <td>${staff.vehicleList}</td>
                    <td>${staff.fieldList}</td>
                    <td>${staff.log}</td>
                    <td>
                        <button class="btn btn-primary edit-btn" data-id="${staff.memberCode}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${staff.memberCode}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Save or Update Staff
    $('#staffForm').submit(function (e) {
        e.preventDefault();

        const staffData = {
            memberCode: editIndex === -1 ? null : $('#staffId').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            joinedDate: $('#joinedDate').val(),
            dateOfBirth: $('#dateOfBirth').val(),
            gender: $('#gender').val(),
            designation: $('#designation').val(),
            addressLine1: $('#address').val(),
            contactNo: $('#contactNo').val(),
            email: $('#email').val(),
            role: $('#role').val(),
            vehicleList: $('#vehicle').val(),
            fieldList: $('#field').val(),
            log: $('#log').val()
        };

        const requestType = editIndex === -1 ? "POST" : "PUT";
        const requestUrl = editIndex === -1 ? apiUrl : `${apiUrl}/${staffData.memberCode}`;

        $.ajax({
            url: requestUrl,
            method: requestType,
            contentType: "application/json",
            data: JSON.stringify(staffData),
            success: function () {
                $('#staffModal').modal('hide');
                $('#staffForm')[0].reset();
                editIndex = -1;
                loadStaffData();
            },
            error: function () {
                alert("Failed to save staff data.");
            }
        });
    });

    // Edit Staff
    $(document).on('click', '.edit-btn', function () {
        const memberCode = $(this).data('id');
        $.ajax({
            url: `${apiUrl}/${memberCode}`,
            method: "GET",
            success: function (staff) {
                editIndex = staff.memberCode;
                $('#staffId').val(staff.memberCode);
                $('#firstName').val(staff.firstName);
                $('#lastName').val(staff.lastName);
                $('#joinedDate').val(staff.joinedDate);
                $('#dateOfBirth').val(staff.dateOfBirth);
                $('#gender').val(staff.gender);
                $('#designation').val(staff.designation);
                $('#address').val(staff.addressLine1);
                $('#contactNo').val(staff.contactNo);
                $('#email').val(staff.email);
                $('#role').val(staff.role);
                $('#vehicle').val(staff.vehicleList);
                $('#field').val(staff.fieldList);
                $('#log').val(staff.log);
                $('#staffModal').modal('show');
            },
            error: function () {
                alert("Failed to fetch staff details.");
            }
        });
    });

    // Delete Staff
    $(document).on('click', '.delete-btn', function () {
        const memberCode = $(this).data('id');
        if (confirm("Are you sure you want to delete this staff member?")) {
            $.ajax({
                url: `${apiUrl}/${memberCode}`,
                method: "DELETE",
                success: function () {
                    loadStaffData();
                },
                error: function () {
                    alert("Failed to delete staff.");
                }
            });
        }
    });

    // Initial Data Load
    loadStaffData();
});

$(document).ready(function () {
    var staffList = [];
    var editIndex = -1;

    // Save or Update Staff
    $('#staffForm').submit(function (e) {
        e.preventDefault();

        var staffData = {
            id:$('#staff').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            joinedDate: $('#joinedDate').val(),
            dateOfBirth: $('#dateOfBirth').val(),
            gender: $('#gender').val(),
            designation: $('#designation').val(),
            address: $('#address1').val(),
            contactNo: $('#contactNo').val(),
            email: $('#email').val(),
            role: $('#role').val(),
            vehicle: $('#vehicle').val(),
            field: $('#field').val(),
            log: $('#log').val(),
        };

        if (editIndex === -1) {
            // Add new staff
            staffList.push(staffData);
        } else {
            // Update existing staff
            staffList[editIndex] = staffData;
            editIndex = -1;
        }

        $('#staffModal').modal('hide');
        $('#staffForm')[0].reset();
        renderStaffTable();
    });

    // Render Staff Table
    function renderStaffTable() {
        $('#staffTable tbody').empty();
        staffList.forEach((staff, index) => {
            $('#staffTable tbody').append(`
        <tr>
          <td>${staff.firstName}</td>
          <td>${staff.lastName}</td>
          <td>${staff.joinedDate}</td>
          <td>${staff.dateOfBirth}</td>
          <td>${staff.gender}</td>
          <td>${staff.designation}</td>
          <td>${staff.address}</td>
          <td>${staff.contactNo}</td>
          <td>${staff.email}</td>
          <td>${staff.role}</td>
          <td>${staff.vehicle}</td>
          <td>${staff.field}</td>
          <td>${staff.log}</td>
          <td>
            <button class="btn btn-primary edit-btn" data-index="${index}">Edit</button>
            <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
          </td>
        </tr>
      `);
        });
    }

    // Edit Staff
    $(document).on('click', '.edit-btn', function () {
        editIndex = $(this).data('index');
        var staff = staffList[editIndex];

        $('#firstName').val(staff.firstName);
        $('#lastName').val(staff.lastName);
        $('#joinedDate').val(staff.joinedDate);
        $('#dateOfBirth').val(staff.dateOfBirth);
        $('#gender').val(staff.gender);
        $('#designation').val(staff.designation);
        $('#address').val(staff.address);
        $('#contactNo').val(staff.contactNo);
        $('#email').val(staff.email);
        $('#role').val(staff.role);
        $('#vehicle').val(staff.vehicle);
        $('#field').val(staff.field);
        $('#log').val(staff.log);

        $('#staffModalLabel').text('Edit Staff');
        $('#staffModal').modal('show');
    });

    // Delete Staff
    $(document).on('click', '.delete-btn', function () {
        var index = $(this).data('index');
        staffList.splice(index, 1);
        renderStaffTable();
    });
});

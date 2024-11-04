$(document).ready(function() {
    let staffMembers = []; // Array to hold staff data

    // Function to refresh the staff table
    function refreshStaffTable() {
        const staffTableBody = $('#staffTableBody');
        staffTableBody.empty(); // Clear the existing table body

        staffMembers.forEach((staff, index) => {
            const address = [staff.address1, staff.address2, staff.address3, staff.address4, staff.address5].filter(Boolean).join(', ');
            const row = `
                <tr>
                    <td>${staff.staffId}</td>
                    <td>${staff.firstName}</td>
                    <td>${staff.lastName}</td>
                    <td>${staff.designation}</td>
                    <td>${staff.gender}</td>
                    <td>${staff.joinedDate}</td>
                    <td>${staff.dob}</td>
                    <td>${address}</td>
                    <td>${staff.contactNo}</td>
                    <td>${staff.email}</td>
                    <td>${staff.role}</td>
                    <td>${staff.field}</td>
                    <td>${staff.vehicle}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            staffTableBody.append(row);
        });
    }

    // Add Staff
    $('.add-btn').click(function(e) {
        e.preventDefault(); // Prevent the default form submission

        const staffId = $('#staffId').val();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const designation = $('#designation').val();
        const gender = $('#gender').val();
        const joinedDate = $('#joinedDate').val();
        const dob = $('#dob').val();
        const address1 = $('#address1').val();
        const address2 = $('#address2').val();
        const address3 = $('#address3').val();
        const address4 = $('#address4').val();
        const address5 = $('#address5').val();
        const contactNo = $('#contactNo').val();
        const email = $('#email').val();
        const role = $('#role').val();
        const field = $('#field').val();
        const vehicle = $('#vehicle').val();

        const newStaff = {
            staffId,
            firstName,
            lastName,
            designation,
            gender,
            joinedDate,
            dob,
            address1,
            address2,
            address3,
            address4,
            address5,
            contactNo,
            email,
            role,
            field,
            vehicle
        };

        staffMembers.push(newStaff); // Add new staff member to the array
        refreshStaffTable(); // Refresh the table
        clearForm(); // Clear form fields
    });

    // Edit Staff
    $(document).on('click', '.edit-btn', function() {
        const index = $(this).data('index');
        const staff = staffMembers[index];

        $('#staffId').val(staff.staffId);
        $('#firstName').val(staff.firstName);
        $('#lastName').val(staff.lastName);
        $('#designation').val(staff.designation);
        $('#gender').val(staff.gender);
        $('#joinedDate').val(staff.joinedDate);
        $('#dob').val(staff.dob);
        $('#address1').val(staff.address1);
        $('#address2').val(staff.address2);
        $('#address3').val(staff.address3);
        $('#address4').val(staff.address4);
        $('#address5').val(staff.address5);
        $('#contactNo').val(staff.contactNo);
        $('#email').val(staff.email);
        $('#role').val(staff.role);
        $('#field').val(staff.field);
        $('#vehicle').val(staff.vehicle);

        // Update the Add button to Save
        $('.add-btn').text('Save').off('click').click(function(e) {
            e.preventDefault();

            const updatedStaff = {
                staffId: $('#staffId').val(),
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                designation: $('#designation').val(),
                gender: $('#gender').val(),
                joinedDate: $('#joinedDate').val(),
                dob: $('#dob').val(),
                address1: $('#address1').val(),
                address2: $('#address2').val(),
                address3: $('#address3').val(),
                address4: $('#address4').val(),
                address5: $('#address5').val(),
                contactNo: $('#contactNo').val(),
                email: $('#email').val(),
                role: $('#role').val(),
                field: $('#field').val(),
                vehicle: $('#vehicle').val()
            };

            staffMembers[index] = updatedStaff; // Update the staff member in the array
            refreshStaffTable(); // Refresh the table
            clearForm(); // Clear form fields
            $('.add-btn').text('Add Staff'); // Reset button text
        });
    });

    // Delete Staff
    $(document).on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        staffMembers.splice(index, 1); // Remove staff member from array
        refreshStaffTable(); // Refresh the table
    });

    // Function to clear the form fields
    function clearForm() {
        $('#staffId').val('');
        $('#firstName').val('');
        $('#lastName').val('');
        $('#designation').val('');
        $('#gender').val('');
        $('#joinedDate').val('');
        $('#dob').val('');
        $('#address1').val('');
        $('#address2').val('');
        $('#address3').val('');
        $('#address4').val('');
        $('#address5').val('');
        $('#contactNo').val('');
        $('#email').val('');
        $('#role').val('');
        $('#field').val('');
        $('#vehicle').val('');
    }
});

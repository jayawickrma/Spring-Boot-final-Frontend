$(document).ready(function () {
    // Sample fields data for populating the "Field" dropdown dynamically
    const fieldsData = [
        { id: 1, name: "Field A" },
        { id: 2, name: "Field B" },
        { id: 3, name: "Field C" }
    ];

    // Populate the "Field" select dropdown with IDs dynamically
    function loadFieldOptions() {
        const $fieldSelect = $("#field");
        $.each(fieldsData, function (index, field) {
            $fieldSelect.append(
                $("<option></option>").val(field.id).text(`${field.id} - ${field.name}`)
            );
        });
    }

    // Call the function to load options initially
    loadFieldOptions();

    // Array to store staff entries
    let staffList = [];

    // Add new staff entry
    function addStaff() {
        const staff = {
            id: $("#staffId").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            designation: $("#designation").val(),
            gender: $("#gender").val(),
            joinedDate: $("#joinedDate").val(),
            dob: $("#dob").val(),
            address: `${$("#address1").val()}, ${$("#address2").val()}, ${$("#address3").val()}, ${$("#address4").val()}, ${$("#address5").val()}`,
            contactNo: $("#contactNo").val(),
            email: $("#email").val(),
            role: $("#role").val(),
            field: $("#field").val(),
            vehicle: $("#vehicle").val()
        };

        staffList.push(staff);
        renderStaffTable();
        clearForm();
    }

    // Update a staff entry in the list
    function updateStaff(index) {
        const staff = staffList[index];

        // Populate the form with existing data
        $("#staffId").val(staff.id);
        $("#firstName").val(staff.firstName);
        $("#lastName").val(staff.lastName);
        $("#designation").val(staff.designation);
        $("#gender").val(staff.gender);
        $("#joinedDate").val(staff.joinedDate);
        $("#dob").val(staff.dob);
        const addressArray = staff.address.split(", ");
        $("#address1").val(addressArray[0]);
        $("#address2").val(addressArray[1]);
        $("#address3").val(addressArray[2]);
        $("#address4").val(addressArray[3]);
        $("#address5").val(addressArray[4]);
        $("#contactNo").val(staff.contactNo);
        $("#email").val(staff.email);
        $("#role").val(staff.role);
        $("#field").val(staff.field);
        $("#vehicle").val(staff.vehicle);

        // Remove the existing entry before updating
        staffList.splice(index, 1);
        renderStaffTable();
    }

    // Delete a staff entry
    function deleteStaff(index) {
        staffList.splice(index, 1);
        renderStaffTable();
    }

    // Clear form fields
    function clearForm() {
        $("#staffSection input[type='text'], #staffSection input[type='date'], #staffSection input[type='email']").val('');
        $("#gender, #field").val('');
    }

    // Render staff list in the table
    function renderStaffTable() {
        const $tableBody = $("#staffTableBody");
        $tableBody.empty(); // Clear the table

        $.each(staffList, function (index, staff) {
            const $row = $("<tr></tr>");
            $row.append(`<td>${staff.id}</td>`);
            $row.append(`<td>${staff.firstName}</td>`);
            $row.append(`<td>${staff.lastName}</td>`);
            $row.append(`<td>${staff.designation}</td>`);
            $row.append(`<td>${staff.gender}</td>`);
            $row.append(`<td>${staff.joinedDate}</td>`);
            $row.append(`<td>${staff.dob}</td>`);
            $row.append(`<td>${staff.address}</td>`);
            $row.append(`<td>${staff.contactNo}</td>`);
            $row.append(`<td>${staff.email}</td>`);
            $row.append(`<td>${staff.role}</td>`);
            $row.append(`<td>${staff.field}</td>`);
            $row.append(`<td>${staff.vehicle}</td>`);
            $row.append(`
        <td>
          <button class="action-btn edit-btn" onclick="updateStaff(${index})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteStaff(${index})">Delete</button>
        </td>
      `);

            $tableBody.append($row);
        });
    }

    // Bind the addStaff function to the Add button
    $(".add-btn").on("click", function (event) {
        event.preventDefault();
        addStaff();
    });
});

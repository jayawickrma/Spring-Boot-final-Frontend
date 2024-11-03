// Array to hold staff data
let staffData = [];

// Function to add staff
function addStaff(event) {
    event.preventDefault(); // Prevent form submission

    // Gather form data
    const staff = {
        id: document.getElementById('staffId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        designation: document.getElementById('designation').value,
        gender: document.getElementById('gender').value,
        joinedDate: document.getElementById('joinedDate').value,
        dob: document.getElementById('dob').value,
        address: [
            document.getElementById('address1').value,
            document.getElementById('address2').value,
            document.getElementById('address3').value,
            document.getElementById('address4').value,
            document.getElementById('address5').value,
        ],
        contactNo: document.getElementById('contactNo').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        field: document.getElementById('field').value,
        vehicle: document.getElementById('vehicle').value
    };

    // Add staff to array and update table
    staffData.push(staff);
    updateStaffTable();
    document.getElementById('staffForm').reset(); // Reset form fields
}

// Function to update staff table
function updateStaffTable() {
    const tableBody = document.getElementById('staffTableBody');
    tableBody.innerHTML = ''; // Clear existing table rows

    staffData.forEach((staff, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staff.id}</td>
            <td>${staff.firstName}</td>
            <td>${staff.lastName}</td>
            <td>${staff.designation}</td>
            <td>${staff.gender}</td>
            <td>${staff.joinedDate}</td>
            <td>${staff.dob}</td>
            <td>${staff.address.join(', ')}</td>
            <td>${staff.contactNo}</td>
            <td>${staff.email}</td>
            <td>${staff.role}</td>
            <td>${staff.field}</td>
            <td>${staff.vehicle}</td>
            <td>
                <button onclick="editStaff(${index})" class="edit-btn">Edit</button>
                <button onclick="deleteStaff(${index})" class="delete-btn">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit staff
function editStaff(index) {
    const staff = staffData[index];
    document.getElementById('staffId').value = staff.id;
    document.getElementById('firstName').value = staff.firstName;
    document.getElementById('lastName').value = staff.lastName;
    document.getElementById('designation').value = staff.designation;
    document.getElementById('gender').value = staff.gender;
    document.getElementById('joinedDate').value = staff.joinedDate;
    document.getElementById('dob').value = staff.dob;
    document.getElementById('address1').value = staff.address[0];
    document.getElementById('address2').value = staff.address[1];
    document.getElementById('address3').value = staff.address[2];
    document.getElementById('address4').value = staff.address[3];
    document.getElementById('address5').value = staff.address[4];
    document.getElementById('contactNo').value = staff.contactNo;
    document.getElementById('email').value = staff.email;
    document.getElementById('role').value = staff.role;
    document.getElementById('field').value = staff.field;
    document.getElementById('vehicle').value = staff.vehicle;

    // Remove the staff from array and update the table
    deleteStaff(index);
}

// Function to delete staff
function deleteStaff(index) {
    staffData.splice(index, 1); // Remove staff from array
    updateStaffTable(); // Refresh the table
}

// document.addEventListener('DOMContentLoaded', function() {
//     const vehicleForm = document.getElementById('vehicleForm');
//     const vehicleTableBody = document.getElementById('vehicleTableBody');
//     let vehicles = []; // Array to store vehicle entries
//     let editingIndex = -1; // Index for editing entries
//
//     // Function to render vehicles in the table
//     function renderVehicles() {
//         vehicleTableBody.innerHTML = ''; // Clear table before re-rendering
//
//         vehicles.forEach((vehicle, index) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//         <td>${vehicle.licensePlate}</td>
//         <td>${vehicle.vehicleName}</td>
//         <td>${vehicle.category}</td>
//         <td>${vehicle.fuelType}</td>
//         <td>${vehicle.status}</td>
//         <td>${vehicle.selectStaff}</td>
//         <td>${vehicle.remarks}</td>
//         <td>
//           <button class="edit-btn" data-index="${index}">Edit</button>
//           <button class="delete-btn" data-index="${index}">Delete</button>
//         </td>
//       `;
//             vehicleTableBody.appendChild(row);
//         });
//     }
//
//     // Function to handle form submission
//     vehicleForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//
//         // Get form values
//         const licensePlate = document.getElementById('licensePlate').value;
//         const vehicleName = document.getElementById('vehicleName').value;
//         const category = document.getElementById('category').value;
//         const fuelType = document.getElementById('fuelType').value;
//         const status = document.getElementById('status').value;
//         const selectStaff = document.getElementById('selectStaff').value;
//         const remarks = document.getElementById('remarks').value;
//
//         const vehicleData = {
//             licensePlate,
//             vehicleName,
//             category,
//             fuelType,
//             status,
//             selectStaff,
//             remarks
//         };
//
//         if (editingIndex >= 0) {
//             // Update vehicle entry
//             vehicles[editingIndex] = vehicleData;
//             editingIndex = -1; // Reset editing index
//         } else {
//             // Add new vehicle entry
//             vehicles.push(vehicleData);
//         }
//
//         renderVehicles(); // Re-render table
//         vehicleForm.reset(); // Clear form fields
//     });
//
//     // Event listener for edit and delete buttons
//     vehicleTableBody.addEventListener('click', function(event) {
//         const target = event.target;
//         const index = target.dataset.index; // Index from data attribute
//
//         if (target.classList.contains('edit-btn')) {
//             // Edit vehicle entry
//             const vehicle = vehicles[index];
//             document.getElementById('licensePlate').value = vehicle.licensePlate;
//             document.getElementById('vehicleName').value = vehicle.vehicleName;
//             document.getElementById('category').value = vehicle.category;
//             document.getElementById('fuelType').value = vehicle.fuelType;
//             document.getElementById('status').value = vehicle.status;
//             document.getElementById('selectStaff').value = vehicle.selectStaff;
//             document.getElementById('remarks').value = vehicle.remarks;
//
//             editingIndex = index; // Set index for editing
//         } else if (target.classList.contains('delete-btn')) {
//             // Delete vehicle entry
//             vehicles.splice(index, 1); // Remove entry
//             renderVehicles(); // Re-render table
//         }
//     });
//
//     renderVehicles(); // Initial render
// });
$(document).ready(function() {
    const $vehicleForm = $('#vehicleForm');
    const $vehicleTableBody = $('#vehicleTableBody');
    let vehicles = []; // Array to store vehicle entries
    let editingIndex = -1; // Index for editing entries

    // Function to render vehicles in the table
    function renderVehicles() {
        $vehicleTableBody.empty(); // Clear table before re-rendering

        vehicles.forEach((vehicle, index) => {
            const row = $(`
                <tr>
                    <td>${vehicle.licensePlate}</td>
                    <td>${vehicle.vehicleName}</td>
                    <td>${vehicle.category}</td>
                    <td>${vehicle.fuelType}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.selectStaff}</td>
                    <td>${vehicle.remarks}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
            $vehicleTableBody.append(row);
        });
    }

    // Function to handle form submission
    $vehicleForm.on('submit', function(event) {
        event.preventDefault();

        // Get form values
        const licensePlate = $('#licensePlate').val();
        const vehicleName = $('#vehicleName').val();
        const category = $('#category').val();
        const fuelType = $('#fuelType').val();
        const status = $('#status').val();
        const selectStaff = $('#selectStaff').val();
        const remarks = $('#remarks').val();

        const vehicleData = {
            licensePlate,
            vehicleName,
            category,
            fuelType,
            status,
            selectStaff,
            remarks
        };

        if (editingIndex >= 0) {
            // Update vehicle entry
            vehicles[editingIndex] = vehicleData;
            editingIndex = -1; // Reset editing index
        } else {
            // Add new vehicle entry
            vehicles.push(vehicleData);
        }

        renderVehicles(); // Re-render table
        $vehicleForm[0].reset(); // Clear form fields
    });

    // Event listener for edit and delete buttons
    $vehicleTableBody.on('click', '.edit-btn, .delete-btn', function(event) {
        const index = $(this).data('index'); // Index from data attribute

        if ($(this).hasClass('edit-btn')) {
            // Edit vehicle entry
            const vehicle = vehicles[index];
            $('#licensePlate').val(vehicle.licensePlate);
            $('#vehicleName').val(vehicle.vehicleName);
            $('#category').val(vehicle.category);
            $('#fuelType').val(vehicle.fuelType);
            $('#status').val(vehicle.status);
            $('#selectStaff').val(vehicle.selectStaff);
            $('#remarks').val(vehicle.remarks);

            editingIndex = index; // Set index for editing
        } else if ($(this).hasClass('delete-btn')) {
            // Delete vehicle entry
            vehicles.splice(index, 1); // Remove entry
            renderVehicles(); // Re-render table
        }
    });

    renderVehicles(); // Initial render
});

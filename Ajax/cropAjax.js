import field from "../Model/cropModel";

$(document).ready(function() {
    var crops = [];
    var editIndex = -1;

    // Save or Update Crop
    $('#cropForm').submit(function(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append('name', $('#cropName').val());
        formData.append('season', $('#Season').val());
        formData.append('scientificName', $('#ScientificName').val());
        formData.append('image', $('#Image')[0].files[0]); // Assuming #Image is a file input
        formData.append('field', $('#Field').val());

        if (editIndex === -1) {
            // Add new crop
            $.ajax({
                url: 'http://localhost:8080/springFinal/api/v1/crops', // Your API endpoint for creating a crop
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    fetchCrops();
                    $('#cropModal').modal('hide');
                    $('#cropForm')[0].reset();
                },
                error: function(error) {
                    console.error('Error saving crop:', error);
                }
            });
        } else {
            // Update existing crop
            $.ajax({
                url: '/api/crops/' + crops[editIndex].id, // Your API endpoint for updating a crop
                method: 'PUT',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    fetchCrops();
                    $('#cropModal').modal('hide');
                    $('#cropForm')[0].reset();
                    editIndex = -1;
                },
                error: function(error) {
                    console.error('Error updating crop:', error);
                }
            });
        }
    });

    // Edit Crop
    $(document).on('click', '.edit-btn', function() {
        var id = $(this).data('id');
        editIndex = crops.findIndex(crop => crop.id === id);
        var crop = crops[editIndex];
        $('#cropName').val(crop.name);
        $('#Season').val(crop.season);
        $('#ScientificName').val(crop.scientificName);
        $('#Image').val(""); // Clear file input
        $('#Field').val(crop.field);
        $('#cropModalLabel').text('Edit Crop');
        $('#cropModal').modal('show');
    });

    // Delete Crop
    $(document).on('click', '.delete-btn', function() {
        var id = $(this).data('id');
        $.ajax({
            url: '/api/crops/' + id, // Your API endpoint for deleting a crop
            method: 'DELETE',
            success: function(response) {
                fetchCrops();
            },
            error: function(error) {
                console.error('Error deleting crop:', error);
            }
        });
    });

    // Fetch crops and render table
    function fetchCrops() {
        $.ajax({
            url: '/api/crops', // Your API endpoint for fetching crops
            method: 'GET',
            success: function(response) {
                crops = response;
                renderTable();
            },
            error: function(error) {
                console.error('Error fetching crops:', error);
            }
        });
    }

    // Render Table
    function renderTable() {
        $('#cropTable tbody').empty();
        crops.forEach(crop => {
            $('#cropTable tbody').append(`
                <tr>
                    <td>${crop.id}</td>
                    <td>${crop.name}</td>
                    <td>${crop.season}</td>
                    <td>${crop.scientificName}</td>
                    <td><img src="${crop.image}" alt="Crop Image" width="50"></td>
                    <td>
                        <button class="btn btn-primary edit-btn" data-id="${crop.id}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${crop.id}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }
});

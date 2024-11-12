$(document).ready(function() {
    // Function to load crops data from the server
    function loadCrops() {
        $.ajax({
            url: '/api/crops', // Replace with your actual endpoint
            method: 'GET',
            success: function(data) {
                crops = data; // Assume the server returns an array of crops
                refreshCropTable();
            },
            error: function() {
                alert('Failed to load crops data');
            }
        });
    }

    // Function to refresh the crop table
    function refreshCropTable() {
        const cropTableBody = $('#cropTableBody');
        cropTableBody.empty();

        crops.forEach((crop, index) => {
            const row = `
                <tr>
                    <td>${crop.cropCode}</td>
                    <td>${crop.commonName}</td>
                    <td>${crop.scientificName}</td>
                    <td><img src="${crop.image}" alt="${crop.commonName}" width="50" /></td>
                    <td>${crop.category}</td>
                    <td>${crop.season}</td>
                    <td>${crop.field}</td>
                    <td>
                        <button class="edit-btn" data-id="${crop.id}">Edit</button>
                        <button class="delete-btn" data-id="${crop.id}">Delete</button>
                    </td>
                </tr>
            `;
            cropTableBody.append(row);
        });
    }

    // Function to clear the form fields
    function clearForm() {
        $('#cropForm')[0].reset();
        $('.add-btn').text('Add Crop').removeData('id');
    }

    // Function to handle adding or updating crops
    $('.add-btn').click(function(e) {
        e.preventDefault();

        const cropData = new FormData($('#cropForm')[0]);
        const currentId = $(this).data('id');

        if (currentId) {
            // Update crop
            $.ajax({
                url: `/api/crops/${currentId}`, // Replace with your actual endpoint
                method: 'PUT',
                data: cropData,
                contentType: false,
                processData: false,
                success: function() {
                    loadCrops();
                    clearForm();
                },
                error: function() {
                    alert('Failed to update crop');
                }
            });
        } else {
            // Add new crop
            $.ajax({
                url: 'http://localhost:8080/springFinal/api/v1/crops', // Replace with your actual endpoint
                method: 'POST',
                data: cropData,
                contentType: false,
                processData: false,
                success: function() {
                    loadCrops();
                    clearForm();
                },
                error: function() {
                    alert('Failed to add crop');
                }
            });
        }
    });

    // Edit Crop
    $(document).on('click', '.edit-btn', function() {
        const cropId = $(this).data('id');

        $.ajax({
            url: `/api/crops/${cropId}`, // Replace with your actual endpoint
            method: 'GET',
            success: function(crop) {
                $('#cropCode').val(crop.cropCode);
                $('#commonName').val(crop.commonName);
                $('#scientificName').val(crop.scientificName);
                $('#category').val(crop.category);
                $('#season').val(crop.season);
                $('#field').val(crop.field);
                $('.add-btn').text('Save Crop').data('id', crop.id);
            },
            error: function() {
                alert('Failed to load crop data');
            }
        });
    });

    // Delete Crop
    $(document).on('click', '.delete-btn', function() {
        const cropId = $(this).data('id');

        $.ajax({
            url: `/api/crops/${cropId}`, // Replace with your actual endpoint
            method: 'DELETE',
            success: function() {
                loadCrops();
            },
            error: function() {
                alert('Failed to delete crop');
            }
        });
    });

    // Load crops initially
    loadCrops();
});

import {crops} from "../db/db";
$(document).ready(function() {


    // Function to refresh the crop table
    function refreshCropTable() {
        const cropTableBody = $('#cropTableBody');
        cropTableBody.empty(); // Clear the existing table body

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
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            cropTableBody.append(row);
        });
    }

    // Add Crop
    $('.add-btn').click(function(e) {
        e.preventDefault(); // Prevent the default form submission

        const cropCode = $('#cropCode').val();
        const commonName = $('#commonName').val();
        const scientificName = $('#scientificName').val();
        const cropImage = $('#cropImage')[0].files[0];
        const category = $('#category').val();
        const season = $('#season').val();
        const field = $('#field').val();

        if (cropImage) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newCrop = {
                    cropCode,
                    commonName,
                    scientificName,
                    image: event.target.result,
                    category,
                    season,
                    field
                };
                crops.push(newCrop); // Add new crop to the array
                refreshCropTable(); // Refresh the table
                clearForm(); // Clear form fields
            };
            reader.readAsDataURL(cropImage);
        }
    });

    // Edit Crop
    $(document).on('click', '.edit-btn', function() {
        const index = $(this).data('index');
        const crop = crops[index];

        $('#cropCode').val(crop.cropCode);
        $('#commonName').val(crop.commonName);
        $('#scientificName').val(crop.scientificName);
        $('#category').val(crop.category);
        $('#season').val(crop.season);
        $('#field').val(crop.field);
        $('#cropImage').val(''); // Reset image input

        // Update the Add button to Save
        $('.add-btn').text('Save').off('click').click(function(e) {
            e.preventDefault();

            const updatedCrop = {
                cropCode: $('#cropCode').val(),
                commonName: $('#commonName').val(),
                scientificName: $('#scientificName').val(),
                image: crop.image, // Keep the same image unless changed
                category: $('#category').val(),
                season: $('#season').val(),
                field: $('#field').val()
            };
            crops[index] = updatedCrop; // Update the crop in the array
            refreshCropTable(); // Refresh the table
            clearForm(); // Clear form fields
            $('.add-btn').text('Add Crop'); // Reset button text
        });
    });

    // Delete Crop
    $(document).on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        crops.splice(index, 1); // Remove crop from array
        refreshCropTable(); // Refresh the table
    });

    // Function to clear the form fields
    function clearForm() {
        $('#cropCode').val('');
        $('#commonName').val('');
        $('#scientificName').val('');
        $('#cropImage').val('');
        $('#category').val('');
        $('#season').val('');
        $('#field').val('');
    }
});

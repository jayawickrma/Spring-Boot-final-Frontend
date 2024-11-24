$(document).ready(function () {
    var crops = [];
    var editIndex = -1;

    // Save or Update Crop
    $('#cropForm').submit(function (e) {
        e.preventDefault();

        var cropName = $('#cropName').val();
        var season = $('#Season').val();
        var scientificName = $('#ScientificName').val();
        var imageFile = $('#CropImage')[0].files[0]; // Get file object
        var field = $('#field').val();

        if (imageFile) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var imageUrl = event.target.result;

                if (editIndex === -1) {
                    // Add new crop
                    crops.push({
                        id: crops.length + 1,
                        name: cropName,
                        season: season,
                        scientificName: scientificName,
                        image: imageUrl,
                        field: field,
                    });
                } else {
                    // Update crop
                    crops[editIndex].name = cropName;
                    crops[editIndex].season = season;
                    crops[editIndex].scientificName = scientificName;
                    crops[editIndex].image = imageUrl;
                    crops[editIndex].field = field;
                    editIndex = -1;
                }

                $('#cropModal').modal('hide'); // Close modal
                $('#cropForm')[0].reset(); // Reset form
                renderTable(); // Refresh table
            };
            reader.readAsDataURL(imageFile); // Convert image to Base64
        } else if (editIndex !== -1) {
            crops[editIndex].name = cropName;
            crops[editIndex].season = season;
            crops[editIndex].scientificName = scientificName;
            crops[editIndex].field = field;
            $('#cropModal').modal('hide');
            renderTable();
        }
    });

    // Render Table
    function renderTable() {
        var tbody = $('#cropTable tbody');
        tbody.empty(); // Clear the table body

        crops.forEach(function (crop) {
            tbody.append(`
                <tr>
                    <td>${crop.id}</td>
                    <td>${crop.name}</td>
                    <td>${crop.season}</td>
                    <td>${crop.scientificName}</td>
                    <td>
                        <img src="${crop.image}" alt="${crop.name}" class="crop-img" data-image="${crop.image}" style="width: 50px; height: 50px; cursor: pointer;">
                    </td>
                    <td>${crop.field}</td>
                    <td>
                        <button class="btn btn-primary edit-btn" data-id="${crop.id}">Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${crop.id}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Show Image in Modal
    $(document).on('click', '.crop-img', function () {
        var imageUrl = $(this).data('image');
        $('#imageModal .modal-body img').attr('src', imageUrl); // Set modal image source
        $('#imageModal').modal('show'); // Show the modal
    });

    // Edit Crop
    $(document).on('click', '.edit-btn', function () {
        var id = $(this).data('id');
        editIndex = crops.findIndex(function (crop) {
            return crop.id === id;
        });

        var crop = crops[editIndex];
        $('#cropName').val(crop.name);
        $('#Season').val(crop.season);
        $('#ScientificName').val(crop.scientificName);
        $('#field').val(crop.field);

        $('#cropModalLabel').text('Edit Crop');
        $('#cropModal').modal('show');
    });

    // Delete Crop
    $(document).on('click', '.delete-btn', function () {
        var id = $(this).data('id');
        crops = crops.filter(function (crop) {
            return crop.id !== id;
        });
        renderTable();
    });

    // Open Add Crop Modal
    $('#cropSaveBtn').click(function () {
        editIndex = -1; // Reset edit index
        $('#cropForm')[0].reset(); // Clear form
        $('#cropModalLabel').text('Add Crop');
    });
});


    $(document).ready(function() {
    let fields = []; // Array to store field entries
    let currentIndex = -1; // To track the index of the item being edited

    // Function to display fields in the table
    function displayFields() {
    $('#fieldTableBody').empty(); // Clear existing rows
    fields.forEach((field, index) => {
    $('#fieldTableBody').append(`
                <tr>
                    <td>${field.fieldCode}</td>
                    <td>${field.fieldName}</td>
                    <td>${field.fieldLocation}</td>
                    <td>${field.fieldSize}</td>
                    <td>${field.crop}</td>
                    <td>${field.staff}</td>
                    <td><img src="${field.image1}" alt="Field Image 1" width="50"></td>
                    <td><img src="${field.image2}" alt="Field Image 2" width="50"></td>
                    <td class="actions">
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
});
}

    // Add Field
    $('#addFieldBtn').on('click', function(e) {
    e.preventDefault();

    const fieldCode = $('#fieldCode').val();
    const fieldName = $('#fieldName').val();
    const fieldLocation = $('#fieldLocation').val();
    const fieldSize = $('#fieldSize').val();
    const crop = $('#crop').val();
    const staff = $('#staff').val();
    const fieldImage1 = $('#fieldImage1')[0].files[0];
    const fieldImage2 = $('#fieldImage2')[0].files[0];

    if (currentIndex === -1) { // Add new field
    const reader1 = new FileReader();
    reader1.onloadend = function() {
    const reader2 = new FileReader();
    reader2.onloadend = function() {
    fields.push({
    fieldCode,
    fieldName,
    fieldLocation,
    fieldSize,
    crop,
    staff,
    image1: reader1.result,
    image2: reader2.result
});
    displayFields();
    clearFields();
}
    if (fieldImage2) reader2.readAsDataURL(fieldImage2);
}
    if (fieldImage1) reader1.readAsDataURL(fieldImage1);
} else { // Edit existing field
    fields[currentIndex] = {
    fieldCode,
    fieldName,
    fieldLocation,
    fieldSize,
    crop,
    staff,
    image1: fieldImage1 ? URL.createObjectURL(fieldImage1) : fields[currentIndex].image1,
    image2: fieldImage2 ? URL.createObjectURL(fieldImage2) : fields[currentIndex].image2
};
    displayFields();
    clearFields();
    currentIndex = -1;
    $('#addFieldBtn').text('Add Field');
}
});

    // Edit Field
    $(document).on('click', '.edit-btn', function() {
    const index = $(this).data('index');
    currentIndex = index;

    const field = fields[index];
    $('#fieldCode').val(field.fieldCode);
    $('#fieldName').val(field.fieldName);
    $('#fieldLocation').val(field.fieldLocation);
    $('#fieldSize').val(field.fieldSize);
    $('#crop').val(field.crop);
    $('#staff').val(field.staff);
    $('#addFieldBtn').text('Update Field');
});

    // Delete Field
    $(document).on('click', '.delete-btn', function() {
    const index = $(this).data('index');
    fields.splice(index, 1); // Remove field from the array
    displayFields(); // Refresh the table
});

    // Clear input fields
    function clearFields() {
    $('#fieldCode').val('');
    $('#fieldName').val('');
    $('#fieldLocation').val('');
    $('#fieldSize').val('');
    $('#crop').val('');
    $('#staff').val('');
    $('#fieldImage1').val('');
    $('#fieldImage2').val('');
}
});

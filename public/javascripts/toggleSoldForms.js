/****
Usage: Enable/disable specific input fields depending on if "Item Sold" is checked
****/

function toggleFieldsOff() {
    const fields = document.querySelectorAll('.sold-field');

        fields.forEach(field => {
            field.classList.add('bg-gray-100', 'cursor-not-allowed');
            field.setAttribute("disabled", "");
            field.removeAttribute("required");
            field.value = "";
        })
}

function toggleFieldsOn() {
    const fields = document.querySelectorAll('.sold-field');
        fields.forEach(field => {
            field.classList.remove('bg-gray-100', 'cursor-not-allowed');
            field.removeAttribute("disabled");
            field.setAttribute("required", "");
        })
}

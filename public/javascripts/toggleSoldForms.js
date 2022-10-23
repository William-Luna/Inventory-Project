function toggleFormsOff() {
    const forms = document.querySelectorAll('.sold-field');

        forms.forEach(form => {
            form.classList.add('bg-gray-100', 'cursor-not-allowed');
            form.setAttribute("disabled", "");
        })
}

function toggleFormsOn() {
    const forms = document.querySelectorAll('.sold-field');
        forms.forEach(form => {
            form.classList.remove('bg-gray-100', 'cursor-not-allowed');
            form.removeAttribute("disabled");
        })
}

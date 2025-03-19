// form-validation.js
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim()) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return false;
        }
    }
    return true;
}

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(event) {
        if (!validateForm(this)) {
            event.preventDefault(); // Prevent form submission
        }
    });
});

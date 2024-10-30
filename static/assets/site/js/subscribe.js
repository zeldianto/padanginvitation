const base_url = document.getElementById('url_api').value;
const submitButton = document.getElementById('form-submit');
const loadingButton = document.getElementById('form-loading');
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitButton.style.display = 'none';
        loadingButton.style.display = 'block';

        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach(function (value, key) {
            formDataObject[key] = value;
        });

        const endpoint = `${base_url}/subscription`;

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Response from API:', data);
            submitButton.style.display = 'block';
            loadingButton.style.display = 'none';

            if (data.success) {
                // Sembunyikan form aktif dan tampilkan form sukses
                document.getElementById('form-active').style.display = 'none';
                const formSuccess = document.getElementById('form-success');
                formSuccess.style.display = 'block';
                // Ganti nama pada form sukses dengan nama dari response
                formSuccess.querySelector('em').textContent = data.data.name;
            }
        })
        .catch(function (error) {
            console.error('There was a problem with your fetch operation:', error);
            submitButton.style.display = 'block';
            loadingButton.style.display = 'none';
        });
    });
});
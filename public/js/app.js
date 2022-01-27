const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorDisplay = document.querySelector('#error');
const weatherDisplay = document.querySelector('#result');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = '/weather?address=' + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherDisplay.textContent = '';
                errorDisplay.textContent = data.error;
            } else {
                errorDisplay.textContent = '';
                weatherDisplay.textContent = data.location + ', ' + data.temperature + ', ' + data.description;
                search.value = data.location;
            }
        });
    });
    console.log();
})
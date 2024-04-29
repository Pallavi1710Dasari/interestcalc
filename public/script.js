document.addEventListener("DOMContentLoaded", function() {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const timeInput = document.getElementById('time');

    principalInput.addEventListener('blur', validateInput);
    rateInput.addEventListener('blur', validateInput);
    timeInput.addEventListener('blur', validateInput);

    function validateInput(event) {
        const input = event.target;
        const errorId = input.id + 'Error';
        const errorElement = document.getElementById(errorId);

        if (!input.checkValidity()) {
            errorElement.textContent = input.validationMessage;
            input.classList.add('error');
        } else {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    }

    document.getElementById('interestForm').addEventListener('submit', function(event) {
        event.preventDefault();

        if (principalInput.checkValidity() && rateInput.checkValidity() && timeInput.checkValidity()) {
            const principal = parseFloat(principalInput.value);
            const rate = parseFloat(rateInput.value);
            const time = parseFloat(timeInput.value);

            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    principal: principal,
                    rate: rate,
                    time: time
                })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('result').innerText = 'Simple Interest: ' + data.simpleInterest;
                document.getElementById("totalResult").textContent=`Total Amount: ${data.simpleInterest+principal}`
                principalInput.value = '';
                rateInput.value = '';
                timeInput.value = '';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});

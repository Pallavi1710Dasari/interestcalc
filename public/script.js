function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ principal, rate, time })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Simple Interest: ${data.simpleInterest}`;
    })
    .catch(error => console.error('Error:', error));
}
getResult = async () => {
    try {
        const response = await fetch('http://localhost:3000');
        const result = await response.json();
        changeResult(`New result is ${result.responseText}!`);
    } catch (e) {
        changeResult(e.message)
        console.warn(e);
    }

}

const changeResult = (message) => {
    const resultContainer = document.getElementById('result-container')
    resultContainer.innerText = message;
}

async function generateAudio() {
    const textInput = document.getElementById('inputText');
    const statusText = document.getElementById('status');
    const audioPlayer = document.getElementById('audioPlayer');
    const resultDiv = document.getElementById('result');

    const text = textInput.value.trim();

    if (!text) {
        statusText.textContent = 'Please enter some text.';
        return;
    }

    statusText.textContent = 'Generating audio...';
    audioPlayer.style.display = 'none';
    audioPlayer.src = '';

    try {
        const response = await fetch('https://aog369pvx0.execute-api.ap-south-1.amazonaws.com/production/generate-audio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        const rawData = await response.json();
        const data = JSON.parse(rawData.body);  // parse the JSON
        console.log(data.audioUrl)
        if (data.audioUrl) {
            statusText.textContent ='Audio generated'
            resultDiv.innerHTML = `
        <audio controls src="${data.audioUrl}" style="margin-top:10px;"></audio>`;
        } else {
            resultDiv.innerHTML = 'Something went wrong. No audio URL found.';
        }
    } catch (error) {
        statusText.textContent = 'Error: ' + error.message;
    }
}
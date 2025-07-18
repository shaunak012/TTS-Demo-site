async function generateAudio() {
  const textInput = document.getElementById('inputText');
  const statusText = document.getElementById('status');
  const audioPlayer = document.getElementById('audioPlayer');

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

    if (data.audioUrl) {
    resultDiv.innerHTML = `
        <p>Audio generated:</p>
        <audio controls src="${data.audioUrl}" style="margin-top:10px;"></audio>
        <p><a href="${data.audioUrl}" target="_blank" download>Download MP3</a></p>
    `;
    } else {
    resultDiv.innerHTML = 'Something went wrong. No audio URL found.';
    }

    // if (response.ok && data.fileUrl) {
    //   audioPlayer.src = data.fileUrl;
    //   audioPlayer.style.display = 'block';
    //   statusText.textContent = 'Success! Click play to listen.';
    // } else {
    //   throw new Error(data.message || 'Error generating audio.');
    // }

  } catch (error) {
    statusText.textContent = 'Error: ' + error.message;
  }
}
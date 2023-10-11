// script.js

document.addEventListener('DOMContentLoaded', function () {
    const conversionForm = document.getElementById('conversionForm');
    const outputDiv = document.getElementById('output');

    conversionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const videoFile = document.getElementById('videoFile').files[0];

        if (!videoFile) {
            outputDiv.innerHTML = '<p>Please select a video file.</p>';
            return;
        }

        const formData = new FormData();
        formData.append('video', videoFile);

        fetch('/api/convert', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            outputDiv.innerHTML = `<p>Audio file successfully converted: <a href="${data.audioUrl}" download>Download Audio</a></p>`;
        })
        .catch(error => {
            outputDiv.innerHTML = `<p>Error occurred: ${error.message}</p>`;
        });
    });
});

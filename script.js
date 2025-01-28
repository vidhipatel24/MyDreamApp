// Get elements
const fileInput = document.getElementById('file-input');
const plantName = document.getElementById('plant-name');
const plantCareList = document.getElementById('plant-care-list');
const video = document.getElementById('video');
const captureButton = document.getElementById('capture-button');
const loadingIndicator = document.querySelector('.loading');
const errorMessage = document.querySelector('.error-message');
const errorText = document.getElementById('error-text');

// Add event listeners
fileInput.addEventListener('change', handleFileInput);
captureButton.addEventListener('click', handleCapture);

// ... (camera access and capture logic) ...

captureButton.addEventListener('click', () => {
  loadingIndicator.style.display = 'block'; // Show loading indicator
  errorMessage.style.display = 'none'; // Hide any previous error messages
  
  // ... (send image data to backend) ...

  fetch('/api/identify', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imageData: dataURL })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    loadingIndicator.style.display = 'none'; // Hide loading indicator

    plantName.textContent = data.plantName;
    // ... (update UI with plant care information) ...
})
.catch(error => {
    loadingIndicator.style.display = 'none'; // Hide loading indicator
    errorMessage.style.display = 'block';
    errorText.textContent = 'Error identifying plant. Please try again.';
});
});

// Function to handle file input
function handleFileInput() {
  loadingIndicator.style.display = 'block'; // Show loading indicator
  errorMessage.style.display = 'none'; // Hide any previous error messages

  // Get the selected file
  const file = fileInput.files[0];

  // Create a new FormData object
  const formData = new FormData();

  // Append the file to the FormData object
  formData.append('image', file);

  // Send the FormData object to the server
  fetch('/api/identify', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loadingIndicator.style.display = 'none'; // Hide loading indicator

    // Update the plant name and care list
    plantName.textContent = data.plantName;

    plantCareList.innerHTML = '';
    data.careInformation.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      plantCareList.appendChild(listItem);
    });
  })
  .catch(error => {
    loadingIndicator.style.display = 'none'; // Hide loading indicator
    console.error('Error:', error);
    errorMessage.style.display = 'block';
    errorText.textContent = 'Error identifying plant. Please try again.';
    plantName.textContent = 'Error identifying plant.';
    plantCareList.innerHTML = '';
  });
}

// Function to handle capture
function handleCapture() {
  loadingIndicator.style.display = 'block'; // Show loading indicator
  errorMessage.style.display = 'none'; // Hide any previous error messages

  // Create a new canvas element
  const canvas = document.createElement('canvas');

  // Set the canvas width and height
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Get the canvas context
  const context = canvas.getContext('2d');

  // Draw the video on the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get the canvas data URL
  const dataURL = canvas.toDataURL('image/jpeg');

  // Send the data URL to the server
  fetch('/api/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imageData: dataURL })
  })
  .then(response => response.json())
  .then(data => {
    loadingIndicator.style.display = 'none'; // Hide loading indicator

    // Update the plant name and care list
    plantName.textContent = data.plantName;
    // ... (rest of the code for updating UI with plant care information)
  })
  .catch(error => {
    loadingIndicator.style.display = 'none'; // Hide loading indicator
    console.error('Error:', error);
    errorMessage.style.display = 'block';
    errorText.textContent = 'Error identifying plant. Please try again.';
    plantName.textContent = 'Error identifying plant.';
    plantCareList.innerHTML = '';
  });
}

// Check for browser media device support
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    // Set the video source object
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('Error accessing camera:', err);
    errorMessage.style.display = 'block';
    errorText.textContent = 'Error accessing camera. Please check your device settings.';
  });
// Get elements from the DOM
const fileInput = document.getElementById('file-input');
const plantName = document.getElementById('plant-name');
const plantCareList = document.getElementById('plant-care-list');
const video = document.getElementById('video');
const captureButton = document.getElementById('capture-button');
const toggleCameraButton = document.getElementById('toggle-camera-button');
const loadingIndicator = document.querySelector('.loading');
const errorMessage = document.querySelector('.error-message');
const errorText = document.getElementById('error-text');
const displayedImage = document.getElementById('displayed-image');

let currentStream;
let useFrontCamera = true;

// Add event listeners
fileInput.addEventListener('change', handleFileInput);
captureButton.addEventListener('click', handleCapture);
toggleCameraButton.addEventListener('click', toggleCamera);

// Function to start the camera
function startCamera() {
  const constraints = {
    video: {
      facingMode: useFrontCamera ? 'user' : 'environment'
    }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
    })
    .catch(err => {
      console.error('Error accessing camera:', err);
      errorMessage.style.display = 'block';
      errorText.textContent = 'Error accessing camera. Please check your device settings.';
    });
}

// Function to toggle the camera
function toggleCamera() {
  useFrontCamera = !useFrontCamera;
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }
  startCamera();
}

// Function to handle file input
function handleFileInput() {
  loadingIndicator.style.display = 'block'; // Show loading indicator
  errorMessage.style.display = 'none'; // Hide any previous error messages

  // Get the selected file
  const file = fileInput.files[0];

  // Display the uploaded image
  const reader = new FileReader();
  reader.onload = function(e) {
    displayedImage.src = e.target.result;
    displayedImage.parentElement.style.display = 'block'; // Show the image display section
    document.querySelector('.image-capture').style.display = 'none'; // Hide the image capture section
    document.querySelector('.image-upload').style.display = 'none'; // Hide the image upload section
  };
  reader.readAsDataURL(file);

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

  // Display the captured image
  displayedImage.src = dataURL;
  displayedImage.parentElement.style.display = 'block'; // Show the image display section
  document.querySelector('.image-capture').style.display = 'none'; // Hide the image capture section
  document.querySelector('.image-upload').style.display = 'none'; // Hide the image upload section

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

// Start the camera on page load
startCamera();
# Dream Nursery Web App

## Objective

Develop a robust and user-friendly web application using UiPath 2025.0.157 Community Edition to assist users in identifying plants and obtaining comprehensive plant care information.

## Key Features

### Plant Identification
- Integrate with Google Lens (via API or web scraping) to accurately identify plants from images captured by the user's device camera.
- Handle potential errors and low-quality images gracefully.

### Plant Care Information Retrieval
- Utilize the Planty plugin (if available), or implement efficient web scraping techniques to extract relevant plant care information from a reliable source (e.g., the Planty website).
- Retrieve data points such as:
    - Sunlight requirements (e.g., full sun, partial shade)
    - Watering frequency
    - Soil type
    - Common pests and diseases
    - Propagation methods (if available)

### User Interface
- Design an intuitive and user-friendly web interface:
    - Enable users to capture images using their device camera or upload images from their device.
    - Clearly display the identified plant name.
    - Present plant care information in a well-organized and easy-to-read format (e.g., using tables, lists).
    - Consider incorporating visual elements (e.g., images of the plant) to enhance user experience.

### Workflow Optimization
- Optimize the workflow for speed and efficiency to minimize processing time.
- Implement robust error handling mechanisms to gracefully handle unexpected situations.

### Cross-Platform Compatibility
- Prioritize the use of cross-platform compatible activities and libraries to ensure the application can potentially be used across different operating systems.

## Deliverables
- A fully functional web application demonstrating the plant identification and care information retrieval capabilities.
- Well-documented UiPath workflow (.xaml file) with clear comments and explanations.
- A user guide or documentation explaining how to use the application.

## Evaluation Criteria
- Accuracy of plant identification.
- Completeness and accuracy of retrieved plant care information.
- User interface design and usability.
- Workflow performance and efficiency.
- Error handling and robustness.
- Code quality, readability, and maintainability.
# GALACTIC-Explorer
#### Welcome to GALACTIC Explorer, a web application that harnesses the power of NASA's public APIs to provide an immersive exploration of astronomy-related data and imagery. This application requires user registration to access its full suite of features.

## Features
* **API Integration:** GALACTIC Explorer utilizes five distinct APIs from NASA's API portal. These APIs offer a diverse range of content, from imagery to informational data.
* **User Dashboard:** Upon logging in, users are directed to a personalized dashboard where they can explore and interact with the available NASA APIs.
* **Content Exploration:** By clicking on the name of each API, users can delve into the details provided by the respective API, gaining access to informative content or captivating imagery.
* **Image Collection:** For APIs that provide imagery content, users can create and manage image collections. By clicking the "Add to Favorites" button displayed with each image, users can add images to their collections categorized by the API name.
* **Image Management:** Users have the flexibility to view, organize, and delete images within their collections. Deleting images from a collection is as simple as clicking the delete button associated with each image.
* **Image Display:** While images are displayed within the application, they may not retain their actual ratios. Users can view images in their original aspect ratios by searching for the image ID on the collection page or simply clicking on the image.

## APIs Used
### GALACTIC Explorer harnesses the following NASA APIs:

* **Astronomy Picture of the Day (APOD) API:** Provides daily astronomy images and data.
* **Mars Rover Photos API:** Offers images captured by NASA's Mars rovers.
* **EPIC (Earth Polychromatic Imaging Camera) API:** Provides imagery collected by DSCOVR's EPIC instrument. 
* **NASA Image and Video Library (IVL) API:** Accesses the NASA Image and Video Library site at images.nasa.gov.

* **SSD/CNEOS (Solar System Dynamics and Center for Near-Earth Object Studies) API:** Provides data related to solar system dynamics and near-Earth objects.

## Setup
### Installation

#### 1. Clone the repository:
```
git clone https://github.com/sliitcsse/se3040-assignment02-IT21814242.git
```

#### 2. Navigate to the project directory:
```
cd galactic-explorer
cd API
```
#### 3. Install dependencies:
```
npm install
```
### Building and Running
#### 4. To build the project, run:
```
npm run build
```
This command will create a production-ready build of the React application.

#### 5. To start the development server, use:
```
npm start
```
This will launch the application in your default web browser at http://localhost:3000.
#### 6. To run the test cases, use:
```
npm test
```

# Hosted Application
The GALACTIC Explorer application is hosted at https://galactic-explorer-frontend.onrender.com
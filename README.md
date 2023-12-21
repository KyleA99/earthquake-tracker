# Earthquake Tracker

## Project Overview

This web application fetches live earthquake data from the USGS API, stores it in a MongoDB database, and presents it to users through a dynamic and interactive frontend.

### Components

#### Frontend (JavaScript/HTML/CSS):

- Create a user-friendly interface to display a map with earthquake markers.
- Implement filters for users to customize the time range, magnitude, and location of earthquakes.
- Display additional information about each earthquake when a marker is clicked.

#### Backend (Node.js/Express or any backend framework of your choice):

- Set up routes to handle frontend requests and interact with the MongoDB database using a library like Mongoose.
- Fetch live earthquake data from the USGS API and store it in your MongoDB database at regular intervals.
- Implement endpoints for retrieving earthquake data based on user filters.

#### Database (MongoDB):

- Design a database schema to store relevant earthquake data as JSON-like documents.
- Connect the backend to MongoDB and interact with the database using a library like Mongoose.
- Set up scripts to handle database setup, create/update operations, and queries.

### Additional Features

- **Real-time Updates:**
  - Implement a mechanism to update the frontend in real-time when new earthquake data is available.
- **User Authentication:**
  - Add user accounts and authentication to allow users to save their preferences and settings.
- **Data Visualization:**
  - Use charts or graphs to visualize statistical information about earthquakes over time.
- **Notifications:**
  - Implement a notification system to alert users about significant earthquakes based on their preferences.

### Technologies to Use

#### Frontend:

- HTML, CSS, JavaScript (e.g., with a library like React or Vue)
- Mapping library (e.g., Leaflet, Mapbox)

#### Backend:

- Node.js with Express (or another backend framework of your choice)
- MongoDB with Mongoose
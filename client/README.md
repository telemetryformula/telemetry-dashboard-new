# Real-Time Vehicle Data Dashboard

## Overview

This project is a real-time dashboard application that displays vehicle data using React, Apollo Client, and GraphQL. The application supports real-time updates via GraphQL subscriptions, allowing users to monitor various vehicle metrics dynamically. Users can also customize the dashboard layout and configure how signals are displayed.

## Files and Their Purpose

### `main.jsx`

**Purpose:** Initializes the React application and sets up Apollo Client for both HTTP and WebSocket communication.

**Details:**
- **Apollo Client Configuration:** Connects to the GraphQL server via HTTP and WebSocket.
- **GraphQL Link:** Uses `split` to route subscription operations to WebSocket and other operations to HTTP.
- **Rendering:** Mounts the `App` component to the root DOM element.

### `App.jsx`

**Purpose:** Main component that displays the dashboard with real-time vehicle data, customizable layout, and signal configuration.

**Details:**
- **GraphQL Subscription:** Uses `useSubscription` to fetch and update vehicle data.
- **Dynamic Layout:** Implements a grid layout that can be adjusted by the user.
- **Edit Mode:** Provides functionality to switch between edit modes for position and signal configurations.
- **Modals:** Contains an `EditModal` for updating signal configurations.

### `EditModal/EditModal.jsx`

**Purpose:** Provides a modal form for editing signal configurations.

**Details:**
- **Form Fields:** Allows editing various properties of signal configurations.
- **Handlers:** Functions for handling form changes and submissions.
- **Conditional Rendering:** Displays the modal based on its `isOpen` prop.

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Application:**

   Ensure that the backend server is running and accessible at `http://localhost:4000/graphql`. Then, start the React application:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

- **Real-Time Data:** The dashboard displays real-time vehicle data using GraphQL subscriptions.
- **Edit Modes:** Toggle between position edit mode and signal edit mode using the provided buttons.
- **Customization:** Drag and drop components within the grid layout and configure signal properties through the modal.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
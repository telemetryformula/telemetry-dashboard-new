# Real-Time Vehicle Data Dashboard

## Overview

This project is a real-time vehicle data monitoring system that consists of a GraphQL server and a React-based dashboard. The server provides real-time updates via GraphQL subscriptions, using Redis for pub/sub functionality. The client application displays these updates in a customizable dashboard, allowing users to monitor and interact with various vehicle metrics.

## Server

### Overview

The server implements a GraphQL API using Apollo Server with WebSocket support for real-time subscriptions. It interacts with Redis for pub/sub messaging, allowing real-time data updates.

### Files

- **`schema.js`**: Defines the GraphQL schema, including types for CAN messages and a subscription for real-time updates.
- **`resolvers.js`**: Provides resolver functions for the GraphQL schema, handling subscriptions using Redis pub/sub.
- **`pubsub.js`**: Configures Redis pub/sub functionality for GraphQL subscriptions using `graphql-redis-subscriptions`.
- **`index.js`**: Sets up and starts the Apollo Server with HTTP and WebSocket support.
- **`utils/redis.js`**: Contains utility functions for interacting with Redis.
- **`utils/generation.js`**: Generates random data for testing and simulation purposes.

### Setup and Installation

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start the Server:**

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:4000/graphql`.

## Client

### Overview

The client is a React application that uses Apollo Client to connect to the GraphQL server. It displays vehicle data in a real-time dashboard with customizable layout and signal configurations.

### Files

- **`main.jsx`**: Initializes the React application and sets up Apollo Client for HTTP and WebSocket communication.
- **`App.jsx`**: Main component displaying the dashboard with real-time data, customizable layout, and signal configurations.
- **`EditModal/EditModal.jsx`**: Provides a modal form for editing signal configurations.

### Setup and Installation

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

   Ensure the backend server is running and accessible at `http://localhost:4000/graphql`, then start the React application:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

### Usage

- **Real-Time Data:** The dashboard displays real-time vehicle data using GraphQL subscriptions.
- **Edit Modes:** Toggle between position and signal edit modes.
- **Customization:** Adjust the grid layout and configure signal properties through the modal.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or issues, please open an issue on the GitHub repository or contact the project maintainers.
# Project README

## Overview

This project implements a GraphQL server using Apollo Server with WebSocket support for real-time subscriptions. The server is integrated with Redis for pub/sub functionality, allowing real-time updates for CAN message data. Additionally, there are utility functions to generate random data and interact with Redis.

## Files

### `schema.js`

**Purpose:** Defines the GraphQL schema for the project.

**Details:**
- **`typeDefs`**: Specifies the structure of the GraphQL schema, including a type for CAN messages and a subscription type to listen for real-time CAN message updates.
- **`CAN_message`**: A type that includes various fields related to vehicle metrics, such as temperatures, pressures, and speeds.
- **`Subscription`**: Allows clients to subscribe to real-time updates for CAN messages.
- **`Query`**: Includes a test query for basic validation.

```javascript
const typeDefs = `#graphql
  // GraphQL schema definition
`;

export default typeDefs;
```

### `resolvers.js`

**Purpose:** Provides the resolver functions for the GraphQL schema.

**Details:**
- **Subscription Resolvers**: Handles the subscription to CAN message updates using Redis pub/sub.
- **`can.subscribe`**: Sets up the subscription to listen for messages on the "can" channel from Redis.

```javascript
import pubsub from "./pubsub.js";

const COMPONENTS = {
  CAN: "can"
};

const resolvers = {
  Subscription: {
    can: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.CAN)
    }
  },
};

export default resolvers;
```

### `pubsub.js`

**Purpose:** Configures Redis pub/sub functionality for GraphQL subscriptions.

**Details:**
- **`RedisPubSub`**: Utilizes `graphql-redis-subscriptions` to handle pub/sub messaging.
- **`deserialize`**: Converts Redis messages to the appropriate format.

```javascript
import { RedisPubSub } from "graphql-redis-subscriptions";

const deserialize = (sourceOrBuffer, { channel, pattern }) => {
    return {"can": JSON.parse(sourceOrBuffer)};
};

const pubsub = new RedisPubSub({ deserializer: deserialize });

export default pubsub;
```

### `index.js`

**Purpose:** Sets up and starts the Apollo Server with both HTTP and WebSocket support.

**Details:**
- **Apollo Server**: Handles GraphQL queries and subscriptions.
- **WebSocket Server**: Provides real-time GraphQL subscriptions.
- **Express App**: Manages HTTP requests and integrates with Apollo Server.

### `utils/redis.js`

**Purpose:** Provides utility functions for interacting with Redis.

**Details:**
- **`get`**: Retrieves and parses data from Redis.
- **`set`**: Stores JSON data in Redis.

### `utils/generation.js`

**Purpose:** Generates random data for testing and simulation purposes.

**Details:**
- **`cpuData`**: Produces random CPU usage percentages.
- **`timestamps`**: Creates a list of timestamps with random values for simulation.
- **`trafficData`**: Generates simulated traffic data.
- **`regionData`**: Provides random percentages for different regions.
- **`messageData`**: Creates a list of random messages for notifications.

```javascript
const moment = require("moment");

const cpuData = () => {
  const min = 20;
  const max = 90;
  const percentage = parseInt(Math.random() * (max - min) + min, 10);
  return { percentage };
};

// More data generation functions...

module.exports = { cpuData, regionData, messageData, trafficData };
```

## Setup and Installation

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start the Server:**

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:4000/graphql`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
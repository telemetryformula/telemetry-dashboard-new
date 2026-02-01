import pubsub from "./pubsub.js";

const COMPONENTS = {
  CAN: "can"
};

const resolvers = {
  Subscription: {
    can: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.CAN),
      // Log payloads received from Redis pubsub to aid debugging.
      // Return the inner `can` object if present, otherwise return the payload.
      resolve: (payload) => {
        try {
          console.log('[Subscription.can] incoming payload:', JSON.stringify(payload));
        } catch (e) {
          console.log('[Subscription.can] incoming payload (non-serializable)');
        }
        return payload && payload.can ? payload.can : payload;
      }
    }
  },
};

export default resolvers
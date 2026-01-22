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

export default resolvers
import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { CAN_SUBSCRIPTION } from "./graphql/subscriptions";
import SignalViewer from "./components/SignalViewer.jsx";
import signalConfig from "./config/signalConfig.json";

const App = () => {
  const [canData, setCanData] = useState({});

  useSubscription(CAN_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const data = subscriptionData.data?.can;
      if (data) {
        setCanData((prev) => ({ ...prev, ...data }));
      }
    },
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
        padding: "10px",
      }}
    >
      {Object.keys(signalConfig).map((name) => (
        <SignalViewer
          key={name}
          name={name}
          value={canData[name]}
          config={signalConfig[name]}
        />
      ))}
    </div>
  );
};

export default App;

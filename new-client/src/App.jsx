import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { CAN_SUBSCRIPTION } from "./graphql/subscriptions";
import SignalViewer from "./components/SignalViewer.jsx";
import signalConfig from "./config/signalConfig.json";
import layoutConfig from "./config/layoutConfig.json";


// Extract all unique categories from signalConfig
const extractCategories = (config) => {
  const allCategories = new Set(["all"]);
  Object.values(config).forEach((cfg) => {
    if (cfg.categories && Array.isArray(cfg.categories)) {
      cfg.categories.forEach((cat) => allCategories.add(cat));
    }
  });
  return Array.from(allCategories);
};

const App = () => {
  const [canData, setCanData] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = extractCategories(signalConfig);

  useSubscription(CAN_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const data = subscriptionData.data?.can;
      if (data) {
        setCanData((prevState) => {
          const updated = { ...prevState };
          Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              updated[key] = value;
            }
          });
          return updated;
        });        
      }
    },
  });

  const filteredSignals = Object.entries(signalConfig).filter(([_, cfg]) =>
    activeCategory === "all" || (cfg.categories?.includes(activeCategory))
  );

  return (
    <div style={{ padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh", 
                  alignItems: "stretch"}}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              backgroundColor: activeCategory === cat ? "#007bff" : "#eee",
              color: activeCategory === cat ? "white" : "black",
              border: "none",
              cursor: "pointer"
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Signal Grid */}
      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "10px"
        }}
      >
        {filteredSignals.map(([name, cfg]) => (
          <SignalViewer
            key={name}
            name={name}
            value={canData[name]}
            config={cfg}
          />
        ))}
      </div> */}
      {
  layoutConfig[activeCategory] ? (
    // Render using layout config
    layoutConfig[activeCategory].map((group, idx) => (
      <div key={idx} style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ddd" }}>
          {group.title}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "10px",
          }}
        >
          {group.signals.map((signalName) => {
            const cfg = signalConfig[signalName];
            if (!cfg) return null;
            return (
              <SignalViewer
                key={signalName}
                name={signalName}
                value={canData[signalName]}
                config={cfg}
              />
            );
          })}
        </div>
      </div>
    ))
  ) : (
    // Fallback: flat grid of all signals in this category
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "10px",
      }}
    >
      {Object.entries(signalConfig)
        .filter(([_, cfg]) =>
          activeCategory === "all" || cfg.categories?.includes(activeCategory)
        )
        .map(([name, cfg]) => (
          <SignalViewer
            key={name}
            name={name}
            value={canData[name]}
            config={cfg}
          />
        ))}
    </div>
  )
}

    </div>
  );
};

export default App;

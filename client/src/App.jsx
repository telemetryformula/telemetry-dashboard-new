import React, { useState } from "react";
import { gql, useSubscription } from "@apollo/client";

import GaugeComponent from "react-gauge-component";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import "chartjs-adapter-date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

import EditModal from "./EditModal/EditModal";
import defaultSignalConfig from "./assets/default_signal_config.json";

import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/* ------------------ CONSTANTS ------------------ */

const MAX_SAMPLE_LENGTH = 1000;

const GET_LATEST_MESSAGE = gql`
  subscription Can {
    can {
      Steered_Angle
      Lap_GainLoss_Running
      Lap_GainLoss_Final
      Log_Time_Remaining
      FL_Rotor_Temp_2
      FR_Rotor_Temp_2
      RL_Rotor_Temp_2
      RR_Rotor_Temp_2
      Exhaust_Temperature_Cylinder1
      Exhaust_Temperature_Cylinder2
      Exhaust_Temperature_Cylinder3
      Exhaust_Temperature_Cylinder4
    }
  }
`;

/* ------------------ HELPERS ------------------ */

const getTime = () => new Date().toISOString();

/* ------------------ COMPONENT ------------------ */

const AddRemoveLayout = ({
  className = "layout",
  cols = { lg: 6, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight = 100
}) => {

  /* ------------------ STATE ------------------ */

  const [canData, setCANData] = useState(
    Object.fromEntries(
      Object.keys(defaultSignalConfig).map(k => [k, null])
    )
  );

  const [signalConfigs, setSignalConfigs] = useState(
    JSON.parse(JSON.stringify(defaultSignalConfig))
  );

  const [currentSignals, setCurrentSignals] = useState([]);

  const [items] = useState(
    Object.keys(defaultSignalConfig).map((name, index) => ({
      name,
      x: (index * 2) % 12,
      y: Math.floor(index / 6),
      w: 2,
      h: 3
    }))
  );

  const [editSignalMode, setEditSignalMode] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [targetKey, setTargetKey] = useState(null);

  /* ------------------ SUBSCRIPTION ------------------ */

  useSubscription(GET_LATEST_MESSAGE, {
    onSubscriptionData: ({ subscriptionData }) => {
      const data = subscriptionData?.data?.can;
      if (!data) return;

      setCANData(prev => {
        const next = { ...prev };

        Object.entries(data).forEach(([key, value]) => {
          if (value == null) return;

          if (!next[key]) {
            next[key] = [[getTime(), value]];
          } else {
            next[key] = [[getTime(), value], ...next[key]].slice(
              0,
              MAX_SAMPLE_LENGTH
            );
          }
        });

        return next;
      });
    }
  });

  /* ------------------ SIGNAL FILTER ------------------ */

  const setSignalsByFamily = family => {
    if (family === "None") {
      setCurrentSignals([]);
      return;
    }

    const signals = Object.keys(signalConfigs).filter(
      key => signalConfigs[key].family === family
    );

    setCurrentSignals(signals);
  };

  /* ------------------ RENDER HELPERS ------------------ */

  const renderContent = el => {
    const cfg = signalConfigs[el.name];
    const data = canData[el.name];

    if (!cfg) return null;

    if (cfg.type === "Gauge") {
      const value = data ? data[0][1] * (cfg.multiplier ?? 1) : null;

      return (
        <GaugeComponent
          value={value}
          minValue={cfg.start}
          maxValue={cfg.end}
          arc={{ subArcs: [{ limit: cfg.start, color: "#FFFFFF" }] }}
        />
      );
    }

    if (cfg.type === "Chart") {
      if (!data?.length) return <span>No data</span>;

      return (
        <Line
          data={{
            datasets: [
              {
                data: data.map(([x, y]) => ({
                  x: new Date(x),
                  y
                })),
                borderColor: "red",
                tension: 0
              }
            ]
          }}
          options={{
            animation: false,
            scales: { x: { type: "time" } }
          }}
        />
      );
    }

    return <span>Unknown type</span>;
  };

  const visibleItemsRaw =
    currentSignals.length === 0
      ? items
      : items.filter(i => currentSignals.includes(i.name));

  const getReflowedItems = (baseItems) =>
  baseItems.map((item, index) => ({
    ...item,
    x: (index * 2) % 12,
    y: Math.floor(index / 6),
  }));

  const visibleItems = getReflowedItems(visibleItemsRaw);


  /* ------------------ JSX ------------------ */

  return (
    <div>
      <button onClick={() => setSignalsByFamily("Brakes")}>Brakes</button>
      <button onClick={() => setSignalsByFamily("Suspension")}>
        Suspension
      </button>
      <button onClick={() => setSignalsByFamily("None")}>Reset</button>

      <button onClick={() => setEditSignalMode(p => !p)}>
        Signal Edit: {editSignalMode ? "On" : "Off"}
      </button>

      <ResponsiveReactGridLayout
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        isResizable={false}
      >
        {visibleItems.map(el => (
          <div key={el.name} data-grid={el}>
            {editSignalMode && (
              <button onClick={() => setTargetKey(el.name)}>
                Edit
              </button>
            )}
            {renderContent(el)}
            <h5 align="center">{el.name}</h5>
          </div>
        ))}
      </ResponsiveReactGridLayout>

      <EditModal
        isOpen={isOpen}
        targetKey={targetKey}
        object={signalConfigs}
        onClose={() => setIsOpen(false)}
        onUpdate={obj =>
          setSignalConfigs(prev => ({
            ...prev,
            [obj.DBC_ID]: obj
          }))
        }
      />
    </div>
  );
};

export default AddRemoveLayout;

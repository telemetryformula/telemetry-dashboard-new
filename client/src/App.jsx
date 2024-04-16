import React, {useState} from 'react';
import {gql, useSubscription} from "@apollo/client"

import GaugeComponent from 'react-gauge-component'

const originalLayout = getFromLS("layouts") || {}

//Component with default values

const signalConfigs = [
  {
      "DBC_ID": "Engine_Speed",
      "label": " RPM",
      "start": 0,
      "end": 15000,
      "major_divisions": 1000,
      "minor_divisions": 500,
      "marks": [{"color": "red", "start": 50, "end": 500}],
      "multiplier": 60
  },
  {
      "DBC_ID": "Gear",
      "label": "",
      "start": 1,
      "end": 7,
      "major_divisions": 1,
      "minor_divisions": 0,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Battery_Volts",
      "label": " Volts",
      "start": 10,
      "end": 15,
      "major_divisions": 1,
      "minor_divisions": 0.5,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Vehicle_Speed",
      "label": "km/h",
      "start": 0,
      "end": 100,
      "major_divisions": 10,
      "minor_divisions": 2,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Coolant_Temperature",
      "label": " C",
      "start": 0,
      "end": 100,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Coolant_Inlet_Temperature",
      "label": " C",
      "start": 0,
      "end": 100,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "FL_Rotor_Temp_2",
      "label": " C",
      "start": 0,
      "end": 600,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "FR_Rotor_Temp_2",
      "label": "C",
      "start": 0,
      "end": 600,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "RL_Rotor_Temp_2",
      "label": " C",
      "start": 0,
      "end": 500,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "RR_Rotor_Temp_2",
      "label": " C",
      "start": 0,
      "end": 500,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Brake_Pressure_Front",
      "label": "  psi",
      "start": 0,
      "end": 1100,
      "major_divisions": 200,
      "minor_divisions": 100,
      "marks": [{"color": "red", "start": 0, "end": 1100}],
      "multiplier": 0.145,
  },
  {
      "DBC_ID": "Brake_Pressure_Rear",
      "label": " psi",
      "start": 0,
      "end": 1100,
      "major_divisions": 200,
      "minor_divisions": 100,
      "marks": [{"color": "red", "start": 0, "end": 1100}],
      "multiplier": 0.145,
  },
  {
      "DBC_ID": "Exhaust_Temperature_Cylinder1",
      "label": " C",
      "start": 0,
      "end": 1000,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Exhaust_Temperature_Cylinder2",
      "label": " C",
      "start": 0,
      "end": 1000,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Exhaust_Temperature_Cylinder3",
      "label": " C",
      "start": 0,
      "end": 1000,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Exhaust_Temperature_Cylinder4",
      "label": " C",
      "start": 0,
      "end": 1000,
      "major_divisions": 100,
      "minor_divisions": 50,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Throttle_Position",
      "label": " ratio",
      "start": 0,
      "end": 100,
      "major_divisions": 10,
      "minor_divisions": 5,
      "marks": [{"color": "red", "start": 50, "end": 500}],
      "multiplier": 100
  },
  {
      "DBC_ID": "Engine_Oil_Temperature",
      "label": " C",
      "start": 0,
      "end": 150,
      "major_divisions": 25,
      "minor_divisions": 10,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  },
  {
      "DBC_ID": "Engine_Oil_Pressure",
      "label": " psi",
      "start": 0,
      "end": 200,
      "major_divisions": 50,
      "minor_divisions": 25,
      "marks": [{"color": "red", "start": 50, "end": 500}],
      "multiplier": 0.145
  }
]

const GET_LATEST_MESSAGE = gql`
  subscription Can {
    can {
      FL_Rotor_Temp_2
      FR_Rotor_Temp_2
      RL_Rotor_Temp_2
      RR_Rotor_Temp_2
      Exhaust_Temperature_Cylinder1
      Exhaust_Temperature_Cylinder2
      Exhaust_Temperature_Cylinder3
      Exhaust_Temperature_Cylinder4
      Brake_Pressure_Front
      Brake_Pressure_Rear
      Throttle_Position
      Gear_Shift_State
      Steered_Angle
      Lap_GainLoss_Running
      Lap_GainLoss_Final
      Log_Time_Remaining
      Reference_Lap_Time
      Running_Lap_Time
      Lap_Time
      Lap_Number
      Engine_Speed
      Gear
      Battery_Volts
      Vehicle_Speed
      Coolant_Temperature
      Coolant_Inlet_Temperature
      Engine_Oil_Temperature
      Engine_Oil_Pressure
    }
  }`


import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const AddRemoveLayout = ({ className = "layout", cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }, rowHeight = 100 }) => {

  const [canData, setCANData] = useState({CAN_Values: {
    "FL_Rotor_Temp_2": null,
    "FR_Rotor_Temp_2": null,
    "RL_Rotor_Temp_2": null,
    "RR_Rotor_Temp_2": null,
    "Exhaust_Temperature_Cylinder1": null,
    "Exhaust_Temperature_Cylinder2": null,
    "Exhaust_Temperature_Cylinder3": null,
    "Exhaust_Temperature_Cylinder4": null,
    "Brake_Pressure_Front": null,
    "Brake_Pressure_Rear": null,
    "Throttle_Position": null,
    "Gear_Shift_State": null,
    "Steered_Angle": null,
    "Lap_GainLoss_Running": null,
    "Lap_GainLoss_Final": null,
    "Log_Time_Remaining": null,
    "Reference_Lap_Time": null,
    "Running_Lap_Time": null,
    "Lap_Time": null,
    "Lap_Number": null,
    "Engine_Speed": null,
    "Gear": null,
    "Battery_Volts": null,
    "Vehicle_Speed": null,
    "Coolant_Temperature": null,
    "Coolant_Inlet_Temperature": null,
    "Engine_Oil_Temperature": null,
    "Engine_Oil_Pressure": null,
  }})

  const [items, setItems] = useState(
    Object.keys(canData.CAN_Values).map(function (dataSource, index, canDataArray) {
      
      return {
        name: dataSource,
        x: (index * 2) %12,
        y: (index/6) * index,
        w: 2,
        h: 2,
        add: index === (canDataArray.length - 1)
      };
    })
  );

  const [layouts, setLayouts] = useState(JSON.parse(JSON.stringify(originalLayout)))

  const [newCounter, setNewCounter] = useState(0);
  const [breakpoint, setBreakpoint] = useState(null);

  const createElement = (el) => {
    const signalConfig = signalConfigs.find(obj => obj.DBC_ID == el.name) || {
      "label": " C",
      "start": 0,
      "end": 100,
      "major_divisions": 25,
      "minor_divisions": 10,
      "marks": [{"color": "red", "start": 50, "end": 500}],
  };
    return (
      <div key={el.name} data-grid={el}>
        <GaugeComponent 
        value={canData.CAN_Values[el.name]* (signalConfig.multiplier ?? 1)}
        arc={{subArcs:[{limit:signalConfig.start, color: "#FFFFFF"}]}}
        minValue={signalConfig.start}
        maxValue={signalConfig.end}
        marginInPercent={{top: 0.12, bottom: -0.03, left: 0.07, right: 0.07}}
        labels={{
          "formatTextValue": "test",
          "matchColorWithArc": false,
          "maxDecimalDigits": 2,
          "hide": false,
          valueLabel: {
            formatTextValue: (value) => {return `${value}${signalConfig.label}`}
          },
          tickLabels: {
            ticks: Array.from({ length: (signalConfig.end - signalConfig.start)/signalConfig.major_divisions }, (_, index) => index * signalConfig.major_divisions + signalConfig.start).map(value => ({ value}))
        }
        }} />
        <h5 className="mb-1" align="center">{el.name}</h5>
      </div>
    );
  }

  const onAddItem = () => {
    console.log("adding", "n" + newCounter);
    setItems(prevItems => {
      return [
        ...prevItems,
        {
          i: "n" + newCounter,
          x: (prevItems.length * 2) % (cols || 12),
          y: Infinity, // puts it at the bottom
          w: 2,
          h: 2
        }
      ];
    });
    setNewCounter(prevCounter => prevCounter + 1);
  }

  const onBreakpointChange = (newBreakpoint, newCols) => {
    setBreakpoint(newBreakpoint);
  }

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts)
  }

  useSubscription(GET_LATEST_MESSAGE, {
    onSubscriptionData: (subscriptionData) =>{
        if (subscriptionData?.subscriptionData?.data?.can) {
          const canData = subscriptionData?.subscriptionData?.data?.can
          setCANData(prevState => {
            const newCANState = {...prevState.CAN_Values}
            Object.entries(canData).forEach(([key, value]) => {
              if (value !== null) {
                  newCANState[key] = value;
              }
            });
            return {CAN_Values: newCANState}
          })
        }
    }
  })

  return (
    <div>
      <ResponsiveReactGridLayout
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        onBreakpointChange={onBreakpointChange}
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        layouts={originalLayout}
      >
        {items.map(el => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

function getFromLS(key) {
  let ls = {};
  if (localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      console.log(e)
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (localStorage) {
    localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default AddRemoveLayout;
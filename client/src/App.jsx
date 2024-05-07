import React, {useState} from 'react';
import {gql, useSubscription} from "@apollo/client"

import GaugeComponent from 'react-gauge-component'

import EditModal from './EditModal/EditModal'

import defaultSignalConfig from './assets/default_signal_config.json'

const originalLayout = getFromLS("layouts") || {}

const originalSignalConfig = getFromLS("signal_configs") || defaultSignalConfig

const originalEditSignalMode = getFromLS("edit_signal_mode") || false

const originalEditPositionMode = getFromLS("edit_position_mode") || false

//Component with default values

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
import _, { remove } from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const AddRemoveLayout = ({ className = "layout", cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }, rowHeight = 100 }) => {

  const [canData, setCANData] = useState({
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
  })

  const [signalConfigs, setSignalConfigs] = useState(JSON.parse(JSON.stringify(originalSignalConfig)))

  const [items, setItems] = useState(
    Object.keys(canData).map(function (dataSource, index, canDataArray) {
      
      return {
        name: dataSource,
        x: (index * 2) %12,
        y: (index/6) * index,
        w: 2,
        h: 3,
        add: index === (canDataArray.length - 1)
      };
    })
  );

  const [isOpen, setIsOpen] = useState(false);
  const [targetKey, setTargetKey] = useState(null);

  const [currentLayouts, setLayouts] = useState(JSON.parse(JSON.stringify(originalLayout)))

  const [editPositionMode, setEditPositionMode] = useState(JSON.parse(JSON.stringify(originalEditPositionMode)))
  const [editSignalMode, setEditSignalMode] = useState(JSON.parse(JSON.stringify(originalEditSignalMode)))

  const handleOpenModal = (key) => {
    setTargetKey(key);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpdateObject = (updatedObject) => {
    const DBC_ID = updatedObject.DBC_ID
    setSignalConfigs(prevState => {
      const newSignalConfigs = {...prevState}
      newSignalConfigs[DBC_ID] = updatedObject
      saveToLS("signal_configs", newSignalConfigs)
      return newSignalConfigs
    })
    setIsOpen(false);
  };

  const createElement = (el) => {
    return (
      <div key={el.name} {...setDataGrid(el)}>
        {editSignalMode && <button onClick={() => handleOpenModal(el.name)}>Edit</button>}
        <GaugeComponent 
        value={canData[el.name]* (signalConfigs[el.name].multiplier ?? 1)}
        arc={{subArcs:[{limit:signalConfigs[el.name].start, color: "#FFFFFF"}]}}
        minValue={signalConfigs[el.name].start}
        maxValue={signalConfigs[el.name].end}
        marginInPercent={{top: 0.12, bottom: -0.03, left: 0.07, right: 0.07}}
        labels={{
          "formatTextValue": "test",
          "matchColorWithArc": false,
          "maxDecimalDigits": 2,
          "hide": false,
          valueLabel: {
            formatTextValue: function(value) {return `${value}${signalConfigs[el.name].label}`}
          },
          tickLabels: {
            ticks: Array.from({ length: (signalConfigs[el.name].end - signalConfigs[el.name].start)/signalConfigs[el.name].major_divisions }, (_, index) => index * signalConfigs[el.name].major_divisions + signalConfigs[el.name].start).map(value => ({ value}))
        }
        }} />
        <h5 className="mb-1" align="center">{el.name}</h5>
      </div>
    );
  }

  const setDataGrid = (el) => {
    if (getFromLS("layouts")) {
      console.log(getFromLS("layouts"))
      return {};
    }
    return {
      'data-grid': 
        el
      ,
    };
  }

  const generateItems = (items) => {
    return items.map(el => createElement(el))
  }

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts)
    setLayouts(layouts)
  }

  const resetDefaultLayouts = () => {
    removeFromLS("layouts")
    window.location.reload()
  }

  const resetDefaultSignalConfigs = () => {
    removeFromLS("signal_configs")
    setSignalConfigs(defaultSignalConfig)
  }

  const onSetEditPositionMode = () => {
    editPositionMode ? null : setEditSignalMode(false)
    saveToLS("edit_position_mode", !editPositionMode)
    setEditPositionMode(!editPositionMode)
  }

  const onSetEditSignalMode = () => {
    editSignalMode ? null : setEditPositionMode(false)
    saveToLS("edit_signal_mode", !editSignalMode)
    setEditSignalMode(!editSignalMode)
  }

  useSubscription(GET_LATEST_MESSAGE, {
    onSubscriptionData: (subscriptionData) =>{
        if (subscriptionData?.subscriptionData?.data?.can) {
          const canData = subscriptionData?.subscriptionData?.data?.can
          setCANData(prevState => {
            const newCANState = {...prevState}
            Object.entries(canData).forEach(([key, value]) => {
              if (value !== null) {
                  newCANState[key] = value;
              }
            });
            return newCANState
          })
        }
    }
  })

  return (
    <div>
      <button onClick={onSetEditPositionMode}>Position Edit Mode: {editPositionMode ? "Enabled" : "Disabled"}</button>
      <button onClick={onSetEditSignalMode}>Signal Edit Mode: {editSignalMode ? "Enabled" : "Disabled"}</button>
      <EditModal
        isOpen={isOpen}
        targetKey={targetKey}
        onClose={handleCloseModal}
        object={signalConfigs}
        onUpdate={handleUpdateObject}
      />
      <ResponsiveReactGridLayout
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        layouts={currentLayouts}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        isResizable={editPositionMode}
        isDraggable={editPositionMode}
      >
        {generateItems(items)}
      </ResponsiveReactGridLayout>
      <button onClick={resetDefaultLayouts}>RESET ALL POSITIONS TO DEFAULT</button>
      <button onClick={resetDefaultSignalConfigs}>RESET ALL SIGNALS TO DEFAULT</button>
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
    const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {}
    currentValue[key] = value
    localStorage.setItem(
      "rgl-8",
      JSON.stringify(currentValue)
    );
  }
}

function removeFromLS(key) {
  if (localStorage) {
    const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {}
    delete currentValue[key]
    localStorage.setItem(
      "rgl-8",
      JSON.stringify(currentValue)
    );
  }
}

export default AddRemoveLayout;
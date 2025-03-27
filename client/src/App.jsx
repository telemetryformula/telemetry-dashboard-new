// // // // import React, {useState} from 'react';
// // // // import {gql, useSubscription} from "@apollo/client"

// // // // import GaugeComponent from 'react-gauge-component'
// // // // import NumericDisplay from './components/NumericDisplay'
// // // // import BitfieldDisplay from './components/BitfieldDisplay'

// // // // import EditModal from './EditModal/EditModal'

// // // // import defaultSignalConfig from './assets/default_signal_config.json'

// // // // const originalLayout = getFromLS("layouts") || {}

// // // // const originalSignalConfig = getFromLS("signal_configs") || defaultSignalConfig

// // // // const originalEditSignalMode = getFromLS("edit_signal_mode") || false

// // // // const originalEditPositionMode = getFromLS("edit_position_mode") || false

// // // // //Component with default values

// // // // const GET_LATEST_MESSAGE = gql`
// // // //   subscription Can {
// // // //     can {
// // // //       FL_Rotor_Temp_2
// // // //       FR_Rotor_Temp_2
// // // //       RL_Rotor_Temp_2
// // // //       RR_Rotor_Temp_2
// // // //       Exhaust_Temperature_Cylinder1
// // // //       Exhaust_Temperature_Cylinder2
// // // //       Exhaust_Temperature_Cylinder3
// // // //       Exhaust_Temperature_Cylinder4
// // // //       Brake_Pressure_Front
// // // //       Brake_Pressure_Rear
// // // //       Throttle_Position
// // // //       Gear_Shift_State
// // // //       Steered_Angle
// // // //       Lap_GainLoss_Running
// // // //       Lap_GainLoss_Final
// // // //       Log_Time_Remaining
// // // //       Reference_Lap_Time
// // // //       Running_Lap_Time
// // // //       Lap_Time
// // // //       Lap_Number
// // // //       Engine_Speed
// // // //       Gear
// // // //       Battery_Volts
// // // //       Vehicle_Speed
// // // //       Coolant_Temperature
// // // //       Coolant_Inlet_Temperature
// // // //       Engine_Oil_Temperature
// // // //       Engine_Oil_Pressure
// // // //       Motor_Status
// // // //     }
// // // //   }`


// // // // import { WidthProvider, Responsive } from "react-grid-layout";
// // // // import _, { remove } from "lodash";

// // // // const ResponsiveReactGridLayout = WidthProvider(Responsive);



// // // // const AddRemoveLayout = ({ className = "layout", cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }, rowHeight = 80 }) => {

// // // //   const [canData, setCANData] = useState({
// // // //     "Front_Brake_Pressure": null,
// // // //     "Rear_Break_Pressure": null,
// // // //     "Throttle_Pos_Primary": null,
// // // //     "Throttle_Pos_Secondary": null,
// // // //     "FR_Wheel_Speed": null,
// // // //     "FL_Wheel_Speed": null,
// // // //     "RR_Wheel_Speed": null,
// // // //     "RL_Wheel_Speed": null,
// // // //     "Steering_Pot_Primary": null,
// // // //     "Steering_Pot_Secondary": null,
// // // //     "Motor_One_Cooling_Loop_Temp_Out": null,
// // // //     "Motor_One_Cooling_Loop_Temp_In": null,
// // // //     "Motor_Two_Cooling_Loop_Temp_Out": null,
// // // //     "Motor_Two_Cooling_Loop_Temp_In": null,
// // // //     "Inverter_Cooling_Loop_Temp_Out": null,
// // // //     "Inverter_Cooling_Loop_Temp_In": null,
// // // //     "Front_IMU_Lateral_Accel": null,
// // // //     "Front_IMU_Long_Accel": null,
// // // //     "Front_IMU_Vert_Accel": null,
// // // //     "Front_IMU_Yaw_Rotate": null,
// // // //     "Front_IMU_Pitch_Rotate": null,
// // // //     "Front_IMU_Roll_Rotate": null,
// // // //     "Inv_One_Status_Word": null,
// // // //     "Inv_One_Actual_Speed": null,
// // // //     "Inv_One_Actual_Torque_Current": null,
// // // //     "Inv_One_Actual_Magnetizing_Current": null,
// // // //     "Inv_Two_Status_Word": null,
// // // //     "Inv_Two_Actual_Speed_Value": null,
// // // //     "Inv_Two_Torque_Current": null,
// // // //     "Inv_Two_Actual_Magnetizing_Current": null,
// // // //     "Pack_Current": null,
// // // //     "Pack_Inst_Voltage": null,
// // // //     "Pack_SOC": null,
// // // //     "Relay_State": null,
// // // //     "Pack_DCL": null,
// // // //     "Pack_CCL": null,
// // // //     "Lowest_Temp": null,
// // // //     "Highest_Temp": null,
// // // //     "Low_Cell_ID": null,
// // // //     "High_Cell_ID": null,
// // // //     "Low_Termistor_ID": null,
// // // //     "High_Thermistor_ID": null,
// // // //     "Internal_Temp": null,
// // // //     "Average_Temp": null,
// // // //     "Pack_Health": null,
// // // //     "DTC_Flags_One": null,
// // // //     "DTC_Flags_Two": null,
// // // //     "Current_Limit_Status": null,
// // // //     "Ready_To_Drive_Input": null,
// // // //     "Ready_To_Drive_Arm_Inverters": null,
// // // //     "Traction_Control_Setting": null,
// // // //     "Torque_Vectoring_Low_Setting": null,
// // // //     "Torque_Vectoring_High_Setting": null,
// // // //     "Low_Cell_Voltage": null,
// // // //     "High_Cell_Voltage": null,
// // // //   });

// // // //   const [signalConfigs, setSignalConfigs] = useState(JSON.parse(JSON.stringify(originalSignalConfig)))

// // // //   const [items, setItems] = useState(
// // // //     Object.keys(originalSignalConfig).map((dataSource, index) => {
// // // //         return {
// // // //             name: dataSource,
// // // //             x: (index % 6) * 4, // Ensures horizontal tiling
// // // //             y: Math.floor(index / 6) * 2, // Ensures proper row tiling
// // // //             w: 4, 
// // // //             h: 4,
// // // //             add: index === Object.keys(originalSignalConfig).length - 1
// // // //         };
// // // //     })
// // // //   );

// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [targetKey, setTargetKey] = useState(null);

// // // //   // const [currentLayouts, setLayouts] = useState(JSON.parse(JSON.stringify(originalLayout)))
// // // //   const [currentLayouts, setLayouts] = useState(() => {
// // // //     const storedLayout = getFromLS("layouts");
// // // //     return storedLayout || {};
// // // //   });


// // // //   const [editPositionMode, setEditPositionMode] = useState(JSON.parse(JSON.stringify(originalEditPositionMode)))
// // // //   const [editSignalMode, setEditSignalMode] = useState(JSON.parse(JSON.stringify(originalEditSignalMode)))

// // // //   const handleOpenModal = (key) => {
// // // //     setTargetKey(key);
// // // //     setIsOpen(true);
// // // //   };

// // // //   const handleCloseModal = () => {
// // // //     setIsOpen(false);
// // // //   };

// // // //   const handleUpdateObject = (updatedObject) => {
// // // //     const DBC_ID = updatedObject.DBC_ID
// // // //     setSignalConfigs(prevState => {
// // // //       const newSignalConfigs = {...prevState}
// // // //       newSignalConfigs[DBC_ID] = updatedObject
// // // //       saveToLS("signal_configs", newSignalConfigs)
// // // //       return newSignalConfigs
// // // //     })
// // // //     setIsOpen(false);
// // // //   };
// // // //   const createElement = (el) => {
// // // //     const config = signalConfigs[el.name];
// // // //     const value = canData[el.name] * (config?.multiplier ?? 1);
// // // //     const type = config?.type || "gauge";

// // // //     // Set reasonable default sizes
// // // //     const dynamicSize = {
// // // //         w: 4,
// // // //         h: type === "gauge" ? 4 : type === "bitfield" ? 8 : 2 
// // // //     };

// // // //     let content;

// // // //     if (type === "numeric") {
// // // //         content = <NumericDisplay value={value} label={config?.label} />;
// // // //     } else if (type === "bitfield") {
// // // //         content = <BitfieldDisplay value={value} bitLabels={config.bit_labels} />;
// // // //     } else {
// // // //         content = (
// // // //             <GaugeComponent 
// // // //                 value={value}
// // // //                 //size={Math.min(window.innerWidth / 14, 150)} // Set upper limit for gauges
// // // //                 size={150}
// // // //                 arc={{ subArcs: [{ limit: config.start, color: "#FFFFFF" }] }}
// // // //                 minValue={config.start}
// // // //                 maxValue={config.end}
// // // //                 marginInPercent={{ top: 0.12, bottom: -0.03, left: 0.07, right: 0.07 }}
// // // //                 labels={{
// // // //                     formatTextValue: "test",
// // // //                     matchColorWithArc: false,
// // // //                     maxDecimalDigits: 2,
// // // //                     hide: false,
// // // //                     valueLabel: { formatTextValue: (val) => `${val}${config.label}` },
// // // //                     tickLabels: {
// // // //                         ticks: Array.from(
// // // //                             { length: (config.end - config.start) / config.major_divisions },
// // // //                             (_, index) => ({ value: index * config.major_divisions + config.start })
// // // //                         )
// // // //                     }
// // // //                 }}
// // // //             />
// // // //         );
// // // //     }
// // // //     // return (
// // // //     //   <div
// // // //     //     key={el.name}
// // // //     //     {...setDataGrid({ i: el.name, ...dynamicSize, x: el.x, y: el.y })}
// // // //     //     style={{
// // // //     //       display: "flex",
// // // //     //       flexDirection: "column",
// // // //     //       alignItems: "center",
// // // //     //       justifyContent: "center",
// // // //     //       overflow: "hidden",
// // // //     //       width: "100%",       // Prevent grid item from stretching child
// // // //     //       height: "100%",
// // // //     //     }}
// // // //     //   >
// // // //     //     {editSignalMode && (
// // // //     //       <button onClick={() => handleOpenModal(el.name)}>Edit</button>
// // // //     //     )}
// // // //     //     <div
// // // //     //       style={{
// // // //     //         width: "150px",   // Match gauge size
// // // //     //         height: "150px",
// // // //     //         display: "flex",
// // // //     //         alignItems: "center",
// // // //     //         justifyContent: "center",
// // // //     //       }}
// // // //     //     >
// // // //     //       {content}
// // // //     //     </div>
// // // //     //     <h5 className="mb-1" style={{ textAlign: "center" }}>{el.name}</h5>
// // // //     //   </div>
// // // //     // );

// // // //     return (
// // // //         <div 
// // // //           key={el.name} 
// // // //           {...setDataGrid({ i: el.name, ...dynamicSize, x: el.x, y: el.y })}
// // // //         >
// // // //             {editSignalMode && <button onClick={() => handleOpenModal(el.name)}>Edit</button>}
// // // //             {content}
// // // //             <h5 className="mb-1" align="center">{el.name}</h5>
// // // //         </div>
// // // //     );
// // // //   };

// // // //   const setDataGrid = (el) => {
// // // //     if (getFromLS("layouts")) {
// // // //       console.log(getFromLS("layouts"))
// // // //       return {};
// // // //     }
// // // //     return {
// // // //       'data-grid': 
// // // //         el
// // // //       ,
// // // //     };
// // // //   }


// // // //   const generateItems = (items) => {
// // // //     return items.map(el => createElement(el))
// // // //   }

// // // //   const onLayoutChange = (layout, layouts) => {
// // // //     if (JSON.stringify(layouts) !== JSON.stringify(currentLayouts)) { 
// // // //       console.log("Updating layout...");
// // // //       saveToLS("layouts", layouts);  
// // // //       setLayouts(layouts);  
// // // //     }
// // // //   }

// // // //   const resetDefaultLayouts = () => {
// // // //     removeFromLS("layouts")
// // // //     window.location.reload()
// // // //   }

// // // //   const resetDefaultSignalConfigs = () => {
// // // //     removeFromLS("signal_configs")
// // // //     setSignalConfigs(defaultSignalConfig)
// // // //   }

// // // //   const onSetEditPositionMode = () => {
// // // //     editPositionMode ? null : setEditSignalMode(false)
// // // //     saveToLS("edit_position_mode", !editPositionMode)
// // // //     setEditPositionMode(!editPositionMode)
// // // //   }

// // // //   const onSetEditSignalMode = () => {
// // // //     editSignalMode ? null : setEditPositionMode(false)
// // // //     saveToLS("edit_signal_mode", !editSignalMode)
// // // //     setEditSignalMode(!editSignalMode)
// // // //   }

// // // //   useSubscription(GET_LATEST_MESSAGE, {
// // // //     onSubscriptionData: (subscriptionData) =>{
// // // //         if (subscriptionData?.subscriptionData?.data?.can) {
// // // //           const canData = subscriptionData?.subscriptionData?.data?.can
// // // //           setCANData(prevState => {
// // // //             const newCANState = {...prevState}
// // // //             Object.entries(canData).forEach(([key, value]) => {
// // // //               if (value !== null) {
// // // //                   newCANState[key] = value;
// // // //               }
// // // //             });
// // // //             return newCANState
// // // //           })
// // // //         }
// // // //     }
// // // //   })

// // // //   return (
// // // //     <div>
// // // //       <button onClick={onSetEditPositionMode}>Position Edit Mode: {editPositionMode ? "Enabled" : "Disabled"}</button>
// // // //       <button onClick={onSetEditSignalMode}>Signal Edit Mode: {editSignalMode ? "Enabled" : "Disabled"}</button>
// // // //       <EditModal
// // // //         isOpen={isOpen}
// // // //         targetKey={targetKey}
// // // //         onClose={handleCloseModal}
// // // //         object={signalConfigs}
// // // //         onUpdate={handleUpdateObject}
// // // //       />
// // // //       <ResponsiveReactGridLayout
// // // //         className={className}
// // // //         cols={cols}
// // // //         rowHeight={rowHeight}  // Increase row height to space out elements
// // // //         layouts={currentLayouts}
// // // //         onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
// // // //         isResizable={editPositionMode}
// // // //         isDraggable={editPositionMode}
// // // //         compactType="vertical"  // Forces vertical tiling (avoids cascading)
// // // //         preventCollision={true}  // Allows natural spacing
// // // //       >
// // // //         {generateItems(items)}
// // // //       </ResponsiveReactGridLayout>
// // // //       <button onClick={resetDefaultLayouts}>RESET ALL POSITIONS TO DEFAULT</button>
// // // //       <button onClick={resetDefaultSignalConfigs}>RESET ALL SIGNALS TO DEFAULT</button>
// // // //     </div>
// // // //   );
// // // // }

// // // // function getFromLS(key) {
// // // //   let ls = {};
// // // //   if (localStorage) {
// // // //     try {
// // // //       ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
// // // //     } catch (e) {
// // // //       console.log(e)
// // // //     }
// // // //   }
// // // //   return ls[key];
// // // // }

// // // // function saveToLS(key, value) {
// // // //   if (localStorage) {
// // // //     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {}
// // // //     currentValue[key] = value
// // // //     localStorage.setItem(
// // // //       "rgl-8",
// // // //       JSON.stringify(currentValue)
// // // //     );
// // // //   }
// // // // }

// // // // function removeFromLS(key) {
// // // //   if (localStorage) {
// // // //     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {}
// // // //     delete currentValue[key]
// // // //     localStorage.setItem(
// // // //       "rgl-8",
// // // //       JSON.stringify(currentValue)
// // // //     );
// // // //   }
// // // // }

// // // // export default AddRemoveLayout;

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { gql, useSubscription } from '@apollo/client';
// // // import { WidthProvider, Responsive } from 'react-grid-layout';
// // // import GaugeComponent from 'react-gauge-component';
// // // import NumericDisplay from './components/NumericDisplay';
// // // import BitfieldDisplay from './components/BitfieldDisplay';
// // // import EditModal from './EditModal/EditModal';
// // // import defaultSignalConfig from './assets/default_signal_config.json';

// // // const ResponsiveReactGridLayout = WidthProvider(Responsive);

// // // // FixedCellGrid wraps the grid and calculates the number of columns based on a fixed cell width.
// // // const FixedCellGrid = ({ children, cellWidth = 150, cellHeight = 150, margin = [10, 10] }) => {
// // //   const containerRef = useRef(null);
// // //   const [cols, setCols] = useState(1);
// // //   const [containerWidth, setContainerWidth] = useState(cellWidth);

// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       if (containerRef.current) {
// // //         const width = containerRef.current.offsetWidth;
// // //         setContainerWidth(width);
// // //         // Calculate columns based on cell width plus horizontal margin (both sides)
// // //         const newCols = Math.floor(width / (cellWidth + margin[0] * 2));
// // //         setCols(newCols > 0 ? newCols : 1);
// // //       }
// // //     };
// // //     handleResize();
// // //     window.addEventListener("resize", handleResize);
// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, [cellWidth, margin]);

// // //   return (
// // //     <div ref={containerRef}>
// // //       <ResponsiveReactGridLayout
// // //         width={containerWidth}
// // //         // Use the same column count for all breakpoints
// // //         cols={{ lg: cols, md: cols, sm: cols, xs: cols, xxs: cols }}
// // //         rowHeight={cellHeight}
// // //         margin={margin}
// // //         onLayoutChange={() => {}}
// // //       >
// // //         {children}
// // //       </ResponsiveReactGridLayout>
// // //     </div>
// // //   );
// // // };

// // // // Helpers for localStorage management
// // // function getFromLS(key) {
// // //   let ls = {};
// // //   if (localStorage) {
// // //     try {
// // //       ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
// // //     } catch (e) {
// // //       console.log(e);
// // //     }
// // //   }
// // //   return ls[key];
// // // }

// // // function saveToLS(key, value) {
// // //   if (localStorage) {
// // //     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
// // //     currentValue[key] = value;
// // //     localStorage.setItem("rgl-8", JSON.stringify(currentValue));
// // //   }
// // // }

// // // function removeFromLS(key) {
// // //   if (localStorage) {
// // //     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
// // //     delete currentValue[key];
// // //     localStorage.setItem("rgl-8", JSON.stringify(currentValue));
// // //   }
// // // }

// // // const GET_LATEST_MESSAGE = gql`
// // //   subscription Can {
// // //     can {
// // //       FL_Rotor_Temp_2
// // //       FR_Rotor_Temp_2
// // //       RL_Rotor_Temp_2
// // //       RR_Rotor_Temp_2
// // //       Exhaust_Temperature_Cylinder1
// // //       Exhaust_Temperature_Cylinder2
// // //       Exhaust_Temperature_Cylinder3
// // //       Exhaust_Temperature_Cylinder4
// // //       Brake_Pressure_Front
// // //       Brake_Pressure_Rear
// // //       Throttle_Position
// // //       Gear_Shift_State
// // //       Steered_Angle
// // //       Lap_GainLoss_Running
// // //       Lap_GainLoss_Final
// // //       Log_Time_Remaining
// // //       Reference_Lap_Time
// // //       Running_Lap_Time
// // //       Lap_Time
// // //       Lap_Number
// // //       Engine_Speed
// // //       Gear
// // //       Battery_Volts
// // //       Vehicle_Speed
// // //       Coolant_Temperature
// // //       Coolant_Inlet_Temperature
// // //       Engine_Oil_Temperature
// // //       Engine_Oil_Pressure
// // //       Motor_Status
// // //     }
// // //   }
// // // `;

// // // const App = () => {
// // //   // Load saved signal config or default config
// // //   const originalSignalConfig = getFromLS("signal_configs") || defaultSignalConfig;
// // //   const originalEditSignalMode = getFromLS("edit_signal_mode") || false;
// // //   const originalEditPositionMode = getFromLS("edit_position_mode") || false;

// // //   const [canData, setCANData] = useState({});
// // //   const [signalConfigs, setSignalConfigs] = useState(JSON.parse(JSON.stringify(originalSignalConfig)));
// // //   // Create initial grid items—each item takes 1 fixed cell.
// // //   const initialItems = Object.keys(originalSignalConfig).map((dataSource, index) => {
// // //     return {
// // //       name: dataSource,
// // //       // Initial x and y positions (these may be adjusted using edit mode)
// // //       x: index, 
// // //       y: Math.floor(index / 3),
// // //       w: 1,
// // //       h: 1,
// // //       add: index === Object.keys(originalSignalConfig).length - 1
// // //     };
// // //   });
// // //   const [items, setItems] = useState(initialItems);
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [targetKey, setTargetKey] = useState(null);
  
// // //   const [currentLayouts, setLayouts] = useState(() => {
// // //     const storedLayout = getFromLS("layouts");
// // //     return storedLayout || {};
// // //   });

// // //   const [editPositionMode, setEditPositionMode] = useState(originalEditPositionMode);
// // //   const [editSignalMode, setEditSignalMode] = useState(originalEditSignalMode);

// // //   const handleOpenModal = (key) => {
// // //     setTargetKey(key);
// // //     setIsOpen(true);
// // //   };

// // //   const handleCloseModal = () => {
// // //     setIsOpen(false);
// // //   };

// // //   const handleUpdateObject = (updatedObject) => {
// // //     const DBC_ID = updatedObject.DBC_ID;
// // //     setSignalConfigs(prevState => {
// // //       const newSignalConfigs = { ...prevState, [DBC_ID]: updatedObject };
// // //       saveToLS("signal_configs", newSignalConfigs);
// // //       return newSignalConfigs;
// // //     });
// // //     setIsOpen(false);
// // //   };

// // //   // This function creates the content for each grid item.
// // //   const createElement = (el) => {
// // //     const config = signalConfigs[el.name];
// // //     const value = canData[el.name] * (config?.multiplier ?? 1);
// // //     const type = config?.type || "gauge";

// // //     let content;
// // //     if (type === "numeric") {
// // //       content = <NumericDisplay value={value} label={config?.label} />;
// // //     } else if (type === "bitfield") {
// // //       content = <BitfieldDisplay value={value} bitLabels={config.bit_labels} />;
// // //     } else {
// // //       content = (
// // //         <GaugeComponent 
// // //           value={value}
// // //           size={150}
// // //           arc={{ subArcs: [{ limit: config.start, color: "#FFFFFF" }] }}
// // //           minValue={config.start}
// // //           maxValue={config.end}
// // //           marginInPercent={{ top: 0.12, bottom: -0.03, left: 0.07, right: 0.07 }}
// // //           labels={{
// // //             formatTextValue: "test",
// // //             matchColorWithArc: false,
// // //             maxDecimalDigits: 2,
// // //             hide: false,
// // //             valueLabel: { formatTextValue: (val) => `${val}${config.label}` },
// // //             tickLabels: {
// // //               ticks: Array.from(
// // //                 { length: (config.end - config.start) / config.major_divisions },
// // //                 (_, index) => ({ value: index * config.major_divisions + config.start })
// // //               )
// // //             }
// // //           }}
// // //         />
// // //       );
// // //     }

// // //     return (
// // //       <div 
// // //         key={el.name} 
// // //         data-grid={{ x: el.x, y: el.y, w: el.w, h: el.h }}
// // //         style={{ padding: "5px", textAlign: "center" }}
// // //       >
// // //         {editSignalMode && <button onClick={() => handleOpenModal(el.name)}>Edit</button>}
// // //         <div style={{ width: "150px", height: "150px", margin: "0 auto" }}>
// // //           {content}
// // //         </div>
// // //         <h5>{el.name}</h5>
// // //       </div>
// // //     );
// // //   };

// // //   const generateItems = (items) => {
// // //     return items.map(el => createElement(el));
// // //   };

// // //   const onLayoutChange = (layout, layouts) => {
// // //     // Save the layout if it changes
// // //     if (JSON.stringify(layouts) !== JSON.stringify(currentLayouts)) {
// // //       saveToLS("layouts", layouts);
// // //       setLayouts(layouts);
// // //     }
// // //   };

// // //   const resetDefaultLayouts = () => {
// // //     removeFromLS("layouts");
// // //     window.location.reload();
// // //   };

// // //   const resetDefaultSignalConfigs = () => {
// // //     removeFromLS("signal_configs");
// // //     setSignalConfigs(defaultSignalConfig);
// // //   };

// // //   const onSetEditPositionMode = () => {
// // //     if (!editPositionMode) setEditSignalMode(false);
// // //     saveToLS("edit_position_mode", !editPositionMode);
// // //     setEditPositionMode(!editPositionMode);
// // //   };

// // //   const onSetEditSignalMode = () => {
// // //     if (!editSignalMode) setEditPositionMode(false);
// // //     saveToLS("edit_signal_mode", !editSignalMode);
// // //     setEditSignalMode(!editSignalMode);
// // //   };

// // //   useSubscription(GET_LATEST_MESSAGE, {
// // //     onSubscriptionData: (subscriptionData) => {
// // //       if (subscriptionData?.subscriptionData?.data?.can) {
// // //         const canMsg = subscriptionData.subscriptionData.data.can;
// // //         setCANData(prevState => {
// // //           const newCANState = { ...prevState };
// // //           Object.entries(canMsg).forEach(([key, value]) => {
// // //             if (value !== null) {
// // //               newCANState[key] = value;
// // //             }
// // //           });
// // //           return newCANState;
// // //         });
// // //       }
// // //     }
// // //   });

// // //   return (
// // //     <div>
// // //       <div style={{ marginBottom: "10px" }}>
// // //         <button onClick={onSetEditPositionMode}>
// // //           Position Edit Mode: {editPositionMode ? "Enabled" : "Disabled"}
// // //         </button>
// // //         <button onClick={onSetEditSignalMode}>
// // //           Signal Edit Mode: {editSignalMode ? "Enabled" : "Disabled"}
// // //         </button>
// // //       </div>
// // //       <EditModal
// // //         isOpen={isOpen}
// // //         targetKey={targetKey}
// // //         onClose={handleCloseModal}
// // //         object={signalConfigs}
// // //         onUpdate={handleUpdateObject}
// // //       />
// // //       <FixedCellGrid cellWidth={150} cellHeight={150} margin={[10, 10]}>
// // //         {generateItems(items)}
// // //       </FixedCellGrid>
// // //       <div style={{ marginTop: "10px" }}>
// // //         <button onClick={resetDefaultLayouts}>RESET ALL POSITIONS TO DEFAULT</button>
// // //         <button onClick={resetDefaultSignalConfigs}>RESET ALL SIGNALS TO DEFAULT</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default App;

// // import React, { useState, useEffect, useRef } from 'react';
// // import { gql, useSubscription } from '@apollo/client';
// // import { WidthProvider, Responsive } from 'react-grid-layout';
// // import GaugeComponent from 'react-gauge-component';
// // import NumericDisplay from './components/NumericDisplay';
// // import BitfieldDisplay from './components/BitfieldDisplay';
// // import EditModal from './EditModal/EditModal';
// // import defaultSignalConfig from './assets/default_signal_config.json';

// // const ResponsiveReactGridLayout = WidthProvider(Responsive);

// // // FixedCellGrid calculates how many fixed-size (200px) cells fit in the container.
// // const FixedCellGrid = ({ children, cellWidth = 200, cellHeight = 200, margin = [10, 10] }) => {
// //   const containerRef = useRef(null);
// //   const [cols, setCols] = useState(1);
// //   const [containerWidth, setContainerWidth] = useState(cellWidth);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (containerRef.current) {
// //         const width = containerRef.current.offsetWidth;
// //         setContainerWidth(width);
// //         // Each cell takes cellWidth plus horizontal margins (both sides)
// //         const newCols = Math.floor(width / (cellWidth + margin[0] * 2));
// //         setCols(newCols > 0 ? newCols : 1);
// //       }
// //     };
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, [cellWidth, margin]);

// //   return (
// //     <div ref={containerRef}>
// //       <ResponsiveReactGridLayout
// //         width={containerWidth}
// //         // Use the same number of columns for all breakpoints
// //         cols={{ lg: cols, md: cols, sm: cols, xs: cols, xxs: cols }}
// //         rowHeight={cellHeight}
// //         margin={margin}
// //         onLayoutChange={() => {}}
// //       >
// //         {children}
// //       </ResponsiveReactGridLayout>
// //     </div>
// //   );
// // };

// // // LocalStorage helpers
// // function getFromLS(key) {
// //   let ls = {};
// //   if (localStorage) {
// //     try {
// //       ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   }
// //   return ls[key];
// // }

// // function saveToLS(key, value) {
// //   if (localStorage) {
// //     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
// //     currentValue[key] = value;
// //     localStorage.setItem("rgl-8", JSON.stringify(currentValue));
// //   }
// // }

// // function removeFromLS(key) {
// //   if (localStorage) {
// //     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
// //     delete currentValue[key];
// //     localStorage.setItem("rgl-8", JSON.stringify(currentValue));
// //   }
// // }

// // const GET_LATEST_MESSAGE = gql`
// //   subscription Can {
// //     can {
// //       FL_Rotor_Temp_2
// //       FR_Rotor_Temp_2
// //       RL_Rotor_Temp_2
// //       RR_Rotor_Temp_2
// //       Exhaust_Temperature_Cylinder1
// //       Exhaust_Temperature_Cylinder2
// //       Exhaust_Temperature_Cylinder3
// //       Exhaust_Temperature_Cylinder4
// //       Brake_Pressure_Front
// //       Brake_Pressure_Rear
// //       Throttle_Position
// //       Gear_Shift_State
// //       Steered_Angle
// //       Lap_GainLoss_Running
// //       Lap_GainLoss_Final
// //       Log_Time_Remaining
// //       Reference_Lap_Time
// //       Running_Lap_Time
// //       Lap_Time
// //       Lap_Number
// //       Engine_Speed
// //       Gear
// //       Battery_Volts
// //       Vehicle_Speed
// //       Coolant_Temperature
// //       Coolant_Inlet_Temperature
// //       Engine_Oil_Temperature
// //       Engine_Oil_Pressure
// //       Motor_Status
// //     }
// //   }
// // `;

// // const App = () => {
// //   // Load saved configs or use defaults
// //   const originalSignalConfig = getFromLS("signal_configs") || defaultSignalConfig;
// //   const originalEditSignalMode = getFromLS("edit_signal_mode") || false;
// //   const originalEditPositionMode = getFromLS("edit_position_mode") || false;

// //   const [canData, setCANData] = useState({});
// //   const [signalConfigs, setSignalConfigs] = useState(JSON.parse(JSON.stringify(originalSignalConfig)));
  
// //   // Create initial grid layout.
// //   // We use a default of 4 columns. For bitfields, set height = 3 (i.e. 600px), otherwise 1.
// //   const defaultCols = 4;
// //   const initialItems = Object.keys(originalSignalConfig).map((dataSource, index) => {
// //     const type = originalSignalConfig[dataSource].type || "gauge";
// //     const height = type === "bitfield" ? 3 : 1;
// //     return {
// //       name: dataSource,
// //       x: index % defaultCols,
// //       y: Math.floor(index / defaultCols),
// //       w: 1,
// //       h: height,
// //       add: index === Object.keys(originalSignalConfig).length - 1
// //     };
// //   });
// //   const [items, setItems] = useState(initialItems);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [targetKey, setTargetKey] = useState(null);
  
// //   const [currentLayouts, setLayouts] = useState(() => {
// //     const storedLayout = getFromLS("layouts");
// //     return storedLayout || {};
// //   });

// //   const [editPositionMode, setEditPositionMode] = useState(originalEditPositionMode);
// //   const [editSignalMode, setEditSignalMode] = useState(originalEditSignalMode);

// //   const handleOpenModal = (key) => {
// //     setTargetKey(key);
// //     setIsOpen(true);
// //   };

// //   const handleCloseModal = () => {
// //     setIsOpen(false);
// //   };

// //   const handleUpdateObject = (updatedObject) => {
// //     const DBC_ID = updatedObject.DBC_ID;
// //     setSignalConfigs(prevState => {
// //       const newSignalConfigs = { ...prevState, [DBC_ID]: updatedObject };
// //       saveToLS("signal_configs", newSignalConfigs);
// //       return newSignalConfigs;
// //     });
// //     setIsOpen(false);
// //   };

// //   // createElement renders each grid item.
// //   const createElement = (el) => {
// //     const config = signalConfigs[el.name];
// //     const type = config?.type || "gauge";
// //     const value = canData[el.name] * (config?.multiplier ?? 1);
    
// //     let content;
// //     if (type === "numeric") {
// //       content = <NumericDisplay value={value} label={config?.label} />;
// //     } else if (type === "bitfield") {
// //       content = <BitfieldDisplay value={value} bitLabels={config.bit_labels} />;
// //     } else {
// //       // Gauge default: 200x200
// //       content = (
// //         <GaugeComponent 
// //           value={value}
// //           size={200}
// //           arc={{ subArcs: [{ limit: config.start, color: "#FFFFFF" }] }}
// //           minValue={config.start}
// //           maxValue={config.end}
// //           marginInPercent={{ top: 0.12, bottom: -0.03, left: 0.07, right: 0.07 }}
// //           labels={{
// //             formatTextValue: "test",
// //             matchColorWithArc: false,
// //             maxDecimalDigits: 2,
// //             hide: false,
// //             valueLabel: { formatTextValue: (val) => `${val}${config.label}` },
// //             tickLabels: {
// //               ticks: Array.from(
// //                 { length: (config.end - config.start) / config.major_divisions },
// //                 (_, index) => ({ value: index * config.major_divisions + config.start })
// //               )
// //             }
// //           }}
// //         />
// //       );
// //     }
    
// //     // Set container style based on component type.
// //     let containerStyle = { margin: "0 auto", textAlign: "center" };
// //     if (type === "bitfield") {
// //       containerStyle.width = "200px";
// //       containerStyle.height = "600px";
// //     } else {
// //       containerStyle.width = "200px";
// //       containerStyle.height = "200px";
// //     }

// //     return (
// //       <div 
// //         key={el.name} 
// //         data-grid={{ x: el.x, y: el.y, w: el.w, h: el.h }}
// //         style={{ padding: "5px", textAlign: "center" }}
// //       >
// //         {editSignalMode && <button onClick={() => handleOpenModal(el.name)}>Edit</button>}
// //         <div style={containerStyle}>
// //           {content}
// //         </div>
// //         <h5>{el.name}</h5>
// //       </div>
// //     );
// //   };

// //   const generateItems = (items) => {
// //     return items.map(el => createElement(el));
// //   };

// //   const onLayoutChange = (layout, layouts) => {
// //     if (JSON.stringify(layouts) !== JSON.stringify(currentLayouts)) {
// //       saveToLS("layouts", layouts);
// //       setLayouts(layouts);
// //     }
// //   };

// //   const resetDefaultLayouts = () => {
// //     removeFromLS("layouts");
// //     window.location.reload();
// //   };

// //   const resetDefaultSignalConfigs = () => {
// //     removeFromLS("signal_configs");
// //     setSignalConfigs(defaultSignalConfig);
// //   };

// //   const onSetEditPositionMode = () => {
// //     if (!editPositionMode) setEditSignalMode(false);
// //     saveToLS("edit_position_mode", !editPositionMode);
// //     setEditPositionMode(!editPositionMode);
// //   };

// //   const onSetEditSignalMode = () => {
// //     if (!editSignalMode) setEditPositionMode(false);
// //     saveToLS("edit_signal_mode", !editSignalMode);
// //     setEditSignalMode(!editSignalMode);
// //   };

// //   useSubscription(GET_LATEST_MESSAGE, {
// //     onSubscriptionData: (subscriptionData) => {
// //       if (subscriptionData?.subscriptionData?.data?.can) {
// //         const canMsg = subscriptionData.subscriptionData.data.can;
// //         setCANData(prevState => {
// //           const newCANState = { ...prevState };
// //           Object.entries(canMsg).forEach(([key, value]) => {
// //             if (value !== null) {
// //               newCANState[key] = value;
// //             }
// //           });
// //           return newCANState;
// //         });
// //       }
// //     }
// //   });

// //   return (
// //     <div>
// //       <div style={{ marginBottom: "10px" }}>
// //         <button onClick={onSetEditPositionMode}>
// //           Position Edit Mode: {editPositionMode ? "Enabled" : "Disabled"}
// //         </button>
// //         <button onClick={onSetEditSignalMode}>
// //           Signal Edit Mode: {editSignalMode ? "Enabled" : "Disabled"}
// //         </button>
// //       </div>
// //       <EditModal
// //         isOpen={isOpen}
// //         targetKey={targetKey}
// //         onClose={handleCloseModal}
// //         object={signalConfigs}
// //         onUpdate={handleUpdateObject}
// //       />
// //       <FixedCellGrid cellWidth={200} cellHeight={200} margin={[10, 10]}>
// //         {generateItems(items)}
// //       </FixedCellGrid>
// //       <div style={{ marginTop: "10px" }}>
// //         <button onClick={resetDefaultLayouts}>RESET ALL POSITIONS TO DEFAULT</button>
// //         <button onClick={resetDefaultSignalConfigs}>RESET ALL SIGNALS TO DEFAULT</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import { gql, useSubscription } from '@apollo/client';
// import { WidthProvider, Responsive } from 'react-grid-layout';
// import GaugeComponent from 'react-gauge-component';
// import NumericDisplay from './components/NumericDisplay';
// import BitfieldDisplay from './components/BitfieldDisplay';
// import EditModal from './EditModal/EditModal';
// import defaultSignalConfig from './assets/default_signal_config.json';

// const ResponsiveReactGridLayout = WidthProvider(Responsive);

// // FixedCellGrid calculates how many fixed-size (200px) cells fit in the container.
// const FixedCellGrid = ({ children, cellWidth = 200, cellHeight = 200, margin = [10, 10] }) => {
//   const containerRef = useRef(null);
//   const [cols, setCols] = useState(1);
//   const [containerWidth, setContainerWidth] = useState(cellWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current) {
//         const width = containerRef.current.offsetWidth;
//         setContainerWidth(width);
//         // Each cell takes cellWidth plus horizontal margins (both sides)
//         const newCols = Math.floor(width / (cellWidth + margin[0] * 2));
//         setCols(newCols > 0 ? newCols : 1);
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [cellWidth, margin]);

//   return (
//     <div ref={containerRef}>
//       <ResponsiveReactGridLayout
//         width={containerWidth}
//         // Use the same number of columns for all breakpoints
//         cols={{ lg: cols, md: cols, sm: cols, xs: cols, xxs: cols }}
//         rowHeight={cellHeight}
//         margin={margin}
//         onLayoutChange={() => {}}
//       >
//         {children}
//       </ResponsiveReactGridLayout>
//     </div>
//   );
// };

// // LocalStorage helpers
// function getFromLS(key) {
//   let ls = {};
//   if (localStorage) {
//     try {
//       ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   return ls[key];
// }

// function saveToLS(key, value) {
//   if (localStorage) {
//     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
//     currentValue[key] = value;
//     localStorage.setItem("rgl-8", JSON.stringify(currentValue));
//   }
// }

// function removeFromLS(key) {
//   if (localStorage) {
//     const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
//     delete currentValue[key];
//     localStorage.setItem("rgl-8", JSON.stringify(currentValue));
//   }
// }

// const GET_LATEST_MESSAGE = gql`
//   subscription Can {
//     can {
//       FL_Rotor_Temp_2
//       FR_Rotor_Temp_2
//       RL_Rotor_Temp_2
//       RR_Rotor_Temp_2
//       Exhaust_Temperature_Cylinder1
//       Exhaust_Temperature_Cylinder2
//       Exhaust_Temperature_Cylinder3
//       Exhaust_Temperature_Cylinder4
//       Brake_Pressure_Front
//       Brake_Pressure_Rear
//       Throttle_Position
//       Gear_Shift_State
//       Steered_Angle
//       Lap_GainLoss_Running
//       Lap_GainLoss_Final
//       Log_Time_Remaining
//       Reference_Lap_Time
//       Running_Lap_Time
//       Lap_Time
//       Lap_Number
//       Engine_Speed
//       Gear
//       Battery_Volts
//       Vehicle_Speed
//       Coolant_Temperature
//       Coolant_Inlet_Temperature
//       Engine_Oil_Temperature
//       Engine_Oil_Pressure
//       Motor_Status
//     }
//   }
// `;

// const App = () => {
//   // Load saved configs or use defaults
//   const originalSignalConfig = getFromLS("signal_configs") || defaultSignalConfig;
//   const originalEditSignalMode = getFromLS("edit_signal_mode") || false;
//   const originalEditPositionMode = getFromLS("edit_position_mode") || false;

//   const [canData, setCANData] = useState({
//     "Front_Brake_Pressure": null,
//     "Rear_Break_Pressure": null,
//     "Throttle_Pos_Primary": null,
//     "Throttle_Pos_Secondary": null,
//     "FR_Wheel_Speed": null,
//     "FL_Wheel_Speed": null,
//     "RR_Wheel_Speed": null,
//     "RL_Wheel_Speed": null,
//     "Steering_Pot_Primary": null,
//     "Steering_Pot_Secondary": null,
//     "Motor_One_Cooling_Loop_Temp_Out": null,
//     "Motor_One_Cooling_Loop_Temp_In": null,
//     "Motor_Two_Cooling_Loop_Temp_Out": null,
//     "Motor_Two_Cooling_Loop_Temp_In": null,
//     "Inverter_Cooling_Loop_Temp_Out": null,
//     "Inverter_Cooling_Loop_Temp_In": null,
//     "Front_IMU_Lateral_Accel": null,
//     "Front_IMU_Long_Accel": null,
//     "Front_IMU_Vert_Accel": null,
//     "Front_IMU_Yaw_Rotate": null,
//     "Front_IMU_Pitch_Rotate": null,
//     "Front_IMU_Roll_Rotate": null,
//     "Inv_One_Status_Word": null,
//     "Inv_One_Actual_Speed": null,
//     "Inv_One_Actual_Torque_Current": null,
//     "Inv_One_Actual_Magnetizing_Current": null,
//     "Inv_Two_Status_Word": null,
//     "Inv_Two_Actual_Speed_Value": null,
//     "Inv_Two_Torque_Current": null,
//     "Inv_Two_Actual_Magnetizing_Current": null,
//     "Pack_Current": null,
//     "Pack_Inst_Voltage": null,
//     "Pack_SOC": null,
//     "Relay_State": null,
//     "Pack_DCL": null,
//     "Pack_CCL": null,
//     "Lowest_Temp": null,
//     "Highest_Temp": null,
//     "Low_Cell_ID": null,
//     "High_Cell_ID": null,
//     "Low_Termistor_ID": null,
//     "High_Thermistor_ID": null,
//     "Internal_Temp": null,
//     "Average_Temp": null,
//     "Pack_Health": null,
//     "DTC_Flags_One": null,
//     "DTC_Flags_Two": null,
//     "Current_Limit_Status": null,
//     "Ready_To_Drive_Input": null,
//     "Ready_To_Drive_Arm_Inverters": null,
//     "Traction_Control_Setting": null,
//     "Torque_Vectoring_Low_Setting": null,
//     "Torque_Vectoring_High_Setting": null,
//     "Low_Cell_Voltage": null,
//     "High_Cell_Voltage": null,
//   });
//   const [signalConfigs, setSignalConfigs] = useState(JSON.parse(JSON.stringify(originalSignalConfig)));
  
//   // Create initial grid layout.
//   // We use a default of 4 columns. For bitfields, set height = 3 (i.e. 600px), otherwise 1 (i.e. 200px).
//   const defaultCols = 4;
//   const initialItems = Object.keys(originalSignalConfig).map((dataSource, index) => {
//     const type = originalSignalConfig[dataSource].type || "gauge";
//     const height = type === "bitfield" ? 3 : 1;
//     return {
//       name: dataSource,
//       x: index % defaultCols,
//       y: Math.floor(index / defaultCols),
//       w: 1,
//       h: height,
//       add: index === Object.keys(originalSignalConfig).length - 1
//     };
//   });
//   const [items, setItems] = useState(initialItems);
//   const [isOpen, setIsOpen] = useState(false);
//   const [targetKey, setTargetKey] = useState(null);
  
//   const [currentLayouts, setLayouts] = useState(() => {
//     const storedLayout = getFromLS("layouts");
//     return storedLayout || {};
//   });

//   const [editPositionMode, setEditPositionMode] = useState(originalEditPositionMode);
//   const [editSignalMode, setEditSignalMode] = useState(originalEditSignalMode);

//   const handleOpenModal = (key) => {
//     setTargetKey(key);
//     setIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsOpen(false);
//   };

//   const handleUpdateObject = (updatedObject) => {
//     const DBC_ID = updatedObject.DBC_ID;
//     setSignalConfigs(prevState => {
//       const newSignalConfigs = { ...prevState, [DBC_ID]: updatedObject };
//       saveToLS("signal_configs", newSignalConfigs);
//       return newSignalConfigs;
//     });
//     setIsOpen(false);
//   };

//   // createElement renders each grid item.
//   const createElement = (el) => {
//     const config = signalConfigs[el.name];
//     const type = config?.type || "gauge";
//     const value = canData[el.name] * (config?.multiplier ?? 1);
    
//     let content;
//     if (type === "numeric") {
//       content = <NumericDisplay value={value} label={config?.label} />;
//     } else if (type === "bitfield") {
//       content = <BitfieldDisplay value={value} bitLabels={config.bit_labels} />;
//     } else {
//       // Default gauge: 200x200
//       content = (
//         <GaugeComponent 
//           value={value}
//           size={200}
//           arc={{ subArcs: [{ limit: config.start, color: "#FFFFFF" }] }}
//           minValue={config.start}
//           maxValue={config.end}
//           marginInPercent={{ top: 0.12, bottom: -0.03, left: 0.07, right: 0.07 }}
//           labels={{
//             formatTextValue: "test",
//             matchColorWithArc: false,
//             maxDecimalDigits: 2,
//             hide: false,
//             valueLabel: { formatTextValue: (val) => `${val}${config.label}` },
//             tickLabels: {
//               ticks: Array.from(
//                 { length: (config.end - config.start) / config.major_divisions },
//                 (_, index) => ({ value: index * config.major_divisions + config.start })
//               )
//             }
//           }}
//         />
//       );
//     }
    
//     // Determine container dimensions based on type.
//     const containerWidth = "200px";
//     const containerHeight = type === "bitfield" ? "600px" : "200px";
    
//     // Wrap the content and label in a relative container.
//     return (
//       <div 
//         key={el.name} 
//         data-grid={{ x: el.x, y: el.y, w: el.w, h: el.h }}
//         style={{ padding: "5px", textAlign: "center" }}
//       >
//         {editSignalMode && <button onClick={() => handleOpenModal(el.name)}>Edit</button>}
//         <div style={{ position: "relative", width: containerWidth, height: containerHeight, margin: "0 auto" }}>
//           {content}
//           <div style={{
//             position: "absolute",
//             bottom: 0,
//             width: "100%",
//             background: "rgba(0,0,0,0.5)",
//             color: "white",
//             fontSize: "1rem",
//             padding: "2px 0"
//           }}>
//             {el.name}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const generateItems = (items) => {
//     return items.map(el => createElement(el));
//   };

//   const onLayoutChange = (layout, layouts) => {
//     if (JSON.stringify(layouts) !== JSON.stringify(currentLayouts)) {
//       saveToLS("layouts", layouts);
//       setLayouts(layouts);
//     }
//   };

//   const resetDefaultLayouts = () => {
//     removeFromLS("layouts");
//     window.location.reload();
//   };

//   const resetDefaultSignalConfigs = () => {
//     removeFromLS("signal_configs");
//     setSignalConfigs(defaultSignalConfig);
//   };

//   const onSetEditPositionMode = () => {
//     if (!editPositionMode) setEditSignalMode(false);
//     saveToLS("edit_position_mode", !editPositionMode);
//     setEditPositionMode(!editPositionMode);
//   };

//   const onSetEditSignalMode = () => {
//     if (!editSignalMode) setEditPositionMode(false);
//     saveToLS("edit_signal_mode", !editSignalMode);
//     setEditSignalMode(!editSignalMode);
//   };

//   useSubscription(GET_LATEST_MESSAGE, {
//     onSubscriptionData: (subscriptionData) => {
//       if (subscriptionData?.subscriptionData?.data?.can) {
//         const canMsg = subscriptionData.subscriptionData.data.can;
//         setCANData(prevState => {
//           const newCANState = { ...prevState };
//           Object.entries(canMsg).forEach(([key, value]) => {
//             if (value !== null) {
//               newCANState[key] = value;
//             }
//           });
//           return newCANState;
//         });
//       }
//     }
//   });

//   return (
//     <div>
//       <div style={{ marginBottom: "10px" }}>
//         <button onClick={onSetEditPositionMode}>
//           Position Edit Mode: {editPositionMode ? "Enabled" : "Disabled"}
//         </button>
//         <button onClick={onSetEditSignalMode}>
//           Signal Edit Mode: {editSignalMode ? "Enabled" : "Disabled"}
//         </button>
//       </div>
//       <EditModal
//         isOpen={isOpen}
//         targetKey={targetKey}
//         onClose={handleCloseModal}
//         object={signalConfigs}
//         onUpdate={handleUpdateObject}
//       />
//       <FixedCellGrid cellWidth={200} cellHeight={200} margin={[10, 10]}>
//         {generateItems(items)}
//       </FixedCellGrid>
//       <div style={{ marginTop: "10px" }}>
//         <button onClick={resetDefaultLayouts}>RESET ALL POSITIONS TO DEFAULT</button>
//         <button onClick={resetDefaultSignalConfigs}>RESET ALL SIGNALS TO DEFAULT</button>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { WidthProvider, Responsive } from 'react-grid-layout';
import GaugeComponent from 'react-gauge-component';
import NumericDisplay from './components/NumericDisplay';
import BitfieldDisplay from './components/BitfieldDisplay';
import EditModal from './EditModal/EditModal';
import defaultSignalConfig from './assets/default_signal_config.json';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// FixedCellGrid calculates how many fixed-size (200px) cells fit in the container.
const FixedCellGrid = ({ children, cellWidth = 200, cellHeight = 200, margin = [10, 10] }) => {
  const containerRef = useRef(null);
  const [cols, setCols] = useState(1);
  const [containerWidth, setContainerWidth] = useState(cellWidth);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        // Each cell takes cellWidth plus horizontal margins (both sides)
        const newCols = Math.floor(width / (cellWidth + margin[0] * 2));
        setCols(newCols > 0 ? newCols : 1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cellWidth, margin]);

  return (
    <div ref={containerRef}>
      <ResponsiveReactGridLayout
        width={containerWidth}
        // Use the same number of columns for all breakpoints
        cols={{ lg: cols, md: cols, sm: cols, xs: cols, xxs: cols }}
        rowHeight={cellHeight}
        margin={margin}
        onLayoutChange={() => {}}
      >
        {children}
      </ResponsiveReactGridLayout>
    </div>
  );
};

// LocalStorage helpers
function getFromLS(key) {
  let ls = {};
  if (localStorage) {
    try {
      ls = JSON.parse(localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      console.log(e);
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (localStorage) {
    const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
    currentValue[key] = value;
    localStorage.setItem("rgl-8", JSON.stringify(currentValue));
  }
}

function removeFromLS(key) {
  if (localStorage) {
    const currentValue = JSON.parse(localStorage.getItem("rgl-8")) || {};
    delete currentValue[key];
    localStorage.setItem("rgl-8", JSON.stringify(currentValue));
  }
}

const GET_LATEST_MESSAGE = gql`
  subscription Can {
    can {
      Front_Brake_Pressure
      Rear_Break_Pressure
      Throttle_Pos_Primary
      Throttle_Pos_Secondary
      FR_Wheel_Speed
      FL_Wheel_Speed
      RR_Wheel_Speed
      RL_Wheel_Speed
      Steering_Pot_Primary
      Steering_Pot_Secondary
      Motor_One_Cooling_Loop_Temp_Out
      Motor_One_Cooling_Loop_Temp_In
      Motor_Two_Cooling_Loop_Temp_Out
      Motor_Two_Cooling_Loop_Temp_In
      Inverter_Cooling_Loop_Temp_Out
      Inverter_Cooling_Loop_Temp_In
      Front_IMU_Lateral_Accel
      Front_IMU_Long_Accel
      Front_IMU_Vert_Accel
      Front_IMU_Yaw_Rotate
      Front_IMU_Pitch_Rotate
      Front_IMU_Roll_Rotate
      Inv_One_Status_Word
      Inv_One_Actual_Speed
      Inv_One_Actual_Torque_Current
      Inv_One_Actual_Magnetizing_Current
      Inv_Two_Status_Word
      Inv_Two_Actual_Speed_Value
      Inv_Two_Torque_Current
      Inv_Two_Actual_Magnetizing_Current
      Pack_Current
      Pack_Inst_Voltage
      Pack_SOC
      Relay_State
      Pack_DCL
      Pack_CCL
      Lowest_Temp
      Highest_Temp
      Low_Cell_ID
      High_Cell_ID
      Low_Termistor_ID
      High_Thermistor_ID
      Internal_Temp
      Average_Temp
      Pack_Health
      DTC_Flags_One
      DTC_Flags_Two
      Current_Limit_Status
      Ready_To_Drive_Input
      Ready_To_Drive_Arm_Inverters
      Traction_Control_Setting
      Torque_Vectoring_Low_Setting
      Torque_Vectoring_High_Setting
      Low_Cell_Voltage
      High_Cell_Voltage
    }
  }
`;

const App = () => {
  // Load saved configs or use defaults
  const originalSignalConfig = getFromLS("signal_configs") || defaultSignalConfig;
  const originalEditSignalMode = getFromLS("edit_signal_mode") || false;
  const originalEditPositionMode = getFromLS("edit_position_mode") || false;

  const [canData, setCANData] = useState({
    "Front_Brake_Pressure": null,
    "Rear_Break_Pressure": null,
    "Throttle_Pos_Primary": null,
    "Throttle_Pos_Secondary": null,
    "FR_Wheel_Speed": null,
    "FL_Wheel_Speed": null,
    "RR_Wheel_Speed": null,
    "RL_Wheel_Speed": null,
    "Steering_Pot_Primary": null,
    "Steering_Pot_Secondary": null,
    "Motor_One_Cooling_Loop_Temp_Out": null,
    "Motor_One_Cooling_Loop_Temp_In": null,
    "Motor_Two_Cooling_Loop_Temp_Out": null,
    "Motor_Two_Cooling_Loop_Temp_In": null,
    "Inverter_Cooling_Loop_Temp_Out": null,
    "Inverter_Cooling_Loop_Temp_In": null,
    "Front_IMU_Lateral_Accel": null,
    "Front_IMU_Long_Accel": null,
    "Front_IMU_Vert_Accel": null,
    "Front_IMU_Yaw_Rotate": null,
    "Front_IMU_Pitch_Rotate": null,
    "Front_IMU_Roll_Rotate": null,
    "Inv_One_Status_Word": null,
    "Inv_One_Actual_Speed": null,
    "Inv_One_Actual_Torque_Current": null,
    "Inv_One_Actual_Magnetizing_Current": null,
    "Inv_Two_Status_Word": null,
    "Inv_Two_Actual_Speed_Value": null,
    "Inv_Two_Torque_Current": null,
    "Inv_Two_Actual_Magnetizing_Current": null,
    "Pack_Current": null,
    "Pack_Inst_Voltage": null,
    "Pack_SOC": null,
    "Relay_State": null,
    "Pack_DCL": null,
    "Pack_CCL": null,
    "Lowest_Temp": null,
    "Highest_Temp": null,
    "Low_Cell_ID": null,
    "High_Cell_ID": null,
    "Low_Termistor_ID": null,
    "High_Thermistor_ID": null,
    "Internal_Temp": null,
    "Average_Temp": null,
    "Pack_Health": null,
    "DTC_Flags_One": null,
    "DTC_Flags_Two": null,
    "Current_Limit_Status": null,
    "Ready_To_Drive_Input": null,
    "Ready_To_Drive_Arm_Inverters": null,
    "Traction_Control_Setting": null,
    "Torque_Vectoring_Low_Setting": null,
    "Torque_Vectoring_High_Setting": null,
    "Low_Cell_Voltage": null,
    "High_Cell_Voltage": null,
  });
  const [signalConfigs, setSignalConfigs] = useState(JSON.parse(JSON.stringify(originalSignalConfig)));
  
  // Create initial grid layout.
  // We use a default of 4 columns.
  // For bitfields: if type === "bitfield" => height = 800px (h = 4)
  // if type === "bitfield8" => height = 400px (h = 2)
  // if type === "bitfield1" => height = 200px (h = 1)
  // Otherwise, for gauge, numeric, etc., height = 200px (h = 1)
  const defaultCols = 4;
  const initialItems = Object.keys(originalSignalConfig).map((dataSource, index) => {
    const type = originalSignalConfig[dataSource].type || "gauge";
    let height;
    if (type === "bitfield") {
      height = 4;
    } else if (type === "bitfield8") {
      height = 2;
    } else if (type === "bitfield1") {
      height = 1;
    } else {
      height = 1;
    }
    return {
      name: dataSource,
      x: index % defaultCols,
      y: Math.floor(index / defaultCols),
      w: 1,
      h: height,
      add: index === Object.keys(originalSignalConfig).length - 1
    };
  });
  const [items, setItems] = useState(initialItems);
  const [isOpen, setIsOpen] = useState(false);
  const [targetKey, setTargetKey] = useState(null);
  
  const [currentLayouts, setLayouts] = useState(() => {
    const storedLayout = getFromLS("layouts");
    return storedLayout || {};
  });

  const [editPositionMode, setEditPositionMode] = useState(originalEditPositionMode);
  const [editSignalMode, setEditSignalMode] = useState(originalEditSignalMode);

  const handleOpenModal = (key) => {
    setTargetKey(key);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpdateObject = (updatedObject) => {
    const DBC_ID = updatedObject.DBC_ID;
    setSignalConfigs(prevState => {
      const newSignalConfigs = { ...prevState, [DBC_ID]: updatedObject };
      saveToLS("signal_configs", newSignalConfigs);
      return newSignalConfigs;
    });
    setIsOpen(false);
  };

  // createElement renders each grid item.
  const createElement = (el) => {
    const config = signalConfigs[el.name];
    const type = config?.type || "gauge";
    const value = canData[el.name] * (config?.multiplier ?? 1);
    
    let content;
    if (type === "numeric") {
      content = <NumericDisplay value={value} label={config?.label} />;
    } else if (type === "bitfield") {
      content = <BitfieldDisplay value={value} bitLabels={config.bit_labels} />;
    } else {
      // Default gauge: 200x200
      content = (
        <GaugeComponent 
          value={value}
          size={200}
          arc={{ subArcs: [{ limit: config.start, color: "#FFFFFF" }] }}
          minValue={config.start}
          maxValue={config.end}
          marginInPercent={{ top: 0.12, bottom: -0.03, left: 0.07, right: 0.07 }}
          labels={{
            formatTextValue: "test",
            matchColorWithArc: false,
            maxDecimalDigits: 2,
            hide: false,
            valueLabel: { formatTextValue: (val) => `${val}${config.label}` },
            tickLabels: {
              ticks: Array.from(
                { length: (config.end - config.start) / config.major_divisions },
                (_, index) => ({ value: index * config.major_divisions + config.start })
              )
            }
          }}
        />
      );
    }
    
    // Determine container dimensions based on type.
    const containerWidth = "200px";
    let containerHeight;
    if (type === "bitfield") {
      containerHeight = "800px";
    } else if (type === "bitfield8") {
      containerHeight = "400px";
    } else if (type === "bitfield1") {
      containerHeight = "200px";
    } else {
      containerHeight = "200px";
    }
    
    // Wrap the content and label in a relative container.
    return (
      <div 
        key={el.name} 
        data-grid={{ x: el.x, y: el.y, w: el.w, h: el.h }}
        style={{ padding: "5px", textAlign: "center" }}
      >
        {editSignalMode && <button onClick={() => handleOpenModal(el.name)}>Edit</button>}
        <div style={{ position: "relative", width: containerWidth, height: containerHeight, margin: "0 auto" }}>
          {content}
          <div style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            fontSize: "1rem",
            padding: "2px 0"
          }}>
            {el.name}
          </div>
        </div>
      </div>
    );
  };

  const generateItems = (items) => {
    return items.map(el => createElement(el));
  };

  const onLayoutChange = (layout, layouts) => {
    if (JSON.stringify(layouts) !== JSON.stringify(currentLayouts)) {
      saveToLS("layouts", layouts);
      setLayouts(layouts);
    }
  };

  const resetDefaultLayouts = () => {
    removeFromLS("layouts");
    window.location.reload();
  };

  const resetDefaultSignalConfigs = () => {
    removeFromLS("signal_configs");
    setSignalConfigs(defaultSignalConfig);
  };

  const onSetEditPositionMode = () => {
    if (!editPositionMode) setEditSignalMode(false);
    saveToLS("edit_position_mode", !editPositionMode);
    setEditPositionMode(!editPositionMode);
  };

  const onSetEditSignalMode = () => {
    if (!editSignalMode) setEditPositionMode(false);
    saveToLS("edit_signal_mode", !editSignalMode);
    setEditSignalMode(!editSignalMode);
  };

  useSubscription(GET_LATEST_MESSAGE, {
    onSubscriptionData: (subscriptionData) => {
      if (subscriptionData?.subscriptionData?.data?.can) {
        const canMsg = subscriptionData.subscriptionData.data.can;
        setCANData(prevState => {
          const newCANState = { ...prevState };
          Object.entries(canMsg).forEach(([key, value]) => {
            if (value !== null) {
              newCANState[key] = value;
            }
          });
          return newCANState;
        });
      }
    }
  });

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={onSetEditPositionMode}>
          Position Edit Mode: {editPositionMode ? "Enabled" : "Disabled"}
        </button>
        <button onClick={onSetEditSignalMode}>
          Signal Edit Mode: {editSignalMode ? "Enabled" : "Disabled"}
        </button>
      </div>
      <EditModal
        isOpen={isOpen}
        targetKey={targetKey}
        onClose={handleCloseModal}
        object={signalConfigs}
        onUpdate={handleUpdateObject}
      />
      <FixedCellGrid cellWidth={200} cellHeight={200} margin={[10, 10]}>
        {generateItems(items)}
      </FixedCellGrid>
      <div style={{ marginTop: "10px" }}>
        <button onClick={resetDefaultLayouts}>RESET ALL POSITIONS TO DEFAULT</button>
        <button onClick={resetDefaultSignalConfigs}>RESET ALL SIGNALS TO DEFAULT</button>
      </div>
    </div>
  );
};

export default App;

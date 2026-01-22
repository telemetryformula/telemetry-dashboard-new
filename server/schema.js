

const typeDefs = `#graphql
  type CAN_message {
  Front_Brake_Pressure: Float
  Rear_Break_Pressure: Float
  Throttle_Pos_Primary: Float
  Throttle_Pos_Secondary: Float
  FR_Wheel_Speed: Float
  FL_Wheel_Speed: Float
  RR_Wheel_Speed: Float
  RL_Wheel_Speed: Float
  Steering_Pot_Primary: Float
  Steering_Pot_Secondary: Float
  Motor_One_Cooling_Loop_Temp_Out: Float
  Motor_One_Cooling_Loop_Temp_In: Float
  Motor_Two_Cooling_Loop_Temp_Out: Float
  Motor_Two_Cooling_Loop_Temp_In: Float
  Inverter_Cooling_Loop_Temp_Out: Float
  Inverter_Cooling_Loop_Temp_In: Float
  Gearbox_One_Temp: Float
  Gearbox_Two_Temp: Float
  Front_IMU_Lateral_Accel: Float
  Front_IMU_Long_Accel: Float
  Front_IMU_Vert_Accel: Float
  Front_IMU_Yaw_Rotate: Float
  Front_IMU_Pitch_Rotate: Float
  Front_IMU_Roll_Rotate: Float
  Inv_One_Status_Word: Float
  Inv_One_Actual_Speed: Float
  Inv_One_Actual_Torque_Current: Float
  Inv_One_Actual_Magnetizing_Current: Float
  Inv_Two_Status_Word: Float
  Inv_Two_Actual_Speed_Value: Float
  Inv_Two_Torque_Current: Float
  Inv_Two_Actual_Magnetizing_Current: Float
  Pack_Current: Float
  Pack_Inst_Voltage: Float
  Pack_SOC: Float
  Relay_State: Float
  Pack_DCL: Float
  Pack_CCL: Float
  Lowest_Temp: Float
  Highest_Temp: Float
  Low_Cell_ID: Float
  High_Cell_ID: Float
  Low_Termistor_ID: Float
  High_Thermistor_ID: Float
  Internal_Temp: Float
  Average_Temp: Float
  Pack_Health: Float
  DTC_Flags_One: Float
  DTC_Flags_Two: Float
  Current_Limit_Status: Float
  Ready_To_Drive_Input: Float
  Ready_To_Drive_Arm_Inverters: Float
  Traction_Control_Setting: Float
  Torque_Vectoring_Low_Setting: Float
  Torque_Vectoring_High_Setting: Float
  Low_Cell_Voltage: Float
  High_Cell_Voltage: Float
}

type Subscription {
  can: CAN_message
}

type Query {
  test: String
}


`;

export default typeDefs
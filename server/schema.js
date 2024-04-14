

const typeDefs = `#graphql
  type CAN_message {
    FL_Rotor_Temp_2: Float,
    FR_Rotor_Temp_2: Float,
    RL_Rotor_Temp_2: Float,
    RR_Rotor_Temp_2: Float,
    Exhaust_Temperature_Cylinder1: Float,
    Exhaust_Temperature_Cylinder2: Float,
    Exhaust_Temperature_Cylinder3: Float,
    Exhaust_Temperature_Cylinder4: Float,
    Brake_Pressure_Front: Float,
    Brake_Pressure_Rear: Float,
    Throttle_Position: Float,
    Gear_Shift_State: Float,
    Steered_Angle: Float,
    Lap_GainLoss_Running: Float,
    Lap_GainLoss_Final: Float,
    Log_Time_Remaining: Float,
    Reference_Lap_Time: Float,
    Running_Lap_Time: Float,
    Lap_Time: Float,
    Lap_Number: Float,
    Engine_Speed: Float,
    Gear: Float,
    Battery_Volts: Float,
    Vehicle_Speed: Float,
    Coolant_Temperature: Float,
    Coolant_Inlet_Temperature: Float,
    Engine_Oil_Temperature: Float,
    Engine_Oil_Pressure: Float
  }

  type Subscription {
    can: CAN_message
  }

  type Query {
    test: String
  }

`;

export default typeDefs
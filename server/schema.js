

const typeDefs = `#graphql
  type CAN_message {
  Steered_Angle: Float
  Lap_GainLoss_Running: Float
  Lap_GainLoss_Final: Float
  Log_Time_Remaining: Float
  FL_Rotor_Temp_2: Float
  FR_Rotor_Temp_2: Float
  RL_Rotor_Temp_2: Float
  RR_Rotor_Temp_2: Float
  Exhaust_Temperature_Cylinder1: Float
  Exhaust_Temperature_Cylinder2: Float
  Exhaust_Temperature_Cylinder3: Float
  Exhaust_Temperature_Cylinder4: Float
}

type Subscription {
  can: CAN_message
}

type Query {
  test: String
}


`;

export default typeDefs
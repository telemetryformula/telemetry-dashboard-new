import React, {useState} from 'react';
import {gql, useSubscription} from "@apollo/client"

import GaugeComponent from 'react-gauge-component'

//Component with default values

const GET_LATEST_MESSAGE = gql`
  subscription CANMESSAGE {
    can {
      FL_Rotor_Temp_2
      FR_Rotor_Temp_2
      RL_Rotor_Temp_2
      RR_Rotor_Temp_2
    }
  }`


import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const AddRemoveLayout = ({ className = "layout", cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }, rowHeight = 100 }) => {
  const [items, setItems] = useState(
    [0, 1, 2, 3, 4].map(function (i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
        add: i === (list.length - 1)
      };
    })
  );

  const [canData, setCANData] = useState({})

  const [newCounter, setNewCounter] = useState(0);
  const [breakpoint, setBreakpoint] = useState(null);

  const createElement = (el) => {
    const i = el.i;
    return (
      <div key={i} data-grid={el}>
        <GaugeComponent />
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
    setCols(newCols);
  }

  const onLayoutChange = (layout) => {
    // Do something with layout if needed
  }

  useSubscription(GET_LATEST_MESSAGE, {
    onSubscriptionData: (subscriptionData) =>{
        if (subscriptionData?.subscriptionData?.data?.can) {
          const canData = subscriptionData?.subscriptionData?.data?.can
          for (const key in canData) {
            if (canData[key]) {
              
            }
          }
        }
    }
  })

  return (
    <div>
      <ResponsiveReactGridLayout
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        className={className}
        cols={cols}
        rowHeight={rowHeight}
      >
        {items.map(el => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default AddRemoveLayout;
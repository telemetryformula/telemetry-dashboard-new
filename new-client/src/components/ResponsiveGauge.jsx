import React, { useEffect, useRef, useState } from "react";
import GaugeComponent from "react-gauge-component";

const ResponsiveGauge = ({ value, config }) => {
  const ref = useRef(null);
  const [size, setSize] = useState(200);

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const width = ref.current.offsetWidth;
        const height = ref.current.offsetHeight;
        setSize(Math.min(width, height));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <GaugeComponent
        value={value}
        size={size}
        minValue={config.start}
        maxValue={config.end}
        labels={{
          valueLabel: {
            formatTextValue: (val) => `${val}${config.label ?? ""}`,
          },
        }}
      />
    </div>
  );
};

export default ResponsiveGauge;

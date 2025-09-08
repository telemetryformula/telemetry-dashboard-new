import React, { useEffect, useRef, useState } from "react";
import GaugeComponent from "react-gauge-component";

const ResponsiveGauge = ({ value, config }) => {
  const ref = useRef(null);
  const [size, setSize] = useState(200);

  const generateSubArcs = (config) => {
    let start = config.start ?? 0;
    let end = config.end ?? 100;
  
    if (start > end) [start, end] = [end, start];
  
    const defaultColor = "#2e8b57";
  
    if (!config?.marks?.length) {
      return [{ limit: end, color: defaultColor }];
    }
  
    const sorted = [...config.marks].sort((a, b) => a.start - b.start);
    const subArcs = [];
  
    let lastLimit = start;
  
    for (const mark of sorted) {
      if (mark.end <= mark.start) continue;
  
      if (mark.start > lastLimit) {
        subArcs.push({ limit: mark.start, color: defaultColor });
      }
  
      subArcs.push({ limit: mark.end, color: mark.color });
      lastLimit = mark.end;
    }
  
    if (lastLimit < end) {
      subArcs.push({ limit: end, color: defaultColor });
    }
  
    return subArcs;
  };

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
        arc={{
          subArcs: generateSubArcs(config)
        }}
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

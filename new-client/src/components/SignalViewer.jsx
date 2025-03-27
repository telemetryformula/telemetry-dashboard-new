import ResponsiveGauge from "./ResponsiveGauge";
import NumericDisplay from "./NumericDisplay";
import BitfieldDisplay from "./BitfieldDisplay";

const SignalViewer = ({ name, value, config }) => {
  const scaledValue = (value ?? 0) * (config?.multiplier ?? 1);

  let component;
  switch (config?.type) {
    case "numeric":
      component = <NumericDisplay value={scaledValue} label={config.label} />;
      break;
    case "bitfield":
      component = <BitfieldDisplay value={scaledValue} bitLabels={config.bit_labels} />;
      break;
    default:
      component = <ResponsiveGauge value={scaledValue} config={config} />;
  }

  return (
    <div
      style={{
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 10,
      }}
    >
      <h4>{name}</h4>
      {component}
    </div>
  );
};

export default SignalViewer;

const BitfieldDisplay = ({ value = 0, bitLabels = [] }) => {
    return (
      <div style={{ textAlign: "left", fontSize: "0.9rem" }}>
        {bitLabels.map((label, index) => (
          <div key={index}>
            <strong>{label}</strong>: {(value >> index) & 1}
          </div>
        ))}
      </div>
    );
  };
  
  export default BitfieldDisplay;
  
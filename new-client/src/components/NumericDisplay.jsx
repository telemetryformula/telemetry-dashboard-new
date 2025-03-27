import React from 'react';

const NumericDisplay = ({ value, label }) => {
  return (
    <div style={{ textAlign: 'center', fontSize: '1.5rem', padding: '0.5rem' }}>
      {value} {label}
    </div>
  );
};

export default NumericDisplay;
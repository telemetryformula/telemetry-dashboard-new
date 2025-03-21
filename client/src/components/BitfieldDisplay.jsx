// Improved BitfieldDisplay.jsx
import React from 'react';

const BitfieldDisplay = ({ value, bitLabels = [] }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      fontSize: '1rem',
      fontFamily: 'Arial, sans-serif',
      minWidth: '180px'
    }}>
      {bitLabels.map((label, idx) => {
        const bitOn = (value >> idx) & 1;
        return (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            width: '100%'
          }}>
            <span style={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
            <div style={{
              width: 20,
              height: 20,
              minWidth: 20,
              minHeight: 20,
              backgroundColor: bitOn ? 'green' : 'gray',
              borderRadius: '50%',
              display: 'inline-block',
              marginLeft: '12px',
              flexShrink: 0
            }} />
          </div>
        );
      })}
    </div>
  );
};

export default BitfieldDisplay;

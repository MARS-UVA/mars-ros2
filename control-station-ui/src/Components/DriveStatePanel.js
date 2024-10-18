import React, { useState, useEffect, useRef } from 'react';

// Component Name: ExampleComponent
function DriveStatePanel() {

    const CommandButton = ({ label }) => (
        <button className="command-button">
          {label}
        </button>
      );
 

  // Render the component UI
  return (
    <div className="panel">
            <h2 className="panel-title">Controls</h2>
            <div className="command-grid">
              {['Autonomous Drive', 'Direct Drive', 'Idle'].map((label, index) => (
                <CommandButton key={index} label={label} />
              ))}
            </div>
            <button className="estop-button">
              ESTOP
            </button>
          </div>
  );
}

export default DriveStatePanel;

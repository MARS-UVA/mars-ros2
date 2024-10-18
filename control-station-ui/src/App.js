import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import LiveDataPanel from "./Components/LiveDataPanel";
import GamepadPanel from "./Components/GamepadPanel";
import DriveStatePanel from "./Components/DriveStatePanel";

const App = () => {
  const [activeTab, setActiveTab] = useState("Idle");

  const tabs = [
    "Idle",
    "Direct Drive",
    "Autonomous Drive",
    "Camera Feed",
    "Test",
  ];

  const Lever = ({ value }) => (
    <div className="lever-container">
      <div className="lever">
        <div className="lever-fill" style={{ height: `${value * 100}%` }} />
      </div>
      <div className="lever-value">{value.toFixed(1)}</div>
    </div>
  );

  return (
    <div className="app-container">
      <h1 className="title">MARS Web UI</h1>

      <nav className="nav">
        <ul className="tab-list">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="content">
        <div className="left-panel">
          <GamepadPanel />

          <DriveStatePanel />
        </div>

        <div className="right-panel">
          <LiveDataPanel />
        </div>
      </div>
    </div>
  );
};

export default App;

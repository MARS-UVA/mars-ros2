import React from "react";

import "./App.css";
import LiveDataPanel from "./Components/LiveDataPanel";
import GamepadPanel from "./Components/GamepadPanel";
import DriveStatePanel from "./Components/DriveStatePanel";

const App = () => {

  return (
    <div className="app-container">
      <h1 className="title">MARS Web UI</h1>


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

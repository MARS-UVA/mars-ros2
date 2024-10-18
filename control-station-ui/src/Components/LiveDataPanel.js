import React, { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Camera } from "lucide-react";

function LiveDataPanel() {
  const [chartData, setChartData] = useState(Array.from({ length: 5 }, (_, i) => ({
    time: i,
    value1: Math.random() * 100,
    value2: Math.random() * 100,
    value3: Math.random() * 100,
    value4: Math.random() * 100,
  })));

  const Chart = ({ dataKey }) => (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={chartData}>
        <XAxis dataKey="time" />
        <YAxis />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  // Ref Hook - useRef for accessing a DOM element or mutable value
  const videoRef = useRef(null);

  useEffect(() => {

    const addNewData = () => {
      const newData = (l)=>{ return {
        time: l, // The next index as time
        value1: Math.random() * 100,
        value2: Math.random() * 100,
        value3: Math.random() * 100,
        value4: Math.random() * 100,
      }}
  
      // Set the new array (using the spread operator to create a new array)
      setChartData(prevData => [...prevData, newData(prevData.length)]);
    };


    const interval = setInterval(addNewData, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
        });
    }
  }, []);

  // Render the component UI
  return (
    <>
      <div className="panel">
        <h2 className="panel-title">Live Data Panel</h2>
        <h3 className="panel-title">Charts</h3>
        <div className="chart-grid">
          <Chart dataKey="value1" />
          <Chart dataKey="value2" />
          <Chart dataKey="value3" />
          <Chart dataKey="value4" />
        </div>

        <div>
          <h3 className="panel-title">Real-Time Values</h3>
          <p>
            Motor 1: 0<br />
            Motor 2: 0<br />
            Motor 3: 0<br />
            Motor 4: 0<br />
          </p>
        </div>

        <h3 className="panel-title">Live Webcam Feed</h3>

        <div className="webcam-container">
          <video ref={videoRef} autoPlay playsInline muted className="webcam" />
          <div className="camera-icon">
            <Camera size={20} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveDataPanel;

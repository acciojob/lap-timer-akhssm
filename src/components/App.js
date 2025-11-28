import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0); 
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return; 

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10); 
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const recordLap = () => {
    if (time > 0) setLaps([...laps, time]);
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 6000);
    const seconds = Math.floor((t % 6000) / 100);
    const centiseconds = t % 100;

    const pad = (num) => (num < 10 ? "0" + num : num);

    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  return (
    <div>
      {/* Do not remove the main div */}

      <h1>{formatTime(time)}</h1>

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={recordLap}>Lap</button>
      <button onClick={resetTimer}>Reset</button>

      <ul>
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

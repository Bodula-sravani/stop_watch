import React, { useState, useEffect } from "react";
import './stopWatch.css';

function StopWatch() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const startTiming = () => {
    setIsRunning(true);
  };

  const lapTiming = () => {
    const lapTime = `${minutes}:${seconds}.${milliseconds}`;
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  const pauseTiming = () => {
    setIsRunning(false);
  };

  const resetTiming = () => {
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setIsRunning(false);
    setLaps([]);
  };

  useEffect(() => {
    let intervalId;

    const startTimer = () => {
      intervalId = setInterval(() => {
        if (isRunning) {
          setMilliseconds((prevMilliseconds) => {
            if (prevMilliseconds === 99) {
              setSeconds((prevSeconds) => {
                if (prevSeconds === 59) {
                  setMinutes((prevMinutes) => prevMinutes + 1);
                  return 0;
                }
                return prevSeconds + 1;
              });
              return 0;
            }
            return prevMilliseconds + 1;
          });
        }
      }, 1);
    };

    startTimer();

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <React.Fragment>
      <h1>STOP WATCH</h1>
      <div className="Timer">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}:
        {milliseconds < 10 ? `0${milliseconds}` : milliseconds < 100 ? `${milliseconds}` : milliseconds}
      </div>
      <div className="buttons">
        {isRunning ? (
          <button onClick={pauseTiming} className="circle">Pause</button>
        ) : (
          <button onClick={startTiming} className="circle">Start</button>
        )}
        {isRunning && <button onClick={lapTiming} className="circle">Lap</button>}
        <button onClick={resetTiming} className="circle">Reset</button>
      </div>
      <div className="laps">
        {laps.map((lap, index) => (
          <div key={index}>Lap {index + 1}: {lap}</div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default StopWatch;

import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [targetDate, setTargetDate] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({
    Days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });
  const [minDateTime, setMinDateTime] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDateTime = new Date(now.getTime() - offset * 60 * 1000)
      .toISOString()
      .slice(0, 16);

    setMinDateTime(localDateTime);
  }, []);

  useEffect(() => {
    if (!targetDate || !timerRunning) return;

    const updateTheRemianingtime = () => {
      const currTime = new Date().toISOString();
      const timeDifference = getTimeDifference(targetDate, currTime);

      setTimeRemaining({
        Days: timeDifference.days,
        Hours: timeDifference.hours,
        Minutes: timeDifference.minutes,
        Seconds: timeDifference.seconds,
      });

      if (
        timeDifference.days === 0 &&
        timeDifference.hours === 0 &&
        timeDifference.minutes === 0 &&
        timeDifference.seconds === 0
      ) {
        clearInterval(intervalId);
        setTimerRunning(false);
      }
    };

    updateTheRemianingtime();

    const intervalId = setInterval(updateTheRemianingtime, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate, timerRunning]);

  function getTimeDifference(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    const differenceMs = Math.abs(date1Ms - date2Ms);

    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const handleDateChange = (e) => {
    setTargetDate(e.target.value);
  };

  const handleStartTimer = () => {
    if (targetDate && !timerRunning) setTimerRunning(true);
  };
  const handleStopTimer = () => {
    setTimerRunning(false);
    setTimeRemaining({
      Days: 0,
      Hours: 0,
      Minutes: 0,
      Seconds: 0,
    });
  };

  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo logo_react" alt="React logo" />
      </div>
      <h1>Countdown Timer</h1>

      <div className="card">
        <div className="stopWatch">
          <input
            className="calender"
            type="datetime-local"
            name="start"
            onChange={handleDateChange}
            min={minDateTime}
            value={targetDate}
          />
          <div className="timer">
            <p>{timeRemaining.Days}</p>
            <p>{timeRemaining.Hours} </p>
            <p>{timeRemaining.Minutes}</p>
            <p>{timeRemaining.Seconds}</p>
          </div>
          <div className="btns">
            <button onClick={handleStartTimer} disabled={timerRunning}>
              start timer
            </button>
            <button onClick={handleStopTimer} disabled={!timerRunning}>
              stop timer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

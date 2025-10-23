import { useEffect, useState } from "react";

function Timer({ name }) {
  const [sec, setSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSec((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const convertTime = (s) => {
    const MIN_SECONDS = 60;
    const HOUR_SECONDS = 60 * MIN_SECONDS;
    const DAY_SECOND = 24 * HOUR_SECONDS;

    const day = Math.floor(s / DAY_SECOND);
    const hr = Math.floor((s - day * DAY_SECOND) / HOUR_SECONDS);
    const min = Math.floor(
      (s - day * DAY_SECOND - hr * HOUR_SECONDS) / MIN_SECONDS
    );
    const sec = s - day * DAY_SECOND - hr * HOUR_SECONDS - min * MIN_SECONDS;
    return day > 0
      ? day + "day " + hr + "hr " + min + "m " + sec + "s"
      : hr > 0
      ? hr + "hr " + min + "m " + sec + "s"
      : min > 0
      ? min + "m " + sec + "s"
      : sec + "s";
  };

  const resetTime = () => setSec(0);
  const toggleTime = () => setIsRunning((isRun) => !isRun);

  return (
    <div
      className="border border-black border-2 rounded-4 mt-3 p-2 bg-secondary-subtle"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center ">{name || "TIMER"}</h1>
      <div className="border border-black border-2 rounded-3 text-end px-2 fs-4 bg-white">
        {convertTime(sec)}
      </div>
      <div className="d-flex justify-content-start gap-3 mt-3">
        <button className="btn btn-danger" onClick={resetTime}>
          <i className="bi bi-arrow-counterclockwise" />
          &nbsp;Reset
        </button>
        <button
          className={`btn ${isRunning ? "btn-warning" : "btn-success"}`}
          onClick={toggleTime}
        >
          {isRunning ? (
            <i className="bi bi-pause-fill" />
          ) : (
            <i className="bi bi-play" />
          )}
          &nbsp;{isRunning ? "Pause" : "Run"}
        </button>
      </div>
    </div>
  );
}
export default Timer;

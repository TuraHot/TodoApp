import { useState } from "react";

const RedixCounter = () => {
    //const[getter, setter]
    const [values, setValues] = useState(0)

  return (
    // container
    <div
      className="border border-3 border-black m-auto p-3 rounded-4"
      style={{ width: "fit-content" }}
    >
      {/* title */}
      <h1 className="text-center fw-bold">REDIX COUNTER</h1>
      {/* body */}
      <div className="d-flex justify-content-between text-center gap-3 mt-3">
        <div>
          <div className="fs-4 fw-bold">[HEX]</div>
          <div className="font-monospace fs-5">{values.toString(16).padStart(3,'0').toUpperCase()}</div>
        </div>
        <div>
          <div className="fs-4 fw-bold">[DEC]</div>
          <div className="font-monospace fs-5 text-primary fw-bold">{values.toString().padStart(4,'0').toUpperCase()}</div>
        </div>
        <div>
          <div className="fs-4 fw-bold">[OCT]</div>
          <div className="font-monospace fs-5">{values.toString(8).padStart(4,'0').toUpperCase()}</div>
        </div>
        <div>
          <div className="fs-4 fw-bold">[BIN]</div>
          <div className="font-monospace fs-5">{values.toString(2).padStart(12,'0').toUpperCase()}</div>
        </div>
      </div>
      {/* button */}
      <div className="d-flex justify-content-around">
        <button className="btn btn-danger px-4" onClick={() => values <= 0 ? setValues(4095) : setValues((n) => n - 1)}>&minus;</button>
        <button className="btn btn-secondary px-5" onClick={() => setValues(0)}>RESET</button>
        <button className="btn btn-success px-4" onClick={() => values >= 4095 ? setValues(0) : setValues((n) => n + 1)}>+</button>
      </div>
    </div>
  );
};

export default RedixCounter;

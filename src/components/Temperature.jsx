import { useState } from "react";
import Value from "./Value";

function Temperature({ name }) {
  const [celsius, setCelsius] = useState(25);
  const [fahrenheit, setFahrenheit] = useState(77);
  const [kelvin, setKelvin] = useState(298.15);

  const updateFromCelsius = (c) => {
    setCelsius(c);
    setFahrenheit((c * 1.8 + 32));
    setKelvin((parseFloat(c) + 273.15));
  };

  const updateFromFahrenheit = (f) => {
    const c = (f - 32) / 1.8;
    setFahrenheit(f);
    setCelsius(c);
    setKelvin((c + 273.15));
  };

  const updateFromKelvin = (k) => {
    const c = k - 273.15;
    setKelvin(k);
    setCelsius(c);
    setFahrenheit((c * 1.8 + 32));
  };

  return (
    <div
      className="border border-black border-2 rounded-4 p-3 mt-3"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-center text-primary">{name || "TEMPERATURE"}</h1>
      <div className="d-flex justify-content-around">
        <span className="badge bg-secondary fs-2">{celsius.toFixed(2)} °C</span>
        <span className="badge bg-primary fs-2">{fahrenheit.toFixed(2)} °F</span>
        <span className="badge bg-secondary fs-2">{kelvin.toFixed(2)} °K</span>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <Value
          name={"CELSIUS"}
          value={celsius}
          setValue={(n) => updateFromCelsius(parseFloat(n) || 0)}
          type={"real"}
        />
        <Value
          name={"FAHRENHEIT"}
          value={fahrenheit}
          setValue={(n) => updateFromFahrenheit(parseFloat(n) || 0)}
          type={"real"}
        />
        <Value
          name={"KELVIN"}
          value={kelvin}
          setValue={(n) => updateFromKelvin(parseFloat(n) || 0)}
          type={"real"}
        />
      </div>
    </div>
  );
}

export default Temperature;

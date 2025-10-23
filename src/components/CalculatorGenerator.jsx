import { useState, useEffect } from "react";

const STATE = {
  S0: "S0",
  S1: "S1",
  S2: "S2",
};

const CalculatorGenerator = () => {
  const [screen, setScreen] = useState("0");
  const [calcState, setCalcState] = useState(STATE.S0);
  const [firstOperand, setFirstOperand] = useState(0);
  const [lastOperator, setLastOperator] = useState("");
  const [secondOperand, setSecondOperand] = useState(0);

  const numberClicked = (number) => {
    if (calcState === STATE.S0 && number !== 0) {
      setScreen(number.toString());
      setCalcState(STATE.S1);
    } else if (calcState === STATE.S1 && screen.length < 9) {
      setScreen((prevScreen) => prevScreen + number.toString());
    } else if (calcState === STATE.S2) {
      setScreen(number.toString());
      setCalcState(STATE.S1);
    }
  };

  const operatorClicked = (operator) => {
    if (calcState === STATE.S1) {
      setLastOperator(operator);
      setCalcState(STATE.S2);
      const currentScreenValue = parseInt(screen);
      setFirstOperand(currentScreenValue);
      setSecondOperand(currentScreenValue);
    } else if (calcState === STATE.S2) {
      setLastOperator(operator);
    }
  };

  const equalClicked = () => {
    let result = firstOperand;
    let currentSecond = secondOperand;

    if (calcState === STATE.S1) {
      currentSecond = parseInt(screen);
      setSecondOperand(currentSecond);
      setCalcState(STATE.S2);
    }

    if (lastOperator === "+") {
      result = firstOperand + currentSecond;
    } else if (lastOperator === "-") {
      result = firstOperand - currentSecond;
    }

    setFirstOperand(result);
    setScreen(result.toString());
  };

  const CEClicked = () => {
    setScreen("0");
    setCalcState(STATE.S0);
    setFirstOperand(0);
    setLastOperator("");
    setSecondOperand(0);
  };

  useEffect(() => {
    const checkKeyboard = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }

      if (event.key >= "0" && event.key <= "9") {
        numberClicked(Number(event.key));
      } else if (event.key === "+") {
        operatorClicked("+");
      } else if (event.key === "-") {
        operatorClicked("-");
      } else if (event.key === "Enter" || event.key === "=") {
        equalClicked();
      } else if (event.key === "Escape") {
        CEClicked();
      }
    };

    document.addEventListener("keydown", checkKeyboard);

    return () => {
      document.removeEventListener("keydown", checkKeyboard);
    };
  }, [screen, calcState, firstOperand, lastOperator, secondOperand]);

  const getOperatorClass = (op) => {
    const baseClass = "btn-success";
    const activeClass = "btn-warning";
    return lastOperator === op ? activeClass : baseClass;
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <div
        className="p-3 border border-black rounded shadow-lg bg-light"
        style={{ width: "fit-content", minWidth: "350px" }}
      >
        <div
          id="screen"
          className="p-3 mb-3 bg-light border border-black rounded text-end h1 overflow-hidden"
          style={{ minHeight: "50px", backgroundColor: "#e9ffdb" }}
        >
          {screen}
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between mb-2">
            {["MC", "MR", "M+", "M-"].map((label) => (
              <button
                key={label}
                className="btn btn-sm btn-success"
                disabled
                style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
              >
                {label}
              </button>
            ))}
            <button
              className="btn btn-danger"
              onClick={CEClicked}
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              CE
            </button>
          </div>

          <div className="d-flex justify-content-between mb-2">
            {[7, 8, 9].map((num) => (
              <button
                key={num}
                className="btn btn-secondary"
                onClick={() => numberClicked(num)}
                style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
              >
                {num}
              </button>
            ))}
            <button
              className="btn btn-success"
              disabled
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              &divide;
            </button>
            <button
              className="btn btn-success"
              disabled
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              &radic;
            </button>
          </div>

          <div className="d-flex justify-content-between mb-2">
            {[4, 5, 6].map((num) => (
              <button
                key={num}
                className="btn btn-secondary"
                onClick={() => numberClicked(num)}
                style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
              >
                {num}
              </button>
            ))}
            <button
              className="btn btn-success"
              disabled
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              &times;
            </button>
            <button
              className="btn btn-success"
              disabled
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              %
            </button>
          </div>

          <div className="d-flex justify-content-between mb-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className="btn btn-secondary"
                onClick={() => numberClicked(num)}
                style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
              >
                {num}
              </button>
            ))}
            <button
              id="minus"
              className={`btn ${getOperatorClass("-")}`}
              onClick={() => operatorClicked("-")}
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              &minus;
            </button>
            <button
              className="btn btn-success"
              disabled
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              1/x
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => numberClicked(0)}
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              0
            </button>
            <button
              className="btn btn-secondary"
              disabled
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              .
            </button>
            <button
              className="btn btn-secondary"
              disabled
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              &plusmn;
            </button>
            <button
              id="plus"
              className={`btn ${getOperatorClass("+")}`}
              onClick={() => operatorClicked("+")}
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              +
            </button>
            <button
              className="btn btn-success"
              onClick={equalClicked}
              style={{ width: "60px", height: "60px", fontSize: "1.25rem" }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorGenerator;

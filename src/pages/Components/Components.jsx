import Value from "../../components/Value.jsx";
import Adder from "../../components/Adder.jsx";
import Timer from "../../components/Timer.jsx";
import Temperature from "../../components/Temperature.jsx";
import "./Components.css";

import { useState } from "react";

const Components = () => {
    const [counter, setCounter] = useState(0)

    return ( 
        <div className="components-container">
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <Value name={'COUNTER'} value={counter} setValue={setCounter}/>
                    <Timer name={'TIMER'}/>
                </div>
                <div className="col-md-4">
                        <Adder name={'ADD'}/>
                </div>
                <Temperature name={'TEMPERATURES'}/>
            </div>
        </div>
    );
}

export default Components;
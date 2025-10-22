import Value from "../components/Adder.jsx";
import Adder from "../components/Adder.jsx";
import Timer from "../components/Timer.jsx";
import Temperature from "../components/Temperature.jsx";

import { useState } from "react";

const Components = () => {
    const [counter, setCounter] = useState(0)

    return ( 
        <div>
            <Value name={'COUNTER'} value={counter} setValue={setCounter}/>

            <Adder name={'ADD'}/>

            <Timer name={'TIMER'}/>

            <Temperature name={'TEMPERATURES'}/>
        </div> 
    );
}

export default Components;
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import Button from "./Button";


export default function AdvancedCounter() {

    const [history, setHistory] = useState<number[]>(() => {
        const stored = localStorage.getItem("countHistory");
        
        return stored ? JSON.parse(stored) : [0];
    });

    const [idCount, setIdCount] = useState<number[]>(() => {
        const id = localStorage.getItem("id");
        return id ? JSON.parse(id) : [0]
    });
    const [count, setCount] = useState(() => {
        const count = Number(localStorage.getItem("count"))
        return count ? count : 0;
    });
    const [step, setStep] = useState(() => {
        const step = Number(localStorage.getItem("stepCount"));
        return step ? step : 0;
    });

    const [loading, setLoading] = useState(false);
    // variaible definition

    const resetLoading = () => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    const reset = () => {
        setCount(0);
        setStep(1);
        setIdCount([0])
         setHistory([0]);
    } // reset function

    useEffect(() => {
      
        localStorage.setItem("count", JSON.stringify(count))
        localStorage.setItem("countHistory", JSON.stringify(history))
        localStorage.setItem("id", JSON.stringify(idCount))
    }, [count, history, idCount]) // history useEffect

    useEffect(() => {
        localStorage.setItem("stepCount", JSON.stringify(step))
    }, [step]) // step useEffect

    const increment = () => {
        setLoading(true)
        const newCount = count + step;
        setCount(newCount);

        setHistory(prev => [...prev, newCount]);
        setIdCount(prev => [...prev, prev[prev.length - 1] + 1])
         resetLoading()
    } // increment function

    const decrement = () => {
           setLoading(true)
        const newCount = count - step;
        setCount(newCount);

        setHistory(prev => [...prev, newCount]);
        setIdCount(prev => [...prev, prev[prev.length - 1] + 1])
        resetLoading()
    } // decrement function

    const setStepFunc = (num: string) => {
           setLoading(true)
        setStep(Number(num))
         resetLoading()
    } // step function

    const arrowPress = (event: React.KeyboardEvent<HTMLDivElement>) => {

        if (event.key === "ArrowDown") {
            decrement();
        }

        if (event.key === "ArrowUp") {
            increment()
        }
    }


    // down arrow funciton
    const storage = localStorage.getItem("countHistory");
    const parsed: number[] = storage ? JSON.parse(storage) : [];
    console.log(parsed)

    console.log(idCount)
    return (
        <div tabIndex={0} onKeyDown={arrowPress}>
            Count: {count}
            <div className="row">
                <Button message="Decrement" onClick={decrement} />
                <Button message="Increment" onClick={increment} />
                <Button message="Reset" onClick={reset} />
            </div>
            <div>
                Step Value
                <input placeholder={JSON.stringify(step)} onChange={(e) => setStepFunc(e.target.value)} type="number"></input>
            </div>
            <div>
                <p>{loading ? "Saving to localStorage" : "Changes saved"}</p>
                <h4>Count History:</h4>
                <hr></hr>
                {/* {parsed.map((num, index) => <p key = {idCount[index]} >{num}</p>)}  */}
            <p>Use ArrowUp to increment and ArrowDown to decrement.</p>
            </div>
        </div>
    )
}
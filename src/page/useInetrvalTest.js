import React, {useState, useCallback} from 'react';
import useInterval from '../useInterval';
import {CSSTransition} from 'react-transition-group'

function Interval () {
    const [state, setState] = useState(0);
    useInterval(useCallback(() => {
        setState(state => state + 1);
    }, []), 3000)
    return (
        <div>
            <CSSTransition
                timeout={500}
                classNames='test-transition'
                unmountOnExit
                in={state%2==1}
            >
                <div>{state}</div>
            </CSSTransition>
            <CSSTransition
                timeout={500}
                classNames='test-transition'
                in={state%2==0}
                unmountOnExit
            >
                <div>{state}</div>
            </CSSTransition>
        
        </div>
    )
}

export default Interval;
import React, {useState, useEffect} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

function NextTransition() {
    const [index, setIndex] = useState(0);
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setIndex(i=>i===0?1:0)
    //     }, 2000);
    //     return () => clearInterval(id);
    // }, [])
    const display = ['a', 'b', 'c'];


    const click = () => {
        setIndex(i=>i+1);
    }
    return (
        <>
            <TransitionGroup className='transitionGroupContainer'>
               
                    <CSSTransition
                        key={index}
                        classNames="transitionGroupItem"
                        timeout={1000}
                    >
                        <div className='block'>{display[index]}</div> 
                    </CSSTransition> 
                
            </TransitionGroup>
            <div style={{position: 'fixed', bottom: 0, width: '90%'}} onClick={click}>next</div>
       </>
    )
}

export default NextTransition;
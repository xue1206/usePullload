
import React, {useEffect, useRef, useState} from "react"; 
import BS from 'better-scroll';

const defaultOptions = {
  pullDownRefresh: {
    threshold: 50,
    stop: 20
  }
}

function usePullload(wrapper, pullDownHandler) {
  const [pullState, setPullState] = useState(0);
  const scrollInst = useRef();
  console.log('usePullload', wrapper)
  useEffect(() => {
    console.log('in effect', wrapper)
    if (wrapper.current) {
      let _state = 0;
      const setState = (state) => {
        _state = state;
        setPullState(_state);
      }
      scrollInst.current = new BS(wrapper.current, {
        ...defaultOptions
      });
      scrollInst.current.on('pullingDown', (e) => {
        setState(2);
        console.log('pullingDown', e);
        pullDownHandler().finally(() => {
          setTimeout(() => {
            console.log('finish');
            scrollInst.current.finishPullDown();
            setState(3);
            setTimeout(() => {
              setState(0);
            },1000)
          }, 1000);
        })
      });
      scrollInst.current.on('scroll', (e) => {
        if (e.y > 50 && _state === 0) {
          setState(1);
        } else if (e.y < 50 && _state === 1) {
          setState(0);
        }
        console.log('scroll', e)
      })
    }
  }, []);

  return pullState;
}

function Pullload({children, pullDownHandler}) {
  const domEl = useRef();
  const pullState = usePullload(domEl, pullDownHandler);

  return (
    <div style={{height: '80px',border:'1px solid',marginTop:'80px'}} ref={domEl}>
      <div>
        <div>{pullState}</div>
        {children}
      </div>
    </div>
  )
}

export default Pullload;

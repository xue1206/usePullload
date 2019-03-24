import CITY_DATA from './city.json';
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

function SelectionList({}) {
  const domEl = useRef();
  const groupElList = CITY_DATA.map(group => useRef());
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [diff, setDiff] = useState(0);
  const scrollInst = useRef();
  const groupNameEl = useRef();

  useEffect(() => {
    let height = 0;
    const listHeight = groupElList.map(groupEl => groupEl.current.clientHeight).map(h => height+=h);
    let groupNameElHeight = groupNameEl.current.clientHeight;
    console.log(groupNameElHeight)

    scrollInst.current = new BS(domEl.current, {probeType: 3});
console.log(listHeight)
    scrollInst.current.on('scroll', (e) => {
        console.log(e)
        const scrollHeight = -e.y;
        for (let i = 0; i < listHeight.length; i++) {
            if (scrollHeight >= listHeight[i] && -e.y < listHeight[i+1]) {
                if ((listHeight[i+1] - scrollHeight) < groupNameElHeight) {
                    setDiff(groupNameElHeight - (listHeight[i+1] - scrollHeight));
                } else { 
                    setDiff(0);
                }
                setCurrentIndex(i+1);
                break;
            }
            
        }
        if (scrollHeight < listHeight[0]) {
            if ((listHeight[0] - scrollHeight) < groupNameElHeight) {
                setDiff(groupNameElHeight - (listHeight[0] - scrollHeight));
            } else { 
                setDiff(0);
            }
            setCurrentIndex(0);
        }
        if (scrollHeight < 0) {
            setCurrentIndex(-1);
        }
    })

    scrollInst.current.scrollTo(0, -listHeight[2])

  }, [])
  
  console.log('diff',diff, currentIndex);

  return (
    <div style={{width: '100%',height: '200px',border:'1px solid ',marginTop:'80px', position:'relative', overflow:'hidden'}} ref={domEl}>
      <div>
        {
            CITY_DATA.map((group,index) => {
                return (
                    <div key={group.name + index} ref={groupElList[index]}>
                        <h2 style={{background:'#a45',height: '30px'}}>{group.name}</h2>
                        <ul>
                            {
                                group.cities.map(city => {
                                    return (
                                        <li key={city.cityid} style={{border: '1px solid #999'}}>{city.name}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            })
        }
      </div>
      <h2 ref={groupNameEl} style={{background:'#a45', position: 'absolute', top: '0', left: '0', textAlign:'center', width: '100%',height: '30px', transform: `translateY(${-diff}px)`, visibility: currentIndex>-1?'visible':'hidden'}}>{currentIndex>-1&&CITY_DATA[currentIndex].name}</h2>
    </div>
  )
}

export default SelectionList;

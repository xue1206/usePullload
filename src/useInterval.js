import {useRef, useEffect} from 'react';

/**
 * 
 * @param {function} callback 
 * @param {number} delay 
 * @param {boolean} isImmediately 是否开启立即执行，默认为开启
 * @returns {function} cancel interval
 */
function useInterval(callback, delay, isImmediately = true) {
    // console.log('in use interval', callback)
    let savedCallback = useRef();
    let intervalId = useRef();
    useEffect(() => {
        
        savedCallback.current = callback;

    },[callback]);
    useEffect(() => {

        function cb(){
            savedCallback.current();
        }
        isImmediately && cb();
        intervalId.current = setInterval(cb,delay);
        return () => {
            console.log('clear interval')
            clearInterval(intervalId.current);
        }
    }, [delay]);
    return () => {
        clearInterval(intervalId.current);
    }
}

export default useInterval;
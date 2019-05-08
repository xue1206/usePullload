import React, {useEffect, useRef, useState} from 'react';

async function delay(millseconds) {
    return await new Promise((res) => {
        setTimeout(res, millseconds);
    })
}

/**
 * 一段时间内出错重发
 */
function useTryTillSuc(query, canGo) {
    const canGoRef = useRef(canGo);
    const [result, setResult] = useState();

    useEffect(() => {
        canGoRef.current = canGo;
    }, [canGo]);

    useEffect(() => {
        async function tryTillSuc() {
            while(canGoRef.current) {
                try {
                    const result = await query();
                    setResult(result);
                    return;
                } catch(err) {
                    console.error(err);
                    await delay(1000);
                }
            }
        }
        tryTillSuc();
    }, []);
    
    return result;
}

export default useTryTillSuc;
import React, {useRef, useEffect, useState} from 'react';
import swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

function HorizontalPickerView() {
    const el = useRef();
    const [nowindex, setNowindex] = useState(0);

    useEffect(() => {
        new swiper(el.current, {
            slidesPerView: 3,
            centeredSlides: true,
            on:{
                slideChange(e,a){setNowindex(this.activeIndex)}
            }
        })
    }, [])
    return (
        <div className='swiper-container' ref={el}>
            <div className="swiper-wrapper" style={{height:'100px'}}>
                {
                    [...new Array(17)].map((a,i) => <div className='swiper-slide' style={{border:'1px solid',lineHeight:'100px', fontSize:nowindex===i?'100px':'10px'}}>{i}</div>)
                }
            </div>
        </div>
    )
}

export default HorizontalPickerView;
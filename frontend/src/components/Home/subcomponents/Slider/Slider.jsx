import { useEffect, useState } from "react";
import sliderBtnLeft from '../../../../icons/sliderBtnLeft.svg';
import sliderBtnRight from '../../../../icons/sliderBtnRight.svg';
import SliderNavBtn from "../SliderNavBtn/SliderNavBtn";
import './Slider.scss'
import SyncLoader from "react-spinners/SyncLoader";


const Slider = () => {
    const [counter, setCounter] = useState(0);
    const [slider, setSlider] = useState([]);
    const [sliderNavBtns, setSliderNavBtns] = useState([]);

    const [loading, setLoading] = useState(true);

    const fileExists = (url) => {
        let http = new XMLHttpRequest();

        http.open('HEAD', url, false);
        http.send();

        return http.status != 404;
    
    }

    const handleBtnLeft = () => {
        if (counter <= 0) {
            setCounter(slider.length - 1)
        } else {
            setCounter(prev => prev - 1);
        }
    }

    const handleBtnRight = () => {
        if (counter >= slider.length - 1) {
            setCounter(0)
        } else {
            setCounter(prev => prev + 1);
        }
    }

    const handleOnClickNavBtn = (index) => {
        setCounter(index);
    }

    useEffect(() => {

        let i = 1;
        let slides = [];
        while (i < 6 && fileExists(`http://localhost:8000/images/slider/${i}.jpg`) === true) {
            if (fileExists(`http://localhost:8000/images/slider/${i}.jpg`)) {
                slides = slides.concat({
                    url: `http://localhost:8000/images/slider/${i}.jpg`,
                    title: toString(i),
                })
            }
            i = i + 1
        }

        if (slides.length > 0) {
            setSlider(slides.map((slide, index) =>
                <div key={index} className="slide" style={{ left: `${index * 100}%`, transform: `translateX(-${counter * 100}%)` }}>
                    <img src={slide.url} alt="" />
                </div>
            ));

            let sliderNavBtns = []
            for (let index = 0; index < slides.length; index++) {
                sliderNavBtns = sliderNavBtns.concat(<SliderNavBtn key={index} index={index} activeIndex={counter} onClickHandler={() => {handleOnClickNavBtn(index)}} />)
            }
            setSliderNavBtns(sliderNavBtns);

        }

        setLoading(false)
    },[counter])

    
    return (
        <home-slider>
            <slider-top>
                <button type="button" className="prevBtn" onClick={handleBtnLeft}>
                    <img src={sliderBtnLeft} className="sliderBtnArrow"/>
                </button>
                <div className="slider-container">
                    {loading ? 
                        <SyncLoader color="#64C0D4" /> : slider
                    }
                </div>
                <button onClick={handleBtnRight} className="nextBtn">
                    <img src={sliderBtnRight} className="sliderBtnArrow"/>
                </button>
            </slider-top>
            <slider-nav>
                {sliderNavBtns}
            </slider-nav>
        </home-slider>
    );
}

export default Slider;
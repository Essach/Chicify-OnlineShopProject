import { useEffect, useState } from "react";
import sliderBtnRight from '../../../../icons/sliderBtnRight.svg';
import SliderNavBtn from "../SliderNavBtn/SliderNavBtn";
import './Slider.scss'
import SyncLoader from "react-spinners/SyncLoader";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../../firebase";


const Slider = () => {
    const [counter, setCounter] = useState(0);
    const [slider, setSlider] = useState([]);
    const [imageLinks, setImageLinks] = useState([])
    const [sliderNavBtns, setSliderNavBtns] = useState([]);

    const [loading, setLoading] = useState(true);

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
        if (imageLinks.length > 0) {
            setSlider(imageLinks.map((slide, index) =>
                <div key={index} className="slide" style={{ left: `${index * 100}%`, transform: `translateX(-${counter * 100}%)` }}>
                    <img src={slide} alt="" />
                </div>
            ));
        }
        setLoading(false)

    }, [counter, imageLinks])

    useEffect(() => {
        const listRef = ref(storage, 'chicifyImages/slider');
        listAll(listRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageLinks((prev)=>[...prev, url])
                })
            })
        })
    },[])

    useEffect(() => {
        const sliderInterval = setInterval(() => {
            if (counter >= slider.length - 1) {
                setCounter(0);
            } else {
                setCounter(prev => prev + 1);
            }
    
        }, 6000);

        return () => {
            clearInterval(sliderInterval);
        }
    }, [counter, slider.length])

    useEffect(() => {
        let sliderNavBtns = []
        for (let index = 0; index < imageLinks.length; index++) {
            sliderNavBtns = sliderNavBtns.concat(<SliderNavBtn key={index} index={index} activeIndex={counter} onClickHandler={() => {handleOnClickNavBtn(index)}} />)
        }
        setSliderNavBtns(sliderNavBtns);
    },[counter, imageLinks.length])

    return (
        <home-slider>
            <slider-top>
                <button type="button" className="prevBtn" onClick={handleBtnLeft}>
                    <img src={sliderBtnRight} className="sliderBtnArrow"/>
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
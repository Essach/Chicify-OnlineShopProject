import PropTypes from 'prop-types';

const SliderNavBtn = (props) => {
    const { index, activeIndex, onClickHandler } = props;

    return (
        <div className={index === activeIndex ? 'sliderNavBtnActive' : 'sliderNavBtn'} onClick={onClickHandler} >
        </div>
    );
}

SliderNavBtn.propTypes = {
    index: PropTypes.number,
    activeIndex: PropTypes.number,
    onClickHandler: PropTypes.func,
}

export default SliderNavBtn;
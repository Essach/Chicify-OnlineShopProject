import './Question.scss';
import PropTypes from 'prop-types';
import faqBtn from '../../../../icons/faqBtn.svg';
import { useState } from 'react';

const Question = (props) => {
    const { title, content } = props;

    const [isContentVisible, setIsContentVisible] = useState(false);

    const handleExpandBtn = () => {
        setIsContentVisible(prev => !prev);
    }

    return (
        <question-item>
            <question-top>
                <question-title>{title}</question-title>
                <expand-btn onClick={handleExpandBtn}>
                    <img src={faqBtn} alt='show answer' className={`expand-btn-${isContentVisible ? 'flipped' : 'normal'}`} />
                </expand-btn>
            </question-top>
            <div className={`question-bottom-${isContentVisible ? 'visible' : 'hidden'}`}>{content}</div>
        </question-item>
    );
}

Question.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
}

export default Question;
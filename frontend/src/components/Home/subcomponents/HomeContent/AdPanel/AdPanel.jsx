import { PropTypes } from 'prop-types';
import './AdPanel.scss';

const AdPanel = (props) => {
    const { imageUrl, title } = props;

    return (
        <ad-panel>
            <ad-panel-title>
                <p>{title}</p>
            </ad-panel-title>
            <ad-panel-img>
                <img src={imageUrl} alt={`${title} image`} />
            </ad-panel-img>
        </ad-panel>
    );
}

AdPanel.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
}

export default AdPanel;
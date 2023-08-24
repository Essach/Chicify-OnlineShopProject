import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const NavButton = (props) => {
    const {name, icon, text} = props

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(`/${name}`);
        navigate(0);
        window.scrollTo(0, 0);
    }

    return (
        <div onClick={handleOnClick}>
            <img src={icon} alt={`${name} button`} />
            {text !== '' ? <p>{text}</p> : null}
        </div>
    );
}

NavButton.propTypes = {
    name: PropTypes.string,
    icon: PropTypes.any,
    text: PropTypes.string
}

export default NavButton;
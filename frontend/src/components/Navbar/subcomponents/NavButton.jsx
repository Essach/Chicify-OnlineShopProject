import PropTypes from 'prop-types';

const NavButton = (props) => {
    const {name, icon, text, handleOnClick} = props

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
    text: PropTypes.string,
    handleOnClick: PropTypes.func,
}

export default NavButton;
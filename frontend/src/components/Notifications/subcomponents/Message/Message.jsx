import './Message.scss';
import PropTypes from 'prop-types';

const Message = ({ content, type }) => {
    let messageClass;
    if (type === 'received') {
        messageClass = 'message-received'
    } else if (type === 'sent') {
        messageClass = 'message-sent'
    } else {
        messageClass = 'unknown'
    }

    return (
        <message-box>
            <div className={messageClass}>
                <p>{content}</p>
            </div>
        </message-box>
    );
}

Message.propTypes = {
    content: PropTypes.string,
    type: PropTypes.string,
}

export default Message;
import { useContext, useState } from 'react';
import sendMessage from '../../../icons/sendMessage.svg';
import PropTypes from 'prop-types';
import request from '../../../helpers/request';
import { StoreContext } from '../../../store/StoreProvider';
import { updateUser } from '../../../helpers/localStorage';

const NewMessage = (props) => {
    const { recipientId, userId } = props;

    const [content, setContent] = useState('');

    const [isShiftClicked, setIsShiftClicked] = useState(false);

    const { setUser } = useContext(StoreContext);

    const handleChangeContent = e => {
        if (e.target.value.length < 200) {
            setContent(e.target.value)
        }
    }   

    const handleSendMessageEnter = (e) => {
        if (e.key === 'Shift') {
            setIsShiftClicked(true);
        } else if (e.key === "Enter" && isShiftClicked === false) {
            handleSendMessage();
            setIsShiftClicked(false);
        } else {
            setIsShiftClicked(false);
        }
    }

    const handleSendMessage = async () => {
        const { data, status } = await request.patch('/users/message', { senderId: userId, recipientId: "912e2088-0f0e-4e25-b844-3695ac238609", content: content });
        if (status === 200) {
            setIsShiftClicked(false);
            setContent('');
            setUser(data.user);
            updateUser(data.user);
        } else {
            throw new Error(data.message);
        }
    }

    return (
        <new-message-section>
            <textarea placeholder='Type your message...' value={content} onChange={handleChangeContent} onKeyDown={handleSendMessageEnter}/>
            <send-message-btn onClick={handleSendMessage}>
                <img src={sendMessage} alt='send message'/>
            </send-message-btn>
        </new-message-section>
    );
}

NewMessage.propTypes = {
    recipientId: PropTypes.string,
    userId: PropTypes.string,
}

export default NewMessage;
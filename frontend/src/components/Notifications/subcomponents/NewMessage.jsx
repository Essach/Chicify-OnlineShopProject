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

    const { setUser, languageMode, user } = useContext(StoreContext);

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
        const contentCopy = content;

        const userConversationsTemporary = user.conversations.map((item) => {
            if (item.recipientId === recipientId) {
                item.messages.push({
                    type: 'sent',
                    content: content,
                })
            }
            return item
        });
        setUser({...user, conversations: userConversationsTemporary})
        setIsShiftClicked(false);
        setContent('');

        const { data, status } = await request.patch('/users/message', { senderId: userId, recipientId: recipientId, content: contentCopy });

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
            <textarea placeholder={languageMode === 'en' ? 'Type your message...' : 'Wprowadź wiadomość...'} value={content} onChange={handleChangeContent} onKeyDown={handleSendMessageEnter}/>
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
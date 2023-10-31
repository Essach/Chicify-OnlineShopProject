import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import request from '../../../helpers/request';
import Message from './Message/Message';
import NewMessage from './NewMessage';
import arrowIcon from '../../../icons/arrowLeftWhite.svg';

const NotificationsConversation = (props) => {
    const { recipientId, user, handleToggleMessagesMobile } = props;

    const [recipientName, setRecipientName] = useState('');

    const [messages, setMessages] = useState([])

    const messagesRef = useRef();

    const fetchRecipientName = async () => {
        const { status, data } = await request.get(`/users/${recipientId}`);
        if (status === 200) {
            setRecipientName(data.username);
        }
    }

    useEffect(() => {
        if (recipientId !== undefined) {
            fetchRecipientName();
            const conversation = user.conversations.find(conversation => conversation.recipientId === recipientId);
            const messages = conversation.messages.slice().reverse().map((message, index) => <Message key={index} content={message.content} type={message.type} />);
            setMessages(messages);
        }

    },[recipientId, user.conversations])

    return (
        <conversation-section>
            {recipientId !== undefined && <>
                <user-info>
                    <img src={arrowIcon} alt='show message selection' className='menu' onClick={handleToggleMessagesMobile}/>
                    {recipientName}
                </user-info>
                <conversation-messages ref={messagesRef}>
                    {messages}
                </conversation-messages>
                <NewMessage recipientId={recipientId} userId={user.userId} />
            </>}
        </conversation-section>
    );
}

NotificationsConversation.propTypes = {
    recipientId: PropTypes.string,
    user: PropTypes.object,
    handleToggleMessagesMobile: PropTypes.func,
}

export default NotificationsConversation;
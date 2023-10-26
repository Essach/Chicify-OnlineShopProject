import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import request from '../../../helpers/request';
import Message from './Message/Message';
import NewMessage from './NewMessage';

const NotificationsConversation = (props) => {
    const { recipientId, user } = props;

    const [recipientName, setRecipientName] = useState('');

    const [messages, setMessages] = useState([])

    const fetchRecipientName = async () => {
        const { status, data } = await request.get(`/users/${recipientId}`);
        if (status === 200) {
            setRecipientName(data.username);
        }
    }

    useEffect(() => {
        fetchRecipientName();
        const conversation = user.conversations.find(conversation => conversation.recipientId === Number(recipientId));
        const messages = conversation.messages.map((message,index) => <Message key={index} content={message.content} type={message.type} />);
        setMessages(messages);
        // console.log(Math.round(Math.random()*100000))

    },[recipientId])

    return (
        <conversation-section>
            <user-info>
                {recipientName}
            </user-info>
            <conversation-messages>
                {messages}
            </conversation-messages>
            <NewMessage />
        </conversation-section>
    );
}

NotificationsConversation.propTypes = {
    recipientId: PropTypes.string,
    user: PropTypes.object,
}

export default NotificationsConversation;
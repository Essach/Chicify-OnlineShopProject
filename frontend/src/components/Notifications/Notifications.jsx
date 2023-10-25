import { useNavigate, useParams } from 'react-router';
import './Notifications.scss';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import notificationsIcon from '../../icons/notifications.svg';
import sendMessage from '../../icons/sendMessage.svg';
import request from '../../helpers/request';

const Notifications = () => {
    const { id: recipientId } = useParams();

    const { user } = useContext(StoreContext);

    const [notificationItems, setNotificationItems] = useState([])

    const navigate = useNavigate();

    const fetchNotificationNames = async () => {
        let names = []
        const copiedUserConversations = [...user.conversations].filter(conv => conv.messages[conv.messages.length - 1].type === 'received');
        for (let i = 0; i < 2; i++) {
            if (copiedUserConversations.reverse()[i] !== undefined) {
                let { status, data } = await request.get(`/users/${copiedUserConversations.reverse()[i].recipientId}`);
                if (status === 200) {
                    names.push(data.username)
                }
            }
        }

        names.reverse();
        return names
    }

    const createNotificationItems = async () => {
        const names = await fetchNotificationNames();
        if (names) {
            const copiedUserConversations = [...user.conversations].filter(conv => conv.messages[conv.messages.length - 1].type === 'received');

            setNotificationItems(copiedUserConversations.reverse().splice(0, 2).map((item, index) => (
                <notification-item key={item.recipientId} onClick={() => {
                    navigate(`/notifications/${item.recipientId}`);
                }}>
                    <notification-message>
                        {item.messages[item.messages.length - 1].content}
                    </notification-message>
                    <notification-user>
                        {names[index]}
                    </notification-user>
                </notification-item>
            )))
        }
    }

    useEffect(() => {
        if (user) {
            createNotificationItems()
        }
    }, [user])

    return (
        <notifications-page-container>
            <notifications-page>
                <messages-section>
                    <page-title>
                        <img src={notificationsIcon} alt="notifications icon" />
                        <p>Notifications</p>
                    </page-title>
                    <messages-selection>
                        {notificationItems}
                    </messages-selection>
                </messages-section>
                <conversation-section>
                    <user-info>

                    </user-info>
                    <conversation-messages>

                    </conversation-messages>
                    <new-message-section>
                        <input type="text" />
                        <send-message-btn>
                            <img src={sendMessage} alt='send message'/>
                        </send-message-btn>
                    </new-message-section>
                </conversation-section>
            </notifications-page>
        </notifications-page-container>
    );
}

export default Notifications;
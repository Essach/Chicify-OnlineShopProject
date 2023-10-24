import { useContext, useEffect, useState } from 'react';
import notificationsIcon from '../../../../../icons/notifications.svg';
import { StoreContext } from '../../../../../store/StoreProvider';
import './NotificationWindow.scss';
import request from '../../../../../helpers/request';

const NotificationWindow = () => {
    const { user } = useContext(StoreContext)

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOnClickButton = () => setIsPopupOpen(prev=>!prev)

    const [notificationItems, setNotificationItems] = useState([])

    const fetchNotificationNames = async () => {
        let names = []
        const copiedUserConversations = [...user.conversations];
        for (let i = 0; i < 2; i++) {
            if (copiedUserConversations.reverse()[i] !== undefined) {
                let { status, data } = await request.get(`/users/${copiedUserConversations.reverse()[i].recipientId}`);
                if (status === 200) {
                    names.push(data.username)
                } else {
                    return
                }
            }
            return names
        }
    }

    const createNotificationItems = async () => {
        const names = await fetchNotificationNames();
        console.log(names)
        if (names) {
            const copiedUserConversations = [...user.conversations];
            setNotificationItems(copiedUserConversations.reverse().splice(0, 2).map((item, index) => (
                <notification-item key={item.recipientId}>
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
    },[user])

    return (
        <notification-window>
            <img src={notificationsIcon} alt='notifications' onClick={handleOnClickButton}/>
            <div className={`notification-popup-${isPopupOpen ? 'visible' : 'hidden'}`}>
                {notificationItems}
            </div>
        </notification-window>
    );
}

export default NotificationWindow;
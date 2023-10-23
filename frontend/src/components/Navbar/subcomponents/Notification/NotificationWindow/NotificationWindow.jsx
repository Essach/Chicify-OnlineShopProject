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
    const [notificationNames, setNotificationNames] = useState([])

    const fetchNotificationNames = async () => {
        let names = []
        const copiedUserConversations = [...user.conversations];
        for (let i = 0; i < 2; i++) {
            if (copiedUserConversations.reverse()[i] !== undefined) {
                let { status, data } = await request.get(`/users/${copiedUserConversations.reverse()[i].recipientId}`);
                if (status === 200) {
                    names.push(data.username)
                } else {
                    // console.log(status)
                }
            }
            return names
        }
    }

    useEffect(() => {
        if (user) {
            fetchNotificationNames();
            const copiedUserConversations = [...user.conversations];
            setNotificationItems(copiedUserConversations.reverse().splice(0, 2).map((item, index) => (
                <notification-item key={item.recipientId}>
                    <notification-message>
                        {item.messages[item.messages.length - 1].content}
                    </notification-message>
                    <notification-user>
                        {notificationNames[index]}
                    </notification-user>
                </notification-item>
            )))
            // const copiedUserConversations = [...user.conversations];
            // setNotificationItems(copiedUserConversations.reverse().splice(0, 2).map((item, index) => (
            //     <notification-item key={item.recipientId}>
            //         <notification-message>
            //             {item.messages[item.messages.length - 1].content}
            //         </notification-message>
            //         <notification-user>
            //             {notificationNames[index]}
            //         </notification-user>
            //     </notification-item>
            // )))
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
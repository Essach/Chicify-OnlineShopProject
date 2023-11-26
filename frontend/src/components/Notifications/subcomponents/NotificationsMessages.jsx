import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import notificationsIcon from '../../../icons/notifications.svg';
import closeIcon from '../../../icons/close.svg';
import request from "../../../helpers/request";
import PropTypes from 'prop-types';
import { StoreContext } from "../../../store/StoreProvider";


const NotificationsMessages = ({user, isOpenMobile, handleToggleMessagesMobile}) => {

    const [notificationItems, setNotificationItems] = useState([])

    const navigate = useNavigate();

    const { languageMode } = useContext(StoreContext);

    const fetchNotificationNames = async () => {
        let names = []
        const copiedUserConversations = [...user.conversations]
        for (let i = 0; i < copiedUserConversations.length; i++) {
            if (copiedUserConversations.slice().reverse()[i] !== undefined) {
                let { status, data } = await request.get(`/users/${copiedUserConversations[i].recipientId}`);
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
            const copiedUserConversations = [...user.conversations]
            setNotificationItems(copiedUserConversations.slice().reverse().map((item, index) => (
                <notification-item key={item.recipientId} onClick={() => {
                    navigate(`/notifications/${item.recipientId}`);
                    handleToggleMessagesMobile();
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
        <div className={`messages-section-${isOpenMobile ? 'open' : 'hidden'}`}>
            <page-top>
                <page-title>
                    <img src={notificationsIcon} alt="notifications icon" />
                    <p>{languageMode === 'en' ? 'Notifications' : 'Powiadomienia'}</p>
                </page-title>
                <close-btn onClick={handleToggleMessagesMobile}>
                    <img src={closeIcon} alt="go back to conversation" />
                </close-btn>
            </page-top>
            <messages-selection>
                {notificationItems}
            </messages-selection>
        </div>
    );
}

NotificationsMessages.propTypes = {
    user: PropTypes.object,
    isOpenMobile: PropTypes.bool,
    handleToggleMessagesMobile: PropTypes.func,
}

export default NotificationsMessages;
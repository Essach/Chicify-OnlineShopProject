import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import notificationsIcon from '../../../icons/notifications.svg';
import request from "../../../helpers/request";
import PropTypes from 'prop-types';

const NotificationsMessages = ({user}) => {

    const [notificationItems, setNotificationItems] = useState([])

    const navigate = useNavigate();

    const fetchNotificationNames = async () => {
        let names = []
        const copiedUserConversations = [...user.conversations]
        for (let i = 0; i < copiedUserConversations.length; i++) {
            if (copiedUserConversations.slice().reverse()[i] !== undefined) {
                let { status, data } = await request.get(`/users/${copiedUserConversations.slice().reverse()[i].recipientId}`);
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
        <messages-section>
            <page-title>
                <img src={notificationsIcon} alt="notifications icon" />
                <p>Notifications</p>
            </page-title>
            <messages-selection>
                {notificationItems}
            </messages-selection>
        </messages-section>
    );
}

NotificationsMessages.propTypes = {
    user: PropTypes.object,
}

export default NotificationsMessages;
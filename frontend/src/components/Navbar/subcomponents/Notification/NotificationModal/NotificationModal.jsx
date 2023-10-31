import './NotificationModal.scss';
import Modal from '../../../../Modal/Modal';
import PropTypes from 'prop-types';
import notificationsIcon from '../../../../../icons/notifications.svg';
import closeIcon from '../../../../../icons/close.svg';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../../../store/StoreProvider';
import { useNavigate } from 'react-router';
import request from '../../../../../helpers/request';

const NotificationModal = ({ handleOnClose, isModalOpen }) => {
    const [notificationItems, setNotificationItems] = useState([]);

    const { user } = useContext(StoreContext);

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
                    handleOnClose();
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
    }, [user]);

    useEffect(() => {
        const resizeFunc = () => {
            handleOnClose()
        }

        window.addEventListener('resize', resizeFunc);

        return () => {
            window.removeEventListener('resize', resizeFunc);
        }
    },[])

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeClosedOnOutsideClick={true}>
            <notifications-dialog>
                <n-top>
                    <n-title>
                        <img src={notificationsIcon} alt='notifications icon' />
                        <p>Notifications</p>
                    </n-title>
                    <n-close>
                        <img src={closeIcon} alt='close notifications' onClick={handleOnClose}/>
                    </n-close>
                </n-top>
                <n-messages>
                    {notificationItems}
                </n-messages>
            </notifications-dialog>
        </Modal>
    );
}

NotificationModal.propTypes = {
    handleOnClose: PropTypes.func,
    isModalOpen: PropTypes.bool,
}

export default NotificationModal;
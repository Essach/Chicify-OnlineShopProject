import { useContext, useEffect, useRef, useState } from 'react';
import notificationsIcon from '../../../../../icons/notifications.svg';
import { StoreContext } from '../../../../../store/StoreProvider';
import './NotificationWindow.scss';
import request from '../../../../../helpers/request';
import { useNavigate } from 'react-router';

const NotificationWindow = () => {
    const { user } = useContext(StoreContext)

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const popupRef = useRef();
    const btnRef = useRef();

    const navigate = useNavigate();

    const handleOnClickButton = () => setIsPopupOpen(prev=>!prev)

    const [notificationItems, setNotificationItems] = useState([])

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
                    setIsPopupOpen(false);
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

    useEffect(() => {
        window.addEventListener('resize', ()=>setIsPopupOpen(false));

        return () => {
            window.removeEventListener('resize', ()=>setIsPopupOpen(false));
        }
    },[])
    
    useEffect(() => {
        const clickFunc = (e) => {
            const mousePos = {x: e.clientX, y: e.clientY };
            const mousePosX = mousePos.x;
            const mousePosY = mousePos.y;
            const popupArea = popupRef.current.getBoundingClientRect();
            const btnArea = btnRef.current.getBoundingClientRect();

            if (mousePosX > popupArea.right || mousePosX < popupArea.left || mousePosY > popupArea.bottom || mousePosY < btnArea.top) {
                setIsPopupOpen(false)
            }
        }

        window.addEventListener('click', clickFunc);

        return () => {
            window.removeEventListener('click', clickFunc);
        }

    },[])

    return (
        <notification-window>
            <img src={notificationsIcon} alt='notifications' onClick={handleOnClickButton} ref={btnRef}/>
            <div className={`notification-popup-${isPopupOpen ? 'visible' : 'hidden'}`} ref={popupRef}>
                {notificationItems}
            </div>
        </notification-window>
    );
}

export default NotificationWindow;
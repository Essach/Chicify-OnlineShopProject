import { useParams } from 'react-router';
import './Notifications.scss';
import { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import NotificationsMessages from './subcomponents/NotificationsMessages';
import NotificationsConversation from './subcomponents/NotificationsConversation';
import Login from '../Login/Login';

const Notifications = () => {
    const { id: recipientId } = useParams();

    const { user } = useContext(StoreContext);

    const [isMessagesOpenMobile, setIsMessagesOpenMobile] = useState(false);

    const handleToggleMessagesMobile = () => {
        setIsMessagesOpenMobile(prev => !prev);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenLogin = () => setIsModalOpen(true);
    const handleOnCloseLogin = () => setIsModalOpen(false);

    return (
        <>
            {user === null || user === undefined ?
                <login-request>
                    <p>Please login to see your messages</p>
                    <login-btn onClick={handleOpenLogin}>Login</login-btn>
                    <Login handleOnClose={handleOnCloseLogin} isModalOpen={isModalOpen} />
                </login-request> :
                <notifications-page-container>
                    <notifications-page>
                        {user !== undefined && <>
                            <NotificationsMessages user={user} isOpenMobile={isMessagesOpenMobile} handleToggleMessagesMobile={handleToggleMessagesMobile} />
                            {recipientId !== undefined ?
                                <NotificationsConversation recipientId={recipientId} user={user} handleToggleMessagesMobile={handleToggleMessagesMobile} /> :
                                <NotificationsConversation user={user} handleToggleMessagesMobile={handleToggleMessagesMobile} />
                            }
                        </>
                        }
                    </notifications-page>
                </notifications-page-container>
            }
        </>
    );
}

export default Notifications;
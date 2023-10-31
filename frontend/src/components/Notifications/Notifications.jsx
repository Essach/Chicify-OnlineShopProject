import { useParams } from 'react-router';
import './Notifications.scss';
import { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import NotificationsMessages from './subcomponents/NotificationsMessages';
import NotificationsConversation from './subcomponents/NotificationsConversation';

const Notifications = () => {
    const { id: recipientId } = useParams();

    const { user } = useContext(StoreContext);

    const [isMessagesOpenMobile, setIsMessagesOpenMobile] = useState(false);

    const handleToggleMessagesMobile = () => {
        setIsMessagesOpenMobile(prev => !prev);
    }

    return (
        <notifications-page-container>
            <notifications-page>
                {user !== undefined && <>
                    <NotificationsMessages user={user} isOpenMobile={isMessagesOpenMobile} handleToggleMessagesMobile={handleToggleMessagesMobile} />
                    {recipientId !== undefined ?
                        <NotificationsConversation recipientId={recipientId} user={user} handleToggleMessagesMobile={handleToggleMessagesMobile} /> :
                        <NotificationsConversation user={user} handleToggleMessagesMobile={handleToggleMessagesMobile}/>
                    }
                </>
                }
            </notifications-page>
        </notifications-page-container>
    );
}

export default Notifications;
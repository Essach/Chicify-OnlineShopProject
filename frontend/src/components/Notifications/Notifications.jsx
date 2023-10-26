import { useParams } from 'react-router';
import './Notifications.scss';
import { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import NotificationsMessages from './subcomponents/NotificationsMessages';
import NotificationsConversation from './subcomponents/NotificationsConversation';

const Notifications = () => {
    const { id: recipientId } = useParams();

    const { user } = useContext(StoreContext);


    return (
        <notifications-page-container>
            <notifications-page>
                <NotificationsMessages user={user} />
                <NotificationsConversation recipientId={recipientId} user={user} />
            </notifications-page>
        </notifications-page-container>
    );
}

export default Notifications;
import { useParams } from 'react-router';
import './Notifications.scss';
import { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import NotificationsMessages from './subcomponents/NotificationsMessages';
import NotificationsConversation from './subcomponents/NotificationsConversation';

const Notifications = () => {
    const { id: recipientId } = useParams();

    // const [userRealTime, setUserRealTime] = useState()

    const { user } = useContext(StoreContext);


    return (
        <notifications-page-container>
            <notifications-page>
                {user !== undefined && <>
                    <NotificationsMessages user={user} />
                    {recipientId !== undefined ?
                        <NotificationsConversation recipientId={recipientId} user={user} /> :
                        <NotificationsConversation user={user} />
                    }
                </>
                }
            </notifications-page>
        </notifications-page-container>
    );
}

export default Notifications;
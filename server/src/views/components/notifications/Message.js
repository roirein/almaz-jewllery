import {Stack, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import AppContext from '../../context/appContext';
import {useContext} from 'react'
import messages from '../../i18n'
import axios from 'axios';
import {useRouter} from 'next/router'

const MessageComponent = (props) => {
    const intl = useIntl();

    const contextValue = useContext(AppContext);
    const router = useRouter();

    const handleOnClick = async () => {
        const order = JSON.parse(props.content)
        if (!props.isHandles) {
            const response = await axios.patch(`${process.env.SERVER_URL}/notifications/markNotificationCreated/${props.notificationId}`, {} , {
                headers: {
                    'Authorization': `Bearer ${contextValue.token}`
                }
            })
            const notifications = [...contextValue.notifications];
            const notificationIndex = notifications.map(notification => notification.id).indexOf(response.data.notification.id);
            notifications[notificationIndex] = response.data.notification
            contextValue.setNotifications(notifications)
        }
        router.push(`/order-management/${order.orderId}`)

    }

    return (
        <Stack
            onClick={() => handleOnClick()}
            sx={{
                width: '100%',
                padding: '12px',
                backgroundColor: props.isHandled ? 'white' : '#aec4e6',
                borderBottom: `1px solid grey`,
                cursor: 'pointer'
            }}
        >
            <Typography
                variant="body1"
            >
                {intl.formatMessage(messages.newOrderMessage)}
            </Typography>
        </Stack>
    )
}

export default MessageComponent
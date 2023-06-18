import {Stack, Typography} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AppContext from '../../context/appContext';
import {useContext} from 'react'
import messages from '../../i18n'
import axios from 'axios';
import {useRouter} from 'next/router'

const MessageComponent = (props) => {

    const contextValue = useContext(AppContext);
    const router = useRouter();

    const handleOnClick = async () => {
        if (!props.isHandled) {
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
        props.onClick()

    }

    console.log(props.message)

    return (
        <Stack
            onClick={() => handleOnClick()}
            direction="row"
            sx={{
                width: '100%',
                backgroundColor: props.isHandled ? 'white' : '#aec4e6',
                borderBottom: `1px solid grey`,
                cursor: 'pointer',
                padding: '8px'
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    mr: '8px',
                    textAlign: 'right'
                }}
            >
                {props.message}
            </Typography>
            <Stack
                sx={{
                    mr: '12px'
                }}
            >
                {props.icon}
            </Stack>    
        </Stack>
    )
}

export default MessageComponent
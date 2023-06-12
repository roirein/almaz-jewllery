import {Popover, Stack} from '@mui/material'
import MessageComponent from './Message';

const NotificationPopoverComponet = (props) => {
    return (
        <Popover
            open={props.open}
            onClose={props.onClose}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'top'
            }}
        >
            <Stack>
                {props.notifications.map((notification) => (
                    <MessageComponent
                        isHandled={notification.isHandled}
                        notificationId={notification.id}
                        content={notification.content}
                    />
                ))}
            </Stack>
        </Popover>
    )
}

export default NotificationPopoverComponet;
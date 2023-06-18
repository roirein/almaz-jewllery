import {Popover, Stack} from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MessageComponent from './Message';
import {useIntl} from 'react-intl';
import { notificationMessages } from '../../i18n';

const NotificationPopoverComponet = (props) => {

    const intl = useIntl();

    const getMessageProps = (notification) => {
        let res = {}
        switch (notification.type) {
            case 'newCustomer': 
                res = {
                    icon: <PersonAddAltIcon/>,
                    message: intl.formatMessage(notificationMessages.newCustomerNotificationMessage, {name: notification.resourceId})
                }
                break;
            default: {
                res = null
            }
        }
        return res
    }

    return (
        <Popover
            open={props.open}
            onClose={props.onClose}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'top'
            }}
            sx={{
                maxHeight: '200px',
                overflowY: 'auto',
                width: '400px',
                mt: '48px'
            }}
        >
            <Stack>
                {props.notifications.map((notification) => {
                    const messageProps = getMessageProps(notification)
                    return (
                        <MessageComponent
                            isHandled={notification.isHandled}
                            notificationId={notification.id}
                            icon={messageProps.icon}
                            message={messageProps.message}

                        />
                    )
                })}
            </Stack>
        </Popover>
    )
}

export default NotificationPopoverComponet;
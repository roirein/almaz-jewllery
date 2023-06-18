import {Snackbar, Alert, Typography} from '@mui/material'
import {useIntl} from 'react-intl';
import { notificationMessages } from '../../i18n';

const NotificationSnackbarComponent = (props) => {

    const intl = useIntl();

    const getMessage = () => {
        let message;
        switch(props.type) {
            case 'newCustomer':
                message = intl.formatMessage(notificationMessages.newCustomerNotification);
                break;
            default: 
                message = null
        }

        return message
    }

    return (
        <Snackbar
            open={true}
            autoHideDuration={4000}
            onClose={() => props.onClose()}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            sx={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Alert
                onClose={() => props.onClose()}
                severity="info"
                sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #a05444',
                    borderTop: `10px solid #a05444`,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        textAlign: 'right',
                        color: '#a05444',
                        // mt: '4px',
                        // mr: '8px'
                    }}
                >
                    {getMessage()}
                </Typography>
            </Alert>
        </Snackbar>
    )
}

export default NotificationSnackbarComponent
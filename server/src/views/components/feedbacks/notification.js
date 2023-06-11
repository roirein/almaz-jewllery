import {Snackbar, Alert, Typography} from '@mui/material'

const NotificationComponent = (props) => {
    return (
        <Snackbar
            open={true}
            autoHideDuration={4000}
            onClose={() => props.onClose()}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            sx={{
                width: '30%'
            }}
        >
            <Alert
                severity={props.color}
                onClose={() => props.onClose()}
                sx={{
                    width: '100%'
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        marginLeft: '24px'
                    }}
                >
                    {props.message}
                </Typography>
            </Alert>
        </Snackbar>
    )
}   

export default NotificationComponent
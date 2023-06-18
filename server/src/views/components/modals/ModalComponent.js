import {Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material'

const ModalComponent = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    border: '5px solid #a05444',
                    borderTop: '15px solid #a05444'
                }
            }}
        >
            <DialogTitle
                variant='h6'
                sx={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                }}
            >
                {props.title}
            </DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.actions}
            </DialogActions>
        </Dialog>
    )
}

export default ModalComponent;
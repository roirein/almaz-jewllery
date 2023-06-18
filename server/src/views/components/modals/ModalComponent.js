import {Dialog, DialogContent, DialogTitle, DialogActions} from '@mui/material'

const ModalComponent = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
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
import { ORDER_TYPES } from "../../../consts/system-consts"
import NewModelFormComponent from "../forms/NewModelForm";
import {Dialog, DialogActions, DialogTitle, DialogContent} from '@mui/material';
import {useIntl} from 'react-intl';
import messages from '../../i18n'

const NewOrderModalComponent = (props) => {
    const intl = useIntl()
    return (
        <Dialog
            open={true}
            onClose={() => props.onClose()}
        >
            <DialogTitle>
                {intl.formatMessage(messages.createNewOrder)}
            </DialogTitle>
            <DialogContent>
                {props.orderType === ORDER_TYPES.NEW_MODEL && (
                    <NewModelFormComponent/>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default NewOrderModalComponent

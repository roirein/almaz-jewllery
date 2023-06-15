import {useRef, useContext} from 'react';
import AppContext from '../../context/appContext';
import {ORDER_TYPES} from "../../../consts/system-consts"
import NewModelFormComponent from "../forms/NewModelForm";
import {Dialog, DialogActions, DialogTitle, DialogContent, Button, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import messages from '../../i18n';
import {useForm, FormProvider} from 'react-hook-form';
import axios from 'axios'
import { HTTP_STATUS_CODE } from '../../../consts/http-consts';
import ModelForm from '../forms/ModelForm';

const NewModelModalComponent = (props) => {

    const submitRef = useRef(null);
    const contextValue = useContext(AppContext) 

    const intl = useIntl();
    const methods = useForm({
        defaultValues: props.modelData ? props.modelData : {}
    });
    const onSubmit = (data) => {
        props.onSubmit(data)
        props.onClose()
    }

    return (
        <Dialog
            open={true}
            onClose={() => props.onClose()}
            fullWidth
            maxWidth="sm"
        >
            <div
                style={{direction: 'rtl'}}
            >
                <DialogTitle>
                    {intl.formatMessage(messages.createNewModel)}
                </DialogTitle>
                <DialogContent>
                    <FormProvider {...methods}>
                        <form
                            id="order-form"
                            onSubmit={methods.handleSubmit(onSubmit)}
                            style={{
                                width: '100%'
                            }}
                        >
                            <ModelForm/>
                            <button
                                style={{
                                    display: 'none'
                                }}
                                type="submit"
                                aria-label='hidden'
                                ref={submitRef}
                            />
                        </form>
                    </FormProvider>
                </DialogContent>
                <DialogActions>
                    <Stack
                        direction="row"
                        sx={{
                            columnGap: "12px"
                        }}
                    >
                        <Button
                            variant="outlined"
                        >
                            {intl.formatMessage(messages.cancel)}
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            form="order-form"
                        >
                            {intl.formatMessage(messages.send)}
                        </Button>
                    </Stack>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default NewModelModalComponent

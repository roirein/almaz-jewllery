import {useRef} from 'react';
import {Dialog, DialogActions, DialogTitle, DialogContent, TextField, InputLabel, Stack, Button} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import {useIntl} from 'react-intl';
import messages from '../../i18n'

const ModelReviewModalComponent = (props) => {
    const intl = useIntl();
    const submitRef = useRef(null);
    const {control, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        props.onSubmit(data)
    }

    return (
        <Dialog
            open={true}
            onClose={() => props.onClose()}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {intl.formatMessage(messages.modelComments)}
            </DialogTitle>
            <DialogContent>
                <Stack
                    sx={{
                        width: '100%'
                    }}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        id="model-form"
                        style={{
                            width: '100%'
                        }}
                    >
                        <Controller
                            name="comments"
                            control={control}
                            rules={{
                                required: true
                            }}
                            render={({field}) => (
                                <Stack
                                    sx={{width: '100%'}}
                                >
                                    <InputLabel>
                                        {intl.formatMessage(messages.modelComments)}
                                    </InputLabel>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        inputRef={null}
                                        error={errors && errors.coments}
                                        multiline
                                        rows={3}
                                    />
                                    {errors && errors.commnets && (
                                        <Typography
                                            color="red"
                                            variant="body2"
                                        >
                                            {intl.formatMessage(messages.emptyField)}
                                        </Typography>
                                    )}
                                </Stack>
                            )}
                        />
                        <button
                            type="submit"
                            ref={submitRef}
                            aria-label="hidden"
                            style={{
                                display: 'none'
                            }}
                        />
                    </form>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Stack
                    direction="row"
                    sx={{
                        columnGap: "12px"
                    }}
                >
                    <Button
                        //onClick={props.onClose()}
                        variant="outlined"
                    >
                        {intl.formatMessage(messages.cancel)}
                    </Button>
                    <Button
                        variant="contained"
                        form="model-form"
                        type="submit"
                    >
                        {intl.formatMessage(messages.send)}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}

export default ModelReviewModalComponent
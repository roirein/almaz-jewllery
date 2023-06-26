import {TextField, Stack} from '@mui/material';
import {useFormContext, Controller} from 'react-hook-form';
import ErrorLabelComponent from '../Labels/ErrorLabel';
import InputLabelComponent from '../Labels/InputLabel';

const FormTextAreaComponent =  (props) => {

    const {control, formState: {errors}, getValues} = useFormContext(); 

    return (
        <Controller
            name={props.name}
            control={control}
            defaultValue={getValues(props.name)}
            rules={props.rules}
            render={({field}) => (
                <Stack
                    direction="column"
                >
                    <InputLabelComponent
                        label={props.fieldLabel}
                    />
                    <TextField
                        {...field}
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        inputRef={null}
                        errors={errors && errors[props.name]}
                        onBlur={() => props.onBlur()}
                        readonly={props.readonly || false}
                    />
                    {errors && errors[props.name] && (
                        <ErrorLabelComponent
                            label={errors[props.name].message}
                        />
                    )}
                </Stack>
            )}
        />
    )
}

export default FormTextAreaComponent
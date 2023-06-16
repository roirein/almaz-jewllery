import {TextField, Stack, IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {useFormContext, Controller, useWatch} from 'react-hook-form';
import ErrorLabelComponent from '../Labels/ErrorLabel';
import InputLabelComponent from '../Labels/InputLabel';
import {useState} from 'react';

const FormPasswordFieldComponent =  (props) => {

    const {control, formState: {errors}, getValues} = useFormContext(); 
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            name={props.name}
            control={control}
            defaultValue={getValues(props.name)}
            rules={props.fieldToWatch ? {
                ...props.rules,
                validate: {
                    isEqualTo: (value) => value === getValues(props.fieldToWatch) || props.errMessage
                }
            } : props.rules}
            render={({field}) => (
                <Stack
                    direction="column"
                >
                    <InputLabelComponent
                        label={props.fieldLabel}
                    />
                    <TextField
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        inputRef={null}
                        errors={errors && errors[props.name]}
                        onBlur={() => props.onBlur()}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <Visibility/> 
                                    ) : (
                                        <VisibilityOff/>
                                    )}
                                </IconButton>
                            )
                        }}
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

export default FormPasswordFieldComponent
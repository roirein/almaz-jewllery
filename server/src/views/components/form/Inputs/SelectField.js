import {Stack, Select, MenuItem} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import ErrorLabelComponent from '../Labels/ErrorLabel';
import InputLabelComponent from '../Labels/InputLabel';

const SelectFieldComponent = (props) => {

    const {control, formState: {errors}, getValues} = useFormContext(); 

    return (
        <Controller
            name={props.name}
            control={control}
            rules={props.rules}
            render={({field}) => (
                <Stack
                    direction="column"
                    sx={{
                        width: '100%'
                    }}
                >
                    <InputLabelComponent
                        label={props.fieldLabel}
                    />
                    <Select
                        {...field}
                        fullWidth
                        inputRef={null}
                        errors={errors && errors[props.name]}
                        onBlur={() => props?.onBlur()}
                    >
                        {props.items.map((item) => (
                            <MenuItem
                                value={item.value}
                                sx={{
                                    direction: 'rtl'
                                }}
                            >
                                {item.label}
                            </MenuItem> 
                        ))}
                    </Select>
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

export default SelectFieldComponent
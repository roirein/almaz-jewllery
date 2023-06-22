import { Switch, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import InputLabelComponent from '../Labels/InputLabel';

const FormSwitchComponent = (props) => {

    const {control} = useFormContext()

    return (
        <Controller
            name={props.name}
            control={control}
            render={({field}) => (
                <Stack
                    sx={{
                        width: '100%'
                    }}
                >   
                    <InputLabelComponent
                        label={props.fieldLabel}
                    />
                    <Switch
                        {...field}
                    />
                </Stack>
            )}
        />
    )
}

export default FormSwitchComponent
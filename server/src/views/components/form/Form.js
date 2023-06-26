import {FormProvider, useForm} from 'react-hook-form';
import {Stack} from '@mui/material'
import { useEffect } from 'react';

const FormComponent = (props) => {

    const methods = useForm();
    const {handleSubmit} = methods;
    const defaultVals = props.defaultValues

    useEffect(() => {
        if (props.defaultValues) {
            methods.reset(props.defaultValues)
        } else {
            methods.reset({})
        }
    }, [defaultVals])

    const onSubmit = (data) => {
        props.onSubmit(data)
    }

    return (
        <Stack
            sx={{
                width: '100%'
            }}
        >
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    id={props.id}
                >
                    {props.children}
                </form>
            </FormProvider>
        </Stack>
    );
};

export default FormComponent;
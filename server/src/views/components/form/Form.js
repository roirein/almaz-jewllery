import {FormProvider, useForm} from 'react-hook-form';
import {Stack} from '@mui/material'

const FormComponent = (props) => {

    const methods = useForm();
    const {handleSubmit} = methods;

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
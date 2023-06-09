import {Controller, useForm} from 'react-hook-form';
import {useState, useContext} from 'react';
import AppContext from '../../context/appContext';
import {TextField, Stack, Box, Button, Typography} from '@mui/material';
import {useIntl, FormattedMessage} from 'react-intl';
import messages from '../../i18n';
import axios from 'axios'
import { HTTP_STATUS_CODE } from '../../../consts/http-consts';
import { useRouter } from 'next/router';

const LoginForm = () => {

    const {control, handleSubmit, formState: {errors}} = useForm();
    const intl = useIntl();

    const [loginError, setLoginError] = useState(false);
    const router = useRouter();
    const {onLogin} = useContext(AppContext)

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/users', {
                action: 'login',
                email: data.username,
                password: data.password
            });
            onLogin(response.data.token, response.data.role)
            if (response.status === HTTP_STATUS_CODE.SUCCESS) {
                router.push('/order-management')
            }
        } catch(e) {
            if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
                setLoginError(true);
            }
        }

    }

    return (
        <Box
            sx={{
                border: '1px solid black',
                padding: '12px',
                width: '25%'
            }}
        >
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <Stack
                    spacing={1.5}
                >
                    <div
                        style={{
                            direction: 'rtl'
                        }}
                    >
                        <Stack>
                            <Controller
                                name="username"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <TextField
                                        error={errors && errors.username}
                                        {...field}
                                        placeholder={intl.formatMessage(messages.username)}
                                        type="email"
                                        fullWidth
                                        inputRef={null}
                                        helperText={errors && errors.username ? intl.formatMessage(messages.emptyField) : ''}
                                        onBlur={() => setLoginError(false)}
                                    />
                                )}   
                            />
                        </Stack>
                    </div>
                    <Stack>
                        <Controller
                            name="password"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    error={errors && errors.password}
                                    placeholder={intl.formatMessage(messages.password)}
                                    type="password"
                                    fullWidth
                                    inputRef={null}
                                    helperText={errors && errors.password ? intl.formatMessage(messages.emptyField) : ''}
                                    onBlur={() => setLoginError(false)}
                                />
                            )}   
                        />
                    </Stack>
                    {loginError && (
                        <Typography
                            variant="body1"
                            color="red"
                        >
                            <FormattedMessage {...messages.invalidLogin}/>
                        </Typography>
                    )}
                    <Stack
                        sx={{
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                width: '50%',
                                fontWeight: 'bold'
                            }}
                            type="submit"
                        >
                            <FormattedMessage {...messages.entry}/>
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    )
}

export default LoginForm
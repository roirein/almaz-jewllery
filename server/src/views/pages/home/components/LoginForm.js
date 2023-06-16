import FormComponent from "../../../components/form/Form"
import FormTextFieldComponent from "../../../components/form/Inputs/InputField";
import FormPasswordFieldComponent from "../../../components/form/Inputs/PasswordField";
import {useIntl} from 'react-intl'
import { homePageMessages } from "../../../i18n";
import {Stack, Typography, Button, Link} from '@mui/material';
import {useState} from 'react';
import axios from 'axios'
import { getLoginUrl } from "../../../routes/server-routes";
import {useRouter} from 'next/router'
import { HTTP_STATUS_CODE } from "../../../../consts/http-consts";
import ROUTES from "../../../routes/client-routes";
import ErrorLabelComponent from "../../../components/form/Labels/ErrorLabel";

const LoginFormComponent = (props) => {
    const intl = useIntl();
    const [error, setError] = useState(null);
    const router = useRouter();

    const onLogin = async (data) => {
        const url = getLoginUrl();
        try {
            const response = await axios.post(url, {
                email: data.email,
                password: data.password
            })

            if (response.status === HTTP_STATUS_CODE.SUCCESS) {
                router.push(ROUTES.ORDER_MANAGEMENT)
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
                setError(intl.formatMessage(homePageMessages.loginError))
            }
        }
    }
    return (
        <FormComponent
            onSubmit={(data) => onLogin(data)}
        >
            <Stack
                rowGap="12px"
                sx={{
                    marginBottom: '32px'
                }}
            >
                <Stack
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {intl.formatMessage(homePageMessages.login)}
                    </Typography>
                </Stack>
                <FormTextFieldComponent
                    name="email"
                    type="email"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError),
                        pattern: {
                            value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
                            message: intl.formatMessage(homePageMessages.emailError)
                        }
                    }}
                    fieldLabel={intl.formatMessage(homePageMessages.email)}
                    onBlur={() => setError(null)}
                />
                <FormPasswordFieldComponent
                    name="password"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError)
                    }}
                    fieldLabel={intl.formatMessage(homePageMessages.password)}
                    onBlur={() => setError(null)}
                />
                <Stack
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '50%',
                            backgroundColor: '#a05444'
                        }}
                    >
                        {intl.formatMessage(homePageMessages.entry)}
                    </Button>
                    <Stack
                        direction="row"
                    >
                        <Stack
                            sx={{
                                alignItems: "flex-start"
                            }}
                        >
                            <Link 
                                underline="none"
                                onClick={() => props.onSwitchToRegister()}
                                sx={{
                                    color: '#a05444',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        fontWeight: 'bold'
                                    }
                                }}
                            >
                                {intl.formatMessage(homePageMessages.toRegister)}
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
                {error && (
                    <Stack>
                        <ErrorLabelComponent
                            label={error}
                        />
                    </Stack>
                )}
            </Stack>
        </FormComponent>
    )
}

export default LoginFormComponent
import {useState} from 'react';
import axios from 'axios';
import { RESET_PASSWORD_STEP } from '../../../const/authentication-consts';
import FormComponent from '../../../components/form/Form';
import FormTextFieldComponent from '../../../components/form/Inputs/InputField';
import {useIntl} from 'react-intl';
import { homePageMessages } from '../../../i18n';
import {Stack, Typography, Button} from '@mui/material'
import { getCodeVerificationUrl, getResetPasswordCodeURL, getUpdatePasswordUrl } from '../../../routes/server-routes';
import { HTTP_STATUS_CODE } from '../../../../consts/http-consts';
import ErrorLabelComponent from '../../../components/form/Labels/ErrorLabel';
import FormPasswordFieldComponent from '../../../components/form/Inputs/PasswordField';

//add support for resending
//add snack bar for it

const ResetPasswordFormComponent = (props) => {

    const [resetPasswordStep, setResetPasswordStep] = useState(RESET_PASSWORD_STEP.EMAIL);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState(null)
    const intl = useIntl();

    const onSendEmail = async (data) => {
        try {
            const url = getResetPasswordCodeURL();
            const response = await axios.post(url, {
                email: data.email
            })

            if (response.status === HTTP_STATUS_CODE.SUCCESS) {
                setResetPasswordStep(RESET_PASSWORD_STEP.CODE);
                setUserEmail(data.email)
            }
        } catch(e) {
            setError(intl.formatMessage(homePageMessages.emailNotExistError))
        }
    }

    const onSendVerificationCode = async (data) => {
        try {
            const url = getCodeVerificationUrl();
            const respone = await axios.post(url, {
                email: userEmail,
                code: data.code
            })
            if (respone.status === HTTP_STATUS_CODE.SUCCESS){
                setResetPasswordStep(RESET_PASSWORD_STEP.PASSWORD)
            }
        } catch(e){
            if (e.response.data === 'expiry-error') {
                setError(intl.formatMessage(homePageMessages.codeExpired));
            }
            if (e.response.data === 'code-error') {
                setError(intl.formatMessage(homePageMessages.codeError))
            }
        }
    }

    const onUpdatePassword = async (data) => {
        const url = getUpdatePasswordUrl()
        const response = await axios.patch(url, {
            email: userEmail,
            password: data.password,
            confirmPassword: data.verifyPassword
        })

        if (response.status === HTTP_STATUS_CODE.SUCCESS) {
            setResetPasswordStep(RESET_PASSWORD_STEP.COMPLETED)
        }
    }

    return (
        <>
            <Stack
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: '32px',
                    width: '100%'
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    {intl.formatMessage(homePageMessages.resetPassword)}
                </Typography>
            </Stack>
            {props.message && (
                <Stack
                    sx={{
                        mt: '24px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}                
                >
                    <Typography 
                        variant="body1"
                    >
                        {props.message}
                    </Typography>
                </Stack>
            )}
            {resetPasswordStep === RESET_PASSWORD_STEP.EMAIL && (
                <FormComponent
                    onSubmit={(data) => onSendEmail(data)}
                >
                    <Stack
                        rowGap="12px"
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <FormTextFieldComponent
                            name="email"
                            type="email"
                            fieldLabel={intl.formatMessage(homePageMessages.email)}
                            rules={{
                                required: true,
                                pattern: {
                                    value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
                                    message: intl.formatMessage(homePageMessages.emailError)
                                }
                            }}
                            onBlur={() => setError(null)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '70%',
                                backgroundColor: '#a05444'
                            }}
                        >
                            {intl.formatMessage(homePageMessages.sendCode)}
                        </Button>
                        {error && (
                            <ErrorLabelComponent
                                label={error}
                            />
                        )}
                    </Stack>
                </FormComponent>
            )}
            {resetPasswordStep === RESET_PASSWORD_STEP.CODE && (
                <FormComponent
                    onSubmit={(data) => onSendVerificationCode(data)}
                >
                    <Typography>
                        {intl.formatMessage(homePageMessages.codeSent)}
                    </Typography>
                    <Stack
                        rowGap="12px"
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <FormTextFieldComponent
                            name="code"
                            type="text"
                            fieldLabel={intl.formatMessage(homePageMessages.code)}
                            rules={{
                                required: true
                            }}
                            onBlur={() => setError(null)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '70%',
                                backgroundColor: '#a05444'
                            }}
                        >
                            {intl.formatMessage(homePageMessages.changePassword)}
                        </Button>
                        <Typography
                            variant="body2"
                            color="#a05444"
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            {intl.formatMessage(homePageMessages.dontHaveCode)}
                        </Typography>
                        {error && (
                            <ErrorLabelComponent
                                label={error}
                            />
                        )}
                    </Stack>
                </FormComponent>
            )}
            {resetPasswordStep === RESET_PASSWORD_STEP.PASSWORD && (
                <FormComponent
                    onSubmit={(data) => onUpdatePassword(data)}
                >
                    <Typography>
                        {intl.formatMessage(homePageMessages.codeSent)}
                    </Typography>
                    <Stack
                        rowGap="12px"
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <FormPasswordFieldComponent
                            name="password"
                            rules={{
                                required: intl.formatMessage(homePageMessages.emptyFieldError),
                                minLength: {
                                    value: 8,
                                    message: intl.formatMessage(homePageMessages.passwordLengthError)
                                },
                                validate: {
                                    isValidPattern: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/).test(value) || intl.formatMessage(homePageMessages.passwordPatternError)
                                }
                            }}
                            fieldLabel={intl.formatMessage(homePageMessages.password)}
                            onBlur={() => setError(null)}
                        />
                        <FormPasswordFieldComponent
                            name="verifyPassword"
                            rules={{
                                required: intl.formatMessage(homePageMessages.emptyFieldError)
                            }}
                            fieldLabel={intl.formatMessage(homePageMessages.password)}
                            onBlur={() => setError(null)}
                            fieldToWatch="password"
                            errMessage={intl.formatMessage(homePageMessages.verifyPasswordError)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '70%',
                                backgroundColor: '#a05444'
                            }}
                        >
                            {intl.formatMessage(homePageMessages.changePassword)}
                        </Button>
                        {error && (
                            <ErrorLabelComponent
                                label={error}
                            />
                        )}
                    </Stack>
                </FormComponent>
            )}
            {resetPasswordStep === RESET_PASSWORD_STEP.COMPLETED && (
                <Stack
                    columnGap="12px"
                >
                    <Typography
                        variant="h4"
                    >
                        {intl.formatMessage(homePageMessages.passwordChanged)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="#a05444"
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                        onClick={() => props.switchToLogin()}
                    >
                        {intl.formatMessage(homePageMessages.toLogin)}
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default ResetPasswordFormComponent
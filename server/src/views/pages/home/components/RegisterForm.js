import FormComponent from "../../../components/form/Form"
import FormTextFieldComponent from "../../../components/form/Inputs/InputField";
import FormPasswordFieldComponent from "../../../components/form/Inputs/PasswordField";
import {useIntl} from 'react-intl'
import {homePageMessages} from "../../../i18n";
import {Stack, Typography, Button} from '@mui/material';
import {useState, useRef} from 'react';
import axios from 'axios'
import { getLoginUrl, getRegisterUrl } from "../../../routes/server-routes";
import {useRouter} from 'next/router'
import { HTTP_STATUS_CODE } from "../../../../consts/http-consts";
import ROUTES from "../../../routes/client-routes";
import ErrorLabelComponent from "../../../components/form/Labels/ErrorLabel";

const RegisterFormComponent = () => {
    const intl = useIntl();
    const [error, setError] = useState(null);
    const router = useRouter();

    const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);

    const onRegister = async (data) => {
        const url = getRegisterUrl();
        try {
            const response = await axios.post(url, {
                firstName: data.firstName,
                lastName: data.lastName,
                businessName: data.businessName,
                phone: data.phoneNumber,
                secondryPhone: data.secondPhoneNumber,
                email: data.email,
                password: data.password,
                confirmPassword: data.verifyPassword
            })

            if (response.status === HTTP_STATUS_CODE.CREATED) {
                setIsRegisterCompleted(true);
            }

        } catch (e) {
            if (e.response.status === HTTP_STATUS_CODE.CONFLICT) {
                setError(intl.formatMessage(homePageMessages.userExistError))
            }
        }
    }
    return (
        <>
            {!isRegisterCompleted && (
                <FormComponent
                    onSubmit={(data) => onRegister(data)}
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
                                {intl.formatMessage(homePageMessages.registration)}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            columnGap="12px"
                        >
                            <Stack
                                sx={{
                                    width: '40%'
                                }}
                            >
                                <FormTextFieldComponent
                                    name="firstName"
                                    type="text"
                                    rules={{
                                        required: intl.formatMessage(homePageMessages.emptyFieldError) 
                                    }}
                                    fieldLabel={intl.formatMessage(homePageMessages.firstName)}
                                    onBlur={() => setError(null)}
                                />
                            </Stack>
                            <Stack
                                sx={{
                                    width: '60%'
                                }}
                            >
                                <FormTextFieldComponent
                                    name="lastName"
                                    type="text"
                                    rules={{
                                        required: intl.formatMessage(homePageMessages.emptyFieldError) 
                                    }}
                                    fieldLabel={intl.formatMessage(homePageMessages.lastName)}
                                    onBlur={() => setError(null)}
                                />
                            </Stack>
                        </Stack> 
                        <FormTextFieldComponent
                            name="businessName"
                            type="businessName"
                            rules={{
                                required: intl.formatMessage(homePageMessages.emptyFieldError),
                            }}
                            fieldLabel={intl.formatMessage(homePageMessages.businessName)}
                            onBlur={() => setError(null)}
                        />
                        <FormTextFieldComponent
                            name="phoneNumber"
                            rules={{
                                required: intl.formatMessage(homePageMessages.emptyFieldError),
                                pattern: {
                                    value: '^[0-9]{10}$',
                                    message: intl.formatMessage(homePageMessages.phoneError)
                                }
                            }}
                            fieldLabel={intl.formatMessage(homePageMessages.phoneNumber)}
                            onBlur={() => setError(null)}
                        />
                        <FormTextFieldComponent
                            name="secondPhoneNumber"
                            rules={{
                                pattern: {
                                    value: '^[0-9]{10}$',
                                    message: intl.formatMessage(homePageMessages.phoneError)
                                }
                            }}
                            fieldLabel={intl.formatMessage(homePageMessages.additionalPhoneNumber)}
                            onBlur={() => setError(null)}
                        />
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
                                {intl.formatMessage(homePageMessages.register)}
                            </Button>
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
            )}
            {isRegisterCompleted && (
                <Stack
                    rowGap="12px"
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {intl.formatMessage(homePageMessages.thankForRegister)}
                    </Typography>
                    <Typography
                        variant="body2"
                    >
                        {intl.formatMessage(homePageMessages.postRegisterMessage)}
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default RegisterFormComponent
import Link from 'next/link';
import {useIntl} from 'react-intl';
//import LoginForm from '../../components/auth/loginForm';
import {homePageMessages} from '../../i18n/index'
import {Box, Stack, Typography} from '@mui/material'
import CarouselComponent from './components/Carousel';
import LoginFormComponent from './components/LoginForm';
import {useState} from 'react';
import { AUTHENTICATION_OPTION } from '../../const/authentication-consts';
import RegisterFormComponent from './components/RegisterForm';

const App = () => {
    const intl = useIntl();

    const [authType, setAuthType] = useState(AUTHENTICATION_OPTION.LOGIN);
    
    return (
        <Box
            sx={{
                width: '100%',
                height: '99vh',
                border: '4px solid #a05444',
                margin: 0
            }}
        >
            <Stack
                direction="row"
                sx={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <Stack
                    sx={{
                        width: '50%',
                        height: '100%'
                    }}
                >
                    <Stack
                        sx={{
                            height: "10%",
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <img
                            src="/images/logo1.png-1.svg"
                            width="30%"
                            height="100%"
                        />
                    </Stack>
                    <Stack
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: '64px'
                            }}
                        >
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                            >
                                {intl.formatMessage(homePageMessages.welcome)}
                            </Typography>
                        </Stack>
                    <Stack
                        sx={{
                            height: '80%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {authType === AUTHENTICATION_OPTION.LOGIN && (
                            <Stack
                                sx={{
                                    width: '70%',
                                    pb: '200px'
                                }}
                            >
                                <LoginFormComponent
                                    onSwitchToRegister={() => setAuthType(AUTHENTICATION_OPTION.REGISTER)}
                                />
                            </Stack>
                        )}
                        {authType === AUTHENTICATION_OPTION.REGISTER && (
                            <Stack
                                sx={{
                                    width: '70%',
                                    pb: '200px'
                                }}
                            >
                                <RegisterFormComponent/>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: '50%',
                        height: '100%',
                        backgroundColor: '#a05444',
                        alignItem: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CarouselComponent/>
                </Stack>
            </Stack>
        </Box>
    )
}

export default App
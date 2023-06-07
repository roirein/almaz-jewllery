import Link from 'next/link';
import {useIntl} from 'react-intl';
import LoginForm from '../components/auth/loginForm';
import messages from '../i18n/index'
import {Box} from '@mui/material'

const App = () => {
    const intl = useIntl();
    return (
        <Box
            sx={{
                width: '100%',
                height: '95vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <LoginForm/>
        </Box>
    )
}

export default App
import {Box, Tabs, Tab, AppBar} from '@mui/material';
import {useState} from 'react';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import Link from 'next/link';

const ManagerHomeScreenComponent = () => {

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const onTabChange = (event, newVal) => {
        setCurrentTabIndex(newVal)
    }

    const intl = useIntl();

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'lightgrey'
                }}
            >
                <Tabs 
                    value={currentTabIndex}
                    onChange={onTabChange}
                >
                    <Link href="/">
                        <Tab label={intl.formatMessage(messages.ordersManagement)} value={0}/>
                    </Link>
                    <Link
                        href="/customers"
                    >
                        <Tab label={intl.formatMessage(messages.customers)} value={1}/>
                    </Link>
                    <Tab label={intl.formatMessage(messages.employess)} value={2}/>
                    <Tab label={intl.formatMessage(messages.stock)} value={3}/>
                    <Tab label={intl.formatMessage(messages.reportsCreation)} value={4}/>
                    <Tab label={intl.formatMessage(messages.settings)} value={5}/>
                </Tabs>
            </AppBar>
        </Box>
    )
}

export default ManagerHomeScreenComponent
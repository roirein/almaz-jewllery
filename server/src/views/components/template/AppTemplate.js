import {Box, Tabs, Tab, AppBar} from '@mui/material';
import {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import Link from 'next/link';
import {useRouter} from 'next/router'

const AppTemplateComponent = (ChildComponent) => {
    return (props) => {
        const intl = useIntl();
        const router = useRouter()

        return (
            <Box
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'lightgrey'
                }}
            >
                <Tabs 
                    value={router.pathname}
                    indicatorColor="secondary"
                    textColor="white"
                    sx={{
                        transform: 'translateX(0)',
                        transition: 'transform 0.3s ease in out'
                    }}
                >
                    <Tab
                        label={(
                            <Link href="/order-management" style={{color: 'white', textDecoration: 'none'}}>
                                {intl.formatMessage(messages.ordersManagement)}
                            </Link>
                        )}
                        value='/order-management'
                    />
                    <Tab
                        label={(
                            <Link href="/customers" style={{color: 'white', textDecoration: 'none'}}>
                                {intl.formatMessage(messages.customers)}
                            </Link>
                        )}
                        value='/customers'
                    />
                    <Tab label={intl.formatMessage(messages.employess)} value='employees'/>
                    <Tab label={intl.formatMessage(messages.stock)} value='/stock'/>
                    <Tab label={intl.formatMessage(messages.reportsCreation)} value='/reports'/>
                    <Tab label={intl.formatMessage(messages.settings)} value='/settings'/>
                </Tabs>
            </AppBar>
            <ChildComponent {...props}/>
        </Box>                         
        )
    }
}

export default AppTemplateComponent

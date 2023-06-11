import {Box, Tabs, Tab, AppBar, IconButton, Stack, Badge} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationComponent from '../feedbacks/notification';
import {useState, useEffect, useLayoutEffect, useContext} from 'react';
import AppContext from '../../context/appContext';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import Link from 'next/link';
import {useRouter} from 'next/router'
import { ROLES } from '../../../consts/system-consts';
import { DESIGN_MANAGER_TABS, MANAGER_TABS } from '../../const/TabDefinitions';

const AppTemplateComponent = (ChildComponent) => {
    return (props) => {
        const intl = useIntl();
        const router = useRouter()

        const [tabs, setTabs] = useState([]);

        const contextValue = useContext(AppContext);

        useLayoutEffect(() => {
            if (contextValue.role === ROLES.MANAGER) {
                setTabs(MANAGER_TABS)
            } else {
                setTabs(DESIGN_MANAGER_TABS)
            }
        }, [])

        // useEffect(() => {
        //     setNotificationsNumber(contextValue.getUnreadNotificationsAmount());
        // }, [contextValue])

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
                <Stack
                    direction="row"
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
                        {tabs.map(tab => (
                            <Tab
                                label={(
                                    <Link href={tab.value}>
                                        {intl.formatMessage(tab.label)}
                                    </Link>
                                )}
                                value={tab.value}
                            />
                        ))}
                    </Tabs>
                    <Stack
                        direction="row"
                        sx={{
                            marginRight: 'auto'
                        }}
                    >
                        <IconButton>
                            <Badge
                                color="primary"
                                badgeContent={contextValue.unreadNotifications}
                            >
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Stack>
                </Stack>
            </AppBar>
            <ChildComponent {...props}/>
            {contextValue.showAlert && (
                <NotificationComponent
                    color='info'
                    onClose={() => contextValue.setShowAlert(false)}
                    message={intl.formatMessage(messages.newOrderMessage)}
                />
            )}
        </Box>                         
        )
    }
}

export default AppTemplateComponent

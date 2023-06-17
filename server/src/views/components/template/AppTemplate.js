import {Box, Tabs, Tab, AppBar, IconButton, Stack, Badge} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationComponent from '../feedbacks/notification';
import {useState, useEffect, useContext} from 'react';
import AppContext from '../../context/appContext';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import Link from 'next/link';
import {useRouter} from 'next/router'
import { ROLES } from '../../../consts/system-consts';
import { DESIGN_MANAGER_TABS, MANAGER_TABS } from '../../const/TabDefinitions';
import NotificationPopoverComponet from '../notifications/NotificationsPopover';

const AppTemplateComponent = (props) => {
    const intl = useIntl();
    const router = useRouter()

    const [tabs, setTabs] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const contextValue = useContext(AppContext);

    useEffect(() => {
        if (contextValue.role === ROLES.MANAGER) {
            setTabs(MANAGER_TABS)
        } else {
            setTabs(DESIGN_MANAGER_TABS)
        }
    }, [tabs])

    console.log(MANAGER_TABS)

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            <AppBar
                position="sticky"
                sx={{
                    borderBottom: ' 2px solid #a05444',
                    backgroundColor: 'transparent',
                    px: '8px'
                }}
            >
                <Stack
                    direction="row"
                >
                    <Stack
                        sx={{
                            width: '10%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white'
                        }}
                    >
                        <img
                            width="100%"
                            height="80%"
                            src={'/images/logo1.png-1.svg'}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Tabs 
                            value={router.pathname}
                            indicatorColor="secondary"
                            sx={{
                                transform: 'translateX(0)',
                                transition: 'transform 0.3s ease in out'
                            }}
                        >
                            {MANAGER_TABS.map((tab) => {
                                console.log(tab)
                                return (
                                    <Tab
                                        label={(
                                            <Link href={tab.value}>
                                                {intl.formatMessage(tab.label)}
                                            </Link>
                                        )}
                                        value={tab.value}
                                    />
                                )
                            })}
                        </Tabs>
                    </Stack>
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
            {props.children}
        </Box>
    )
}

export default AppTemplateComponent

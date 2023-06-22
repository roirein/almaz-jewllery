import {Box, Tabs, Tab, AppBar, IconButton, Stack, Badge} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationComponent from '../feedbacks/notification';
import {useState, useEffect, useContext} from 'react';
import AppContext from '../../context/appContext';
import {useIntl} from 'react-intl';
import Link from 'next/link';
import {useRouter} from 'next/router'
import { ROLES } from '../../../consts/system-consts';
import { DESIGN_MANAGER_TABS, MANAGER_TABS } from '../../const/TabDefinitions';
import NotificationPopoverComponet from '../notifications/NotificationsPopover';
import NotificationSnackbarComponent from '../notifications/NotificicationSnackBar';

const AppTemplateComponent = (props) => {
    const intl = useIntl();
    const router = useRouter()
    const [showNotifications, setShowNotifications] = useState(false);

    const contextValue = useContext(AppContext);

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
                        {contextValue.role === ROLES.MANAGER && (
                            <Tabs 
                                value={router.pathname}
                                indicatorColor="transparent"
                                sx={{
                                    transform: 'translateX(0)',
                                    transition: 'transform 0.3s ease in out'
                                }}
                            >
                                {MANAGER_TABS.map((tab) => {
                                    console.log(tab)
                                    return (
                                        <Tab
                                            sx={{
                                                border: router.pathname.startsWith(tab.value) ? `1px solid #a05444` : 'none'
                                            }}
                                            label={(
                                                <Link 
                                                    href={tab.value}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: '#a05444',
                                                        fontWeight: router.pathname === tab.value ? 'bold' : 'normal'
                                                    }}
                                                >
                                                    {intl.formatMessage(tab.label)}
                                                </Link>
                                            )}
                                            value={tab.value}
                                        />
                                    )
                                })}
                            </Tabs>
                        )}
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            marginRight: 'auto'
                        }}
                    >
                        <IconButton
                            onClick={() => setShowNotifications(true)}
                        >
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
            {contextValue.showAlert && (
                <NotificationSnackbarComponent
                    onClose={() => contextValue.setShowAlert(false)}
                    type={contextValue.currentNotification.type}
                />
            )}
            {showNotifications && (
                <NotificationPopoverComponet
                    open={showNotifications}
                    onClose={() => setShowNotifications(false)}
                    notifications={contextValue.notifications}
                />
            )}
        </Box>
    )
}

export default AppTemplateComponent

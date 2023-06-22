import {createContext} from 'react'

const appContextValue = {
    token: '',
    role: '',
    socket: null,
    userId: null,
    name: '',
    onLogin: () => {},
    notifications: [],
    setNotifications: () => {},
    showAlert: false,
    setShowAlert: () => {},
    unreadNotifications: 0,
    currentNotification: null
}

const AppContext = createContext(appContextValue);

export default AppContext
import {createContext} from 'react'

const appContextValue = {
    token: '',
    role: '',
    socket: null,
    userId: null,
    onLogin: () => {},
    notifications: [],
    setNotifications: () => {},
    showAlert: false,
    setShowAlert: () => {},
    unreadNotifications: 0
}

const AppContext = createContext(appContextValue);

export default AppContext
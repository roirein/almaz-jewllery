import {createContext} from 'react'

const appContextValue = {
    token: '',
    role: '',
    socket: null,
    onLogin: () => {}
}

const AppContext = createContext(appContextValue);

export default AppContext
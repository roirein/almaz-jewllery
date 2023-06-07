import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import AppContext from '../../context/appContext';

const ContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log(token)
        if (token) {
            const userSocket = io(process.env.SERVER_URL);
            setSocket(socket)
            userSocket.emit('login');
        }
        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [token])

    const onLogin = (userToken, userRole) => {
        setToken(userToken),
        setRole(userRole)
    }

    const contextValue = {
        token,
        role,
        socket,
        onLogin
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )    
}

export default ContextProvider
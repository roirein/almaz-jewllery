import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import AppContext from '../../context/appContext';
import axios from 'axios';

const ContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null)
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [showAlert, setShowAlert] = useState(false)

    const handleAddNewOrder = (notificationData) => {
        const newNotificationsArray = [...notifications, notificationData]
        setNotifications(newNotificationsArray)
        setShowAlert(true)
    }

    useEffect(() => {
        if (socket){
            socket.on('connect', () => {
                console.log('Socket connected');
              });
        
              socket.on('disconnect', () => {
                console.log('Socket disconnected');
              });
        
              socket.on('newOrder', (notificationData) => {
                const newNotificationsArray = [...notifications, notificationData];
                setNotifications(newNotificationsArray);
                setShowAlert(true);
              });
              return () => {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('newOrder');
              };
        }
    }, [socket, notifications])

    useEffect(() => {
        const unreadNotificationsArray = notifications.filter((notificaton) => !notificaton.isHandled)
        setUnreadNotifications(unreadNotificationsArray.length)
    }, [notifications])

    const onLogin = (userToken, userRole, userId) => {
        setToken(userToken)
        setRole(userRole)
        setUserId(userId)
        const userFields = {
            userToken, userRole
        }
        document.cookie = `userFields=${JSON.stringify(userFields)}`;

        const userSocket = io(process.env.SERVER_URL);
        userSocket.emit('login', {
            userId
        });
        setSocket(userSocket)
        axios.get(`${process.env.SERVER_URL}/notifications/getNotifications/${userId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then((response) => {
            console.log(response.data.notifications)
            setNotifications(response.data.notifications)
        })
        
    }

    const contextValue = {
        token,
        role,
        socket,
        onLogin,
        userId,
        notifications,
        setNotifications,
        showAlert,
        setShowAlert,
        unreadNotifications
    }

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )    
}

export default ContextProvider
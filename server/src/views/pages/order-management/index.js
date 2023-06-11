import {Box, Stack, Menu, MenuItem, Button, Typography} from '@mui/material';
import {useState, useContext} from 'react';
import AppContext from '../../context/appContext';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import AppTemplateComponent from '../../components/template/AppTemplate';
import AddIcon from '@mui/icons-material/Add';
import {ORDER_TYPES} from '../../../consts/system-consts';
import { HTTP_STATUS_CODE } from '../../../consts/http-consts';
import NewOrderModalComponent from '../../components/modals/NewOrderModal';
import axios from 'axios'
import NotificationComponent from '../../components/feedbacks/notification';

const OrderManagementPage= () => {

    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const [modalType, setModalType] = useState();
    const contextValue = useContext(AppContext)
    const intl = useIntl()

    const handleOpenModal = (type) => {
        setShowMenu(false)
        setShowModal(true)
        setModalType(type)
    }

    const createNewOrder = async (data) => {
        const imageData = new FormData();
        imageData.append("model", data.image[0])
        const imageResponse = await axios.post(`${process.env.SERVER_URL}/image/upload`, imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${contextValue.token}`
            }
        })
        const newModelOrderData = {
            type: ORDER_TYPES.NEW_MODEL,
            customerName: data.customerName,
            deadline: data.deadline,
            isCatingRequired: !!data.isCatingRequired,
            action: 'newOrder',
            modelData: {
                item: data.item,
                size: data.size,
                metal: data.metal,
                inlay: data.setting,
                mainStone: data.mainStoneSize,
                sideStone: data.sideStoneSize,
                image: imageResponse.data.path,
                comments: data.comments
            }
        }
        const response = await axios.post('/api/order', newModelOrderData, {
            headers: {
                'Authorization': `Bearer ${contextValue.token}`
            }
        })
        if (response.status === HTTP_STATUS_CODE.CREATED){
            setNotificationData({
                color: 'success',
                message: intl.formatMessage(messages.newOrderSuccess),
                onClose: () => setNotificationData(null)
            })
        }
    }

    return (
        <Box
            sx={{
                padding: '12px'
            }}
        >
            <Stack
                direction="column"
                sx={{
                    height: "10%"
                }}
            >
                <Button
                    onClick={() => setShowMenu(true)}
                    sx={{
                        width: 'fit-content'
                    }}
                >
                    <AddIcon/>
                    <Typography
                        variant="body1"
                    >
                        {intl.formatMessage(messages.createNewOrder)}
                    </Typography>
                </Button>
                <Menu
                    open={showMenu}
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'bottom'
                    }}
                >
                    <MenuItem onClick={() => handleOpenModal(ORDER_TYPES.NEW_MODEL)}>
                        {intl.formatMessage(messages.newModel)}
                    </MenuItem>
                    <MenuItem onClick={() => setShowMenu(false)}>
                        {intl.formatMessage(messages.existingModel)}
                    </MenuItem>
                    <MenuItem onClick={() => setShowMenu(false)}>
                        {intl.formatMessage(messages.fix)}
                    </MenuItem>
                </Menu>
            </Stack>
            {showModal && (
                <NewOrderModalComponent
                    orderType={modalType}
                    onClose={() => setShowModal(false)}
                    onSubmit={(data) => createNewOrder(data)}
                />
            )}
            {notificationData && (
                <NotificationComponent
                    color={notificationData.color}
                    message={notificationData.message}
                    onClose={() => notificationData.onClose()}
                />
            )}
        </Box>
    )
}

export default AppTemplateComponent(OrderManagementPage)
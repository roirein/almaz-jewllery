import {Box, Stack, Menu, MenuItem, Button, Typography, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper} from '@mui/material';
import {useState, useContext} from 'react';
import AppContext from '../../context/appContext';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import AppTemplateComponent from '../../components/template/AppTemplate';
import AddIcon from '@mui/icons-material/Add';
import {ORDER_TYPES, ROLES, USER_TYPES} from '../../../consts/system-consts';
import { HTTP_STATUS_CODE } from '../../../consts/http-consts';
import NewOrderModalComponent from '../../components/modals/NewOrderModal';
import axios from 'axios'
import NotificationComponent from '../../components/feedbacks/notification';
import {parse} from 'cookie'
import {useRouter} from 'next/router'

const OrderManagementPage= (props) => {

    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const [modalType, setModalType] = useState();
    const contextValue = useContext(AppContext)
    const intl = useIntl();
    const router = useRouter();

    const isAllowedToCreateNewOrder = contextValue.role === ROLES.MANAGER || contextValue.role === USER_TYPES.CUSTOMER

    const handleOpenModal = (type) => {
        setShowMenu(false)
        setShowModal(true)
        setModalType(type)
    }

    const onClickOrder = (orderId) => {
        router.push(`/order-management/${orderId}`)
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
        <AppTemplateComponent>
            <h1>Orders</h1>
        </AppTemplateComponent>
        // <Box
        //     sx={{
        //         padding: '12px'
        //     }}
        // >
        //     {isAllowedToCreateNewOrder && (
        //         <Stack
        //             direction="column"
        //             sx={{
        //                 height: "10%"
        //             }}
        //         >
        //             <Button
        //                 onClick={() => setShowMenu(true)}
        //                 sx={{
        //                     width: 'fit-content'
        //                 }}
        //             >
        //                 <AddIcon/>
        //                 <Typography
        //                     variant="body1"
        //                 >
        //                     {intl.formatMessage(messages.createNewOrder)}
        //                 </Typography>
        //             </Button>
        //             <Menu
        //                 open={showMenu}
        //                 anchorOrigin={{
        //                     horizontal: 'right',
        //                     vertical: 'bottom'
        //                 }}
        //             >
        //                 <MenuItem onClick={() => handleOpenModal(ORDER_TYPES.NEW_MODEL)}>
        //                     {intl.formatMessage(messages.newModel)}
        //                 </MenuItem>
        //                 <MenuItem onClick={() => setShowMenu(false)}>
        //                     {intl.formatMessage(messages.existingModel)}
        //                 </MenuItem>
        //                 <MenuItem onClick={() => setShowMenu(false)}>
        //                     {intl.formatMessage(messages.fix)}
        //                 </MenuItem>
        //             </Menu>
        //         </Stack>
        //     )}
        //     <Stack
        //         sx={{
        //             width: '100%',
        //             height: '80%',
        //             alignItems: 'center',
        //             justifyContent: 'center'
        //         }}
        //     >
        //         <TableContainer component={Paper}>
        //             <Table sx={{maxWidth: '70%'}}>
        //                 <TableHead>
        //                     <TableRow>
        //                         <TableCell>{intl.formatMessage(messages.item)}</TableCell>
        //                         <TableCell>{intl.formatMessage(messages.setting)}</TableCell>
        //                         <TableCell>{intl.formatMessage(messages.sideStoneSize)}</TableCell>
        //                         <TableCell>{intl.formatMessage(messages.mainStoneSize)}</TableCell>
        //                         <TableCell>{intl.formatMessage(messages.modelNumber)}</TableCell>
        //                         <TableCell>{intl.formatMessage(messages.status)}</TableCell>
        //                         <TableCell></TableCell>
        //                     </TableRow>
        //                 </TableHead>
        //                 <TableBody>
        //                 {props.orderList.map((order) => (
        //                     <TableRow
        //                         key={order.id}
        //                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                     >
        //                         <TableCell component="th" scope="row">
        //                             {intl.formatMessage(messages[order.item])}
        //                         </TableCell>
        //                         <TableCell>{order.setting}</TableCell>
        //                         <TableCell>{order.sideStone}</TableCell>
        //                         <TableCell>{order.mainStone}</TableCell>
        //                         <TableCell>{order.modelNumber}</TableCell>
        //                         <TableCell>{intl.formatMessage(messages[order.status])}</TableCell>
        //                         <TableCell>
        //                             <Button
        //                                 onClick={() => onClickOrder(order.id)}
        //                             >
        //                                 {intl.formatMessage(messages.seeMore)}
        //                             </Button>
        //                         </TableCell>
        //                     </TableRow>
        //                 ))}
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>
        //     </Stack>
        //     {showModal && (
        //         <NewOrderModalComponent
        //             orderType={modalType}
        //             onClose={() => setShowModal(false)}
        //             onSubmit={(data) => createNewOrder(data)}
        //         />
        //     )}
        //     {notificationData && (
        //         <NotificationComponent
        //             color={notificationData.color}
        //             message={notificationData.message}
        //             onClose={() => notificationData.onClose()}
        //         />
        //     )}
        // </Box>
    )
}

// export const getServerSideProps = async (context) => {
//     const cookie = parse(context.req.headers.cookie);
//     const userField = JSON.parse(cookie.userFields);
//     const response = await axios.get(`${process.env.SERVER_URL}/order/ordersInDesign`, {
//         headers: {
//             Authorization: `Bearer ${userField.userToken}`
//         }
//     })

   
    
//     return {
//         props: {
//             orderList: response.data.orders
//         }
//     }
// }

export default OrderManagementPage
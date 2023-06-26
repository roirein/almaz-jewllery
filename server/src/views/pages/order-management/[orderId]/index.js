import AppTemplateComponent from "../../../components/template/AppTemplate";
import axios from 'axios';
import {Box, Stack, Image, Typography, Button} from '@mui/material'
import {parse} from 'cookie'
import { getOrderByIdUrl, getOrderDesignUrl, sendToDesignManagerUrl } from "../../../routes/server-routes";
import OrderComponent from "../components/OrderComponent";
import { useIntl } from "react-intl";
import { generalMessages, orderPageMessages } from "../../../i18n";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../../context/appContext";
import { ORDER_STATUS, ROLES } from "../../../../consts/system-consts";
import { HTTP_STATUS_CODE } from "../../../../consts/http-consts";
import { useRouter } from "next/router";
import ROUTES from "../../../routes/client-routes";

const OrderPage = (props) => {

    const intl = useIntl();
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState();
    const contextValue = useContext(AppContext)

    useEffect(() => {
        const url = getOrderDesignUrl(props.imagePath)
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            },
            responseType: 'blob'
        }).then((res) => {
            const image = URL.createObjectURL(res.data);
            setImageUrl(image)
        }).catch(e => console.log(e))
    }, [])

    const sendOrderToDesignManager = async () => {
        const url = sendToDesignManagerUrl(props.orderNumber)
        const response = await axios.patch(url, null, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            }
        })
        if (response.status === HTTP_STATUS_CODE.SUCCESS) {
            router.push(ROUTES.ORDER_MANAGEMENT)
        }
    }

    return (
        <AppTemplateComponent>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '95vh',
                    alignnItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Stack
                    sx={{
                        width: '50%',
                        height: '50%',
                        padding: '16px',
                        border: '1px solid black'
                    }}
                >
                    <OrderComponent
                        title={`${intl.formatMessage(orderPageMessages.numberOfOrder, {value: props.orderNumber})}-${intl.formatMessage(orderPageMessages.personalDesign)}`}
                        imageSrc={imageUrl}
                        setting={props.setting}
                        sideStoneSize={props.sideStoneSize}
                        mainStoneSize={props.mainStoneSize}
                        item={intl.formatMessage(generalMessages[props.item])}
                        metal={intl.formatMessage(generalMessages[props.metal])}
                        size={intl.formatMessage(generalMessages[props.size])}
                        deadline={new Date(props.deadline).toLocaleDateString('he-IL')}
                        casting={!!props.casting ? intl.formatMessage(generalMessages.required) : intl.formatMessage(generalMessages.notRequired)}
                        comments={props.comments}
                    />
                    <Stack
                        sx={{
                            width: '100%',
                            alignItems: 'flex-end'
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: 'right',
                                width: '25%'
                            }}
                        >
                            {`${intl.formatMessage(orderPageMessages.orderStatus)}: ${intl.formatMessage(orderPageMessages[props.orderStatus])}`}
                        </Typography>
                        {contextValue.role === ROLES.MANAGER && props.orderStatus === ORDER_STATUS.CREATED && (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#a05444',
                                    width: '25%'
                                }}
                                onClick={() => sendOrderToDesignManager()}
                            >
                                <Typography
                                    color="white"
                                    fontWeight="bold"
                                >
                                    {intl.formatMessage(orderPageMessages.sendToDesignManager)}
                                </Typography>
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Box>      
        </AppTemplateComponent>
    )
}

export const getServerSideProps = async (context) => {
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);
    const token = userField.userToken;
    const orderId = context.params.orderId
    const url = getOrderByIdUrl(orderId)
    const orderDataResponse = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return {
        props: {
            orderNumber: orderDataResponse.data.order.orderNumber,
            orderType: orderDataResponse.data.order.orderType,
            customerName: orderDataResponse.data.order.customerName,
            orderStatus: orderDataResponse.data.order.orderStatus,
            deadline: orderDataResponse.data.order.deadline,
            casting: orderDataResponse.data.order.casting,
            item: orderDataResponse.data.order.item,
            setting: orderDataResponse.data.order.setting,
            comments: orderDataResponse.data.order.comments,
            mainStoneSize: orderDataResponse.data.order.mainStoneSize,
            sideStoneSize: orderDataResponse.data.order.sideStoneSize,
            imagePath: orderDataResponse.data.order.imagePath,
            metal: orderDataResponse.data.order.metal,
            size: orderDataResponse.data.order.size
        }
    }

    
}

export default OrderPage
import AppTemplateComponent from "../../../components/template/AppTemplate";
import axios from 'axios';
import {Box, Stack, Image, Typography} from '@mui/material'
import {parse} from 'cookie'

const OrderPage = (props) => {
    console.log(props)
    return (
        <Box
            sx={{
                width: '100%',
                height: '95vh',
                alignnItems: 'center',
                justifyContent: 'center'
            }}
        >

        </Box>      
    )
}

export const getServerSideProps = async (context) => {
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);
    const token = userField.userToken;
    const orderId = context.params.orderId

    const orderDataResponse = await axios.get(`${process.env.SERVER_URL}/order/getOrder/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    console.log(orderDataResponse.data)

    const imageResponse = await axios.get(`${process.env.SERVER_URL}/image/getImage/${orderDataResponse.data.order.image}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(imageResponse.data);

    return {
        props: {
            id: orderDataResponse.data.order.id,
            customer: orderDataResponse.data.order.customer,
            status: orderDataResponse.data.order.status,
            deadline: orderDataResponse.data.order.deadline,
            casting: orderDataResponse.data.order.casting,
            item: orderDataResponse.data.order.item,
            inlay: orderDataResponse.data.order.inlay,
            comments: orderDataResponse.data.order.comments,
            mainStone: orderDataResponse.data.order.mainStone,
            sideStone: orderDataResponse.data.order.sideStone,
            image: imageResponse.data,
            designStatus: orderDataResponse.data.order.status
        }
    }

    
}

export default AppTemplateComponent(OrderPage)
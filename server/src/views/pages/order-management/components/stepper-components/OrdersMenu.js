import {Stack, Button, Typography} from '@mui/material'
import { useIntl } from 'react-intl'
import { orderPageMessages } from '../../../../i18n'
import { ORDER_TYPES } from '../../../../../consts/system-consts'

const OrdersMenuComponent = (props) => {

    const intl = useIntl()

    const getButton = (message, orderType) => {
        return (
            <Button
                variant="contained"
                sx={{
                    width: '70%',
                    backgroundColor: '#a05444',
                    color: 'white'
                }}
                onClick={() => props.onChooseOrder(orderType)}
            >
            <Typography
                variant='h6'
            >
                {message}
            </Typography>
        </Button>
        )
    }

    return (
        <Stack
            sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                mt: '12px'
            }}
            rowGap="16px"
        >
            <Typography
                variant="h5"
                sx={{
                    textAlign: 'right',
                    width: '100%'
                }}
            >
                {intl.formatMessage(orderPageMessages.chooseOrderType)}
            </Typography>
            {getButton(intl.formatMessage(orderPageMessages.personalDesign), ORDER_TYPES.NEW_MODEL)}
            {getButton(intl.formatMessage(orderPageMessages.existingModel), ORDER_TYPES.EXISTING_MODEL)}
            {getButton(intl.formatMessage(orderPageMessages.fix), ORDER_TYPES.FIX)}
        </Stack>    
    )
} 

export default OrdersMenuComponent
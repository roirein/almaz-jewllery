import {useFormContext} from 'react-hook-form';
import {Stack, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import { generalMessages, orderPageMessages } from '../../../../i18n';
import {useState, useEffect} from 'react'

const OrderSummaryComponent = (props) => {

    const {getValues} = useFormContext();
    const intl = useIntl();
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        const reader  = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result)
        }
        reader.readAsDataURL(getValues('image'))
    }, [])

    return (
        <Stack
            sx={{
                width: '100%'
            }}
        >
            <Stack
                sx={{
                    width: '100%',
                    height: '10%'
                }}
            >
                <Typography
                    variant='h6'
                    fontWeight="bold"
                >
                    {`${intl.formatMessage(orderPageMessages.orderSummary)}-${props.orderType}`}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                sx={{
                    width: '100%'
                }}
            >
                <Stack
                    rowGap="12px"
                    sx={{
                        width: '50%'
                    }}
                >
                    <Typography
                        variant='subtitle1' 
                    >
                        {intl.formatMessage(generalMessages.modelDetails)}
                    </Typography>
                    <img
                        width="250px"
                        height="250px"
                        src={imageUrl}
                    />
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.setting)}: ${getValues('setting')}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.sideStoneSize)}: ${getValues('sideStoneSize')}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.mainStoneSize)}: ${getValues('mainStoneSize')}`}
                    </Typography>
                </Stack>
                <Stack
                    rowGap="12px"
                    sx={{
                        width: '50%'
                    }}
                >
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.item)}: ${intl.formatMessage(generalMessages[getValues('item')])}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.metal)}: ${intl.formatMessage(generalMessages[getValues('metal')])}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.size)}: ${intl.formatMessage(generalMessages[getValues('size')])}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.deadline)}: ${new Date(getValues('deadline')).toLocaleDateString('he-IL')}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.casting)}: ${getValues('casting') ? intl.formatMessage(generalMessages.required) : intl.formatMessage(generalMessages.notRequired)}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.comments)}: ${getValues('comments') ? getValues('comments') : ''}`}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default OrderSummaryComponent;
import {useFormContext} from 'react-hook-form';
import {Stack, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import { generalMessages, orderPageMessages } from '../../../../i18n';
import {useState, useEffect} from 'react'
import OrderComponent from '../OrderComponent';

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
    console.log(getValues('casting'))
    return (
        <OrderComponent
            title={`${intl.formatMessage(orderPageMessages.orderSummary)}-${props.orderType}`}
            imageSrc={imageUrl}
            setting={getValues('setting')}
            sideStoneSize={getValues('sideStoneSize')}
            mainStoneSize={getValues('mainStoneSize')}
            item={intl.formatMessage(generalMessages[getValues('item')])}
            metal={intl.formatMessage(generalMessages[getValues('metal')])}
            size={intl.formatMessage(generalMessages[getValues('size')])}
            deadline={new Date(getValues('deadline')).toLocaleDateString('he-IL')}
            casting={!!getValues('casting') ? intl.formatMessage(generalMessages.required) : intl.formatMessage(generalMessages.notRequired)}
        />
    )
}

export default OrderSummaryComponent;
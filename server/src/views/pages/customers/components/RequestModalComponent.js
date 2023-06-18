import { useEffect, useState, useContext } from "react"
import {Stack, Typography} from '@mui/material'
import axios from 'axios'
import { getUserRequestUrl } from "../../../routes/server-routes";
import AppContext from '../../../context/appContext'
import {useIntl} from 'react-intl';
import ModalComponent from "../../../components/modals/ModalComponent";
import { customerPageMessages } from "../../../i18n";

const RequestModalComponent = (props) => {

    const [customer, setCustomer] = useState({});
    const contextValue = useContext(AppContext);
    const intl = useIntl();

    useEffect(() => {
        const url = getUserRequestUrl(props.id)
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            }
        }).then((response) => setCustomer(response.data.customer))
    }, [])

    return (
        <ModalComponent
            open={props.open}
            onClose={() => props.onClose()}
            title={customer ? intl.formatMessage(customerPageMessages.newRequestFrom, {name: customer.name}) : ''}
        >
            <Stack
                sx={{
                    width: '100%',
                    textAlign: 'right'
                }}
                rowGap="12px"
            >
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    {intl.formatMessage(customerPageMessages.contactDetails)}
                </Typography>
                <Typography>
                    {`${intl.formatMessage(customerPageMessages.phoneNumber)}: ${customer?.phoneNumber}`}
                </Typography>
                {customer.businessPhone && (
                    <Typography>
                        {`${intl.formatMessage(customerPageMessages.businessPhone)}: ${customer?.businessPhone}`}
                    </Typography>
                )}
                <Typography
                    sx={{
                        direction: rtl
                    }}
                >
                    {`${intl.formatMessage(customerPageMessages.email)}: ${customer?.email}`}
                </Typography>
                <Typography>
                    {`${intl.formatMessage(customerPageMessages.businessName)}: ${customer?.businessName}`}
                </Typography>
            </Stack>
        </ModalComponent>
    )
}

export default RequestModalComponent;
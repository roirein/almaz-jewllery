import { useEffect, useState, useContext } from "react"
import {Stack, Typography, Button} from '@mui/material'
import axios from 'axios'
import { getApproveUserUrl, getUserRequestUrl } from "../../../routes/server-routes";
import AppContext from '../../../context/appContext'
import {useIntl} from 'react-intl';
import ModalComponent from "../../../components/modals/ModalComponent";
import { customerPageMessages, generalMessages, tableColumnsMessages } from "../../../i18n";
import { REQUESTS_STATUS } from "../../../../consts/system-consts";
import { HTTP_STATUS_CODE } from "../../../../consts/http-consts";

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

    const onRequestRespond = async (res) => {
        const url = getApproveUserUrl(customer.id);
        const response = await axios.patch(url, {
            isApproved: res,
            email: customer.email,
            firstName: customer.name.split(' ')[0]
        }, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            }
        })

        if (response.status === HTTP_STATUS_CODE.SUCCESS) {
            props.onRespondRequest(customer.id, response.data.status);
        }
    }

    return (
        <ModalComponent
            open={props.open}
            onClose={() => props.onClose()}
            title={customer ? intl.formatMessage(customerPageMessages.newRequestFrom, {name: customer.name}) : ''}
            actions={props.actions}
        >
            <Stack
                sx={{
                    width: '100%',
                    textAlign: 'right',
                    direction: 'rtl'
                }}
                direction="row"
            >
                <Stack
                    sx={{
                        width: '50%'
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
                            direction: 'rtl'
                        }}
                    >
                    {`${intl.formatMessage(customerPageMessages.email)}: ${customer?.email}`}
                    </Typography>
                    <Typography>
                        {`${intl.formatMessage(customerPageMessages.businessName)}: ${customer?.businessName}`}
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '50%'
                    }}
                    rowGap="16px"
                >
                    <Typography>
                        {`${intl.formatMessage(tableColumnsMessages.status)}: ${customer?.status ? intl.formatMessage(tableColumnsMessages[customer?.status]) : ''}`}
                    </Typography>
                    {customer?.status === REQUESTS_STATUS.PENDING && (
                        <Stack
                            direction="row"
                            columnGap="16px"
                        >
                            <Button
                                variant="text"
                                sx={{
                                    color: 'green'
                                }}
                                onClick={() => onRequestRespond(true)}
                            >
                                {intl.formatMessage(generalMessages.approve)}
                            </Button>
                            <Button
                                variant="text"
                                sx={{
                                    color: 'red'
                                }}
                                onClick={() => onRequestRespond(false)}
                            >
                                {intl.formatMessage(generalMessages.reject)}
                            </Button>
                        </Stack>
                    )}
            </Stack>
            </Stack>
        </ModalComponent>
    )
}

export default RequestModalComponent;
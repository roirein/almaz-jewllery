import axios from 'axios';
import {parse} from 'cookie'
import { REQUEST_TABLE_COLUMN } from "../../../const/tables-columns";
import TableComponent from "../../../components/table/TableComponent";
import { getRequestUrl } from "../../../routes/server-routes";
import {Stack, Button} from '@mui/material'
import {useIntl} from 'react-intl'
import {useState, useEffect} from 'react'
import { generalMessages, tableColumnsMessages } from "../../../i18n";
import RequestModalComponent from "../components/RequestModalComponent";
import PageLayoutComponent from '../components/PageLayout';


const RequestsPage = (props) => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const intl = useIntl();

    useEffect(() => {
        setOriginalData(props.data)
    })

    useEffect(() => {
        const tableData = [];
        props.data.forEach((dataElement) => {
            const {id, ...rest} = dataElement;
            tableData.push([rest['customerName'], rest['email'], intl.formatMessage(tableColumnsMessages[rest['status']])]);
        })
        setData(tableData)
    }, [originalData])


    const handleSeeMoreClick = (email) => {
        const user = props.data.find((user) => user.email === email)
        setSelectedUserId(user.id)
        setShowModal(true)
    }

    const onRespondRequest = (customerId, result) => {
        const customerIndex = originalData.findIndex(cust => cust.id === customerId);
        const customer = originalData[customerIndex]
        customer.status = result
        originalData[customerIndex] = customer
        setOriginalData([...originalData])
        setShowModal(false);
    }

    return (
        <PageLayoutComponent>
            <Stack
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack
                    sx={{
                        width: '60%',
                    }}
                >
                    <TableComponent
                        columns={props.tableColumns}
                        data={data}
                        showMoreButton={true}
                        onShowMoreClick={(dataRow) => handleSeeMoreClick(dataRow[1])}
                    />
                </Stack>
            </Stack>
            {showModal && (
                <RequestModalComponent
                    open={showModal}
                    onClose={() => {
                        setShowModal(true)
                        setSelectedUserId(null)
                    }}
                    id={selectedUserId}
                    actions={(
                        <Button
                            varinat="contained"
                            onClick={() => setShowModal(false)}
                            sx={{
                                backgroundColor: '#a05444',
                                color: 'white',
                            }}
                        >
                            {intl.formatMessage(generalMessages.close)}
                        </Button>
                    )}
                    onRespondRequest={(customerId, status) => onRespondRequest(customerId, status)}
                />
            )}
        </PageLayoutComponent>
    )
}


export const getServerSideProps = async (context) => {
    const url = getRequestUrl();
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${userField.userToken}`
        }
    })

    return {
        props: {
            tableColumns: REQUEST_TABLE_COLUMN,
            data: response.data.requests
        }
    }
}


export default RequestsPage
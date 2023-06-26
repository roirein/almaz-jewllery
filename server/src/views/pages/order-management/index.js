import {Box, Stack, Menu, MenuItem, Button, Typography, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper} from '@mui/material';
import {useState, useContext, useEffect} from 'react';
import AppContext from '../../context/appContext';
import {useIntl} from 'react-intl';
import {orderPageMessages} from '../../i18n'
import AppTemplateComponent from '../../components/template/AppTemplate';
import AddIcon from '@mui/icons-material/Add';
import {ORDER_TYPES, ROLES, USER_TYPES} from '../../../consts/system-consts';
import { HTTP_STATUS_CODE } from '../../../consts/http-consts';
import NewOrderModalComponent from '../../components/modals/NewOrderModal';
import axios from 'axios'
import NotificationComponent from '../../components/feedbacks/notification';
import {parse} from 'cookie'
import {useRouter} from 'next/router'
import CreateOrderModal from './components/CreateOrderModal';
import { ORDERS_TABLE_COLUMNS } from '../../const/tables-columns';
import { getActiveOrdersUrl } from '../../routes/server-routes';
import TableComponent from '../../components/table/TableComponent';
import ROUTES from '../../routes/client-routes';

const OrderManagementPage= (props) => {

    const [showModal, setShowModal] = useState(false);
    const [tableColumns, setTableColumns] = useState([]);
    const [data, setData] = useState([])
    const contextValue = useContext(AppContext);
    const intl = useIntl();
    const router = useRouter();


    const isAllowedToCreateNewOrder = contextValue.role === ROLES.MANAGER || contextValue.role === USER_TYPES.CUSTOMER

    useEffect(() => {
        const tableData = []
        const cols = props.tableColumns.map((col) => intl.formatMessage(orderPageMessages[col]));
        setTableColumns(cols);
        props.data.forEach((dataElement) => {
            const orderStatus = intl.formatMessage(orderPageMessages[dataElement.orderStatus]);
            const orderType = intl.formatMessage(orderPageMessages.personalDesign)
            tableData.push([dataElement.orderNumber, orderType, dataElement.customerName, orderStatus, new Date(dataElement.deadline).toLocaleDateString('he-IL')])
        })
        setData(tableData)
    }, [])

    return (
        <AppTemplateComponent>
            <Stack
                sx={{
                    width: '10%',
                }}
            >   
                <Button
                    variant="outlined"
                    sx={{
                        color: '#a05444'
                    }}
                    onClick={() => setShowModal(true)}
                >
                    <AddIcon/>
                    <Typography>
                        {intl.formatMessage(orderPageMessages.createNewOrder)}
                    </Typography>
                </Button>
            </Stack>
            <Stack
                sx={{
                    width: '60%'
                }}
            >
                <TableComponent
                    columns={tableColumns}
                    data={data}
                    showMoreButton
                    onShowMoreClick={(row) => router.push(`${ROUTES.ORDER_MANAGEMENT}/${row[0]}`)}
                />
            </Stack>
            <CreateOrderModal
                open={showModal}
                onClose={() => setShowModal(false)}
            />
        </AppTemplateComponent>
    )
}


export default OrderManagementPage


export const getServerSideProps = async (context) => {
    const url = getActiveOrdersUrl()
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${userField.userToken}`
        }
    })

    return {
        props: {
            tableColumns: ORDERS_TABLE_COLUMNS,
            data: response.data.orders
        }
    }
}
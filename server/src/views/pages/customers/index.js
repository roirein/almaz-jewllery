import AppTemplateComponent from "../../components/template/AppTemplate";
import axios from 'axios';
import {parse} from 'cookie'
import { REQUEST_TABLE_COLUMN } from "../../const/tables-columns";
import TableComponent from "../../components/table/TableComponent";
import { getRequestUrl } from "../../routes/server-routes";
import {Stack} from '@mui/material'
import {useIntl} from 'react-intl'
import {useState, useEffect} from 'react'
import { tableColumnsMessages } from "../../i18n";
import RequestModalComponent from "./components/RequestModalComponent";

const CustomersPage = (props) => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const intl = useIntl();

    const handleSeeMoreClick = (email) => {
        const user = props.data.find((user) => user.email === email)
        setSelectedUserId(user.id)
        setShowModal(true)
    }

    useEffect(() => {
        const tableData = [];
        props.data.forEach((dataElement) => {
            const {id, ...rest} = dataElement;
            tableData.push([rest['customerName'], rest['email'], intl.formatMessage(tableColumnsMessages[rest['status']])]);
        })
        setData(tableData)
    }, [])

    return (
        <AppTemplateComponent>
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
                />
            )}
        </AppTemplateComponent>
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


export default CustomersPage
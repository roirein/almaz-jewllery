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

const CustomersPage = (props) => {

    const [data, setData] = useState([])
    const intl = useIntl()

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
                    />
                </Stack>
            </Stack>
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
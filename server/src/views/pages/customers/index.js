import axios from 'axios';
import {parse} from 'cookie'
import { CUSTOMER_TABLE_COLUMN} from "../../const/tables-columns";
import TableComponent from "../../components/table/TableComponent";
import { getCustomersUrl} from "../../routes/server-routes";
import {Stack} from '@mui/material'
import {useState, useEffect} from 'react'
import PageLayoutComponent from "./components/PageLayout";


const CustomersPage = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const tableData = [];
        props.data.forEach((dataElement) => {
            const {id, ...rest} = dataElement;
            tableData.push([rest['customerName'], rest['email'], rest['phoneNumber'], rest['businessName'], rest['businessPhone']]);
        })
        setData(tableData)
    }, [])

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
                    />
                </Stack>
            </Stack>
        </PageLayoutComponent>
    )
}


export const getServerSideProps = async (context) => {
    const url = getCustomersUrl();
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${userField.userToken}`
        }
    })

    return {
        props: {
            tableColumns: CUSTOMER_TABLE_COLUMN,
            data: response.data.customers
        }
    }
}


export default CustomersPage
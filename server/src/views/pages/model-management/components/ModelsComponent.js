import TableComponent from "../../../components/table/TableComponent";
import { useState, useEffect } from "react";
import {useIntl} from 'react-intl';
import { modelsPageMessages } from '../../../i18n'
import ROUTES from "../../../routes/client-routes";
import Link from "next/link";

export const ModelsComponent = (props) => {

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const intl = useIntl()

    useEffect(() => {
        const tableData = []
        const cols = props.tableColumns.map((col) => intl.formatMessage(modelsPageMessages[col]));
        setColumns(cols);
        props.data.forEach((dataElement) => {
            const model = dataElement.model
            const modelStatus = intl.formatMessage(modelsPageMessages.created)
            const link = <Link href={`${ROUTES.MODELS}/${model.modelNumber}`}>{intl.formatMessage(modelsPageMessages.numberOdModel, {value: model.modelNumber})}</Link>
            const row = [link, model.title, modelStatus]
            tableData.push(row)
        })
        setData(tableData)
    }, [])

    return (
        <TableComponent
            columns={columns}
            data={data}
        />
    )
}

export default ModelsComponent
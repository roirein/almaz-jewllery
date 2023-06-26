import TableComponent from "../../../components/table/TableComponent";
import { useState, useEffect } from "react";
import {useIntl} from 'react-intl';
import { modelsPageMessages } from '../../../i18n'
import ROUTES from "../../../routes/client-routes";
import Link from "next/link";

export const ModelsManagerViewComponent = (props) => {

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const intl = useIntl()

    useEffect(() => {
        const tableData = []
        const cols = props.tableColumns.map((col) => intl.formatMessage(modelsPageMessages[col]));
        setColumns(cols);
        props.data.forEach((dataElement) => {
            const model = dataElement.model
            console.log(model)
            const modelStatus = intl.formatMessage(modelsPageMessages[model.status])
            const item = intl.formatMessage(modelsPageMessages[model.item])
            const link = <Link href={`${ROUTES.MODELS}/${model.modelNumber}`}>{intl.formatMessage(modelsPageMessages.numberOdModel, {value: model.modelNumber})}</Link>
            const row = [link, model.title, item, model.setting, model.sideStoneSize, model.mainStoneSize, modelStatus]
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

export default ModelsManagerViewComponent
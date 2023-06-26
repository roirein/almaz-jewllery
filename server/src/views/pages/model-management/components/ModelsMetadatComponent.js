import { useEffect, useState } from "react";
import {useIntl} from 'react-intl';
import { modelsPageMessages } from '../../../i18n'
import TableComponent from "../../../components/table/TableComponent";
import Link from "next/link";
import { Button } from "@mui/material";
import ROUTES from '../../../routes/client-routes';

const ModelsMetaDataComponent = (props) => {

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const intl = useIntl()

    useEffect(() => {
        const tableData = []
        const cols = props.tableColumns.map((col) => intl.formatMessage(modelsPageMessages[col]));
        setColumns(cols);
        props.data.forEach((dataElement) => {
            const modelMetadata = dataElement.metaData
            const item = intl.formatMessage(modelsPageMessages[modelMetadata.item])
            const row = [item, modelMetadata.setting, modelMetadata.sideStoneSize, modelMetadata.mainStoneSize]
            if (modelMetadata.orderId) {
                row.push(<Link href={`${ROUTES.ORDER_MANAGEMENT}/${modelMetadata.orderId}`}>{intl.formatMessage(modelsPageMessages.numberOfOrder, {value: modelMetadata.orderId})}</Link>)
            }
            if (modelMetadata.modelNumber) {
                row.push(<Link href={`${ROUTES.MODELS}/${modelMetadata.modelNumber}`}>{intl.formatMessage(modelsPageMessages.numberOdModel, {value: modelMetadata.modelNumber})}</Link>)
            } else {
                row.push(<Button variant="text" sx={{color: '#a05444'}} onClick={() => {
                    props.onCreateNewModel(modelMetadata)
                }}>{intl.formatMessage(modelsPageMessages.createModel)}</Button>)
            }
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

export default ModelsMetaDataComponent
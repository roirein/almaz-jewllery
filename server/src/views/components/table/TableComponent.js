import {Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button} from '@mui/material'
import {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {tableColumnsMessages} from '../../i18n';

const TableComponent = (props) => {
    const [page, setPage] = useState(0)

    const intl = useIntl()

    const handleNewPage = (event, value) => {
        setPage(value)
    }

    console.log(props.data)

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.columns.map((column, index) => {
                            return (
                                <TableCell key={index} sx={{textAlign: 'right', fontWeight: 'bold'}}>
                                    {column}
                                </TableCell>
                            )
                        })}
                        {props.showMoreButton && (
                            <TableCell/>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row?.map((column, colIndex) => (
                                <TableCell key={colIndex} sx={{textAlign: 'right'}}>
                                    {column}
                                </TableCell>
                            ))}
                            {props.showMoreButton && (
                                <TableCell>
                                    <Button
                                        varinat="outlined"
                                        onClick={() => props.onShowMoreClick(row)}
                                        sx={{
                                            borderColor: '#a05444',
                                            color: '#a05444'
                                        }}
                                    >
                                        {intl.formatMessage(tableColumnsMessages.seeMore)}
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={props.data.length}
                page={page}
                onPageChange={handleNewPage}
                rowsPerPage={20}
                rowsPerPageOptions={-1}
                SelectProps={{
                    sx: {
                        display: 'none'
                    }
                }}
                sx={{
                    direction: 'ltr'
                }}
            />
        </>
    )
}

export default TableComponent
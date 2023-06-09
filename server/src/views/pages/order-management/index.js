import {Box, Stack, Menu, MenuItem, Button, Typography} from '@mui/material';
import {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import Link from 'next/link';
import {useRouter} from 'next/router'
import AppTemplateComponent from '../../components/template/AppTemplate';
import AddIcon from '@mui/icons-material/Add';
import { ORDER_TYPES } from '../../../consts/system-consts';
import NewOrderModalComponent from '../../components/modals/NewOrderModal';

const OrderManagementPage= () => {

    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState();
    const intl = useIntl()

    const handleOpenModal = (type) => {
        setShowMenu(false)
        setShowModal(true)
        setModalType(type)
    }

    return (
        <Box
            sx={{
                padding: '12px'
            }}
        >
            <Stack
                direction="column"
                sx={{
                    height: "10%"
                }}
            >
                <Button
                    onClick={() => setShowMenu(true)}
                    sx={{
                        width: 'fit-content'
                    }}
                >
                    <AddIcon/>
                    <Typography
                        variant="body1"
                    >
                        {intl.formatMessage(messages.createNewOrder)}
                    </Typography>
                </Button>
                <Menu
                    open={showMenu}
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'bottom'
                    }}
                >
                    <MenuItem onClick={() => handleOpenModal(ORDER_TYPES.NEW_MODEL)}>
                        {intl.formatMessage(messages.newModel)}
                    </MenuItem>
                    <MenuItem onClick={() => setShowMenu(false)}>
                        {intl.formatMessage(messages.existingModel)}
                    </MenuItem>
                    <MenuItem onClick={() => setShowMenu(false)}>
                        {intl.formatMessage(messages.fix)}
                    </MenuItem>
                </Menu>
            </Stack>
            {showModal && (
                <NewOrderModalComponent
                    orderType={modalType}
                />
            )}
        </Box>
    )
}

export default AppTemplateComponent(OrderManagementPage)
import {Box, Button, Stack, Typography, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Paper} from '@mui/material';
import {Add} from '@mui/icons-material'
import AppTemplateComponent from "../../components/template/AppTemplate";
import AppContext from '../../context/appContext';
import {useContext, useState} from 'react';
import { ROLES } from '../../../consts/system-consts';
import {useIntl} from 'react-intl';
import messages from '../../i18n'
import axios from 'axios'
import { HTTP_STATUS_CODE } from '../../../consts/http-consts';
import NotificationComponent from '../../components/feedbacks/notification';
import NewModelModalComponent from '../../components/modals/NewModelModal';
import {parse} from 'cookie'
import {useRouter} from 'next/router'

const ModelsManagementPage = (props) => {

    const contextValue = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const intl = useIntl();
    const router = useRouter()

    const onCreateNewModel = async (data) => {
        const formData = new FormData();
        formData.append('model', data.image[0])
        const imageName = await axios.post(`${process.env.SERVER_URL}/image/upload`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${contextValue.token}`
            }
        });

        const response = await axios.post(`${process.env.SERVER_URL}/model/newModel`, {
            modelNumber: data.modelNumber,
            item: data.item,
            setting: data.setting,
            mainStone: data.mainStoneSize,
            sideStone: data.sideStoneSize,
            image: imageName.data.path,
            description: data.description
        }, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            } 
        });

        if (response.status === HTTP_STATUS_CODE.CREATED) {
            setNotificationData({
                color: 'success',
                message: intl.formatMessage(messages.newOrderSuccess),
                onClose: () => setNotificationData(null)
            })
        }
    }

    const onClickModel = (modelId) => {
        router.push(`/model-management/${modelId}`)
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItem: 'center'
            }}
        >
            {contextValue.role === ROLES.DESIGN_MANAGER && (
                <Stack
                    sx={{
                        height: '10%'
                    }}
                >
                    <Button
                        onClick={() => setShowModal(true)}
                        sx={{
                            width: 'fit-content'
                        }}
                    >
                        <Add/>
                        <Typography
                            variant="body1"
                        >
                            {intl.formatMessage(messages.createNewModel)}
                        </Typography>
                    </Button>
                </Stack>
            )}
            <Stack
                sx={{
                    width: '100%',
                    height: '80%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{maxWidth: '70%'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>{intl.formatMessage(messages.modelNumber)}</TableCell>
                                <TableCell>{intl.formatMessage(messages.setting)}</TableCell>
                                <TableCell>{intl.formatMessage(messages.sideStoneSize)}</TableCell>
                                <TableCell>{intl.formatMessage(messages.mainStoneSize)}</TableCell>
                                <TableCell>{intl.formatMessage(messages.modelNumber)}</TableCell>
                                <TableCell>{intl.formatMessage(messages.status)}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.modelsList.map((model) => (
                            <TableRow
                                key={model.modelNumber}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {intl.formatMessage(messages[model.item])}
                                </TableCell>
                                <TableCell>{model.setting}</TableCell>
                                <TableCell>{model.sideStone}</TableCell>
                                <TableCell>{model.mainStone}</TableCell>
                                <TableCell>{model.modelNumber}</TableCell>
                                <TableCell>{intl.formatMessage(messages[model.status])}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => onClickModel(model.modelNumber)}
                                    >
                                        {intl.formatMessage(messages.seeMore)}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            {showModal && (
                <NewModelModalComponent
                    onClose={() => setShowModal(false)}
                    onSubmit={(data) => onCreateNewModel(data)}
                />
            )}
            {notificationData && (
                <NotificationComponent
                    color={notificationData.color}
                    message={notificationData.message}
                    onClose={() => notificationData.onClose()}
                />
            )}
        </Box>
    )
};

export const getServerSideProps = async (context) => {
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);

    const modelResponse = await axios.get(`${process.env.SERVER_URL}/model/getAllModels`, {
        headers: {
            Authorization: `Bearer ${userField.userToken}`
        }
    })

    return {
        props: {
            modelsList: modelResponse.data.models
        }
    }
}

export default AppTemplateComponent(ModelsManagementPage)
import AppTemplateComponent from "../../../components/template/AppTemplate"
import {parse} from 'cookie'
import axios from 'axios'
import {Box, Stack, Typography, Button} from '@mui/material'
import {useIntl} from 'react-intl';
import messages from '../../../i18n'
import AppContext from "../../../context/appContext";
import {useContext, useState} from 'react';
import { MODEL_STATUS, ROLES } from "../../../../consts/system-consts";

const ModelPage = (props) => {
    const intl = useIntl();
    const contextValue = useContext(AppContext);
    const [modelStatus, setModelStatus] = useState(props.status)

    const onConfirmModel = async () => {
        const response = await axios.patch(`${process.env.SERVER_URL}/model/reviewModel`, {
            modelNumber: props.id,
            status: MODEL_STATUS.APPROVED
        })
        setModelStatus(response.data.status);
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Stack
                direction='row'
                sx={{
                    width: '60%',
                    height: '70%',
                    border: '2px solid black'
                }}
            >
                <Stack
                    sx={{
                        width: '50%',
                        padding: '16px'
                    }}
                >
                    <Stack
                        sx={{
                            width: '100%',
                            height: '10%'
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                        >
                            {`${intl.formatMessage(messages.modelNumber)} ${props.id}`}
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            width: '100%',
                            height: '70%',
                            padding: '16px'
                        }}
                    >
                        <img
                            width="300px"
                            height="300px"
                            src={`http://localhost:3001/image/getImage/5bc01a222bf8b17f005e1df7ffcd311c.jpg`}
                        />
                    </Stack>
                    <Stack>
                        <Typography>
                            {props.description}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    rowGap="12px"
                    sx={{
                        padding: '16px',
                        width: '50%'
                    }}
                >
                    <Typography>
                        {`${intl.formatMessage(messages.item)}: ${intl.formatMessage(messages[props.item])}`}
                    </Typography>
                    <Typography>
                        {`${intl.formatMessage(messages.setting)}: ${props.inlay}`}
                    </Typography>
                    <Typography>
                        {`${intl.formatMessage(messages.sideStoneSize)}: ${props.sideStone}`}
                    </Typography>
                    <Typography>
                        {`${intl.formatMessage(messages.mainStoneSize)}: ${props.mainStone}`}
                    </Typography>
                    {contextValue.role === ROLES.MANAGER && (
                        <Stack
                            direction="row"
                            columnGap="12px"
                        >
                            <Button>
                                {intl.formatMessage(messages.reject)}
                            </Button>
                            <Button>
                                {intl.formatMessage(messages.confirm)}
                            </Button>
                        </Stack>
                    )}
                    {modelStatus === MODEL_STATUS.APPROVED && (
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="green"
                        >
                            {intl.formatMessage(messages.approved)}
                        </Typography>
                    )}
                </Stack>
            </Stack>

        </Box>
    )
}

export const getServerSideProps = async (context) => {
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);
    const modelNumber = context.params.modelNumber

    console.log(modelNumber)

    const modelResponse = await axios.get(`${process.env.SERVER_URL}/model/getModelById/${modelNumber}`, {
        headers: {
            Authorization: `Bearer ${userField.userToken}`
        }
    })

    const imageResponse = await axios.get(`${process.env.SERVER_URL}/image/getImage/${modelResponse.data.model.image}`, {
        headers: {
            Authorization: `Bearer ${userField.userToken}`
        }
    })

    return {
        props: {
            id: modelResponse.data.model.id,
            status: modelResponse.data.model.status,
            item: modelResponse.data.model.item,
            inlay: modelResponse.data.model.setting,
            mainStone: modelResponse.data.model.mainStone,
            sideStone: modelResponse.data.model.sideStone,
            image: imageResponse.data,
            description: modelResponse.data.model.description
        }
    }
}

export default AppTemplateComponent(ModelPage)
import AppTemplateComponent from "../../../components/template/AppTemplate"
import {parse} from 'cookie'
import axios from 'axios'
import {Box, Stack, Typography, Button} from '@mui/material'
import {useIntl} from 'react-intl';
import messages from '../../../i18n'
import AppContext from "../../../context/appContext";
import {useContext, useState} from 'react';
import { MODEL_STATUS, ROLES } from "../../../../consts/system-consts";
import ModelReviewModalComponent from "../../../components/modals/ModelReviewModal";
import NewModelModalComponent from "../../../components/modals/NewModelModal";
import {useRouter} from 'next/router'
import ModelPriceComponent from "../../../components/modals/UpdateModelPriceModal";

const ModelPage = (props) => {
    const intl = useIntl();
    const contextValue = useContext(AppContext);
    const [modelStatus, setModelStatus] = useState(props.status)
    const [comments, setComments] = useState(props.comments)
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [showUpdateModelModal, setShowUpdateModelModal] = useState(false)
    const [showPriceModal, setShowPriceModal] = useState(false)
    const [modalPriceData, setModalPriceData] = useState(props.modalPriceData)
    const router = useRouter() 

    const onConfirmModel = async () => {
        const response = await axios.patch(`${process.env.SERVER_URL}/model/reviewModel`, {
            modelNumber: props.id,
            modelStatus: MODEL_STATUS.APPROVED
        }, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            }
        })
        setModelStatus(response.data.status);
    }

    const onRejectModel = async (data) => {
        const response = await axios.patch(`${process.env.SERVER_URL}/model/reviewModel`, {
            modelNumber: props.id,
            modelStatus: MODEL_STATUS.NEEDS_WORK,
            comments: data.comments
        }, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            }
        })
        setModelStatus(response.data.status);
        setComments(data.comments)
        setShowCommentsModal(false)
    }

    const updateModel = async (data) => {
        const formData = new FormData();
        formData.append('model', data.image[0])
        const imageName = await axios.post(`${process.env.SERVER_URL}/image/upload`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${contextValue.token}`
            }
        });
        
        const response = await axios.put(`${process.env.SERVER_URL}/model/updateModel/${props.id}`, {
            mainStone: data.mainStoneSize,
            sideStone: data.sideStoneSize,
            inlay: data.setting,
            finalDesign: imageName.data.path,
            description: data.description
        }, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            }
        })

        router.push('/model-management')
    }

    const updateModelPrice = async (data) => {
        const response = await axios.post(`${process.env.SERVER_URL}/model/setModelPrice/${props.id}`, {
            materials: data.materials,
            priceWithMaterials: data.priceWithMaterials,
            priceWithoutMaterials: data.priceWithoutMaterials
        }, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            }
        })

        router.push('/model-management')
    }

    const handleCloseModal = () => {
        setShowCommentsModal(false)
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
                            src={`http://localhost:3001/image/getImage/${props.image}`}
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
                    {comments && (
                        <>
                            <Typography>
                                {`${intl.formatMessage(messages.modelComments)}: ${comments}`}
                            </Typography>
                            {contextValue.role === ROLES.DESIGN_MANAGER && modelStatus === MODEL_STATUS.NEEDS_WORK && (
                                <Button
                                    onClick={() => setShowUpdateModelModal(true)}
                                >
                                    עדכן מודל
                                </Button>
                            )}
                        </>
                    )}
                    {contextValue.role === ROLES.MANAGER && (modelStatus === MODEL_STATUS.CREATED || modelStatus === MODEL_STATUS.UPDATED) && (
                        <Stack
                            direction="row"
                            columnGap="12px"
                        >
                            <Button
                                onClick={() => setShowCommentsModal(true)}
                            >
                                {intl.formatMessage(messages.reject)}
                            </Button>
                            <Button
                                onClick={() => onConfirmModel()}
                            >
                                {intl.formatMessage(messages.confirm)}
                            </Button>
                        </Stack>
                    )}
                    {modelStatus === MODEL_STATUS.APPROVED && contextValue.role === ROLES.MANAGER && (
                        <Button
                            onClick={() => setShowPriceModal(true)}
                        >
                           עדכן חומרים ומחיר
                        </Button>
                    )}
                    {modalPriceData && (
                        <>
                            <Typography>
                                {`חומרים: ${modalPriceData.materials}`}
                            </Typography>
                            <Typography>
                                {`מחיר עם חורמים: ${modalPriceData.priceWithMaterials}`}
                            </Typography>
                            <Typography>
                                {`מחיר בלי חומרים: ${modalPriceData.priceWithoutMaterials}`}
                            </Typography>
                        </>
                    )}
                </Stack>
            </Stack>
            {showCommentsModal && (
                <ModelReviewModalComponent
                    onClose={handleCloseModal}
                    onSubmit={(data) => onRejectModel(data)}
                />
            )}
            {showUpdateModelModal && (
                <NewModelModalComponent
                    onClose={() => setShowUpdateModelModal(false)}
                    onSubmit={(data) => updateModel(data)}
                    modelData={{
                        modelNumber: props.id,
                        item: props.item,
                        setting: props.inlay,
                        mainStoneSize: props.mainStone,
                        sideStoneSize: props.sideStone,
                        description: props.description
                    }}
                />
            )}
            {showPriceModal && (
                <ModelPriceComponent
                    onClose={() => setShowPriceModal(true)}
                    onSubmit={(data) => updateModelPrice(data)}
                />
            )}
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

    console.log(modelResponse.data.model)

    return {
        props: {
            id: modelResponse.data.model.id,
            status: modelResponse.data.model.status,
            item: modelResponse.data.model.item,
            inlay: modelResponse.data.model.setting,
            mainStone: modelResponse.data.model.mainStone,
            sideStone: modelResponse.data.model.sideStone,
            image: modelResponse.data.model.image,
            description: modelResponse.data.model.description,
            comments: modelResponse.data.model.comments ? modelResponse.data.model.comments : null,
            modalPriceData: modelResponse.data.model.priceData ? modelResponse.data.model.priceData : null
        }
    }
}

export default AppTemplateComponent(ModelPage)
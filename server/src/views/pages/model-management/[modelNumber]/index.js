import AppTemplateComponent from "../../../components/template/AppTemplate"
import {parse} from 'cookie'
import axios from 'axios'
import {Box, Stack, Button, Typography} from '@mui/material'
import {useIntl} from 'react-intl';
import {modelsPageMessages, generalMessages} from '../../../i18n'
import AppContext from "../../../context/appContext";
import {useContext, useState} from 'react';
import { MODEL_STATUS, ROLES } from "../../../../consts/system-consts";
import ModelReviewModalComponent from "../../../components/modals/ModelReviewModal";
import NewModelModalComponent from "../../../components/modals/NewModelModal";
import {useRouter} from 'next/router'
import ModelPriceComponent from "../../../components/modals/UpdateModelPriceModal";
import { getModelImageUrl } from "../../../routes/server-routes";

const ModelPage = (props) => {
    const intl = useIntl();
    const contextValue = useContext(AppContext);
    const [designUrl, setDesignUrl] = useState()
    const [imageUrl, setImageUrl] = useState();

    const [modelStatus, setModelStatus] = useState(props.status)
    const [comments, setComments] = useState(props.comments)
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [showUpdateModelModal, setShowUpdateModelModal] = useState(false)
    const [showPriceModal, setShowPriceModal] = useState(false)
    const [modalPriceData, setModalPriceData] = useState(props.modalPriceData)
    const router = useRouter() 

    const getImageUrl = (url, isDesign) => {
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${contextValue.token}`
            },
            responseType: 'blob'
        }).then((res) => {
            const image = URL.createObjectURL(res.data);
            if (isDesign) {
                setDesignUrl(image)
            } else {
                setImageUrl(image)
            }
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        const designUrl = getOrderDesignUrl(props.initialDesign);
        const modelUrl = getModelImageUrl(props.image)
        getImageUrl(designUrl, true);
        getImageUrl(modelUrl, false)
    }, [])

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
        <AppTemplateComponent>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '95vh',
                    alignnItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Stack
                    sx={{
                        width: '50%',
                        height: '50%',
                        padding: '16px',
                        border: '1px solid black'
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                    >
                        {`${intl.formatMessage(modelsPageMessages.numberOdModel, {value: props.id})} - ${props.title}`}
                    </Typography>
                    <Stack
                        direction="row"
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Stack
                            sx={{
                                width: '50%'
                            }}
                        >
                            <img
                                width="250px"
                                height="250px"
                                src={props.designUrl}
                            />
                            <Typography
                                variant="body1"
                            >
                                {`${intl.formatMessage(generalMessages.setting)}: ${props.setting}`}
                            </Typography>
                            <Typography
                                variant="body1"
                            >
                                {`${intl.formatMessage(generalMessages.sideStoneSize)}: ${props.sideStoneSize}`}
                            </Typography>
                            <Typography
                                variant="body1"
                            >
                                {`${intl.formatMessage(generalMessages.mainStoneSize)}: ${props.mainStoneSize}`}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>  
        </AppTemplateComponent>
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

    return {
        props: {
            id: modelResponse.data.model.id,
            title: modelResponse.data.mddel.title,
            status: modelResponse.data.model.status,
            item: modelResponse.data.model.item,
            setting: modelResponse.data.model.setting,
            mainStoneSize: modelResponse.data.model.mainStoneSize,
            sideStoneSize: modelResponse.data.model.sideStoneSize,
            image: modelResponse.data.model.image,
            initialDesign: modelResponse.data.initialDesign,
            description: modelResponse.data.model.description,
            // comments: modelResponse.data.model.comments ? modelResponse.data.model.comments : null,
            // modalPriceData: modelResponse.data.model.priceData ? modelResponse.data.model.priceData : null
        }
    }
}

export default ModelPage
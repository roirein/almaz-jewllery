import { Stepper, Step, StepLabel, Button, Stack } from "@mui/material"
import {HTTP_STATUS_CODE} from '../../../../consts/http-consts'
import {useState, useEffect, useContext} from 'react'
import ModalComponent from "../../../components/modals/ModalComponent"
import { useIntl } from "react-intl"
import { FormProvider, useForm } from "react-hook-form"
import { generalMessages, orderPageMessages } from "../../../i18n"
import OrdersMenuComponent from "./stepper-components/OrdersMenu"
import { ORDER_TYPES } from "../../../../consts/system-consts"
import NewModelFormComponent from "./stepper-components/NewModelForm"
import CommentsAndImageComponent from "./stepper-components/CommentsAndsImage"
import OrderSummaryComponent from "./stepper-components/OrderSummary"
import { getCreateNewOrderUrl } from "../../../routes/server-routes"
import axios from 'axios';
import AppContext from '../../../context/appContext'

const CreateOrderModal = (props) => {

    const [activeStep, setActiveStep] = useState(0);
    const [orderType, setOrderType] = useState(null);
    const contextValue = useContext(AppContext);

    const methods = useForm()

    const stepsFormFields = {
        [ORDER_TYPES.NEW_MODEL] : {
            1: ['item', 'size', 'metal', 'setting', 'sideStoneSize', 'mainStoneSize', 'deadline', 'casting'],
            2: ['comments', 'image']
        },
        [ORDER_TYPES.EXISTING_MODEL] : {
            1: ['item', 'model'],
            2: ['size', 'metal', 'deadline', 'casting', 'comments']
        },
        [ORDER_TYPES.FIX] : {
            1: ['item', 'description']
        }
    }

    const intl = useIntl();
    const intitialSteps = [
        {
            id: 1,
            label: intl.formatMessage(orderPageMessages.orderTypeSelection),
            completed: false,
        }, 
        {
            id: 2,
            label: intl.formatMessage(orderPageMessages.orderDetails),
            completed: false,
        },
        {
            id: 3,
            label: intl.formatMessage(orderPageMessages.orderSummary),
            completed: false,
        }
    ]

    const [steps, setSteps] = useState(intitialSteps)

    useEffect(() => {
        if (orderType) {
            setActiveStep(activeStep + 1);
            const newStep = {
                id: 3, 
                label: intl.formatMessage(orderPageMessages.commentsAndImageUpload),
                completed: false,
            }
            const newSteps = [...steps.slice(0, 2), newStep, steps.slice(2)]
            newSteps[0].completed = true;
            newSteps[3].id = 4
            setSteps(newSteps)
        }
    }, [orderType])

    useEffect(() => {

    }, [activeStep])

    const onChooseOrder = (orderType) => {
        setOrderType(orderType)
    }

    const handleMoveNextStep = async () => {
        const isNextStepAllowed = await methods.trigger(stepsFormFields[orderType][activeStep])
        if (isNextStepAllowed) {
            const stepsCopy = [...steps];
            stepsCopy[activeStep].completed = true
            setSteps(stepsCopy)
            setActiveStep(activeStep + 1)
        }
    }

    const handleMoveBackStep = () => {
        const newStep = activeStep - 1
        if (newStep === 0) {
            methods.reset()
            setOrderType(null)
            setSteps(intitialSteps)
        }
        setActiveStep(newStep)
    }

    const onCloseModal = () => {
        setActiveStep(0)
        setSteps(intitialSteps)
        setOrderType(null)
        methods.reset()
        props.onClose()
    }

    const handleCreateNewOrder = async () => {
        const url = getCreateNewOrderUrl()
        const formData = new FormData()
        const values = methods.getValues();
        Object.entries(values).forEach((entry) => {
            formData.append(entry[0], entry[1])
        })
        formData.append('type', orderType)
        formData.append('customerName', contextValue.name)
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${contextValue.token}`
            }
        })

        if (response.status === HTTP_STATUS_CODE.CREATED) {
            onCloseModal()
        }
    }


    const getStepComponent = () => {
        if (activeStep === 0) {
            return <OrdersMenuComponent onChooseOrder={(orderType) => onChooseOrder(orderType)}/>
        }
        if (activeStep === 1) {
            return (
                <NewModelFormComponent/>
            )
        }
        if (activeStep === 2) {
            return (
                <CommentsAndImageComponent/>
            )
        }
        if (activeStep === 3) {
            return (
                <OrderSummaryComponent
                    orderType={intl.formatMessage(orderPageMessages.personalDesign)}
                />
            )
        } 
    }

    const getModalActions = () => {
        return (
            <Stack
                direction="row"
                sx={{
                    width: '100%'
                }}
            >
                <Stack
                    sx={{
                        width: '50%',
                        justifyContent: 'left',
                    }}
                >
                    <Button
                        sx={{
                            width: '10%',
                            backgroundColor: '#a05444',
                            color:'white',
                            fontWeight: 'bold'
                        }}
                        onClick={() => onCloseModal()}
                    >
                        {intl.formatMessage(generalMessages.close)}
                    </Button>
                </Stack>
                {activeStep > 0 && (
                    <Stack
                        direction="row"
                        columnGap="12px"
                        sx={{
                            width: '50%',
                            justifyContent: 'right'
                        }}
                    >
                        <Button
                            sx={{
                                width: '10%',
                                backgroundColor: '#a05444',
                                color:'white',
                                fontWeight: 'bold'
                            }}
                            onClick={() => handleMoveBackStep()}
                        >
                            {intl.formatMessage(generalMessages.goBack)}
                        </Button>
                        {activeStep < steps.length - 1 && (
                            <Button
                                sx={{
                                    width: '10%',
                                    backgroundColor: '#a05444',
                                    color:'white',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => handleMoveNextStep()}
                            >
                                {intl.formatMessage(generalMessages.continue)}
                            </Button>
                        )}
                        {activeStep === steps.length - 1 && (
                            <Button
                                sx={{
                                    width: '10%',
                                    backgroundColor: '#a05444',
                                    color:'white',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => handleCreateNewOrder()}
                            >
                                {intl.formatMessage(generalMessages.send)}
                            </Button>
                        )}
                    </Stack>
                )}
            </Stack>
        )
    }

    const getStepColor = (step) => {
        if (step.id === activeStep + 1) {
            return '#a05444'
        } else if (step.completed) {
            return 'green'
        } else {
            return 'grey'
        }
    }

    return (
        <ModalComponent
            open={props.open}
            onClose={() => onCloseModal()}
            title={intl.formatMessage(orderPageMessages.createNewOrder)}
            actions={getModalActions()}
            width="md"
        >
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            StepIconProps={{
                                style: {
                                    color: getStepColor(step)
                                }
                            }}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Stack
                sx={{
                    width: '100%'
                }}
            >
                <FormProvider {...methods}>
                    <form
                        style={{
                            direction: 'rtl'
                        }}
                    >
                        {getStepComponent()}
                    </form>
                </FormProvider>
            </Stack>
        </ModalComponent>
    )
}

export default CreateOrderModal
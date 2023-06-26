import {useState, useEffect, useContext} from "react"
import ModalComponent from "../../../components/modals/ModalComponent"
import {useIntl} from 'react-intl';
import InputLabelComponent from "../../../components/form/Labels/InputLabel";
import { modelsPageMessages, homePageMessages, generalMessages } from "../../../i18n";
import { Stack, Button } from "@mui/material";
import FormComponent from "../../../components/form/Form";
import { Form } from "react-hook-form";
import FormTextFieldComponent from "../../../components/form/Inputs/InputField";
import SelectFieldComponent from "../../../components/form/Inputs/SelectField";
import FormTextAreaComponent from "../../../components/form/Inputs/TextAreaField";
import FileUploader from "../../../components/form/Inputs/FileUploader";
import { ITEMS } from "../../../const/SelectComponentConst";
import axios from 'axios'
import { getCreateNewModelUrl, getCreateNewOrderUrl } from "../../../routes/server-routes";
import AppContext from "../../../context/appContext";
import { HTTP_STATUS_CODE } from "../../../../consts/http-consts";

const CreateModelModalComponent = (props) => {

    const intl = useIntl()

   const [defaultVals, setDefaultVals] = useState({});
   const contextValue = useContext(AppContext)
   const data = props.modelData

    useEffect(() => {
        if (props.modelData){
            setDefaultVals({
                item: props.modelData.item,
                setting: props.modelData.setting,
                sideStoneSize: props.modelData.sideStoneSize,
                mainStoneSize: props.modelData.mainStoneSize
            })
        }
    }, [data])

    const createNewModel = async (data) => {
        const url = getCreateNewModelUrl(props.modelData.metadataId)
        const formData = new FormData()
        const {item, setting, mainStoneSize, sideStoneSize, ...rest} = data;
        Object.entries(rest).forEach(entry => {
            formData.append(entry[0], entry[1])
        })
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${contextValue.token}`
            }
        })
        if (response.status === HTTP_STATUS_CODE.CREATED) {
            setDefaultVals({})
            props.onClose()
        }
    }

    const getModalActions = () => {
        return (
            <Stack
                direction="row"
                columnGap="8px"
            >
                <Button
                    varinat="contained"
                    onClick={() => {
                        setDefaultVals({})
                        props.onClose()
                    }}
                    sx={{
                        backgroundColor: '#a05444',
                        color: 'white',
                    }}
                >
                    {intl.formatMessage(generalMessages.close)}
                </Button>
                <Button
                    varinat="contained"
                    form="model-form"
                    type="submit"
                    sx={{
                        backgroundColor: '#a05444',
                        color: 'white',
                    }}
                >
                    {intl.formatMessage(generalMessages.send)}
                </Button>
            </Stack>
        )
    }

   return (
    <ModalComponent
        open={props.open}
        width="sm"
        onClose={() => {
            setDefaultVals({})
            props.onClose()
        }}
        actions={getModalActions()}
    >
        <FormComponent
            defaultValues={defaultVals}
            onSubmit={(data) => createNewModel(data)}
            id="model-form"
        >
            <Stack
                sx={{
                    width: '100%',
                    direction: 'rtl'
                }}
            >
                <FormTextFieldComponent
                    type="text"
                    name="modelNumber"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError),
                    }}
                    fieldLabel={intl.formatMessage(modelsPageMessages.modelNumber)}
                    onBlur={() => {}}
                />
                <SelectFieldComponent
                        name="item"
                        rules={{
                            required: intl.formatMessage(homePageMessages.emptyFieldError) 
                        }}
                        fieldLabel={intl.formatMessage(modelsPageMessages.item)}
                        onBlur={() => {}}
                        items={ITEMS}
                        readonly={!!props.modelData}
                />
                <Stack
                    direction="row"
                    columnGap="8px"
                    sx={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        direction: 'rtl'
                    }}
                >
                    <FormTextFieldComponent
                        name="setting"
                        type="text"
                        rules={{
                            required: intl.formatMessage(homePageMessages.emptyFieldError) 
                        }}
                        fieldLabel={intl.formatMessage(modelsPageMessages.setting)}
                        onBlur={() => {}}
                        readonly={!!props.modelData}
                        />
                        <FormTextFieldComponent
                            name="sideStoneSize"
                            type="number"
                            rules={{
                                required: intl.formatMessage(homePageMessages.emptyFieldError),
                                min: {
                                    value: 0,
                                    message: intl.formatMessage(generalMessages.rangeError, {value: 0})
                                } 
                            }}
                            fieldLabel={intl.formatMessage(modelsPageMessages.sideStoneSize)}
                            onBlur={() => {}}
                            readonly={!!props.modelData}
                        />
                        <FormTextFieldComponent
                            name="mainStoneSize"
                            type="number"
                            rules={{
                                required: intl.formatMessage(homePageMessages.emptyFieldError),
                                min: {
                                    value: 0,
                                    message: intl.formatMessage(generalMessages.rangeError, {value: 0})
                                } 
                            }}
                            fieldLabel={intl.formatMessage(modelsPageMessages.mainStoneSize)}
                            onBlur={() => {}}
                            readonly={!!props.modelData}
                        />
                </Stack>
                <FormTextFieldComponent
                    name="title"
                    type="text"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError), 
                    }}
                    fieldLabel={intl.formatMessage(modelsPageMessages.title)}
                    onBlur={() => {}}
                />
                <FormTextAreaComponent
                    name="description"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError), 
                    }}
                    fieldLabel={intl.formatMessage(modelsPageMessages.description)}
                    onBlur={() => {}}
                />
                <FileUploader 
                    name="model"
                    required={true}
                    errMessage={intl.formatMessage(homePageMessages.emptyFieldError)}
                />
            </Stack>
        </FormComponent>
    </ModalComponent>
   ) 
}

export default CreateModelModalComponent
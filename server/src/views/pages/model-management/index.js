import {Button, Stack, Typography, Tabs, Tab} from '@mui/material';
import {Add} from '@mui/icons-material'
import AppTemplateComponent from "../../components/template/AppTemplate";
import AppContext from '../../context/appContext';
import {useContext, useState, useEffect} from 'react';
import { ROLES } from '../../../consts/system-consts';
import {useIntl} from 'react-intl';
import { modelsPageMessages } from '../../i18n'
import axios from 'axios'
import {parse} from 'cookie'
import { getModelsMetadataUrl } from '../../routes/server-routes';
import { MANAGER_MODELS_TABLE, MODEL_METADATA_TABLE_COLUMNS, MODEL_TABLE_COLUMS } from '../../const/tables-columns';
import CreateModelModalComponent from './components/CreateModelModal';
import ModelsMetaDataComponent from './components/ModelsMetadatComponent';
import ModelsComponent from './components/ModelsComponent';
import ModelsManagerViewComponent from './components/ModelMangerViewComponent';

const ModelManagementPageComponent = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState(1)
    const [modelData, setModelData] = useState(null)
    const contextValue = useContext(AppContext);
    const intl = useIntl();

    const onCreateNewModel = (modalData) => {
        if (modalData) {
            setModelData(modalData)
        }
        setShowModal(true)
    }

    return (
        <AppTemplateComponent>
            {contextValue.role === ROLES.DESIGN_MANAGER && (
                <>
                    <Stack
                        sx={{
                            width: '10%',
                        }}
                    >   
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#a05444'
                            }}
                            onClick={() => onCreateNewModel()}
                        >
                            <Add/>
                            <Typography>
                                {intl.formatMessage(modelsPageMessages.createNewModel)}
                            </Typography>
                        </Button>
                    </Stack>
                    <Stack
                        sx={{
                            width: '60%'
                        }}
                    >  
                        <Tabs
                            value={selectedTab}
                            onChange={(event, value) => setSelectedTab(value)}
                        >
                            <Tab label={intl.formatMessage(modelsPageMessages.models)} value={1}/>
                            <Tab label={intl.formatMessage(modelsPageMessages.modelsRequest)} value={2}/>
                        </Tabs>
                    </Stack>
                    <Stack
                        sx={{
                            width: '60%',
                        }}
                    >   {selectedTab === 1 && (
                            <ModelsComponent
                                tableColumns={props.modelTableColumns}
                                data={props.modelsData}
                            />
                        )}
                        {selectedTab === 2 && (
                            <ModelsMetaDataComponent
                                tableColumns={props.metadataTableColumns}
                                data={props.modelMetadata}
                                onCreateNewModel={onCreateNewModel}
                            />
                        )}
                    </Stack>
                    <CreateModelModalComponent
                        open={showModal}
                        modelData={modelData}
                        onClose={() => {
                            setModelData(null)
                            setShowModal(false);
                        }}
                    />
                </>
            )}
            {contextValue.role === ROLES.MANAGER && (
                <Stack
                    sx={{
                        width: '60%'
                    }}
                >
                    <ModelsManagerViewComponent
                        tableColumns={props.columns}
                        data={props.models}
                    />
                </Stack>
            )}
        </AppTemplateComponent>
    )
}

export default ModelManagementPageComponent

export const getServerSideProps = async (context) => {
    const url = getModelsMetadataUrl();
    const cookie = parse(context.req.headers.cookie);
    const userField = JSON.parse(cookie.userFields);

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${userField.userToken}`
        }
    })

    let props = {}

    if (userField.userRole === ROLES.DESIGN_MANAGER) {
        const modelsMetadata = response.data.modelsData.map((model) => {
            const {modelData, ...rest} = model
            return {
                metaData: rest,
            }
        })
        let models = response.data.modelsData.map((model) => {
            if (model.modelData) {
                return {
                    model: {
                        modelNumber: model.modelNumber,
                        title: model.modelData.title,
                        status: model.modelData.status
                    }
                }
            }
        })
        models = models.filter((model) => model !== undefined)
        props = {
            metadataTableColumns: MODEL_METADATA_TABLE_COLUMNS,
            modelTableColumns: MODEL_TABLE_COLUMS,
            modelMetadata: modelsMetadata,
            modelsData: models
        }
    }
    if (userField.userRole === ROLES.MANAGER) {
        const modelsData = response.data.modelsData.filter((model) => model.modelData !== null)
        const models = modelsData.map((model) => {
            const {modelData, ...rest} = model
            let result = {...rest}
            if (modelData) {
                result = {
                    ...result,
                    ...modelData
                }
            } 
            return {
                model: result,
            }
        })
        props = {
            columns: MANAGER_MODELS_TABLE,
            models
        }
    }

    return {
        props
    }
}
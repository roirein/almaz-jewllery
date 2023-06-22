import {Stack} from '@mui/material'
import {useIntl} from 'react-intl'
import SelectFieldComponent from "../../../../components/form/Inputs/SelectField";
import FormTextFieldComponent from '../../../../components/form/Inputs/InputField';
import { ITEMS, METAL, SIZE } from "../../../../const/SelectComponentConst";
import { homePageMessages, generalMessages } from "../../../../i18n";
import FormDatePickerComponent from '../../../../components/form/Inputs/DatePicker';
import FormSwitchComponent from '../../../../components/form/Inputs/Switch';

const NewModelFormComponent = (props) => {

    const intl = useIntl();

    return (
        <Stack
            rowGap="12px"
            sx={{
                width: '100%',
                mt: '12px'
            }}
        >
            <Stack
                direction="row"
                columnGap="8px"
                sx={{
                    width: '100%',
                    justifyContent: 'flex-start',
                    direction: 'rtl'
                }}
            >
                <SelectFieldComponent
                    name="item"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError) 
                    }}
                    fieldLabel={intl.formatMessage(generalMessages.item)}
                    onBlur={() => {}}
                    items={ITEMS}
                />
                <SelectFieldComponent
                    name="size"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError) 
                    }}
                    fieldLabel={intl.formatMessage(generalMessages.size)}
                    items={SIZE}
                    onBlur={() => {}}
                />
                <SelectFieldComponent
                    name="metal"
                    rules={{
                        required: intl.formatMessage(homePageMessages.emptyFieldError) 
                    }}
                    fieldLabel={intl.formatMessage(generalMessages.metal)}
                    items={METAL}
                    onBlur={() => {}}
                />
            </Stack>
            <FormTextFieldComponent
                name="setting"
                type="text"
                rules={{
                    required: intl.formatMessage(homePageMessages.emptyFieldError) 
                }}
                fieldLabel={intl.formatMessage(generalMessages.setting)}
                onBlur={() => {}}
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
                fieldLabel={intl.formatMessage(generalMessages.sideStoneSize)}
                onBlur={() => {}}
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
                fieldLabel={intl.formatMessage(generalMessages.mainStoneSize)}
                onBlur={() => {}}
            />
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
                    <FormDatePickerComponent
                        name="deadline"
                        rules={{
                            required: intl.formatMessage(homePageMessages.emptyFieldError),
                        }}
                        fieldLabel={intl.formatMessage(generalMessages.deadline)}
                    />
                </Stack>
                <Stack
                    sx={{
                        width: '50%',
                    }}
                >
                    <Stack
                        sx={{
                            marginRight: 'auto'
                        }}
                    >
                        <FormSwitchComponent
                            name="casting"
                            fieldLabel={intl.formatMessage(generalMessages.casting)}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default NewModelFormComponent
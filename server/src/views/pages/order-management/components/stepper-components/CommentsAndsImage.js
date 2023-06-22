import FileUploader from "../../../../components/form/Inputs/FileUploader"
import FormTextAreaComponent from "../../../../components/form/Inputs/TextAreaField"
import {Stack} from '@mui/material'
import {useIntl} from 'react-intl'
import { generalMessages, homePageMessages } from "../../../../i18n"

const CommentsAndImageComponent = () => {
    
    const intl = useIntl();

    return (
        <Stack
            rowGap="12px"
            sx={{
                width: '100%',
                mt: '12px'
            }}
        >
            <FormTextAreaComponent
                name="comments"
                fieldLabel={intl.formatMessage(generalMessages.comments)}
                onBlur={() => {}}
            />
            <FileUploader 
                name="image"
                required={true}
                errMessage={intl.formatMessage(homePageMessages.emptyFieldError)}
            />
        </Stack>
    )
}

export default CommentsAndImageComponent
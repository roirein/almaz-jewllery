import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useFormContext, Controller } from 'react-hook-form';
import {useIntl} from 'react-intl'
import { genSalt } from 'bcryptjs';
import { generalMessages } from '../../../i18n';
import ErrorLabelComponent from '../Labels/ErrorLabel';

const FileUploader = (props) => {

    const {register, setValue, formState: {errors}, control} = useFormContext();
    const intl = useIntl()

    const [error, setError] = useState(null)


    const handleFileUpload = (file) => {
        // Perform file upload logic here
        setValue(props.name, file)

    };
      
    const handleDrop = useCallback(
    (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        handleFileUpload(file);
        }
    },
    [handleFileUpload]
    );

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
    });

    return (
      <Controller
        name={props.name}
        control={control}
        rules={{
          validate: {
            required: () => {
              if (props.required) {
                if (!acceptedFiles.length > 0) {
                  return false
                }
              }
              return true
            }
          }
        }}
        render={({field}) => (
            <div>
              <Box
                {...getRootProps()}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                <input {...getInputProps()} />
                <CloudUploadIcon/>
                <Typography variant="body1">
                    {acceptedFiles.length > 0 ? acceptedFiles[0].name : intl.formatMessage(generalMessages.fileUploaderMessage)}
                </Typography>
                {errors && errors[props.name] && (
                      <ErrorLabelComponent
                          label={props.errMessage}
                      />
                  )}
              </Box>
          </div>
        )}
      />
    );
  };
  
  export default FileUploader
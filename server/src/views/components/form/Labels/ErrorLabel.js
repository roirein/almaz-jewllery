import {Typography} from '@mui/material';

const ErrorLabelComponent = (props) => {
    return (
        <Typography
            varinat="body2"
            color="red"
        >
            {props.label}
        </Typography>
    )
}

export default ErrorLabelComponent
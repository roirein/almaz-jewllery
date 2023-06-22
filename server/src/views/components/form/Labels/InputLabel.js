import {InputLabel} from '@mui/material'

const InputLabelComponent = (props) => {
    return (
        <InputLabel
            sx={{
                direction: 'rtl'
            }}
        >
            {props.label}
        </InputLabel>
    )
}

export default InputLabelComponent;
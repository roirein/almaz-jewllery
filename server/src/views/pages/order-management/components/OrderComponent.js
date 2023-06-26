import {Stack, Typography} from '@mui/material';
import { generalMessages, orderPageMessages } from '../../../i18n';
import { useIntl } from 'react-intl';

const OrderComponent = (props) => {

    const intl = useIntl()

    return (
        <Stack
            sx={{
                width: '100%'
            }}
        >
            <Stack
                sx={{
                    width: '100%',
                    height: '10%'
                }}
            >
                <Typography
                    variant='h6'
                    fontWeight="bold"
                >
                    {props.title}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                sx={{
                    width: '100%'
                }}
            >
                <Stack
                    rowGap="12px"
                    sx={{
                        width: '50%'
                    }}
                >
                    <Typography
                        variant='subtitle1' 
                    >
                        {intl.formatMessage(generalMessages.modelDetails)}
                    </Typography>
                    <img
                        width="250px"
                        height="250px"
                        src={props.imageSrc}
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
                <Stack
                    rowGap="12px"
                    sx={{
                        width: '50%'
                    }}
                >
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.item)}: ${props.item}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.metal)}: ${props.metal}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.size)}: ${props.size}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.deadline)}: ${props.deadline}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.casting)}: ${props.casting}`}
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {`${intl.formatMessage(generalMessages.comments)}: ${props.comments ? props.comments : ''}`}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default OrderComponent;
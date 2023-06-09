import {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useIntl} from 'react-intl';
import messages from '../../i18n';
import {TextField, Button, Switch, Select, Typography, MenuItem, Stack} from '@mui/material';
import AppContext from '../../context/appContext';
import { ROLES } from '../../../consts/system-consts';
import { ITEMS, METAL, SIZE } from '../../const/SelectComponentConst';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const NewModelFormComponent = () => {

    const {control, formState: {errors}} = useForm()
    const conetxtValue = useContext(AppContext);
    const intl = useIntl();


    return (
        <form>
            {conetxtValue.role === ROLES.MANAGER && (
                <Stack>
                    <Controller
                        name="customerName"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage(messages.customerName)}
                                fullWidth
                                inputRef={null}
                                error={errors && errors.customerName}
                            />
                        )}
                    />
                    {errors && errors.customerName && (
                        <Typography
                            color="red"
                            variant="body2"
                        >
                            {intl.formatMessage(messages.emptyField)}
                        </Typography>
                    )}
                </Stack>
            )}
            <Stack>
                <Controller
                    name="item"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                        <Select
                            {...field}
                            label={intl.formatMessage(messages.item)}
                        >
                            {Object.entries(ITEMS).map((entry) => (
                                <MenuItem>
                                    {intl.formatMessage(messages[entry[1]])}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <Controller
                    name="metal"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                        <Select
                            {...field}
                            label={intl.formatMessage(messages.metal)}
                        >
                            {Object.entries(METAL).map((entry) => (
                                <MenuItem>
                                    {intl.formatMessage(messages[entry[1]])}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <Controller
                    name="size"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                        <Select
                            {...field}
                            label={intl.formatMessage(messages.size)}
                        >
                            {Object.entries(SIZE).map((entry) => (
                                <MenuItem>
                                    {intl.formatMessage(messages[entry[1]])}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <Stack>
                    <Controller
                        name="setting"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage(messages.setting)}
                                fullWidth
                                inputRef={null}
                                error={errors && errors.setting}
                            />
                        )}
                    />
                    {errors && errors.setting && (
                        <Typography
                            color="red"
                            variant="body2"
                        >
                            {intl.formatMessage(messages.emptyField)}
                        </Typography>
                    )}
                </Stack>
                <Stack>
                    <Controller
                        name="sideStoneSize"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage(messages.sideStoneSize)}
                                fullWidth
                                inputRef={null}
                                error={errors && errors.sideStoneSize}
                            />
                        )}
                    />
                    {errors && errors.sideStoneSize && (
                        <Typography
                            color="red"
                            variant="body2"
                        >
                            {intl.formatMessage(messages.emptyField)}
                        </Typography>
                    )}
                </Stack>
                <Stack>
                    <Controller
                        name="mainStoneSide"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label={intl.formatMessage(messages.mainStoneSize)}
                                fullWidth
                                inputRef={null}
                                error={errors && errors.mainStoneSize}
                            />
                        )}
                    />
                    {errors && errors.mainStoneSize && (
                        <Typography
                            color="red"
                            variant="body2"
                        >
                            {intl.formatMessage(messages.emptyField)}
                        </Typography>
                    )}
                </Stack>
                <Stack>
                    <Controller
                        name="deadline"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label={intl.formatMessage(messages.deadline)}/>
                            </LocalizationProvider>
                        )}
                    />
                </Stack>
            </Stack>
        </form>
    )
}

export default NewModelFormComponent
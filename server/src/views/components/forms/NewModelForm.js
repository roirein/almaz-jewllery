import {useContext} from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {useIntl} from 'react-intl';
import messages from '../../i18n';
import {TextField, Button, Switch, Select, Typography, MenuItem, Stack, InputLabel} from '@mui/material';
import AppContext from '../../context/appContext';
import { ROLES } from '../../../consts/system-consts';
import { ITEMS, METAL, SIZE } from '../../const/SelectComponentConst';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const NewModelFormComponent = () => {

    const {register, control, formState: {errors}, getValues} = useFormContext()
    const conetxtValue = useContext(AppContext);
    const intl = useIntl();


    return (
        <Stack
            direction="row"
            sx={{
                width: "100%"
            }}
        >
            <Stack
                rowGap="12px"
                sx={{
                    width: '100%'
                }}
            >
                {conetxtValue.role === ROLES.MANAGER && (
                    <Stack>
                        <Controller
                            name="customerName"
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Stack
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <InputLabel>
                                        {intl.formatMessage(messages.customerName)}
                                    </InputLabel>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        inputRef={null}
                                        error={errors && errors.customerName}
                                    />
                                </Stack>
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
                <Stack
                    direction="row"
                    columnGap="8px"
                    justifyContent="flex-start"
                    sx={{
                        width: '100%'
                    }}
                >
                    <Controller
                        name="item"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.item)}
                                </InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    onChange={(event) => {
                                        field.onChange(event.target.value)
                                    }}
                                    value={getValues('item')}
                                >
                                    {Object.entries(ITEMS).map((entry) => (
                                        <MenuItem key={entry[1]} value={entry[1]}>
                                            {intl.formatMessage(messages[entry[1]])}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Stack>
                        )}
                    />
                    <Controller
                        name="metal"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                direction="column"
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.metal)}
                                </InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    onChange={(event) => {
                                        field.onChange(event.target.value)
                                    }}
                                    value={getValues('metal')}
                                >
                                    {Object.entries(METAL).map((entry) => (
                                        <MenuItem key={entry[1]} value={entry[1]}>
                                            {intl.formatMessage(messages[entry[1]])}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Stack>
                        )}
                    />
                    <Controller
                        name="size"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.size)}
                                </InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    onChange={(event) => {
                                        field.onChange(event.target.value)
                                    }}
                                    value={getValues('item')}
                                >
                                    {Object.entries(SIZE).map((entry) => (
                                        <MenuItem key={entry[1]} value={entry[1]}>
                                            {intl.formatMessage(messages[entry[1]])}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Stack>
                        )}
                    />
                </Stack>
                <Stack>
                    <Controller
                        name="setting"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.setting)}
                                </InputLabel>
                                <TextField
                                    {...field}
                                    fullWidth
                                    inputRef={null}
                                    error={errors && errors.setting}
                                />
                            </Stack>
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
                            <Stack
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.sideStoneSize)}
                                </InputLabel>
                                <TextField
                                    {...field}
                                    fullWidth
                                    inputRef={null}
                                    error={errors && errors.sideStoneSize}
                                />
                            </Stack>
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
                        name="mainStoneSize"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack>
                                <InputLabel>
                                    {intl.formatMessage(messages.mainStoneSize)}
                                </InputLabel>
                                <TextField
                                    {...field}
                                    fullWidth
                                    inputRef={null}
                                    error={errors && errors.mainStoneSize}
                                />
                            </Stack>
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
                    <InputLabel>
                        {intl.formatMessage(messages.image)}
                    </InputLabel>
                    <input
                        type="file"
                        accept="image/"
                        {...register('image', {required: true})}
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
                            <Stack
                                sx={{
                                    width: '100%'
                                }}
                            >   
                                <InputLabel>
                                    {intl.formatMessage(messages.deadline)}
                                </InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker {...field} format="DD/MM/YYYY"/>
                                </LocalizationProvider>
                            </Stack>
                        )}
                    />
                </Stack>
                <Stack>
                    <Controller
                        name="comments"
                        control={control}
                        render={({field}) => (
                            <Stack>
                                <InputLabel>
                                    {intl.formatMessage(messages.coomments)}
                                </InputLabel>
                                <TextField
                                    {...field}
                                    fullWidth
                                    inputRef={null}
                                    error={errors && errors.image}
                                    multiline
                                    rows={3}
                                />
                            </Stack>
                        )}
                    />
                </Stack>
                <Stack>
                    <Controller
                        name="casting"
                        control={control}
                        defaultValue={false}
                        render={({field}) => (
                            <Stack
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.isCastingRequired)}
                                </InputLabel>
                                <Switch
                                    checked={getValues('casting')}
                                    onChange={(event) => field.onChange(event.target.checked)}
                                />
                            </Stack>
                        )}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default NewModelFormComponent
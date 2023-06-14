import {TextField, InputLabel, Stack, Select, MenuItem} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form';
import {useIntl} from 'react-intl';
import messages from '../../i18n';
import {ITEMS} from '../../const/SelectComponentConst';

const ModelForm = () => {

    const {control, register, handleSubmit, formState: {errors}, getValues} = useFormContext();
    const intl = useIntl();

    return (
        <Stack
            direction="row"
            sx={{
                width: '100%'
            }}
        >
            <Stack
                rowGap="12px"
                sx={{
                    width: '100%'
                }}
            >
                <Stack>
                    <Controller
                        name="modelNumber"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{width: '100%'}}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.modelNumber)}
                                </InputLabel>
                                <TextField
                                    {...field}
                                    fullWidth
                                    inputRef={null}
                                    error={errors && errors.modelNumber}
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
                    />
                </Stack>
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
                    <Stack>
                        <InputLabel>
                            {intl.formatMessage(messages.image)}
                        </InputLabel>
                        <input
                            type="file"
                            accept="image/"
                            {...register('image', {required: true})}
                        />
                        {errors && errors.image && (
                            <Typography
                                color="red"
                                variant="body2"
                            >
                                {intl.formatMessage(messages.emptyField)}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
                <Stack>
                    <Controller
                        name="setting"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{width: '100%'}}
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
                    />
                </Stack>
                <Stack>
                    <Controller
                        name="sideStoneSize"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{width: '100%'}}
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
                    />
                </Stack>
                <Stack>
                    <Controller
                        name="mainStoneSize"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{width: '100%'}}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.mainStoneSize)}
                                </InputLabel>
                                <TextField
                                    {...field}
                                    fullWidth
                                    inputRef={null}
                                    error={errors && errors.mainStoneSize}
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
                    />
                </Stack>
                <Stack>
                    <Controller
                        name="description"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                            <Stack
                                sx={{width: '100%'}}
                            >
                                <InputLabel>
                                    {intl.formatMessage(messages.description)}
                                </InputLabel>
                                <TextField
                                    {...field}
                                    fullWidth
                                    inputRef={null}
                                    error={errors && errors.description}
                                    multiline
                                    rows={3}
                                />
                                {errors && errors.description && (
                                    <Typography
                                        color="red"
                                        variant="body2"
                                    >
                                        {intl.formatMessage(messages.emptyField)}
                                    </Typography>
                                )}
                            </Stack>
                        )}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ModelForm
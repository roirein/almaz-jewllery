import { createIntl } from "react-intl"
import { generalMessages } from "../i18n"
import translations from '../locales/he.json'

const intl = createIntl({
    locale: 'he',
    messages: translations
})

export const ITEMS = [
    {
        value: 'ring',
        label: intl.formatMessage(generalMessages.ring)
    },
    {
        value: 'earrings',
        label: intl.formatMessage(generalMessages.earrings)
    },
    {
        value: 'pendant',
        label: intl.formatMessage(generalMessages.pendant)
    },
    {
        value: 'bracelet',
        label: intl.formatMessage(generalMessages.bracelet)
    }
]

export const SIZE = [
    {
        value: 'finger',
        label: intl.formatMessage(generalMessages.finger)
    },
    {
        value: 'neck',
        label: intl.formatMessage(generalMessages.neck)
    },
    {
        value: 'hand',
        label: intl.formatMessage(generalMessages.hand)
    },
]

export const METAL = [
    {
        value: 'yellow',
        label: intl.formatMessage(generalMessages.yellow)
    },
    {
        value: 'white',
        label: intl.formatMessage(generalMessages.white)
    },
    {
        value: 'rose',
        label: intl.formatMessage(generalMessages.rose)
    },
    {
        value: 'platinum',
        label: intl.formatMessage(generalMessages.platinum)
    }
]

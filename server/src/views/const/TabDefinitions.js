import messages, { headerMessages } from '../i18n'
import ROUTES from '../routes/client-routes'

export const MANAGER_TABS = [
    {
        label: headerMessages.orders,
        value: ROUTES.ORDER_MANAGEMENT
    }, 
    {
        label: headerMessages.customers,
        value: ROUTES.CUSTOMERS
    },
    {
        label: headerMessages.employees,
        value: ROUTES.EMPLOYEES
    },
    {
        label: headerMessages.stock,
        value: ROUTES.STOCK
    },
    {
        label: headerMessages.reports,
        value: ROUTES.REPORTS
    },
    {
        label: headerMessages.settings,
        value: ROUTES.SETTINGS
    },
    {
        label: headerMessages.models,
        value: ROUTES.MODELS
    }
]

// export const DESIGN_MANAGER_TABS = [
//     {
//         label: messages.ordersManagement,
//         value: '/order-management'
//     },
//     {
//         label: messages.models,
//         value: '/model-management'
//     }
// ]

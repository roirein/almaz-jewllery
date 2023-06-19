import { useState } from 'react'
import {Tab, Tabs} from '@mui/material'
import AppTemplateComponent from '../../../components/template/AppTemplate'
import {useRouter} from 'next/router'
import ROUTES from '../../../routes/client-routes'
import { customerPageMessages } from '../../../i18n'
import Link from 'next/link'
import { useIntl } from 'react-intl'

const PageLayoutComponent = (props) => {

    const router = useRouter()
    const intl = useIntl()

    return (
        <AppTemplateComponent>
            <Tabs>
                <Tab
                    sx={{
                        border: router.pathname === ROUTES.CUSTOMERS ? `1px solid #a05444` : 'none'
                    }}
                    label={(
                        <Link 
                            href={ROUTES.CUSTOMERS}
                            style={{
                                textDecoration: 'none',
                                color: '#a05444',
                                fontWeight: ROUTES.CUSTOMERS ? 'bold' : 'normal'
                            }}
                        >
                            {intl.formatMessage(customerPageMessages.customers)}
                        </Link>
                    )}
                    value={ROUTES.CUSTOMERS}
                />
                    <Tab
                        sx={{
                            border: router.pathname === ROUTES.REQUESTS ? `1px solid #a05444` : 'none'
                        }}
                        label={(
                            <Link 
                                href={ROUTES.REQUESTS}
                                style={{
                                    textDecoration: 'none',
                                    color: '#a05444',
                                    fontWeight: ROUTES.CUSTOMERS ? 'bold' : 'normal'
                                }}
                            >
                                {intl.formatMessage(customerPageMessages.requests)}
                            </Link>
                        )}
                        value={ROUTES.REQUESTS}
                    />
            </Tabs>
            {props.children}
        </AppTemplateComponent>
    )
}

export default PageLayoutComponent
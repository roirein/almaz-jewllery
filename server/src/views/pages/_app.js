import {IntlProvider} from 'react-intl';
import ContextProvider from '../components/context-provider/ContextProvider';
import messages from '../locales/he.json';

const myApp = ({Component, pageProps}) => {

    return (
        <ContextProvider>
            <IntlProvider locale={'he'} messages={messages}>
                <div style={{direction: 'rtl'}}>
                    <Component {...pageProps}/>
                </div>
            </IntlProvider>
        </ContextProvider>
    )
}

export default myApp
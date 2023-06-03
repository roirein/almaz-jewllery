import {IntlProvider} from 'react-intl';
import messages from './locales/he.json';

const myApp = ({Component, pageProps}) => {

    return (
        <IntlProvider locale={'he'} messages={messages}>
            <Component {...pageProps}/>
        </IntlProvider>
    )
}

export default myApp
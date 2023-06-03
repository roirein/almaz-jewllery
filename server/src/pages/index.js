import Link from 'next/link';
import {useIntl} from 'react-intl';
import messages from './i18n/index'

const App = () => {
    const intl = useIntl();
    return (
        <div>
            <h1>{intl.formatMessage(messages.greeting)}</h1>
            <Link href={"/about"}>About</Link>
        </div>
    )
}

export default App
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const DefaultPage = () => {

    const router = useRouter()

    useEffect(() => {
        router.push('/home')
    }, [])

    return (
        <div></div>
    )
}

export default DefaultPage
import React, {useEffect, useState} from 'react';
import LoadingPage from '../../LoadingPage/ui/LoadingPage'

const MainPage = () => {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3600)
    }, []);
    return (
        <>
            {loading && <LoadingPage/>}
            Hello
        </>
    )
}

export default MainPage;
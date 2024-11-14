import React, { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);



    const fetchData = async () => {
        try {
            const res = await fetch(url);
            const result = await res.json();
            setData(result)
            console.log(result)

        } catch (error) {
            setError(error.message)
            console.log(error)

        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (url) {
            fetchData()
        }
    }, [url])



    return { data, loading, error }
}

export default useFetch
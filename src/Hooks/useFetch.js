import {useEffect, useState} from "react"
import axios from 'axios'
const useFetch = (url) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(url);
                console.log(res.data);
                setData(res.data);
        
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);

    const reFetch = async (params) => {
        try {
            setLoading(true);
            const res = await axios.get(url, { params });
            console.log(res.data);
            setData(res.data);

        } catch (err) {
            setError(err);
        }
        setLoading(false);
        
    }

    return { data, loading, error,reFetch };
}        
export default useFetch;
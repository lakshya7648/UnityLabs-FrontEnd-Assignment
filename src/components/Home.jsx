import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Spinner from './Spinner';
import Alert from './Alert';

const Home = () => {
    const [search, setSearch] = useState("search");
    const [news, setNews] = useState({});
    const [loading, setLoading] = useState(true);

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    // creating the fetch news function
    const fetchNews = async () => {
        let response, result;
        try {
            response = await fetch(`http://hn.algolia.com/api/v1/${search}`);
            result = await response.json();
        } catch (error) {
            setAlertType("danger");
            setAlertMessage(error.message);
            setAlertVisible(true);
        }
        setNews(result);
        console.log(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchNews();
    }, [search])

    return (
        <>
            <Navbar />
            <Alert type={alertType} message={alertMessage} show={alertVisible} />
            {/* Now Home Screen code below */}
            <div className="p-5">
                {loading && <Spinner />}
            </div>

            <div className="container p-2">
                <ul className="list-group list-group-flush">
                    {news.hits && news.hits.map((element)=>{
                        return <li className="list-group-item">{element.title ? element.title : "No Title"}</li> 
                    })}
                    
                </ul>
            </div>
        </>
    )
}

export default Home

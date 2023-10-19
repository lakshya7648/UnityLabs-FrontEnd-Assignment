import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Spinner from './Spinner';
import Alert from './Alert';
import Cards from './cards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
    const [search, setSearch] = useState("search");
    const [news, setNews] = useState({});
    const [hits, setHits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(0);

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);

    // creating the fetch news function
    let url = `http://hn.algolia.com/api/v1/${search}`;
    const fetchNews = async () => {
        console.log("calling, ", pageSize);
        let response, result;
        try {
            response = await fetch(url);
            result = await response.json();
        } catch (error) {
            setAlertType("danger");
            setAlertMessage(error.message);
            setAlertVisible(true);
        }
        setNews(result);
        setHits(result.hits);
        console.log(result);
        console.log(hits);
        setLoading(false);
    }
    const fetchData = async () => {
        console.log("fetchData called", pageSize);
        url = url.endsWith("search") ? url + `?page=${pageSize + 1}` : url + `&page=${pageSize + 1}`;
        setPageSize(pageSize + 1);
        const response = await fetch(url);
        const results = await response.json();

        setNews((obj) => {
            return { ...obj, ...results };
        })
        setHits((obj) => {
            return [...obj, ...results.hits];
        })
        console.log(hits);
    }
    useEffect(() => {
        fetchNews();
    }, [search])

    return (
        <>
            <Navbar setSearch={setSearch} setPageSize={setPageSize}/>
            <Alert type={alertType} message={alertMessage} show={alertVisible} />
            {/* Now Home Screen code below */}

            <div className="container p-2" >
                <h1 className='text-center'>News</h1>
                <ul className="list-group list-group-flush" id="parent" >
                    <InfiniteScroll
                        dataLength={hits.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={hits.length !== (news.nbPages * news.hitsPerPage)}
                        loader={<Spinner />}
                        style={{overflow:"hidden"}}
                    >
                        {hits.length != 0 && hits.map((element) => {
                            return <Cards key={Math.random() * 1000} title={element.title} objectId={element.objectID} points={element.points} num_comments={element.num_comments} dateCreated={element.created_at} dateUpdated={element.updated_at} tags={element._tags} />
                        })}
                    </InfiniteScroll >
                </ul>
            </div>

        </>
    )
}

export default Home

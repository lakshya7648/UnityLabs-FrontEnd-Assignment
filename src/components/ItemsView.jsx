import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner';

const ItemsView = () => {
    const { objectId } = useParams();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchDetails = async ()=>{
        let response, result;
        try{
            response = await fetch(`http://hn.algolia.com/api/v1/items/${objectId}`);
            result = await response.json();
        } catch(error) {
            console.log(error.message);
        }
        setDetails(result);
        setLoading(false);
    }


    useEffect(()=>{
        fetchDetails();
    }, []);
  return (
    <div className='container'>
        <h1 className="text-danger text-center">Post Details : ObjectID - {objectId}</h1>
        {loading ? <Spinner/> : <div className="my-2">
        <h2 className="fw-bold fs-1">{details.title}</h2>
        <span className="fs-4 d-block">Author : {details.author}</span>
        <h4 className="fw-semibold d-block">Points : {details.points}</h4>
        <a className="btn btn-primary my-3" href={details.url} target="_blank">Read Here</a>
        </div>}
    </div>
  )
}

export default ItemsView

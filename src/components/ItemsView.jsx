import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner';
import Comments from './Comments';
import Alert from './Alert';

const ItemsView = () => {
    const { objectId } = useParams();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [alertState, setAlertState] = useState({type:'', message:'', show:false});

    const fetchDetails = async ()=>{
        let response, result;
        try{
            response = await fetch(`http://hn.algolia.com/api/v1/items/${objectId}`);
            result = await response.json();
        } catch(error) {
            setAlertState({
                type:'danger',
                message:'Some error occurred',
                show:true,
            })
        }
        setDetails(result);
        setLoading(false);
    }


    useEffect(()=>{
        fetchDetails();
    }, []);
  return (
    <div className='container'>
        <Alert type={alertState.type} message={alertState.message} show={alertState.show}/>
        
        <h1 className="my-4 text-danger text-center" style={{fontSize:'3rem'}}>{details.title}</h1>
        {loading ? <Spinner/> : <div className="my-2">
        <h2 className="fw-bold fs-1">{details.title}</h2>
        <div className="d-flex justify-content-start">
            <p className="datecreated" style={{color:'grey', fontSize:"12px"}}>{new Date(details.created_at).toDateString()}</p>
        </div>
        <span className="fs-4 d-block">Author : {details.author}</span>
        <h4 className="fw-semibold d-block">Points : {details.points}</h4>
        <a className="btn btn-primary my-3" href={details.url} target="_blank">Read here</a>
        <h4>Comments</h4>
        <Comments children={details.children} mleft={0}/>
        </div>}
    </div>
  )
}

export default ItemsView

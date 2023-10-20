import React, { useState } from 'react';
import {v4 as uid} from 'uuid';

const Comments = ({ children, mleft }) => {
    const parentId = uid();
    if(children.length == 0) {
        return;
    }
    return (
        <>
            {children.map((element) => {
                const parentId = uid();
                return (<div key={element.id} style={{mleft}}><div className="card mb-3"  style={{ maxWidth: "780px", marginLeft:`${mleft}px`}}>
                    <div className="row g-0">
                        <div className="col-md-12">
                            <div className="card-body">
                                <h5 className="card-title">{element.author}</h5>
                                <div className="row">
                                    <p className="card-text col-md-8">
                                        <small className="text-body-secondary">Posted At : {new Date(element.created_at).toISOString()}</small>
                                    </p>
                                    <span className='col-md-4'>Points : {element.points == null ? 0 : element.points}</span>
                                </div>
                                <p className="card-text fs-6 d-block">{element.text}</p>
                                {element.children != 0 && <button type="button" className="btn btn-primary position-relative" data-bs-toggle="collapse" data-bs-target={`#collapseComments${parentId}`} aria-expanded="false" aria-controls="collapseComments">
                                    Comments
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {element.children.length}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
                    {element.children != 0 && <div className="collapse" id={`collapseComments${parentId}`}>
                        <Comments key={Math.random()*100} children={element.children} mleft={mleft + 50}/>
                    </div>}
                </div>)
            })
            }
        </>
    )
}

export default Comments

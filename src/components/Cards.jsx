import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ title, objectId, points, num_comments, dateCreated, dateUpdated, tags }) => {
    // console.log("tags = ", tags);
    return (
        <div className="card mb-3 w-100" >
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <Link to={`/items/${objectId}`} className="card-title fw-semibold fs-3 nav-link">{title}</Link>
                        <div className="d-flex justify-content-start my-2">
                            {tags.map((tag) => {
                                return <span key={tag} className="badge p-1 mx-2 text-bg-info">{tag}</span>
                            })}
                        </div>

                        <div className="d-flex justify-content-start">
                            <p className="card-text mx-2">Points : {points}</p>
                            <p className="card-text mx-2">Comments : {num_comments}</p>
                        </div>
                        <p className="card-text d-flex justify-content-start">
                            <small className="text-body-secondary mx-2">Created at : {new Date(dateCreated).toDateString()} {new Date(dateCreated).toTimeString().slice(0, 9)}</small>
                            <small className="text-body-secondary mx-2">Updated at : {new Date(dateUpdated).toDateString()} {new Date(dateUpdated).toTimeString().slice(0, 9)}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards

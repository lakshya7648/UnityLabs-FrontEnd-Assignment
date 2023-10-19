import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({setSearch, setPageSize}) => {
    const handleSearch = (event)=> {
        setPageSize(0);
        setSearch(`search?query=${event.target.previousSibling.value}`);
    }
    
    return (
        <nav className="navbar sticky-top bg-primary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-white fw-bold">HackerNews Search</Link>
                <div className="d-flex justify-content-center mx-auto w-50" role="search">
                    <input className="form-control rounded-pill me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-light" type="submit" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

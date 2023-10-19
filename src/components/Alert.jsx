import React, { useEffect, useState } from 'react'

const Alert = ({type, message, show}) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if(show) {
            setVisible(show);
            setTimeout(()=>{
              setVisible(false);
            }, 3000);
        }
    }, [])
    
    return (
        <>
        {visible && <div className={`position-absolute start-0 w-100 end-0 alert alert-${type} d-flex align-items-center`} role="alert">
            {message}
        </div>}
        </>
    )
}

export default Alert

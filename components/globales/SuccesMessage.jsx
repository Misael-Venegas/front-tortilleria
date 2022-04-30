import React from 'react'

const SuccesMessage = ({ meg }) => {
    return (
        <div className="alert alert-success" role="alert">
            {meg}
        </div>
    )
}

export default SuccesMessage
import React from 'react'

function ErrorMessage(props) {
    return <div className="alert alert-danger" role="alert"> {props.msg} </div>
}

export default ErrorMessage;
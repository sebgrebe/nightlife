import React from 'react'

const Message = ({state,set_message}) => {
    const close = () => {
        set_message("")
    }
    if (state.message === "") {
        return null
    }
    else {
        return(
            <div className="alert alert-warning message">
                {state.message}
                <button className="message_close" onClick={() => close()}>&#10005;</button>
            </div>
        )
    }
}

export default Message
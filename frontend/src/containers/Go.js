import React from 'react'
import $ from "jquery";

const Go = ({state,place_id,login,set_message,catchGoing}) => {
    let user_id = state.user_id
    const Go = (arg) => {
            if (user_id !== '') {
                Save(arg)
            }
            else {
                window.FB.login((response) => {
                    if (response.status === 'connected') {
                        login(response.authResponse.userID,() => {
                            Save(arg)
                        })
                    }
                    else {
                        set_message("Facebook login didn't work.")
                    }
                })
            }
    }
    const Save = (arg) => {
        var obj = {
            going: arg,
            user_id: user_id,
            place_id: place_id
        }
        $.ajax({
            url: '/api/save',
            type: 'POST',
            data: obj,
            beforeSend: (xhr) => {
                xhr.withCredentials = true;
            },
            success: (res) => {
                catchGoing()
            },
            error: (xhr) => {
                //handles timeout error
                if (xhr.status === 0) {
                    window.location.reload();
                }
                else {alert("Status: "+xhr.status+ ". "+xhr.statusText)}
            }
        })
    }
    let going = false
    if (state.user_id !== "") {
        const listGoing = state.listGoing
        Object.keys(listGoing).map((key) => {
            if (listGoing[key].place_id === place_id) {
                listGoing[key].going.map((user_id_going) => {
                    if (user_id_going === user_id) {
                        going = true
                    }
                })
            }
        })
    }
    if (going) {
        return(
        <button className="go_button" onClick={() => Go("not_going")}>Not going anymore</button>
        )
    }
    else {
        return(
            <button className="go_button" onClick={() => Go("going")}>I'm going!</button>
        )
    }
}

export default Go


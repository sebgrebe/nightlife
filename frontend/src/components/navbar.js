import React from 'react'
import Script from 'react-load-script';

const NavBar = ({state, login, set_message}) => {
    const checkLogin = () => {
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var user_id = response.authResponse.userID
                login(user_id)
            }
        });
    }
    const handleScriptError = () => {
        set_message("Failed to enable facebook login.")
    }
    const handleScriptLoad = () => {
        window.FB.init({
            appId      : '1582581658486513',
            cookie     : false,  // enable cookies to allow the server to access
            // the session
            status     : false,
            xfbml      : false,  // parse social plugins on this page
            version    : 'v2.1'
        })
        checkLogin()
    }
    const Login = () => {
        window.FB.login((response) => {
            if (response.status === 'connected') {
                var user_id = response.authResponse.userID
                login(user_id)
            }
            else {
                set_message("Login via facebook didn't work")
            }
        })
    }
    const Logout = () => {
        window.FB.logout((response) => {
            if (response.status !== "connected") {
                login('')
            }
            else {
                set_message("Couldn't log out from facebook")
            }
        })
    }
    let fb = null
    if (state.user_id !== '') {
        fb = <button className="login_btn" onClick={() => Logout()}><i className="fa fa-facebook-square" aria-hidden="true"></i>Logout
        </button>
    }
    else {
        fb = <button className="login_btn" onClick={() => Login()}><i className="fa fa-facebook-square" aria-hidden="true"></i>Login
        </button>
    }
    return (
        <div className="navbar_box">
            <Script
                url={"//connect.facebook.net/en_US/sdk.js"}
                onError={handleScriptError}
                onLoad={handleScriptLoad} />
        <nav className="navbar navbar-default navbar-fixed-top">
                <div className="nav login_btn">
                    {fb}
                </div>
        </nav>
        </div>
    )
}

export default NavBar
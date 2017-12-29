import Script from 'react-load-script';
import React from 'react';
import $ from "jquery";

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleScriptLoad = this.handleScriptLoad.bind(this)
    }
    componentDidMount() {
        $.ajax({
            url: 'api/env/fb',
            type: 'GET',
            success: (res) => {
                this.props.save_env('fb',res)
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
    checkLogin() {
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var user_id = response.authResponse.userID
                this.props.login(user_id)
            }
        });
    }
    handleScriptError() {
        this.props.set_message("Failed to enable facebook login.")
    }
    handleScriptLoad() {
        window.FB.init({
            appId      : this.props.state.env_fb,
            cookie     : false,  // enable cookies to allow the server to access
            // the session
            status     : false,
            xfbml      : false,  // parse social plugins on this page
            version    : 'v2.1'
        })
        this.checkLogin()
    }
    Login() {
        window.FB.login((response) => {
            if (response.status === 'connected') {
                var user_id = response.authResponse.userID
                this.props.login(user_id)
            }
            else {
                this.props.set_message("Login via facebook didn't work")
            }
        })
    }
    Logout() {
        window.FB.logout((response) => {
            if (response.status !== "connected") {
                this.props.login('')
            }
            else {
                this.props.set_message("Couldn't log out from facebook")
            }
        })
    }
    render() {
        let fb = null
        if (this.props.state.user_id !== '') {
            fb = <button className="login_btn" onClick={() => this.Logout()}><i className="fa fa-facebook-square"
                                                                           aria-hidden="true"></i>Logout
            </button>
        }
        else {
            fb = <button className="login_btn" onClick={() => this.Login()}><i className="fa fa-facebook-square"
                                                                          aria-hidden="true"></i>Login
            </button>
        }
        return (
            <div className="navbar_box">
                <Script
                    url={"//connect.facebook.net/en_US/sdk.js"}
                    onError={this.handleScriptError}
                    onLoad={this.handleScriptLoad}/>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="nav login_btn">
                        {fb}
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar
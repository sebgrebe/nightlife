import React from 'react'

const Footer = () => (
    <div className="footer">
        <div className="col-md-4 footer_left">
            Created by <a href="https://sebgrebe.github.io/">sebgrebe</a> with
            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                <img src="/images/reactlogo.png" className="logo" alt="ReactJS" />
            </a> and
            <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">
                <img src="/images/nodejs_logo.png" className="logo" alt="NodeJS"/>
            </a>
        </div>
        <div className="col-md-4 footer_center">
            Using the
            <a href="https://developers.google.com/maps" target="_blank" rel="noopener noreferrer">
                <img src="/images/google_maps_api.png" className="logo" alt="Google Maps API"/>
            </a>
        </div>
        <div className="col-md-4 footer_right">Source code on <a href="https://github.com/sebgrebe/nightlife" className="logo_link" target="_blank" rel="noopener noreferrer">
                 <i className="fa fa-github" aria-hidden="true"></i>
            </a>
        </div>
    </div>
)

export default Footer
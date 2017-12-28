import React from 'react';
import Go from './Go'
import Going from '../components/Going'
import $ from "jquery";

class BarList extends React.Component {
    constructor(props) {
        super(props)
        this.catchGoing = this.catchGoing.bind(this)
    }
    catchGoing(){
        $.ajax({
            url: '/api/going',
            type: 'GET',
            beforeSend: (xhr) => {
                xhr.withCredentials = true;
            },
            success: (res) => {
                this.props.set_going(res.going)
                if (res.error) {
                    this.props.set_message(res.message)
                }
            },
            error: (xhr) => {
                //handles timeout error
                if (xhr.status === 0) {
                    window.location.reload();
                }
                else {
                    alert("Status: " + xhr.status + ". " + xhr.statusText)
                }
            }
        })
    }
    componentDidMount() {
        this.catchGoing()
    }
    render() {
        if (this.props.state.bars.length > 0) {
            return (
                <div id="bars" className="bars">
                    {this.props.state.bars.map((bar) =>
                        <div className="bar">
                            <div className="bar_photo_box">
                                <span className="helper"></span>
                                {bar.photo_url === undefined ?
                                    <i className="fa fa-picture-o bar_no_img" aria-hidden="true" ></i> :
                                    <img className="bar_photo" alt="bar" src={bar.photo_url}/>}
                            </div>
                            <div className="bar_info">
                                <a className="bar_a" href={bar.maps_url} target="_blank">
                                    <div className="bar_name">{bar.name}</div>
                                </a>
                                <div>{bar.formatted_address}</div>
                            </div>
                            <div className="bar_going">
                                <Going state={this.props.state} place_id={bar.place_id}/>
                                <Go state={this.props.state} place_id={bar.place_id} login={(user_id) => this.props.login(user_id)}
                                    set_message={this.props.set_message} catchGoing={() => this.catchGoing()}/>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
        else {
            return null
        }
    }
}

export default BarList


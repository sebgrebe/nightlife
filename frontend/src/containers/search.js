import React, { Component } from 'react';
import Script from 'react-load-script';
import $ from 'jquery';

var options = {
		types: ['geocode']	
		}
var autocomplete;
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			place: null,
			search: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.Search = this.Search.bind(this)
	}
	componentDidMount() {
		$.ajax({
			url: '/api/env/google',
			type: 'GET',
			success: (res) => {
				this.props.save_env('google',res)
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
	handleChange(event){
		if (this.state.scriptLoaded) {
			autocomplete = new window.google.maps.places.Autocomplete((document.getElementById('autocomplete')),options)
		}
	}
	handleSubmit(event){
		event.preventDefault()
		var input = document.getElementById('autocomplete').value
		if (autocomplete === undefined || autocomplete.getPlace() === undefined) {
			this.setState({
				place: encodeURI(input),
				search: true
			})
		}
		else {
			var long = autocomplete.getPlace().geometry.viewport.b.b
			var lat = autocomplete.getPlace().geometry.viewport.f.b
			this.setState({
				place: {
					long: long,
					lat: lat
				},
				search: true
			})
		}	
	}
	handleScriptCreate() {
  		this.setState({ scriptLoaded: false })
	}
	handleScriptLoad() {
	  this.setState({ scriptLoaded: true })
	}
	Search() {	
		let url = "";
		const radius = 10000;
        let google_api_key = this.props.state.env_google
		if (typeof this.state.place === 'object') {
			url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.state.place.lat+","+this.state.place.long+"&radius="+radius+"&type=bar&key="+google_api_key
		}
		else {
			url ="https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+"+this.state.place+"&radius="+radius+"&type=bar&key="+google_api_key
		}
	 	$.ajax({
			url: '/api/search',
			type: 'POST',
			data: {
				url: url
			},
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				this.setState({
					search: false
				})
				var res_json = (typeof(res) === 'string') ? JSON.parse(res) : res
				if (res_json.error) {
					var message = (res_json.message === undefined) ? "Something went wrong. Please make sure you're connected to the internet." : res.message
					this.props.set_message(message)
					this.props.search([])
				}
				else {this.props.search(res_json.results)}
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
	render() {
        let google_api_key = this.props.state.env_google
		if (this.state.search) {
			this.Search()
		}
		if (google_api_key.length > 0) {
            return (
                <div className="search">
                    <Script
                        url={"https://maps.googleapis.com/maps/api/js?key="+google_api_key+"&libraries=places"}
                        onCreate={this.handleScriptCreate.bind(this)}
                        onLoad={this.handleScriptLoad.bind(this)}/>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input type="text" id="autocomplete" className="input"
                               placeholder="Where do you want to go out?" onChange={this.handleChange}/>
                        <button className="search_button">Search</button>
                    </form>
                </div>
            )
        }
		else return null
	}
}

export default Search
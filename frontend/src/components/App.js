import React from 'react';
import Search from '../containers/search'
import BarList from '../containers/BarList'
import NavBar from '../containers/navbar'
import Footer from '../components/footer'
import * as Actions from '../actions/index'
import Message from './message'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import '../styles/stylesheet.css'


const App = ({state, actions}) => (
    	<div>
            <div className="main">
				<NavBar state={state} login={actions.login} set_message={actions.set_message} save_env={actions.save_env}/>
				<Message state={state} set_message={actions.set_message}/>
				<Search state={state} search={actions.update} set_message={actions.set_message} save_env={actions.save_env}/>
				<BarList state={state} login={actions.login} set_message={actions.set_message} set_going={actions.set_going}/>
			</div>
			<Footer />
		</div>
)

const mapStateToProps = state => ({
	state: state
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(Actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

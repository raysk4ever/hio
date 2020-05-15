import React from 'react';
import {Switch, Route} from 'react-router';

import Chat from './components/chat';
import Home from './components/home';
export default class App extends React.Component {	
	render(){
		return(
			<div className="App">
			  <Switch>
			  	<Route path='/chat' component={Chat}/>
			  	<Route path='/' component={Home}/>
			  </Switch>
			</div>
		)
	}
}
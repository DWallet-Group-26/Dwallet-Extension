import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Profile } from './routes/Profile';
import { Home } from './routes/Home';
import { Send } from './routes/Send';

import './App.css';

class App extends React.Component {

	constructor(props: any) {
		super(props);
		this.state = {
			privateKey: null,
			privateKeyEncrypted: true,
			login: false,
			loading: true,
		}
	}

	privateKeyCheck(): boolean {
		// chrome.storage.local.get('privateKey', function (result) {
		// 	console.log('Value currently is ' + result);
		// 	if (result.privateKey == null) {
		// 		return false;
		// 	}
		// 	else {
		// 		return true;
		// 	}
		// });
		return false;
	}

	componentDidMount(): void { // set loading to false, checks private key exists (if not create wallet page), if it does, load wallet page
		// console.log("App mounted");
		// if (!this.privateKeyCheck()) {
		// 	console.log("No private key found");
		// }

	}

	render() {
		return (
			<Switch>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/send">
					<Send />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		);}
};

export default App;
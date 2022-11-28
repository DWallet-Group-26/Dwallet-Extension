import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Profile } from './routes/Profile';
import { Home } from './routes/Home';
import { Send } from './routes/Send';
import { Password } from './routes/Password';
import { Key } from './routes/Key';
import { Otp } from './routes/Otp';
import { Login } from './routes/Login';
import crypto from "crypto-js";

import './App.css';

class App extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			privateKey: "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e", // temporary for testing (actial value null)
			password: "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f", // temporary for testing (actual value null)
			privateKeyEncrypted: true,
			login: false,
			loading: true,
		}
		this.set_private_key = this.set_private_key.bind(this);
		this.set_password = this.set_password.bind(this);
		this.check_password = this.check_password.bind(this);
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

	componentDidMount(): void { // set loading to false, checks private key exists (if not create wallet page), if it does, load login page
		console.log("App mounted");
		// console.log("App mounted");
		// if (!this.privateKeyCheck()) {
		// 	console.log("No private key found");
		// }

	}

	componentWillUnmount(): void {
		console.log("App unmounted");

	}

	set_private_key(privateKey: string) {
		this.setState({ privateKey: privateKey });
	}
	
	set_password(password: string) {
		this.setState({ password: crypto.SHA256(password).toString() });
	}

	check_password(password: string): boolean {
		if (this.state.password == crypto.SHA256(password).toString()) {
			// decrypt private key
			return true;
		}
		else {
			return false;
		}
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
				<Route path="/password">
					<Password set_password={this.set_password}/>
				</Route>
				<Route path="/key">
					<Key set_private_key={this.set_private_key}/>
				</Route>
				<Route path="/otp">
					<Otp privateKey={this.state.privateKey}/>
				</Route>
				<Route path="/login">
					<Login check_password={this.check_password}/>
				</Route>
				<Route path="/">
					<Home/>
				</Route>

			</Switch>
		);
	  }
};

export default App;

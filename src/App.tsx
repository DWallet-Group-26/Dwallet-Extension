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
			privateKeyEncrypted: true,
			password: "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f", // temporary for testing (actual value null)

			login: false,
			created_wallet: false,
			loading: true,
		}
		this.set_private_key = this.set_private_key.bind(this);
		this.set_password = this.set_password.bind(this);
		this.check_password = this.check_password.bind(this);
	}

	componentDidMount(): void { // set loading to false, checks private key exists (if not create wallet page), if it does, load login page
		console.log("App mounted");
		let wallet_created = false;
		let privateKey = null;
		let password = null;
		
		// chrome.storage.local.set({ "privateKey": "test" }, function () {
		// 	console.log("private key set");
		// });
		// chrome.storage.local.get(["privateKey"], function (result) {
		// 	console.log("private key retrieved");
		// 	console.log(result);
		// });
		
		// 	wallet_created = true
		// } catch (e) {}
		this.setState({ loading: false,wallet_created: wallet_created });
		// if (!this.privateKeyCheck()) {
		// 	console.log("No private key found");
		// }

	}

	componentWillUnmount(): void { // save private key, password hash to chrome storage
		console.log("App unmounted");

	}

	set_private_key(privateKey: string) {
		this.setState({ privateKey: privateKey });
	}
	
	set_password(password: string) {
		// encrypt private key
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
		if (this.state.loading) {
			return (
				<div className="App">
					<h1>Loading...</h1>
				</div>
			);
		}
		return (
			<Switch>
				{this.state.login && (<>
					<Route path="/profile">
						<Profile />
					</Route>
					<Route path="/send">
						<Send />
					</Route>
					</>
				)}
				{this.state.created_wallet && (<>
					<Route path="/login">
						<Login check_password={this.check_password}/>
					</Route>
					</>)
				}
				<Route path="/password">
					<Password set_password={this.set_password}/>
				</Route>
				<Route path="/otp">
					<Otp privateKey={this.state.privateKey}/>
				</Route>
				<Route path="/key">
					<Key set_private_key={this.set_private_key}/>
				</Route>
				<Route path="/">
					<Home/>
				</Route>

			</Switch>
		);
	  }
};

export default App;

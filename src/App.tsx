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
			privateKey: null,
			privateKeyEncrypted: true,
			password: null,

			login: false,
			created_wallet: false,
			loading: true,
		}
		this.set_private_key = this.set_private_key.bind(this);
		this.set_password = this.set_password.bind(this);
		this.check_password = this.check_password.bind(this);
	}

	componentDidMount(): void {
		console.log("App mounted");
		let wallet_created = false;
		let privateKey = null;
		let password = null;
	
		try {chrome.storage.local.get(["privateKey"], function (result) {
			if (result.privateKey!=undefined){
				wallet_created = true;
				privateKey = result.privateKey;
			}
		});
		chrome.storage.local.get(["password"], function (result) {
			if (result.password!=undefined){
				password = result.password;
			}
		});}
		catch (e) {
			console.log("Error: " + e);
		}

		this.setState({ loading: false,wallet_created: wallet_created,privateKey: privateKey,password: password });

	}

	componentWillUnmount(): void {
		console.log("App unmounted");

	}

	set_private_key(privateKey: string) {
		this.setState({ privateKey: privateKey });
	}
	
	set_password(password: string) {
		try {chrome.storage.local.set({ password: crypto.SHA256(password).toString() }, function () {
			console.log('Password is hashed and stored');
		});
		chrome.storage.local.set({ "privateKey": crypto.AES.encrypt(this.state.privateKey,password).toString() }, function () {
			console.log('Private key is encrypted and stored');
		});}
		catch (e) {
			console.log("Error: " + e);
		}
		this.setState({ password: crypto.SHA256(password).toString(), privateKeyEncrypted: false, created_wallet: true, login: true });
	}

	check_password(password: string): boolean {
		if (this.state.password == crypto.SHA256(password).toString()) {
			let key = crypto.AES.decrypt(this.state.privateKey,password).toString(crypto.enc.Utf8);
			this.setState({ privateKeyEncrypted: false, login: true, privateKey: key});
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

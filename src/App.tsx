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

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], function (result) {
        if (result[key] === undefined) {
          reject();
        } else {
          resolve(result[key]);
        }
      });
    });
  };

class App extends React.Component {
	constructor(props: any) {
		super(props);
		// this.state = { // for testing
		// 	privateKey: "U2FsdGVkX1+WtzmM79U8gQf7Mn7ZZv8c5JFb62BxiSm0gSV4r+wfZDbQouTmh2IWBIx5KQ/nycbXhI0bk4ciHXm887GuC5h7eHYrbaQrxY+vdAjdJXtPAuOnontS9Kv/",
		// 	privateKeyEncrypted: true,
		// 	password: "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f",

		// 	login: false,
		// 	created_wallet: true,
		// 	loading: true,
		// }
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

	async componentDidMount() {
		console.log("App mounted");
		let created_wallet = this.state.created_wallet;
		let privateKey = this.state.privateKey;
		let password = this.state.password;
		
		try{
			privateKey = await readLocalStorage('privateKey');
			password = await readLocalStorage('password');
			created_wallet = true;
		}
		catch (e) {
			console.log("Error: " + e);
		}
		this.setState({ created_wallet: created_wallet,privateKey: privateKey,password: password, loading: false });

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
				{this.state.login && (
					<Route path="/profile">
						<Profile />
					</Route>)}
				{this.state.login && (
					<Route path="/send">
						<Send />
					</Route>
				)}
				{this.state.created_wallet && (
					<Route path="/login">
						<Login check_password={this.check_password}/>
					</Route>
				)}
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
					<Home redirect_paths={[[(this.state.created_wallet && !this.state.login),"/login"],]}/>
				</Route>

			</Switch>
		);
	  }
};

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Profile } from './routes/Profile';
import { Home } from './routes/Home';
import { Send } from './routes/Send';
import { Password } from './routes/Password';
import { Key } from './routes/Key';
import { Otp } from './routes/Otp';

import './App.css';

class App extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			privateKey: "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
			privateKeyEncrypted: true,
			login: false,
			loading: true,
		}
		this.set_private_key = this.set_private_key.bind(this);
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
		console.log("App mounted");
		// console.log("App mounted");
		// if (!this.privateKeyCheck()) {
		// 	console.log("No private key found");
		// }

	}

	set_private_key(privateKey: string) {
		this.setState({ privateKey: privateKey });
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
					<Password />
				</Route>
				<Route path="/key">
					<Key set_private_key={this.set_private_key}/>
				</Route>
				<Route path="/otp">
					<Otp privateKey={this.state.privateKey}/>
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		);
	  }
};

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Profile } from './routes/Profile';
import { Home } from './routes/Home';
import { Send } from './routes/Send';
import { Password } from './routes/Password';
import { Key } from './routes/Key';
import { Otp } from './routes/Otp';

import './App.css';

export const App = () => {
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
				<Key />
			</Route>
			<Route path="/otp">
				<Otp />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
};

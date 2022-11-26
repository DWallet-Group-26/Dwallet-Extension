import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChromeMessage, Sender } from '../types';
import { getCurrentTabUId, getCurrentTabUrl } from '../chrome/utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Home = () => {
	const [url, setUrl] = useState<string>('');
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	let { push } = useHistory();

	/**
	 * Get current URL
	 */
	useEffect(() => {
		getCurrentTabUrl(url => {
			setUrl(url || 'undefined');
		});
	}, []);

	const sendTestMessage = () => {
		const message: ChromeMessage = {
			from: Sender.React,
			message: 'Hello from React'
		};

		getCurrentTabUId(id => {
			id &&
				chrome.tabs.sendMessage(id, message, responseFromContentScript => {
					setResponseFromContent(responseFromContentScript);
				});
		});
	};

	const sendRemoveMessage = () => {
		const message: ChromeMessage = {
			from: Sender.React,
			message: 'delete logo'
		};

		getCurrentTabUId(id => {
			id &&
				chrome.tabs.sendMessage(id, message, response => {
					setResponseFromContent(response);
				});
		});
	};

	const submit = () => {
		if (password === confirmPassword) {
			push('/profile');
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<img
					src="https://media.istockphoto.com/id/1125625274/vector/unique-modern-creative-elegant-letter-d-based-vector-icon-logo-template.jpg?s=612x612&w=0&k=20&c=CAl475WFm2ErEgh1BjzlqFG95sADQ1OetS6pJsOTEOA="
					className="logo"
				/>
				<p className="title">Dwallet</p>
				<div className="password-container">
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>

					<TextField
						id="outlined-password-input"
						label="Confirm Password"
						type="password"
						autoComplete="current-password"
						value={confirmPassword}
						onChange={e => {
							setConfirmPassword(e.target.value);
						}}
					/>

					<Button variant="outlined" className="submit-button" onClick={submit}>
						Submit
					</Button>
				</div>
			</header>
		</div>
	);
};

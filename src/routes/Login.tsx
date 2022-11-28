import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChromeMessage, Sender } from '../types';
import { getCurrentTabUId, getCurrentTabUrl } from '../chrome/utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Login = (props) => {
	const [url, setUrl] = useState<string>('');
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [password, setPassword] = useState('');

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
		let result = props.check_password(password);
		if (result) {
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
				<div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 190 }}>
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
						size="small"
					/>

					<Button
						variant="contained"
						className="submit-button"
						onClick={submit}
						sx={{ borderRadius: 10, width: 120, alignSelf: 'center' }}
						{...(!(password.length>=8) ? { disabled: true } : {})}
					>
						Login
					</Button>
				</div>
			</header>
		</div>
	);
};

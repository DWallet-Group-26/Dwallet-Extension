import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChromeMessage, Sender } from '../types';
import { getCurrentTabUId, getCurrentTabUrl } from '../chrome/utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generate_private_key, get_address } from '../functions';

export const Otp = (props) => {
	const [url, setUrl] = useState<string>('');
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [otp, setOtp] = useState('');
	const [account, setAccount] = React.useState('0x615f11359Bf78f10F8078257730362296A3fff1E');
	const [open, setOpen] = React.useState({
		id: '',
		bool: false
	});
	const handleClick = id => {
		setOpen({
			id: id,
			bool: true
		});
		navigator.clipboard.writeText(account);
		setTimeout(
			() =>
				setOpen({
					id: '',
					bool: false
				}),
			1000
		);
	};

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
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "publicKey":  get_address(props.privateKey), "otp": otp})
		};
		fetch(process.env.REACT_APP_SERVER + '/api/dwallet/verifyphone', requestOptions)
			.then(response => {
				console.log(response.text)
				push('/password');
			});
		
	};

	return (
		<div className="App">
			<header className="App-header">
				<img
					src="https://media.istockphoto.com/id/1125625274/vector/unique-modern-creative-elegant-letter-d-based-vector-icon-logo-template.jpg?s=612x612&w=0&k=20&c=CAl475WFm2ErEgh1BjzlqFG95sADQ1OetS6pJsOTEOA="
					className="logo"
				/>
				<p className="title">Dwallet</p>
				<div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: 220 }}>
					<div>
						<TextField
							id="outlined-password-input"
							label="Phone Number"
							type="text"
							value={phoneNumber}
							onChange={e => {
								setPhoneNumber(e.target.value);
							}}
							size="small"
						/>
					</div>
					<Button
						variant="contained"
						className="submit-button"
						onClick={() => {
							const requestOptions = {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ "phone": phoneNumber, "publicKey":  get_address(props.privateKey)})
							};
							fetch(process.env.REACT_APP_SERVER + '/api/dwallet/createwallet', requestOptions)
								.then(response => console.log(response.text()));
						}}
						sx={{ borderRadius: 10, width: 120, alignSelf: 'center' }}
					>
						Send Otp
					</Button>

					<div>
						<TextField
							id="outlined-password-input"
							label="Otp"
							type="text"
							value={otp}
							onChange={e => {
								setOtp(e.target.value);
							}}
							size="small"
						/>
					</div>

					<Button
						variant="contained"
						className="submit-button"
						onClick={submit}
						sx={{ borderRadius: 10, width: 120, alignSelf: 'center' }}
					>
						Verify
					</Button>
				</div>
			</header>
		</div>
	);
};

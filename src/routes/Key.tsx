import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChromeMessage, Sender } from '../types';
import { getCurrentTabUId, getCurrentTabUrl } from '../chrome/utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const Key = () => {
	const [url, setUrl] = useState<string>('');
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [mainKey, setMainKey] = useState('');
	const [backupKey, setBackupKey] = useState('');
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
		push('/otp');
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
							label="Main Key"
							type="text"
							value={mainKey}
							onChange={e => {
								setMainKey(e.target.value);
							}}
							size="small"
						/>
						<CachedIcon
							style={{ color: 'black', marginLeft: 30, cursor: 'pointer' }}
							onClick={() => setMainKey('')}
						/>
					</div>
					<div style={{ marginTop: -12, display: 'flex', justifyContent: 'space-between', width: '130px' }}>
						<span style={{ color: 'black', fontSize: '12px' }}>address:</span>
						<span style={{ color: 'gray', fontSize: '12px', marginLeft: '20px' }}>
							{account.substring(0, 4) + '...' + account.substring(account.length - 4, account.length)}
						</span>
						<button
							onClick={() => handleClick('1')}
							style={{
								border: 'none',
								background: 'transparent',
								cursor: 'pointer'
							}}
						>
							<ContentCopyIcon fontSize="small" style={{ color: 'gray' }} />
							{open?.id == '1' && open?.bool && (
								<span style={{ fontSize: '8px', zIndex: 1000, position: 'absolute' }}>Copied</span>
							)}
						</button>
					</div>

					<div>
						<TextField
							id="outlined-password-input"
							label="Backup Key"
							type="text"
							value={backupKey}
							onChange={e => {
								setBackupKey(e.target.value);
							}}
							size="small"
						/>

						<CachedIcon
							style={{ color: 'black', marginLeft: 30, cursor: 'pointer' }}
							onClick={() => setBackupKey('')}
						/>
					</div>
					<div style={{ marginTop: -12, display: 'flex', justifyContent: 'space-between', width: '130px' }}>
						<span style={{ color: 'black', fontSize: '12px' }}>address:</span>
						<span style={{ color: 'gray', fontSize: '12px', marginLeft: '20px' }}>
							{account.substring(0, 4) + '...' + account.substring(account.length - 4, account.length)}
						</span>
						<button
							onClick={() => handleClick('2')}
							style={{
								border: 'none',
								background: 'transparent',
								cursor: 'pointer'
							}}
						>
							<ContentCopyIcon fontSize="small" style={{ color: 'gray' }} />
							{open?.id == '2' && open?.bool && (
								<span style={{ fontSize: '8px', zIndex: 1000, position: 'absolute' }}>Copied</span>
							)}
						</button>
					</div>

					<Button
						variant="contained"
						className="submit-button"
						onClick={submit}
						sx={{ borderRadius: 10, width: 120, alignSelf: 'center' }}
					>
						Confirm
					</Button>
				</div>
			</header>
		</div>
	);
};

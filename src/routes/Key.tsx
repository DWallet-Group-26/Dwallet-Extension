import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChromeMessage, Sender } from '../types';
import { getCurrentTabUId, getCurrentTabUrl } from '../chrome/utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { generate_private_key, get_address } from '../functions';
import {ethers} from 'ethers';

const FACTORY_ABI = require('../ABI/MultiSigWalletFactory.json').abi;
const WALLET_ABI = require('../ABI/MultiSigWallet.json').abi;

export const Key = (props) => {
	const [url, setUrl] = useState<string>('');
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [mainKey, setMainKey] = useState('');
	const [backupKey, setBackupKey] = useState('');
	const [mainaddr, setMainaddr] = React.useState('');
	const [backupaddr, setBackupaddr] = React.useState('');
	const [open, setOpen] = React.useState({
		id: '',
		bool: false
	});
	const handleClick = (id,addr) => {
		setOpen({
			id: id,
			bool: true
		});
		navigator.clipboard.writeText(addr);
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

	const submit = async () => {
		props.set_private_key(mainKey);

		const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER_URL);
		const wallet = new ethers.Wallet(mainKey, provider);
		const factory = new ethers.Contract(process.env.REACT_APP_MULTISIG_FACTORY_ADDRESS, FACTORY_ABI, wallet);
		fetch(process.env.REACT_APP_SERVER + "/api/dwallet/serveraddress").then(res => res.json()).then( async (serveraddr) => {
			serveraddr = serveraddr.address;
			await factory.createWallet(mainaddr, backupaddr, serveraddr);
			console.log("wallet created");
			push('/otp');
	})
		
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
								try{setMainaddr(get_address(e.target.value))}catch{setMainaddr('')}
							}}
							size="small"
						/>
						<CachedIcon
							style={{ color: 'black', marginLeft: 30, cursor: 'pointer' }}
							onClick={() =>{
								let key = generate_private_key();
								setMainKey(key);
								try{setMainaddr(get_address(key))}catch{setMainaddr('')}
							}}
						/>
					</div>
					<div style={{ marginTop: -12, display: 'flex', justifyContent: 'space-between', width: '130px' }}>
						<span style={{ color: 'black', fontSize: '12px' }}>address:</span>
						<span style={{ color: 'gray', fontSize: '12px', marginLeft: '20px' }}>
							{mainaddr.substring(0, 4) + '...' + mainaddr.substring(mainaddr.length - 4, mainaddr.length)}
						</span>
						<button
							onClick={() => handleClick('1',mainaddr)}
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
								try{setBackupaddr(get_address(e.target.value))}catch{setBackupaddr('')}
							}}
							size="small"
						/>

						<CachedIcon
							style={{ color: 'black', marginLeft: 30, cursor: 'pointer' }}
							onClick={() => {
								let key = generate_private_key();
								setBackupKey(key);
								try{setBackupaddr(get_address(key))}catch{setBackupaddr('')}
							}}
						/>
					</div>
					<div style={{ marginTop: -12, display: 'flex', justifyContent: 'space-between', width: '130px' }}>
						<span style={{ color: 'black', fontSize: '12px' }}>address:</span>
						<span style={{ color: 'gray', fontSize: '12px', marginLeft: '20px' }}>
							{backupaddr.substring(0, 4) + '...' + backupaddr.substring(backupaddr.length - 4, backupaddr.length)}
						</span>
						<button
							onClick={() => handleClick('2',backupaddr)}
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
						{...(!mainaddr || !backupaddr ? { disabled: true } : {})}
					>
						Confirm
					</Button>
				</div>
			</header>
		</div>
	);
};

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'
import { generate_private_key, get_address } from '../functions';
import {ethers} from 'ethers';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



const FACTORY_ABI = require('../ABI/MultiSigWalletFactory.json').abi;
const WALLET_ABI = require('../ABI/MultiSigWallet.json').abi;

export const RetrieveBackupKey = (props) => {
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [privateKey, setPrivateKey] = useState('');
	const [open, setOpen] = React.useState({
		id: '',
		bool: false
	});

	let { push } = useHistory();


	

	const submit = async () => {
		// Code for Checking Private Key Address in from ChildCOntract Function
		console.log(phoneNumber, password);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "phone": phoneNumber, password })
		};
		fetch(process.env.REACT_APP_SERVER + '/api/backupStore/load_key', requestOptions)
			.then(response => {
				if (response.status == 200){
					return response.json()
				}
				
			}).then(body=>{
				setPrivateKey(body['key'])
			})
			.catch(err => {
				console.log(err)
			})
		
	};
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
						id="outlined-private-input"
						label="Phone Number"
						type="text"
						value={phoneNumber}
						onChange={e => {
							setPhoneNumber(e.target.value);
						}}
						size="small"
					/>

					

                    <TextField
						id="outlined-private-input"
						label="Password"
						type="password"
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
					>
						Retrieve
					</Button>

					<center>
						<div style={{ marginTop: -10, display: 'flex', justifyContent: 'space-between', width: '200px' }}>
							<div style={{ color: 'black', fontSize: '14px', display: 'block' }}>Private Key:</div>
							<span style={{ color: 'gray', fontSize: '14px', marginLeft: '20px' }}>
								{privateKey.substring(0, 4) + '...' + privateKey.substring(privateKey.length - 4, privateKey.length)}
							</span>
							<button
								onClick={() => handleClick('2',privateKey)}
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
					</center>



					
				</div>
			</header>
		</div>
	);
};

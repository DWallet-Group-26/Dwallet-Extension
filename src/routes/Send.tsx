import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Snackbar } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import TextField from '@mui/material/TextField';
import { get_address,get_multi_sig_address,get_balance, address_valid, create_transaction } from '../functions';
import { ethers } from 'ethers';

export const Send = (props) => {
	let { push } = useHistory();
	const [network, setNetwork] = React.useState(20);
	const [address, setAddress] = React.useState('');
	const [amount, setAmount] = React.useState(0);
	const [multisigwalletbal, setMultisigwalletbal] = React.useState(0);
	const [transactionID, setTransactionID] = React.useState('');
	const [flag, setFlag] = React.useState(false);
	const [otp, setOtp] = React.useState('');

	useEffect(async() => {
		try{
			console.log(props.privateKey)
			let addr = await get_multi_sig_address(props.privateKey,get_address(props.privateKey))
			console.log(addr)
			let multisigbal = ethers.utils.formatEther(await get_balance(addr))
			console.log(multisigbal)
			setMultisigwalletbal(multisigbal.substring(0,6));
		}
		catch(e){
			console.log(e)
		}

	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		setNetwork(event.target.value);
	};

	const handleAddress = (event: any) => {
		setAddress(event.target.value);
	};

	const handleAmount = (event: any) => {
		setAmount(event.target.value);
	};

	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
		navigator.clipboard.writeText(window.location.toString());
	};

	const submit1 = async () => {
		// create transaction in contract and send otp request to server
		const txidx = await create_transaction(props.privateKey, address,ethers.utils.parseEther(amount.toString()) );
		console.log(txidx);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "publicKey":  get_address(props.privateKey), "transactionID": txidx})
		};
		fetch(process.env.REACT_APP_SERVER + '/api/dwallet/send-otp', requestOptions)
			.then(response => {
				console.log(response.text())
				setTransactionID(txidx);
				setFlag(true)
			}).catch(err => {
				console.log(err)
			})

		
	};

	const submit2 = () => {
		// send otp to server
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "publicKey":  get_address(props.privateKey),"transactionID": transactionID, "otp": otp})
		};
		fetch(process.env.REACT_APP_SERVER + '/api/dwallet/verify-otp', requestOptions)
			.then(response => {
				console.log(response.text())
				push('/profile');
			}).catch(err => {
				console.log(err)
			})
		

	};


	return (
		<div className="App">
			<div className="header" style={{width:"350px",margin:"auto"}}>
				<header className="main-page-header" style={{ height: 80 }}>
					<img
						src="https://media.istockphoto.com/id/1125625274/vector/unique-modern-creative-elegant-letter-d-based-vector-icon-logo-template.jpg?s=612x612&w=0&k=20&c=CAl475WFm2ErEgh1BjzlqFG95sADQ1OetS6pJsOTEOA="
						style={{ width: '46px', height: '46px' }}
					/>
					<FormControl sx={{ minWidth: 190 }}>
					<InputLabel id="demo-simple-select-label">Network</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={network}
						label="Network"
						onChange={handleChange}
						sx={{ borderRadius: 8, height: 50 }}
					>
						<MenuItem value={10}>Polygon Mainnet</MenuItem>
						<MenuItem value={20}>Ethereum</MenuItem>
						<MenuItem value={30}>Rinkeby</MenuItem>
					</Select>
				</FormControl>
					<Avatar
						sx={{ width: 46, height: 46 }}
						src="./profile.png"
					></Avatar>
				</header>
				<div>
					<h2 style={{ fontWeight: 300, fontSize: '18px' }}>Send</h2>
					<div
						style={{
							width: '320px',
							border: '1px solid #1876D1',
							background: 'white',
							margin: 'auto',
							borderRadius: '10px'
						}}
					>
						<p style={{ color: '#1876D1', fontSize: '15px', textAlign:"left",marginLeft:"10px",marginBottom:"0px" }}>To:</p>
						<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px"}}>
						<input value={address} onChange={handleAddress} style={{ fontSize: '12px' ,width:"200px", height:"20px", outline:"none",border:"0px",display:"inline"}} placeholder="0x615f11359Bf78f10F80782577....."></input>
						<button
							style={{
								cursor: 'pointer',
								border: 'none',
								background: 'transparent'
							}}
						>
							<CloseIcon />
						</button>
						</div>
					</div>
				</div>
			</div>
			<div style={{width:"350px",margin:"auto"}}>
			{flag ? (
				<>
					<div style={{ background: '#f2f4f7', height: 110, marginTop: 10 }}>
						<button
							style={{
								background: 'transparent',
								padding: 5,
								marginLeft: -200,
								marginTop: 20,
								borderRadius: 8,
								border: '1px solid lightgray',
								color: 'gray'
							}}
						>
							Sending ETH
						</button>
						<div style={{ marginLeft: -250, marginTop: -10 }}>
							<h1 style={{ fontWeight: 500 }}>{amount}</h1>
						</div>
					</div>
					<div style={{ marginTop: 30, display: 'flex', width: '350px', justifyContent: 'space-evenly' }}>
						<p>OTP:</p>
						<TextField
							id="outlined-password-input"
							label="OTP"
							type="text"
							value={otp}
							onChange={e => {
								setOtp(e.target.value);
							}}
							size="large"
						/>
					</div>
					<div
						className="footer"
						style={{
							marginTop: 90
						}}
					>
						<div style={{ display: 'flex', width: '350px', justifyContent: 'space-evenly', marginTop: 15 }}>
							<Button
								variant="outlined"
								style={{ borderRadius: 20, width: 140, height: 40 }}
								onClick={() => push('/profile')}
							>
								Reject
							</Button>
							<Button
								variant="contained"
								style={{ borderRadius: 20, width: 140, height: 40 }}
								onClick={() => submit2()}
								{...(!otp ? { disabled: true } : {})}
							>
								Confirm
							</Button>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="main" style={{ marginTop: 60 }}>
						<div style={{ display: 'flex', width: 320, justifyContent: 'space-between' }}>
							<p style={{ fontSize: '18px' }}>Asset:</p>
							<div style={{ display: 'flex', border: '1px solid #D7D8DC', borderRadius: 10, width: 200 }}>
								<div style={{ alignSelf: 'center' }}>
									<Avatar
										sx={{ width: 55, height: 55 }}
										src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
									></Avatar>
								</div>

								<div style={{ marginRight: 20, textAlign:"left" }}>
									<p>Ethereum</p>
									<p style={{ fontSize: '12px', marginTop: -10 }}>Balance:{multisigwalletbal} ETH</p>
								</div>
							</div>
						</div>
						<div style={{ display: 'flex', width: 320, justifyContent: 'space-between', marginTop: 20 }}>
							<p style={{ fontSize: '18px' }}>Amount:</p>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									border: '1px solid #D7D8DC',
									borderRadius: 10,
									width: 200
								}}
							>
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop:"10px" }}>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											width: 180
										}}
									>
										<input type="number" style={{ marginLeft: 12, fontSize: '12px' ,width:"90%", height:"20px", outline:"none",border:"0px" }} value={amount} onChange={handleAmount}></input> ETH
										<button
											style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
										>
											<SwapVertIcon />
										</button>
									</div>

									<p style={{ fontSize: '12px', marginTop: -10, marginLeft: 12 }}>
										No Conversion rate available
									</p>
								</div>
							</div>
						</div>
					</div>
					<div
						className="footer"
						style={{
							marginTop: 85
						}}
					>
						<div style={{ display: 'flex', width: '350px', justifyContent: 'space-evenly', marginTop: 15 }}>
							<Button
								variant="outlined"
								style={{ borderRadius: 20, width: 140, height: 40 }}
								onClick={() => push('/profile')}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								style={{ borderRadius: 20, width: 140, height: 40 }}
								onClick={() => submit1()}
								{...(!(amount>0 && address_valid(address)) ? { disabled: true } : {})}
							>
								Next
							</Button>
						</div>
					</div>
				</>
			)}
			</div>
		</div>
	);
};

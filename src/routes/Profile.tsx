import React from 'react';
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

const account = '0x615f11359Bf78f10F8078257730362296A3fff1E';
export const Profile = () => {
	let { push } = useHistory();
	const [age, setAge] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};

	const [open, setOpen] = React.useState(false);
	const handleClick = () => {
		setOpen(true);
		navigator.clipboard.writeText(window.location.toString());
	};

	return (
		<div className="App">
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
						value={age}
						label="Age"
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
					src="https://ih1.redbubble.net/image.3955829690.9229/st,small,507x507-pad,600x600,f8f8f8.jpg"
				></Avatar>
			</header>
			<div className="sub-header">
				<div style={{ fontSize: '10px' }}>
					<Radio size="1" label="not" />
					<span>not connected</span>
				</div>
				<div style={{ marginTop: -10 }}>
					<h4 style={{ marginLeft: -50 }}>Account 1</h4>
					<span style={{ position: 'absolute', top: 130, left: 150, fontSize: '13px' }}>
						{account.substring(0, 4) + '...' + account.substring(account.length - 4, account.length)}
					</span>
					<button
						onClick={handleClick}
						style={{
							position: 'absolute',
							top: 130,
							left: 210,
							border: 'none',
							background: 'transparent',
							cursor: 'pointer'
						}}
					>
						<ContentCopyIcon fontSize="small" style={{ color: 'grey' }} />
					</button>
				</div>
				<div>
					<MoreVertIcon style={{ cursor: 'pointer' }} />
				</div>
			</div>
			<div className="main" style={{ marginTop: 10 }}>
				<div style={{ border: '1px solid black', borderRadius: 50, width: 45 }}>
					<Avatar
						sx={{ width: 43, height: 43 }}
						src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
					></Avatar>
				</div>
				<div>
					<h1 style={{ fontWeight: 400 }}>0 ETH</h1>
				</div>
				<div className="btn-container" style={{ marginTop: 40 }}>
					<button
						style={{
							borderRadius: '50%',
							background: '#1876D1',
							border: 'none',
							color: 'white',
							height: '35px',
							width: '35px',
							cursor: 'pointer'
						}}
					>
						<ArrowDownwardIcon style={{ marginTop: 4 }} />
						<p style={{ color: '#1876D1', marginTop: 10 }}>Buy</p>
					</button>
					<button
						style={{
							borderRadius: '50%',
							background: '#1876D1',
							border: 'none',
							color: 'white',
							height: '35px',
							width: '35px',
							cursor: 'pointer'
						}}
						onClick={() => push('/send')}
					>
						<ArrowForwardIcon style={{ marginTop: 4 }} />
						<p style={{ color: '#1876D1', marginTop: 10 }}>Send</p>
					</button>
					<button
						style={{
							borderRadius: '50%',
							background: '#1876D1',
							border: 'none',
							color: 'white',
							height: '35px',
							width: '35px',
							cursor: 'pointer'
						}}
					>
						<SwapHorizIcon style={{ marginTop: 4 }} />
						<p style={{ color: '#1876D1', marginTop: 10 }}>Swap</p>
					</button>
				</div>

				<div className="footer" style={{ marginTop: 30 }}>
					<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
						<p>Gas fee Address</p>
						<p style={{ color: 'grey' }}>
							{account.substring(0, 4) + '...' + account.substring(account.length - 4, account.length)}
						</p>
						<button
							onClick={handleClick}
							style={{
								border: 'none',
								background: 'transparent',
								cursor: 'pointer',
								marginLeft: -40,
								marginTop: 8
							}}
						>
							<ContentCopyIcon fontSize="small" style={{ color: 'grey' }} />
						</button>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginLeft: 30,
							justifyContent: 'space-between'
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Avatar
								sx={{ width: 43, height: 43 }}
								src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
							></Avatar>
							<h3 style={{ fontWeight: 400 }}>O ETH</h3>
						</div>

						<button
							style={{
								borderRadius: '50%',
								background: '#1876D1',
								border: 'none',
								color: 'white',
								height: '30px',
								width: '30px',
								cursor: 'pointer',
								marginTop: -10,
								marginRight: 30
							}}
						>
							<ArrowUpwardIcon fontSize="small" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

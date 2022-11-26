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
import CloseIcon from '@mui/icons-material/Close';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const account = '0x615f11359Bf78f10F8078257730362296A3fff1E';
export const Send = () => {
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
			<div className="header">
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
						<p style={{ color: '#1876D1', fontSize: '15px' }}>Account 1</p>
						<p style={{ fontSize: '12px' }}>0x615f11359Bf78f10F8078257730362296A3fff1E</p>
						<button
							style={{
								position: 'absolute',
								top: 140,
								left: 300,
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

			<div className="main" style={{ marginTop: 80 }}>
				<div style={{ display: 'flex', width: 320, justifyContent: 'space-between' }}>
					<p style={{ fontSize: '18px' }}>Asset:</p>
					<div style={{ display: 'flex', border: '1px solid #D7D8DC', borderRadius: 10, width: 200 }}>
						<div style={{ alignSelf: 'center' }}>
							<Avatar
								sx={{ width: 55, height: 55 }}
								src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
							></Avatar>
						</div>

						<div style={{ marginRight: 20 }}>
							<p>Ethereum</p>
							<p style={{ fontSize: '12px', marginTop: -10 }}>Balance:O ETH</p>
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
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									width: 180
								}}
							>
								<p style={{ marginLeft: 12 }}>O ETH</p>
								<button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
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
					marginTop: 90
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
					<Button disabled variant="contained" style={{ borderRadius: 20, width: 140, height: 40 }}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

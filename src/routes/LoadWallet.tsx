import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'

export const LoadWallet = (props) => {
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [privateKey, setPrivateKey] = useState('');
	const [typePrivateKey, setTypePrivateKey] = useState('');

	let { push } = useHistory();

	// useEffect(() => {
	// 	console.log('Home mounted');
	// 	for(let i=0;i<props.redirect_paths.length;i++){
	// 		if(props.redirect_paths[i][0]){
	// 			push(props.redirect_paths[i][1]);
	// 		}
	// 	}
	// })

	

	const submit = () => {
		// Code for Checking Private Key Address in from ChildCOntract Function
		console.log(privateKey, typePrivateKey)
		push('/password')
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
						label="Private Key"
						type="text"
						value={privateKey}
						onChange={e => {
							setPrivateKey(e.target.value);
						}}
						size="small"
					/>

					<TextField
						id="outlined-type-input"
						label="Type"
						value={typePrivateKey}
						onChange={e => {
							setTypePrivateKey(e.target.value)
						}}
						size="small"
						select

					>
						<MenuItem value="1">Main</MenuItem>
						<MenuItem value="2">Backup</MenuItem>

					</TextField>

					<Button
						variant="contained"
						className="submit-button"
						onClick={submit}
						sx={{ borderRadius: 10, width: 120, alignSelf: 'center' }}
						{...(!(privateKey.length===64) ? { disabled: true } : {})}
					>
						Load
					</Button>
				</div>
			</header>
		</div>
	);
};

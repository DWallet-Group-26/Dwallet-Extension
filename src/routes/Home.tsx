import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Home = (props) => {
	const [url, setUrl] = useState<string>('');
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	let { push } = useHistory();

	useEffect(() => {
		console.log('Home mounted');
		for(let i=0;i<props.redirect_paths.length;i++){
			if(props.redirect_paths[i][0]){
				push(props.redirect_paths[i][1]);
			}
		}
	})

	

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
					<Button
						variant="contained"
						className="submit-button"
						onClick={() => push('/key')}
						sx={{ borderRadius: 10 }}
					>
						Create Wallet
					</Button>
					<p style={{ color: 'black', fontSize: '18px' }}>or</p>
					<Button
						variant="contained"
						className="submit-button"
						onClick={() => push('/loadwallet')}
						sx={{ borderRadius: 10 }}
					>
						Load Wallet
					</Button>
				</div>
			</header>
		</div>
	);
};

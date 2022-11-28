import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Password = (props) => {
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	let { push } = useHistory();

	const submit = () => {
		if (password === confirmPassword) {
			props.set_password(password);
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

					<TextField
						id="outlined-password-input"
						label="Confirm Password"
						type="password"
						autoComplete="current-password"
						value={confirmPassword}
						onChange={e => {
							setConfirmPassword(e.target.value);
						}}
						size="small"
					/>

					<Button
						variant="contained"
						className="submit-button"
						onClick={submit}
						sx={{ borderRadius: 10, width: 120, alignSelf: 'center' }}
						{...(!(password.length>=8 && password==confirmPassword) ? { disabled: true } : {})}
					>
						Create
					</Button>
				</div>
			</header>
		</div>
	);
};

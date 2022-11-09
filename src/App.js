import * as React from 'react';
import TextField from '@mui/material/TextField';
import './App.css';
const classes = {
	button: {
		border: 'none',
		borderRadius: '100px',
		width: '150px',
		height: '55px',
		backgroundColor: '#fa2d64',
		color: '#ffffff',
		fontStyle: 'normal',
		fontFamily: 'Inter',
		fontWeight: '600',
		textAlign: 'center',
		fontSize: '26px',
		cursor: 'pointer',
	},
	fontname: {
		fontFamily: 'Inter',
	},
};

const SignInForm = () => {
	const [trackId, setTrackId] = React.useState('');
	const [prediction, setPrediction] = React.useState(null);
	const [err, setErr] = React.useState('');
	const onSubmit = (event) => {
		event.preventDefault();
		var axios = require('axios');
		var config = {
			url: `http://10.196.9.106/predict/${trackId}`,
			method: 'get',
		};
		axios(config)
			.then((res) => {
				console.log(res);
				setPrediction(res.data.prediction);
				setErr('');
			})
			.catch((err) => {
				setErr('Song does not exist');
				console.log(err);
			});
		// client server logic to sign in
	};
	React.useEffect(() => {
		setTimeout(() => {
			setPrediction(null);
		}, 20000);
	}, [prediction]);
	return (
		<div>
			<div className="loginBox">
				<h1 style={{ fontSize: '38px', ...classes.fontname }}>
					Enter Track Id to get dash dash dash
				</h1>
				<form
					onSubmit={onSubmit}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
						...classes.fontname,
					}}
				>
					<TextField
						id="outlined-basic"
						label="Track Id"
						required
						variant="outlined"
						name="phone"
						value={trackId}
						onChange={(evt) => setTrackId(evt.target.value)}
						style={{ width: '80%', ...classes.fontname }}
					/>
					<br />

					<br />
					<button style={classes.button} className="defaultButtonHover1">
						Submit
					</button>
					<br />
				</form>
				<>
					{prediction === 1 && (
						<p style={{ color: 'lightgreen' }}>
							Response: Song might get in the top list of billbaord
						</p>
					)}
					{prediction === 0 && (
						<p style={{ color: 'red' }}>
							Response: Chances of given song is too low to get in top rank
						</p>
					)}
					{err && <p style={{ color: 'red' }}>{err}</p>}
				</>
			</div>
		</div>
	);
};

export default SignInForm;

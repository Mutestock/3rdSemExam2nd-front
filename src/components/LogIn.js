import React, { useState } from "react";
import utils from "../utils";

const LogIn = ({
	loginFacade,
	loggedIn,
	setLoggedIn,
	currentUser,
	setCurrentUser,
	userDefinition
}) => {
	const logout = () => {
		loginFacade.logout();
		setCurrentUser({ ...userDefinition });
		setLoggedIn(false);
	};
	const login = (user, pass) => {
		loginFacade
			.login(user, pass)
			.then(res => setLoggedIn(true))
			.catch(err => {
				console.log(err);
				err.fullError.then(function(result) {
					alert(result.message);
				});
				utils.catchHttpErrors(err);
			});
	};
	return (
		<div>
			{!loggedIn ? (
				<LogInForm
					login={login}
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					loginFacade={loginFacade}
				/>
			) : (
				<LoggedIn
					loginFacade={loginFacade}
					logout={logout}
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					userDefinition={userDefinition}
				/>
			)}
		</div>
	);
};

export default LogIn;

const LogInForm = ({
	login,
	currentUser,
	setCurrentUser,
	userDefinition,
	loginFacade
}) => {
	const [submissionUser, setSubmissionUser] = useState(userDefinition);

	const handleChange = event => {
		event.preventDefault();
		setSubmissionUser({
			...submissionUser,
			[event.target.id]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		login(submissionUser.username, submissionUser.password);
		setCurrentUser({ ...submissionUser });
		console.log("Current user name: " + currentUser.username);
		console.log("Current user name: " + currentUser.userName);
	};

	return (
		<div>
			<h2>Login</h2>
			<form
				className="form-horizontal"
				onSubmit={handleSubmit}
				onChange={handleChange}
			>
				<div className="form-group">
					<div className="col-sm-9">
						<input
							className="form-control"
							placeholder="User Name"
							id="username"
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-9">
						<input
							className="form-control"
							placeholder="Password"
							id="password"
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-offset-3 col-sm-9">
						<button className="btn btn-primary">Login</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const LoggedIn = ({ loginFacade, logout, currentUser, setCurrentUser }) => {
	/*const options = utils.fetchOptions("GET", true);
	const [data, setData] = useState("Fetching");
	fetch(configuration.URL + "/api/user/", options)
		.then(utils.handleHttpErrors)
		.then(data => {
			setData(data.msg);
		});
*/
	return (
		<div>
			<h3>Welcome {currentUser.username}</h3>
			<br></br>
			<p>
				Current roles decoded from token: {loginFacade.tokenDecoder().roles}
			</p>
			<br></br>
			<p>Access adjusted accordingly</p>

			<button onClick={logout}>Logout</button>
		</div>
	);
};

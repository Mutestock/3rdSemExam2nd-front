import React, { useState } from "react";
import { Prompt } from "react-router-dom";

const UserPage = ({
	userFacade,
	currentUser,
	userDefinition,
	setCurrentUser
}) => {
	const [submissionUser, setSubmissionUser] = useState({ ...userDefinition });
	let [isBlocking, setIsBlocking] = useState(false);

	function handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.id;

		setSubmissionUser({ ...submissionUser, [name]: value });
		setIsBlocking(true);
	}

	function handleSubmit(event) {
		event.preventDefault();
		userFacade.create(submissionUser.userName, submissionUser.userPass);
		//	console.log(submissionUser.userName);

		//setCurrentUser({ ...submissionUser });
		//console.log(currentUser.userName);

		setSubmissionUser({ ...userDefinition });
		setCurrentUser({ ...submissionUser });
		event.target.reset();
		setIsBlocking(false);
	}

	return (
		<div>
			<h2>Create a User</h2>
			<form
				className="form-horizontal"
				onChange={handleChange}
				onSubmit={handleSubmit}
			>
				<Prompt
					when={isBlocking}
					message={location =>
						`Are you sure you want to go to ${location.pathname}`
					}
				/>
				<div className="form-group">
					<div className="col-sm-9">
						<input
							className="form-control"
							id="userName"
							placeholder="Enter User Name"
							defaultValue=""
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-9">
						<input
							className="form-control"
							id="userPass"
							placeholder="Enter Password"
							defaultValue=""
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-sm-offset-3 col-sm-9">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UserPage;

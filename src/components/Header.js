import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ currentUser, loginFacade }) => {
	//console.log(loginFacade.tokenDecoder().roles);
	let tokenDecoderDoorStopper = false;
	try {
		tokenDecoderDoorStopper = loginFacade.tokenDecoder().roles === "admin";
	} catch {
		console.log("Token decoder crash caught by door stopper");
	}

	const userHeaders =
		currentUser.username !== "" && currentUser.username !== undefined ? (
			tokenDecoderDoorStopper ? (
				<div>
					<li>
						<NavLink activeClassName="active" to="/data_manipulation">
							Data Manipulation
						</NavLink>
					</li>
				</div>
			) : (
				<div>
					<div>
						<li>
							<NavLink activeClassName="active" to="/history">
								History
							</NavLink>
						</li>
					</div>
					<div>
						<li>
							<NavLink activeClassName="active" to="/booking">
								Kayak Booking
							</NavLink>
						</li>
					</div>
				</div>
			)
		) : (
			<div>
				<li>
					<NavLink activeClassName="active" to="/register">
						Create User
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="active" to="/login">
						Log In
					</NavLink>
				</li>
			</div>
		);
	return (
		<ul className="header">
			<li>
				<NavLink exact activeClassName="active" to="/">
					Home
				</NavLink>
			</li>
			{userHeaders}
		</ul>
	);
};

export default Header;

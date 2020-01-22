import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ currentUser }) => {
	const userHeaders =
		currentUser.username !== "" && currentUser.username !== undefined ? (
			<div>
				<li>
					<NavLink activeClassName="active" to="/data_manipulation">
						Data Manipulation
					</NavLink>
				</li>
			</div>
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

import React, { useState } from "react";
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import "./App.css";
import LogIn from "./components/LogIn";
import Header from "./components/Header";
import Home from "./components/Home";
import UserPage from "./components/UserPage";
import DataManipulation from "./components/DataManipulation";

const NoMatch = () => {
	return <h3>The page was not found.</h3>;
};

function App({ loginFacade, userFacade, utils, commentFacade }) {
	const userDefinition = { userName: "", userPass: "" };

	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({ ...userDefinition });
	const [tableData, setTableData] = useState();
	const [tableJSX, setTableJSX] = useState();

	return (
		<Router>
			<Header currentUser={currentUser} />
			<Switch>
				<Route exact path="/">
					<Home
						currentUser={currentUser}
						//Testing. Delete when table is finishe
						tableData={tableData}
						setTableData={setTableData}
						tableJSX={tableJSX}
						setTableJSX={setTableJSX}
						//
					/>
				</Route>
				<Route path="/register">
					<UserPage
						userFacade={userFacade}
						currentUser={currentUser}
						setCurrentUser={setCurrentUser}
						userDefinition={userDefinition}
					/>
				</Route>
				<Route path="/login">
					<LogIn
						loginFacade={loginFacade}
						loggedIn={loggedIn}
						setLoggedIn={setLoggedIn}
						currentUser={currentUser}
						setCurrentUser={setCurrentUser}
						utils={utils}
						userDefinition={userDefinition}
					/>
				</Route>
				<Route path="/data_manipulation">
					{currentUser.username !== "" && currentUser.username !== undefined ? (
						<DataManipulation commentFacade={commentFacade} />
					) : (
						<Redirect to="/login"></Redirect>
					)}
				</Route>

				<Route>
					<NoMatch />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;

import React, { useState, useEffect } from "react";
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
import UserBookingHistory from "./components/UserBookingHistory";
import UserKayakBooking from "./components/UserKayakBooking";
import AdminBookingOverview from "./components/AdminBookingOverview";
import AdminCRUDKayak from "./components/AdminCRUDKayak";

const NoMatch = () => {
	return <h3>The page was not found.</h3>;
};

function App({
	loginFacade,
	userFacade,
	utils,
	commentFacade,
	kayakFacade,
	bookingFacade
}) {
	const userDefinition = { userName: "", userPass: "" };

	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState({ ...userDefinition });
	const [tableData, setTableData] = useState();
	const [tableJSX, setTableJSX] = useState();
	const [bookingContents, setBookingContents] = useState({});
	const [kayakTableContents, setKayakTableContents] = useState({});
	const [imageContents, setImageContents] = useState();
	const [reservationContents, setReservationContents] = useState();
	const [update, triggerUpdate] = useState(false);

	useEffect(() => {
		console.log("in useffect");
		console.log(bookingContents);

		if (Object.keys(bookingContents).length === 0) {
			bookingFacade.readAll().then(data => {
				setBookingContents(data);
				console.log("Data: " + Object.values(data));
			});
			if (Object.keys(bookingContents).length === 0) {
				setBookingContents({ status: "botched" });
			}
		}
	}, []);

	useEffect(() => {
		console.log("in effect kayak");
		console.log(kayakTableContents === undefined);
		if (Object.keys(kayakTableContents).length === 0) {
			kayakFacade.readAll().then(data => {
				setKayakTableContents(data);
				console.log("data:");
				console.log(data);
			});
		}
	}, [update]);

	return (
		<Router>
			<Header currentUser={currentUser} loginFacade={loginFacade} />
			<Switch>
				<Route exact path="/">
					<Home
						currentUser={currentUser}
						//Testing. Delete when table is finished
						tableData={tableData}
						setTableData={setTableData}
						tableJSX={tableJSX}
						setTableJSX={setTableJSX}
						kayakFacade={kayakFacade}
						userFacade={userFacade}
						bookingFacade={bookingFacade}
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
				<Route path="/history">
					<UserBookingHistory
						bookingFacade={bookingFacade}
						bookingsContents={bookingContents}
						setBookingContents={setBookingContents}
						kayakTableContents={kayakTableContents}
						setKayakTableContents={setKayakTableContents}
						kayakFacade={kayakFacade}
					/>
				</Route>
				<Route path="/booking">
					{currentUser.username !== "" && currentUser.username !== undefined ? (
						<UserKayakBooking
							kayakTableContents={kayakTableContents}
							setKayakTableContents={setKayakTableContents}
							kayakFacade={kayakFacade}
							bookingFacade={bookingFacade}
							currentUser={currentUser}
							loginFacade={loginFacade}
							triggerUpdate={triggerUpdate}
						/>
					) : (
						<Redirect to="/login"></Redirect>
					)}
				</Route>
				<Route path="/admin_booking">
					<AdminBookingOverview
						bookingFacade={bookingFacade}
						bookingContents={bookingContents}
					/>
				</Route>
				<Route path="/admin_kayak_booking">
					<AdminCRUDKayak />
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

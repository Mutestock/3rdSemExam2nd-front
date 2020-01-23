import React, { useEffect } from "react";
import utils from "../utils";
import settings from "../settings";
import kayakFacade from "../facades/kayakFacade";

const HomePage = ({
	currentUser,
	//Testing. Delete when table is finished
	tableData,
	setTableData,
	tableJSX,
	setTableJSX,
	kayakFacade,
	userFacade,
	bookingFacade
	//
}) => {
	console.log(currentUser.username);
	//Testing. Delete after table.

	useEffect(() => {
		setTableData(utils.getMock());
		console.log(tableData);
		console.log(utils.getMock() === undefined);
		console.log(tableData === undefined);
		console.log(settings.URL);
		kayakFacade.readAll().then(o => console.log(o));

		if (tableData !== undefined) {
			console.log(utils.dynamicJSONManipulation(tableData));

			setTableJSX(utils.dynamicJSONManipulation(tableData));
		}
		console.log(tableJSX);
	}, []);
	//

	return (
		<div>
			<p>Home Page</p>
			<p>Current fetch source: {settings.URL}</p>
			{currentUser.username !== "" && currentUser.username !== undefined ? (
				<div>
					<p>You are currently logged in as {currentUser.username}</p>
					<button onClick={() => userFacade.promoteUser(currentUser.username)}>
						promote to admin
					</button>
					<button
						onClick={() => bookingFacade.popDatabase(currentUser.username)}
					>
						populate database
					</button>
				</div>
			) : (
				<div>
					<p>You are not logged in</p>
					<div>{tableJSX}</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;

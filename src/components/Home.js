import React, { useEffect } from "react";
import utils from "../utils";

const HomePage = ({
	currentUser,
	//Testing. Delete when table is finished
	tableData,
	setTableData,
	tableJSX,
	setTableJSX
	//
}) => {
	console.log(currentUser.username);
	//Testing. Delete after table.

	useEffect(() => {
		setTableData(utils.getMock());
		console.log(tableData);
		console.log(utils.getMock() === undefined);
		console.log(tableData === undefined);

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
			{currentUser.username !== "" && currentUser.username !== undefined ? (
				<p>You are currently logged in as {currentUser.username}</p>
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

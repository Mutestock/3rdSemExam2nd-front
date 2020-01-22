import React, { useState, useEffect } from "react";

const DataManipulation = ({ commentFacade }) => {
	console.log(commentFacade.read(2));
	const [externalData, setExternalData] = useState();

	useEffect(() => {
		console.log("use effect boop");
		if (externalData !== undefined) {
			externalData.then(o => console.log(o));
		}
	});

	function submissionHandler(event) {
		event.preventDefault();
		console.log("boop");
	}

	const changeHandler = event => {
		console.log("changes");
		console.log();
	};

	return (
		<div>
			<p>DataManipulation</p>
			<form
				className="form-horizontal"
				onChange={changeHandler}
				onSubmit={submissionHandler}
			/>
			<button onClick={() => setExternalData(commentFacade.read(2))}>
				Sync
			</button>
		</div>
	);
};

export default DataManipulation;

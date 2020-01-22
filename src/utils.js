import loginFacade from "./facades/loginFacade";
import uuid from "uuid/v1";
import React from "react";

let JSONMock = {
	person: {
		name: "Esper",
		gender: "female",
		"phone number": "secret",
		addresses: [
			{
				street: "Who knows",
				business: "None of yours"
			},
			{
				street: "Who knows",
				Business: "None of yours"
			}
		]
	}
};

//if it's a string
//JSON.parse(text);

const utils = (function() {
	function catchHttpErrors(err) {
		if (err.status) {
			err.fullError.then(e => console.log(e.detail));
		} else {
			console.log("Network error");
		}
	}

	function handleHttpErrors(res) {
		if (!res.ok) {
			return Promise.reject({ status: res.status, fullError: res.json() });
		}
		return res.json();
	}

	function fetchOptions(method, addToken, body) {
		var opts = {
			method: method,
			headers: {
				"Content-type": "application/json",
				Accept: "application/json"
			}
		};
		if (addToken && loginFacade.loggedIn()) {
			opts.headers["x-access-token"] = loginFacade.getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	}
	//Testing
	function getMock() {
		return JSONMock;
	}

	//Concept:
	//1. Sort out iterable values
	//2. Put sorted values in dynamic table
	//3. Put out sorted data in new JSON objects
	//4. Pass out sorted JSON into dynamicJSONManipulation recursively
	//5. End recursion if there are no iterable values.

	//Currently contains abstraction
	function dynamicJSONManipulation(dataCopy) {
		let data = { ...dataCopy };
		for (var i in data) {
			DynamicTable.apply(this, [i, data[i]]);
			if (data[i] !== null && typeof data[i] == "object") {
				dynamicJSONManipulation(data[i], DynamicTable);
			}
		}
	}

	const DynamicTable = (key, value) => {
		return (
			<div>
				<p>boop</p>
				<p>{key}</p>
			</div>
		);
	};

	return {
		catchHttpErrors: catchHttpErrors,
		handleHttpErrors: handleHttpErrors,
		fetchOptions: fetchOptions,
		getMock: getMock,
		DynamicTable: DynamicTable,
		dynamicJSONManipulation: dynamicJSONManipulation
	};
})();

export default utils;

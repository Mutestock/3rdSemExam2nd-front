import React, { useEffect, useState } from "react";
import uuid from "uuid/v1";
import "./various.css";

const UserKayakBooking = ({
	kayakTableContents,
	kayakFacade,
	setKayakTableContents,
	bookingFacade,
	currentUser,
	loginFacade,
	triggerUpdate
}) => {
	const [filterOff, setFilterOff] = useState({});
	const [filterCondition, setFilterCondition] = useState("all");
	const [message, setMessage] = useState("");
	const [mode, setMode] = useState("");

	const kayakDefinition = {
		color: "",
		description: "",
		imageList: [],
		model: "S",
		name: "",
		personCount: 0,
		reservationList: [],
		year: ""
	};

	const [kayakToManage, setkayakToManage] = useState({ ...kayakDefinition });

	useEffect(() => {
		console.log("boop");
	}, [mode]);

	const handleChange = event => {
		event.preventDefault();
		if (filterCondition && filterCondition !== "all") {
			if (filterCondition === "personCount") {
				setFilterOff(
					kayakTableContents.filter(
						kayak => kayak.personCount > event.target.value
					)
				);
			} else
				setFilterOff(
					kayakTableContents.filter(kayak =>
						kayak[filterCondition].includes(event.target.value)
					)
				);
		}
	};

	const handleSelectChange = event => {
		event.preventDefault();
		setFilterCondition(event.target.value);
	};

	const handleModeChange = event => {
		event.preventDefault();
		setMode(event.target.value);
	};

	const handleAddEditInputValues = event => {
		if (event.target.id === "personCount") {
			setkayakToManage({
				...kayakToManage,
				[event.target.id]: parseInt(event.target.value)
			});
		} else if (event.target.id !== "imageURL") {
			setkayakToManage({
				...kayakToManage,
				[event.target.id]: event.target.value
			});
		} else {
			setkayakToManage({
				...kayakToManage,
				["imageList"]: [{ [event.target.id]: event.target.value }]
			});
		}
		event.preventDefault();
	};

	const handleSubmission = event => {
		let bust = false;
		Object.values(kayakToManage).map(o => {
			if (o === "") {
				bust = true;
			}
		});
		if (!bust) {
			if (mode === "Create") {
				kayakFacade.create(kayakToManage);
			} else if (mode === "Edit") {
				kayakFacade.edit(kayakToManage);
			}
		}
		event.preventDefault();
		console.log(kayakToManage);
	};
	return (
		<div>
			<div>
				<p>User Kayak Booking</p>
				<p>{message}</p>
				<select onChange={handleSelectChange}>
					<option></option>
					<option value="name">Name</option>
					<option value="model">Model</option>
					<option value="color">Color</option>
					<option value="personCount">User Limit</option>
					<option value="year">Year</option>
					<option value="description">Description</option>
				</select>
				<input
					onChange={handleChange}
					className="form-control"
					id="filterInput"
					placeholder="Filter results"
				/>
			</div>
			{loginFacade.tokenDecoder().roles.includes("admin") ? (
				<div>
					<select onChange={handleModeChange}>
						<option></option>
						<option value="Create">Create</option>
						<option value="Edit">Edit</option>
					</select>
					{mode === "Edit" || mode === "Create" ? (
						<form onSubmit={handleSubmission}>
							<div>
								{mode === "Edit" ? (
									<div>
										<button type="submit" className="btn btn-primary">
											Submission
										</button>
										<input
											onChange={handleAddEditInputValues}
											className="form-control"
											id="id"
											placeholder="id"
										/>
									</div>
								) : (
									<button type="submit" className="btn btn-primary">
										Submission
									</button>
								)}
								<input
									onChange={handleAddEditInputValues}
									className="form-control"
									id="name"
									placeholder="Name"
								/>
								<input
									onChange={handleAddEditInputValues}
									className="form-control"
									id="model"
									placeholder="Model"
								/>
								<input
									onChange={handleAddEditInputValues}
									className="form-control"
									id="color"
									placeholder="Color"
								/>
								<input
									onChange={handleAddEditInputValues}
									className="form-control"
									id="personCount"
									placeholder="PersonCount"
								/>
								<input
									onChange={handleAddEditInputValues}
									className="form-control"
									id="year"
									placeholder="Year"
								/>
								<input
									onChange={handleAddEditInputValues}
									className="form-control"
									id="description"
									placeholder="Description"
								/>
								<input
									onChange={handleAddEditInputValues}
									className="form-control"
									id="imageURL"
									placeholder="imageURL"
								/>
							</div>
						</form>
					) : null}
				</div>
			) : null}
			{filterOff[0] ? (
				<div>
					<TableManagement
						contents={filterOff}
						message={message}
						setMessage={setMessage}
						bookingFacade={bookingFacade}
						kayakFacade={kayakFacade}
						currentUser={currentUser}
						loginFacade={loginFacade}
						filterOff={filterOff}
						setFilterOff={setFilterOff}
						setKayakTableContents={setKayakTableContents}
						triggerUpdate={triggerUpdate}
					/>
				</div>
			) : (
				<p>Pick a filter and type something</p>
			)}
		</div>
	);
};

const bookFunc = (kayak, { day, month, year, bookingFacade, kayakFacade }) => {
	let format = day + "-" + month + "-" + year + "T00:00.00Z[UTC}";
	let list = [kayak];
	console.log(
		"Disabled because of 1. Relation issue, 2. values of input fields resets after setting them in useStates. Not enough time" +
			"format" +
			list
	);

	//bookingFacade.create(format, [kayakFacade.read(kayak.id)]);
};

const deleteFunc = ({ kayak, kayakFacade, setFilterOff, triggerUpdate }) => {
	kayakFacade.remove(kayak.id);
	setFilterOff(kayakFacade.readAll());
	triggerUpdate(true);
};

const TableManagement = ({
	contents,
	message,
	setMessage,
	bookingFacade,
	kayakFacade,
	currentUser,
	loginFacade,
	filterOff,
	setFilterOff,
	setKayakTableContents,
	triggerUpdate
}) => {
	const [dayInput, setDayInput] = useState("");
	const [monthInput, setMonthInput] = useState("");
	const [yearInput, setYearInput] = useState("");

	const handleButtonChange = event => {
		event.preventDefault();
		let noNums = event.target.id.replace(/[^A-Za-z]+/g, "");
		let onlyNums = event.target.id.replace(/\D/g, "");

		switch (noNums) {
			case "DayInput":
				let val = event.target.value;
				setDayInput(val);
				console.log("day");
				break;

			case "MonthInput":
				setMonthInput(event.target.value);
				console.log("month");
				break;

			case "YearInput":
				setYearInput(event.target.value);
				console.log("year");
				break;

			default:
				console.log("default");
		}
	};

	return (
		<div>
			<div>
				<div>
					<table className="table">
						<thead>
							<tr>
								{loginFacade.tokenDecoder().roles.includes("admin") ? (
									<td>Admin Option</td>
								) : null}
								<th>Name</th>
								<th>Model</th>
								<th>Color</th>
								<th>User Limit</th>
								<th>Year</th>
								<th>Description</th>
								<th>Picture</th>
								<th>Book it</th>
							</tr>
						</thead>
						<tbody>
							{contents.map(kayak => (
								<tr key={uuid()}>
									{loginFacade.tokenDecoder().roles.includes("admin") ? (
										<td>
											<button
												onClick={() =>
													deleteFunc({
														kayak,
														kayakFacade,
														setFilterOff,
														setKayakTableContents,
														triggerUpdate
													})
												}
											>
												Delete
											</button>
										</td>
									) : null}
									<td>{kayak.name}</td>
									<td>{kayak.model}</td>
									<td>{kayak.color}</td>
									<td>{kayak.personCount}</td>
									<td>{kayak.year}</td>
									<td>{kayak.description}</td>
									<td>
										{kayak.imageList[0] ? (
											<img
												src={kayak.imageList[0].imageURL}
												alt="picture"
											></img>
										) : (
											<p></p>
										)}
									</td>
									<td>
										<input
											onChange={handleButtonChange}
											className="form-control"
											id={kayak.id + "DayInput"}
											placeholder="Day"
										/>
										<input
											onChange={handleButtonChange}
											className="form-control"
											id={kayak.id + "MonthInput"}
											placeholder="Month"
										/>
										<input
											onChange={handleButtonChange}
											className="form-control"
											id={kayak.id + "YearInput"}
											placeholder="Year"
										/>
										<br></br>
										<button
											onClick={() =>
												bookFunc(kayak, {
													dayInput,
													monthInput,
													yearInput,
													bookingFacade,
													kayakFacade
												})
											}
										>
											Book it
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<br></br>
				</div>
			</div>
		</div>
	);
};
export default UserKayakBooking;

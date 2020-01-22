import React, { useEffect, useState } from "react";
import uuid from "uuid/v1";
import "./various.css";

const UserKayakBooking = ({
	kayakTableContents,
	kayakFacade,
	setKayakTableContents
}) => {
	const [filterOff, setFilterOff] = useState({ ...kayakTableContents });
	const [filterCondition, setFilterCondition] = useState("all");

	const handleChange = event => {
		event.preventDefault();
		if (filterCondition && filterCondition !== "all") {
			setFilterOff(
				kayakTableContents.filter(kayak =>
					kayak[filterCondition.toString].includes(event.target.value)
				)
			);
		}
	};

	const handleSelectChange = event => {
		event.preventDefault();
		setFilterCondition(event.target.value);
	};

	return (
		<div>
			<div>
				<p>User Kayak Booking</p>
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
			{filterOff[0] ? (
				<div>
					<TableManagement contents={filterOff} />
				</div>
			) : (
				<p>Noped out</p>
			)}
		</div>
	);
};

const TableManagement = ({ contents }) => {
	return (
		<div>
			<div>
				<div>
					<table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Model</th>
								<th>Color</th>
								<th>User Limit</th>
								<th>Year</th>
								<th>Description</th>
								<th>Picture</th>
							</tr>
						</thead>
						<tbody>
							{contents.map(kayak => (
								<tr key={uuid()}>
									<td>{kayak.name}</td>
									<td>{kayak.model}</td>
									<td>{kayak.color}</td>
									<td>{kayak.personCount}</td>
									<td>{kayak.year}</td>
									<td>{kayak.description}</td>
									<td>
										{kayak.imageList[0] ? (
											<img src={kayak.imageList[0].imageURL}></img>
										) : (
											<p></p>
										)}
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

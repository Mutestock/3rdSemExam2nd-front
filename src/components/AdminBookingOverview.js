import React from "react";
import uuid from "uuid/v1";

const AdminBookingOverview = ({ bookingFacade, bookingContents }) => {
	return (
		<div>
			<p>Admin CRUD Booking Overview</p>
			<div>
				<TableManagement bookingContents={bookingContents} />
			</div>
		</div>
	);
};

const TableManagement = ({ bookingContents }) => {
	return (
		<div>
			<div>
				<div>
					<table className="table">
						<thead>
							<tr>
								<th>Time</th>
							</tr>
						</thead>
						<tbody>
							{bookingContents.map(booking => (
								<tr key={uuid()}>
									<td>{booking.date}</td>
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

export default AdminBookingOverview;

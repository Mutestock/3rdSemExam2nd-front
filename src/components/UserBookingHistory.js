import React, { useEffect } from "react";
import uuid from "uuid/v1";

//Stop constant fetching. Save to state
const UserBookingHistory = ({
	bookingFacade,
	bookingsContents,
	setBookingContents,
	kayakFacade,
	kayakTableContents,
	setKayakTableContents
}) => {
	useEffect(() => {
		console.log("in useffect");
		bookingFacade.readAll().then(data => {
			setBookingContents(data);
			console.log(data);
		});
		//if (bookingsContents === undefined || bookingsContents === "") {
		//	setBookingContents(bookingFacade.readAll());
		//}
	});

	return (
		<div>
			<div>
				<p>user booking history</p>
			</div>
			<div>
				<div>
					<table className="table">
						<thead>
							<tr>
								<th>booking date</th>
							</tr>
						</thead>
						<tbody>
							{bookingsContents.map(booking => (
								<tr key={uuid()}>
									<td>{booking.bookingDate}</td>
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

export default UserBookingHistory;

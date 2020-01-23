import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL + "/api/booking";

const bookingFacade = (function() {
	function createBooking(date, kayakList) {
		const options = utils.fetchOptions("POST", false, {
			date: date,
			kayakList: kayakList
		});
		return fetch(URL, options).then(() => utils.handleHttpErrors);
	}
	function readBooking(id) {
		const options = utils.fetchOptions("GET", true);
		const result = fetch(URL + "/" + id, options).then(utils.handleHttpErrors);
		return result;
	}

	function readAllBookings() {
		return fetch(URL + "/all", utils.fetchOptions("GET", false)).then(
			utils.handleHttpErrors
		);
	}

	function updateBooking(username, password) {
		const options = utils.fetchOptions("PUT", false, {
			userName: username,
			userPass: password
		});
		return fetch(configuration.URL, options).then(utils.handleHttpErrors);
	}

	function deleteBooking(id) {
		const options = utils.fetchOptions("DELETE", false);
		const result = fetch(configuration.URL + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	function popDatabase(id) {
		const options = utils.fetchOptions("put", true);
		const result = fetch(URL + "/pop/" + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	return {
		create: createBooking,
		read: readBooking,
		readAll: readAllBookings,
		update: updateBooking,
		remove: deleteBooking,
		popDatabase: popDatabase
	};
})();

export default bookingFacade;

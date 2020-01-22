import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL + "/api/reservation";

const reservationFacade = (function() {
	function createReservation(user, pass) {
		const options = utils.fetchOptions("POST", false, {
			userName: user,
			userPass: pass
		});
		return fetch(URL, options).then(() => utils.handleHttpErrors);
	}
	function readReservation(id) {
		const options = utils.fetchOptions("GET", true);
		const result = fetch(configuration.URL + "/" + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	function readAllReservations() {
		return fetch(URL + "/all", utils.fetchOptions("GET", false)).then(
			utils.handleHttpErrors
		);
	}

	function updateReservations(username, password) {
		const options = utils.fetchOptions("PUT", false, {
			userName: username,
			userPass: password
		});
		return fetch(configuration.URL, options).then(utils.handleHttpErrors);
	}

	function deleteReservations(id) {
		const options = utils.fetchOptions("DELETE", false);
		const result = fetch(configuration.URL + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	return {
		create: createReservation,
		read: readReservation,
		readAll: readAllReservations,
		update: updateReservations,
		remove: deleteReservations
	};
})();

export default reservationFacade;

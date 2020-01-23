import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL + "/api/kayak";

const kayakFacade = (function() {
	function createKayak(color, description, model, name, personCount, year) {
		const options = utils.fetchOptions("POST", false, {
			color: color,
			description: description,
			model: model,
			name: name,
			personCount: personCount,
			year: year
		});
		return fetch(URL, options).then(() => utils.handleHttpErrors);
	}
	function readKayak(id) {
		const options = utils.fetchOptions("GET", true);
		const result = fetch(URL + "/" + id, options).then(utils.handleHttpErrors);
		return result;
	}

	function readAllKayaks() {
		return fetch(URL + "/all", utils.fetchOptions("GET", false)).then(
			utils.handleHttpErrors
		);
	}

	function updateKayak(username, password) {
		const options = utils.fetchOptions("PUT", false, {
			userName: username,
			userPass: password
		});
		return fetch(URL, options).then(utils.handleHttpErrors);
	}

	function deleteKayak(id) {
		const options = utils.fetchOptions("DELETE", false);
		const result = fetch(URL + "/"+ id, options).then(utils.handleHttpErrors);
		return result;
	}

	return {
		create: createKayak,
		read: readKayak,
		readAll: readAllKayaks,
		update: updateKayak,
		remove: deleteKayak
	};
})();

export default kayakFacade;

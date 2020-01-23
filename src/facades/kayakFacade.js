import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL + "/api/kayak";

const kayakFacade = (function() {
	function createKayak(kayak) {
		const options = utils.fetchOptions("POST", false, kayak);
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

	function updateKayak(kayak) {
		const options = utils.fetchOptions("PUT", false, kayak);
		return fetch(URL, options).then(utils.handleHttpErrors);
	}

	function deleteKayak(id) {
		const options = utils.fetchOptions("DELETE", false);
		const result = fetch(URL + "/" + id, options).then(utils.handleHttpErrors);
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

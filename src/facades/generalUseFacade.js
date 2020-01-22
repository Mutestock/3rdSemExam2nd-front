import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL + "/api/";

//Untested
//Implies that the fetch resource uses the same resource names

const generalUseFacade = (function({ objectType }) {
	function create({ body }) {
		const options = utils.fetchOptions("POST", false, {
			body
		});
		return fetch(URL + objectType, options).then(() => utils.handleHttpErrors);
	}
	function read(id) {
		const options = utils.fetchOptions("GET", true);
		const result = fetch(
			configuration.URL + objectType + "/" + id,
			options
		).then(utils.handleHttpErrors);
		return result;
	}

	function readAll() {
		return fetch(
			URL + objectType + "/all",
			utils.fetchOptions("GET", false)
		).then(utils.handleHttpErrors);
	}

	function update({ body }) {
		const options = utils.fetchOptions("PUT", false, {
			body
		});
		return fetch(configuration.URL + objectType, options).then(
			utils.handleHttpErrors
		);
	}

	//Delete reserved keyword
	function remove(id) {
		const options = utils.fetchOptions("DELETE", false);
		const result = fetch(configuration.URL + objectType + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	return {
		create: create,
		read: read,
		readAll: readAll,
		update: update,
		remove: remove
	};
})();

export default generalUseFacade;

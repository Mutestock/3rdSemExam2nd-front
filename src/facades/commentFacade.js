import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL;

//Untested
//Implies that the fetch resource uses the same resource names

const commentFacade = (function() {
	function read(id) {
		const options = utils.fetchOptions("GET", true);
		return fetch(URL + "/api/comment/" + id, options).then(
			utils.handleHttpErrors
		);
	}

	function readAll() {
		return fetch(
			URL + "/api/comment/all",
			utils.fetchOptions("GET", false)
		).then(utils.handleHttpErrors);
	}

	return {
		read: read,
		readAll: readAll
	};
})();

export default commentFacade;

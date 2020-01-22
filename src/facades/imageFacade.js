import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL + "/api/image";

const imageFacade = (function() {
	function createImage(user, pass) {
		const options = utils.fetchOptions("POST", false, {
			userName: user,
			userPass: pass
		});
		return fetch(URL, options).then(() => utils.handleHttpErrors);
	}
	function readImage(id) {
		const options = utils.fetchOptions("GET", true);
		const result = fetch(configuration.URL + "/" + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	function readAllImages() {
		return fetch(URL + "/all", utils.fetchOptions("GET", false)).then(
			utils.handleHttpErrors
		);
	}

	function updateImage(username, password) {
		const options = utils.fetchOptions("PUT", false, {
			userName: username,
			userPass: password
		});
		return fetch(configuration.URL, options).then(utils.handleHttpErrors);
	}

	function deleteImage(id) {
		const options = utils.fetchOptions("DELETE", false);
		const result = fetch(configuration.URL + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	return {
		create: createImage,
		read: readImage,
		readAll: readAllImages,
		update: updateImage,
		remove: deleteImage
	};
})();

export default imageFacade;

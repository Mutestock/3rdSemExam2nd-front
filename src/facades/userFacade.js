import configuration from "../settings";
import utils from "../utils";

const URL = configuration.URL;

const userFacade = (function() {
	function createUser(user, pass) {
		const options = utils.fetchOptions("POST", false, {
			userName: user,
			userPass: pass
		});
		return fetch(URL + "/api/user", options).then(() => utils.handleHttpErrors);
	}
	function readUser(id) {
		const options = utils.fetchOptions("GET", true);
		const result = fetch(configuration.URL + "/api/user/" + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	function readAllUsers() {
		return fetch(URL + "/api/user/all", utils.fetchOptions("GET", false)).then(
			utils.handleHttpErrors
		);
	}

	function updateUser(username, password) {
		const options = utils.fetchOptions("PUT", false, {
			userName: username,
			userPass: password
		});
		return fetch(configuration.URL + "/api/user", options).then(
			utils.handleHttpErrors
		);
	}

	function deleteUser(id) {
		const options = utils.fetchOptions("DELETE", false);
		const result = fetch(configuration.URL + "/api/user/" + id, options).then(
			utils.handleHttpErrors
		);
		return result;
	}

	return {
		create: createUser,
		read: readUser,
		readAll: readAllUsers,
		update: updateUser,
		remove: deleteUser
	};
})();

export default userFacade;

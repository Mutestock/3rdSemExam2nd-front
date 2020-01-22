import configuration from "../settings";
import utils from "../utils";
import jwt_decode from "jwt-decode";

const URL = configuration.URL;

const loginFacade = (function() {
	// Circular Import
	function makeOptions(method, addToken, body) {
		var opts = {
			method: method,
			headers: {
				"Content-type": "application/json",
				Accept: "application/json"
			}
		};
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	}

	function tokenDecoder() {
		let decodedToken = undefined;
		try {
			decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
		} catch {
			console.log("No token to decode");
		}
		return decodedToken;
	}

	function setToken(token) {
		localStorage.setItem("jwtToken", token);
	}
	function getToken() {
		return localStorage.getItem("jwtToken");
	}
	function loggedIn() {
		const loggedIn = getToken() != null;
		return loggedIn;
	}
	function logout() {
		localStorage.removeItem("jwtToken");
	}

	function login(user, pass) {
		const options = makeOptions("POST", true, {
			username: user,
			password: pass
		});
		return fetch(URL + "/api/login", options)
			.then(utils.handleHttpErrors)
			.then(res => {
				setToken(res.token);
			});
	}

	return {
		setToken: setToken,
		getToken: getToken,
		makeOptions: makeOptions,
		tokenDecoder: tokenDecoder,
		loggedIn: loggedIn,
		login: login,
		logout: logout
	};
})();

export default loginFacade;

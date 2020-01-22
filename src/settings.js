const configuration = (function() {
	return {
		URL: process.env.REACT_APP_FETCH_SOURCE
	};
})();

export default configuration;

/*
  Add configuration constants
  Return them as objects
  import configuration from "./settings";
  Const URL = configuration.URL;
*/

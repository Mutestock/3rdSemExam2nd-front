import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import loginFacade from "./facades/loginFacade";
import userFacade from "./facades/userFacade";
import commentFacade from "./facades/commentFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import utils from "./utils";

//Delete utils import when safe

const AppFacadeTime = () => {
	return (
		<div>
			<App
				loginFacade={loginFacade}
				userFacade={userFacade}
				utils={utils}
				commentFacade={commentFacade}
			/>
		</div>
	);
};

ReactDOM.render(<AppFacadeTime />, document.getElementById("root"));

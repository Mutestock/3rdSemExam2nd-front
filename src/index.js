import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import loginFacade from "./facades/loginFacade";
import userFacade from "./facades/userFacade";
import commentFacade from "./facades/commentFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import kayakFacade from "./facades/kayakFacade";
import bookingFacade from "./facades/bookingFacade";
import reservationFacade from "./facades/reservationFacade";
import imageFacade from "./facades/imageFacade";
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
				kayakFacade={kayakFacade}
				bookingFacade={bookingFacade}
				reservationFacade={reservationFacade}
				imageFacade={imageFacade}
			/>
		</div>
	);
};

ReactDOM.render(<AppFacadeTime />, document.getElementById("root"));

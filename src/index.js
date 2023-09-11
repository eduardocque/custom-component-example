// Packages
import React from "react";
import ReactDOM from "react-dom";
import "@babel/polyfill";
import { Data } from "@transformd-ltd/sdk";
import get from "lodash/get";

// Relatives
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ParamsFromURL } from "./common/methods";

const params = ParamsFromURL();
let data = new Data();

const config = {
  formId: 1174,
  apiKey: "8d49e9573aDF1b0075cF65bD20A6cB6D8eA1A8108ccC9E15d763554AFf14C784",
  channel: "master",
  config: "default",
  theme: "transformd",
  environment: "Staging",
  initialValues: {},
};

const formProps = {
  apiServerUrl: "https://api.transformd.com",
  serverUrl: "https://api.transformd.com/graphql",
  subscriptionServerUrl: "wss://api.transformd.com/subscriptions",
};

ReactDOM.render(
  <App
    {...config}
    {...formProps}
    environment={get(params, "env", config.environment)}
    submissionId={get(params, "id")}
    data={data}
    params={params}
    imgPath={window.location.href.split(/[?#]/)[0] + 'img/'}
  />,
  document.getElementById("formatic")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

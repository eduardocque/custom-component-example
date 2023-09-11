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
  formId: 1181,
  apiKey: "1aE867802244457ec49889FA5d1C9972AC8bFc3d20D0921f67Fc514E0e8c1072",
  channel: "master",
  config: "default",
  theme: "transformd",
  environment: "Live",
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
  />,
  document.getElementById("formatic")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// Packages
import React from "react";
import ReactDOM from "react-dom";
import { Data } from "@transformd-ltd/sdk";
import get from "lodash/get";

// Relatives
import App from "./App";
import { ParamsFromURL } from "./common/methods";
// Styles
import "./layouts/Example/styles/main.scss";

const params = ParamsFromURL();
let data = new Data();

function createForm(
  formContainer,
  formApiKey,
  formId,
  formBranch = "Staging",
  formChannel = "master",
  formConfig = "default",
  initialValues = {},
  serverUrl = "https://api.transformd.com/graphql",
  apiServerUrl = "https://api.transformd.com",
  subscriptionServerUrl = "wss://api.transformd.com/subscriptions"
) {
  const Form = () => (
    <App
      formId={formId}
      apiKey={formApiKey}
      environment={get(params, "env", formBranch)}
      channel={formChannel}
      config={formConfig}
      serverUrl={serverUrl}
      apiServerUrl={apiServerUrl}
      subscriptionServerUrl={subscriptionServerUrl}
      initialValues={initialValues}
      submissionId={get(params, "id")}
      data={data}
      params={params}
      imgPath="./assets/"
    />
  );

  ReactDOM.render(<Form />, document.getElementById(formContainer));
}

export default createForm;

export function getDataHelper() {
  return data;
}

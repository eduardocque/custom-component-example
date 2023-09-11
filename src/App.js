// Packages
import React, { useCallback, useEffect, useState } from "react";
import ElectronicVerification from "@transformd-ltd/electronic-verification";
import AbnLookupComponent from "@transformd-ltd/abn-lookup";
import { Overrides, Events } from "@transformd-ltd/sdk";
import PropTypes from "prop-types";

// Relatives
import MainLayout from "./layouts/Example";
import Formatic from "./components/Formatic";
import CustomComponentExample from "./components/CustomComponentExample";

const formProps = {
  apiServerUrl: "https://api.transformd.com",
  serverUrl: "https://api.transformd.com/graphql",
  subscriptionServerUrl: "wss://api.transformd.com/subscriptions",
};

const App = (props) => {
  const {
    formId,
    apiKey,
    environment,
    channel,
    serverUrl,
    apiServerUrl,
    config,
    subscriptionServerUrl,
    initialValues,
    submissionId,
    data,
  } = props;
  const [pageClassId, setPageClassId] = useState();

  useEffect(() => {
    if (!data) {
      return;
    }

    const emitter = data.getEmitter();
    emitter.on(Events.PageRender, (data) => {
      setPageClassId(data.id);
    });

    return () => {
      emitter.off(Events.PageRender);
    };
  }, [data]);

  const navigateToPage = useCallback(
    (pageId) => {
      data.navigateToPage(pageId);
    },
    [data]
  );

  return (
    <div className={`page-id-${pageClassId}`}>
      <MainLayout>
        <div className="page-form">
          <Formatic
            {...formProps}
            data={data}
            formId={formId}
            apiKey={apiKey}
            submissionId={submissionId}
            environment={environment}
            channel={channel}
            config={config}
            theme="transformd"
            initialValues={initialValues}
            serverUrl={serverUrl}
            apiServerUrl={apiServerUrl}
            subscriptionServerUrl={subscriptionServerUrl}
          >
            <Overrides.OverrideFieldContainer
              component={AbnLookupComponent}
              // this dosnt work but we need this for api
              type="abnLookup"
            />
            <Overrides.OverrideFieldContainer
              type="electronicVerification"
              component={ElectronicVerification}
            />
            <Overrides.OverrideFieldContainer
              type="customComponentExample"
              component={CustomComponentExample}
              navigateToPage={navigateToPage}
            />
          </Formatic>
        </div>
      </MainLayout>
    </div>
  );
};

App.defaultProps = {
  className: "",
  formId: undefined,
  apiKey: "",
  environment: "",
  channel: "",
  serverUrl: "",
  apiServerUrl: "",
  config: "",
  subscriptionServerUrl: "",
  initialValues: {},
  submissionId: "",
  data: undefined,
};

App.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.number,
  apiKey: PropTypes.string,
  environment: PropTypes.string,
  channel: PropTypes.string,
  serverUrl: PropTypes.string,
  apiServerUrl: PropTypes.string,
  config: PropTypes.string,
  subscriptionServerUrl: PropTypes.string,
  initialValues: PropTypes.object,
  submissionId: PropTypes.string,
  data: PropTypes.object,
};

export default App;

// Packages
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import noop from "lodash/noop";
import {
  // Components,
  compose,
  // connect,
  withFieldSync,
  withFieldValidation,
  withFieldToken,
} from "@transformd-ltd/sdk";

const CustomComponentExampleContainer = (props) => {
  const { className, content, navigateToPage } = props;

  // console.log(props); // Check what you have available to you here

  const handleClick = useCallback(() => {
    if (!navigateToPage) {
      return;
    }

    navigateToPage("64fea5bfb75caa34480005b2");
  }, [navigateToPage]);

  return (
    <button type="button" className={classNames("fancy-button", className)} onClick={handleClick}>
      {content}
    </button>
  );
};

CustomComponentExampleContainer.defaultProps = {
  fieldId: "",
  content: "Content Here",
  navigateToPage: noop,
};

CustomComponentExampleContainer.propTypes = {
  fieldId: PropTypes.string,
  content: PropTypes.string,
  navigateToPage: PropTypes.func,
};

export default compose(
  // connect(
  //   ({
  //     formatic: {
  //       submissionId,
  //       formId,
  //       environment,
  //       channel,
  //       dataForm: { attributes },
  //     },
  //   }) => ({
  //     submissionId,
  //     formId,
  //     environment,
  //     channel,
  //     formBehaviours: attributes,
  //   })
  // ),
  withFieldSync,
  withFieldValidation,
  withFieldToken([])
)(CustomComponentExampleContainer);

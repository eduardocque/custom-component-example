// Packages
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withHelpText } from "@transformd-ltd/sdk";
import noop from "lodash/noop";

// Relatives
import { HelpTextPositions } from "./config";
import CustomComponentExampleContainer from "./CustomComponentExampleContainer";

const CustomComponentExample = (props) => {
  const {
    id,
    renderer,
    attributes,
    className,
    helpContent,
    attributes: { helpTextPosition },
    navigateToPage,
  } = props;

  return (
    <div
      className={classNames(
        "formatic-field-container",
        { "formatic-with-help-text": helpContent },
        { [className]: className },
        { [attributes.class]: attributes.class }
      )}
      data-id={id}
      data-renderer={renderer}
      name={id}
      data-tag={attributes.tag}
    >
      {helpTextPosition === HelpTextPositions.left && helpContent}
      <div
        className={classNames("formatic-field-container__field", {
          "formatic-field-container__field--with-help": helpContent,
        })}
      >
        <CustomComponentExampleContainer
          fieldId={id}
          // {...props}
          {...attributes}
          navigateToPage={navigateToPage}
        />
      </div>
      {helpTextPosition === HelpTextPositions.right && helpContent}
    </div>
  );
};

CustomComponentExample.defaultProps = {
  id: "",
  className: "",
  helpContent: null,
  helpTextPosition: HelpTextPositions.left,
  attributes: {},
  navigateToPage: noop,
};

CustomComponentExample.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  renderer: PropTypes.string.isRequired,
  helpContent: PropTypes.node,
  helpTextPosition: PropTypes.string,
  attributes: PropTypes.object,
  navigateToPage: PropTypes.func,
};

const CustomComponentExampleWithHOC = withHelpText(CustomComponentExample);

// Used in review table
CustomComponentExampleWithHOC.toSummaryNode = (value) => {
  return value;
};

export { CustomComponentExample };

export default CustomComponentExampleWithHOC;

import React, { Component } from "react";
import PropTypes from "prop-types";
import FormaticSDK, { Data } from "@transformd-ltd/sdk";

class Formatic extends Component {
  constructor(props) {
    super(props);

    let { data } = props;
    if (!data) {
      data = new Data();
    }

    this.state = {
      data,
    };
  }

  render() {
    const { children } = this.props;
    const { data } = this.state;

    return (
      <FormaticSDK {...this.props} data={data}>
        {children}
      </FormaticSDK>
    );
  }
}

Formatic.defaultProps = {
  children: [],
  data: null,
};

Formatic.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  data: PropTypes.object,
};

export default Formatic;

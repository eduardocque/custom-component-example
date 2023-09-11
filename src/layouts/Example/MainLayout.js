// Packages
import React from "react";
import PropTypes from "prop-types";

// styles
import "./styles/main.scss";
// import "@formatic/theme-transformd/src/main.scss";

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className="layout-example">
      <header>
        {/* <a href="/">
          <img src="#" alt="" className="logo" />
        </a> */}
        Custom Component Example
      </header>
      <main className="content">{children}</main>
    </div>
  );
};

MainLayout.defaultProps = {
  className: "",
};

MainLayout.propTypes = {
  className: PropTypes.string,
};

export default MainLayout;

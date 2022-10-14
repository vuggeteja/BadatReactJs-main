import React, { Component } from "react";
import Header from "../Component/Header";
// import Footer from "../Component/Footer";

class Layout extends Component {
  render() {
    return (
      <div style={{ paddingBottom: "50px" }}>
        <Header />
        {this.props.children}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Layout;

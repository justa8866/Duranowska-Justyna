import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

export class CustomScrollbar extends Component {
  render() {
    return (
      <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax={"60vh"}
        thumbMinSize={30}
        universal={true}
        {...this.props}
      />
    );
  }
}

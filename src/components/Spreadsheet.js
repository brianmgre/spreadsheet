import React, { Component } from "react";
import Rows from "./Rows";

class Spreadsheet extends Component {
  state = {
    data: {}
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        heyo
        <Rows data={data} />
      </div>
    );
  }
}

export default Spreadsheet;

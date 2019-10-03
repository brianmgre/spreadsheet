import React, { Component } from "react";
import Rows from "./Rows";

class Spreadsheet extends Component {
  state = {
    data: {}
  };

  handleUpdate = () => {
    console.log("hit------foce---------");
    this.forceUpdate();
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Rows data={data} handleUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default Spreadsheet;

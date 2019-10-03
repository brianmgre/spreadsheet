import React, { Component } from "react";
import Rows from "./Rows";
import SaveModal from "./SaveModal";
import Icon from "@material-ui/core/Icon";
import { saveDb } from "./api";

class Spreadsheet extends Component {
  state = {
    data: {},
    open: false,
    dataBaseName: ""
  };

  componentDidMount() {
    this.setState({
      open: true
    });
  }

  updateName = name => {
    this.setState({
      dataBaseName: name
    });
  };

  modalOpen = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

  saveSpreadsheet = e => {
    e.preventDefault();
    const { dataBaseName, data } = this.state;
    if (!dataBaseName) {
      this.modalOpen();
    } else {
      saveDb(dataBaseName, data).catch(err => {
        alert("There was an error saving your sheet");
      });
    }
  };

  render() {
    const { data, open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <SaveModal
          modalOpen={this.modalOpen}
          open={open}
          data={data}
          updateName={this.updateName}
        />
        <Icon onClick={this.saveSpreadsheet}>save</Icon>
        <Rows data={data} />
      </div>
    );
  }
}

export default Spreadsheet;

import React, { Component } from "react";
import Rows from "./Rows";
import SaveModal from "./SaveModal";
import Icon from "@material-ui/core/Icon";

class Spreadsheet extends Component {
  state = {
    data: {},
    open: false
  };

  componentDidMount() {
    this.setState({
      open: true
    });
  }

  modalOpen = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

  render() {
    const { data, open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <SaveModal modalOpen={this.modalOpen} open={open} />
        <Icon>save</Icon>
        <Rows data={data} />
      </div>
    );
  }
}

export default Spreadsheet;

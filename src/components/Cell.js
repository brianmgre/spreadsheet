import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import { add } from "./excelFunctions";

class Cell extends Component {
  state = {
    newEntry: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleBlur = () => {
    const { newEntry } = this.state;
    const { cellId, data, handleUpdate } = this.props;

    if (this.state.newEntry === "") {
      return;
    } else if (newEntry[0] === "=") {
      let value = newEntry.replace(/\s/g, "").toUpperCase();

      add(value, cellId, data);
      data[cellId].value = data[cellId].newFun();
      data[cellId].eq = data[cellId].wtf();
      this.setState({
        newEntry: data[cellId].newFun()
      });
    } else if (Number(newEntry)) {
      add(newEntry, cellId, data);
      data[cellId].value = data[cellId].newFun();
      data[cellId].eq = data[cellId].wtf();
    }
  };

  handleFocus = () => {
    const { cellId, data } = this.props;

    if (data[cellId]) {
      this.setState({
        newEntry: data[cellId].wtf()
      });
    } else {
      return;
    }
  };

  render() {
    const { data, cellId } = this.props;
    return (
      <Grid item xs={1}>
        {this.props.legend ? (
          this.props.legend
        ) : (
          <TextField
            placeholder={this.props.cellId}
            name="newEntry"
            variant="outlined"
            margin="dense"
            id="outlined-dense"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            value={this.state.newEntry}
            onFocus={this.handleFocus}
          />
        )}
      </Grid>
    );
  }
}

export default Cell;

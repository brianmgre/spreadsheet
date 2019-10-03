import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import { add } from "./excelFunctions";

class Cell extends Component {
  state = {
    newEntry: ""
  };

  componentDidMount() {
    if (this.props.data[this.props.cellId])
      this.setState({
        newEntry: this.props.data[this.props.cellId].calculator()
      });
  }

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
      data[cellId].value = data[cellId].calculator();
      data[cellId].eq = data[cellId].eqString();
      this.setState({
        newEntry: data[cellId].calculator()
      });
    } else if (Number(newEntry)) {
      add(newEntry, cellId, data);
      data[cellId].value = data[cellId].calculator();
      data[cellId].eq = data[cellId].eqString();
      this.setState({
        newEntry: data[cellId].calculator()
      });
    } else {
      data[cellId] = newEntry;
    }
  };

  handleFocus = () => {
    const { cellId, data } = this.props;

    if (data[cellId]) {
      this.setState({
        newEntry: data[cellId].eqString()
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
            id={this.props.cellId}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            value={this.state.newEntry}
            onFocus={this.handleFocus}
            className={this.props.cellId}
          />
        )}
      </Grid>
    );
  }
}

export default Cell;

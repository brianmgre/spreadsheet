import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import { TextField } from "@material-ui/core";
import { saveDb } from "./api";

const styles = theme => ({});

class WelcomeForm extends Component {
  state = { fileName: "" };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  newDataBase = e => {
    e.preventDefault();
    const { fileName } = this.state;
    const { onClose } = this.props;
    if (fileName !== "") {
      saveDb(fileName).then(res => {
        console.log(res);
        onClose();
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { fileName } = this.state;
    return (
      <form onSubmit={this.newDataBase()} className={classes.root}>
        <TextField
          name="newEntry"
          variant="outlined"
          margin="dense"
          onChange={this.handleChange}
          value={fileName}
        />
        <button type="submit">Save</button>
        <button type="submit">cancel</button>
      </form>
    );
  }
}

export default withStyles(styles)(WelcomeForm);

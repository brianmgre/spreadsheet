import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import { TextField } from "@material-ui/core";
import { saveNewDb } from "./api";

const styles = theme => ({});

class WelcomeForm extends Component {
  state = { fileName: "" };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addToDataBase = e => {
    e.preventDefault();
    const { fileName } = this.state;
    const { onClose, data, updateName } = this.props;
    if (fileName !== "") {
      saveNewDb(fileName, data).then(res => {
        console.log("res", res);
        updateName(fileName);
        onClose();
      });
    }
  };

  render() {
    const { classes, handleToggle } = this.props;
    const { fileName } = this.state;
    return (
      <form onSubmit={this.addToDataBase} className={classes.root}>
        <TextField
          name="fileName"
          variant="outlined"
          margin="dense"
          onChange={this.handleChange}
          value={fileName}
        />
        <button type="submit">Save</button>
        <button onClick={handleToggle}>cancel</button>
      </form>
    );
  }
}

export default withStyles(styles)(WelcomeForm);

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";
import { saveNewDb } from "./api";

const styles = theme => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "48%"
  },

  btnContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: "15px"
  },

  btnCreate: {
    backgroundColor: "#ff5c5c",
    color: "white",
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
      color: "#ff5c5c",
      backgroundColor: "white",
      border: "1px solid #ff5c5c"
    }
  },

  btnCancel: {
    backgroundColor: "#073e4b",
    color: "white",
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
      color: "#073e4b",
      backgroundColor: "white",
      border: "1px solid #073e4b"
    }
  }
});

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
        updateName(fileName);
        onClose();
      });
    }
  };

  render() {
    const { classes, handleToggle } = this.props;
    const { fileName } = this.state;
    return (
      <form onSubmit={this.addToDataBase} className={classes.formContainer}>
        <TextField
          name="fileName"
          variant="outlined"
          margin="dense"
          onChange={this.handleChange}
          value={fileName}
          InputProps={{
            classes: {
              input: classes.resize
            }
          }}
          placeholder="Spreadsheet Name"
          className={classes.input}
        />
        <div className={classes.btnContainer}>
          <button type="submit" className={classes.btnCreate}>
            Create
          </button>
          <button onClick={handleToggle} className={classes.btnCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(WelcomeForm);

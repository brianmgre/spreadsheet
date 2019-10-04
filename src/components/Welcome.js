import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import WelcomeForm from "./welcomeForm";
import { getAllNames, getOne } from "./api";
import DisplayFileNames from "./DisplayFileNames";

const styles = theme => ({
  root: {
    width: "80%",
    display: "flex",
    justifyContent: "space-evenly",
    padding: 100
  },
  addIcon: {
    fontSize: "3rem",
    color: "#073e4b",
    "&:hover": {
      cursor: "pointer",
      color: "white",
      backgroundColor: "#ff5c5c",
      border: "1px solid white"
    }
  },

  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class Welcome extends Component {
  state = { showWelcomeForm: false, filenames: null };

  handleToggle = e => {
    e.preventDefault();
    const { showWelcomeForm } = this.state;
    this.setState({
      showWelcomeForm: !showWelcomeForm
    });
  };

  findAllFiles = e => {
    e.preventDefault();
    getAllNames().then(res => {
      this.setState({
        filenames: res.data.justNames
      });
    });
  };

  getOneSheet = (id, e) => {
    e.preventDefault();
    const { updateData, onClose } = this.props;
    getOne(id).then(res => {
      const { sheetInfo, sheetName } = res.data.allData;
      updateData(sheetInfo, sheetName);
      onClose();
    });
  };

  render() {
    const { classes, onClose, data, updateName } = this.props;
    const { showWelcomeForm, filenames } = this.state;
    return (
      <div className={classes.root}>
        {showWelcomeForm ? (
          <WelcomeForm
            onClose={onClose}
            data={data}
            handleToggle={this.handleToggle}
            updateName={updateName}
          />
        ) : (
          <div className={classes.iconContainer}>
            <Icon className={classes.addIcon} onClick={this.handleToggle}>
              fiber_new
            </Icon>
            <p>Create a New Spreadsheet</p>
          </div>
        )}
        {filenames ? (
          <DisplayFileNames
            filenames={filenames}
            getOneSheet={this.getOneSheet}
          />
        ) : (
          <div className={classes.iconContainer}>
            <Icon
              className={classes.addIcon}
              data={data}
              onClick={this.findAllFiles}
            >
              folder_open
            </Icon>
            <p>Load a Spreadsheet</p>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Welcome);

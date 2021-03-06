import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Welcome from "./Welcome";

const styles = theme => ({
  modalContainer: {
    border: "1px solid purple",
    position: "absolute",
    width: "50%",
    right: "25%",
    top: "20%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      right: "5%",
      top: "7%"
    }
  }
});

class WelcomeModal extends Component {
  state = {};

  render() {
    const {
      open,
      modalOpen,
      updateData,
      data,
      classes,
      updateName
    } = this.props;
    return (
      <Modal open={open} onClose={modalOpen}>
        <Paper className={classes.modalContainer}>
          <Welcome
            updateData={updateData}
            onClose={modalOpen}
            data={data}
            updateName={updateName}
          />
        </Paper>
      </Modal>
    );
  }
}

export default withStyles(styles)(WelcomeModal);

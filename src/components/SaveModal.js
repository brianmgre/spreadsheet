import React from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

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

const SaveModal = props => {
  const { open, saveOpen, classes } = props;
  return (
    <Modal open={open} onClose={saveOpen}>
      <Paper className={classes.modalContainer}>
        <h2>Your Spreadsheet has been Save!</h2>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(SaveModal);

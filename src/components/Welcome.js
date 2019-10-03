import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import WelcomeForm from "./welcomeForm";

const styles = theme => ({ root: {}, addIcon: {} });

class Welcome extends Component {
  state = { showWelcomeForm: false };

  handleToggle = e => {
    e.preventDefault();
    const { showWelcomeForm } = this.state;
    this.setState({
      showWelcomeForm: !showWelcomeForm
    });
  };

  render() {
    const { classes, onClose, data, updateName } = this.props;
    const { showWelcomeForm } = this.state;
    return (
      <Paper className={classes.root}>
        {showWelcomeForm ? (
          <WelcomeForm
            onClose={onClose}
            data={data}
            handleToggle={this.handleToggle}
            updateName={updateName}
          />
        ) : null}
        <Icon className={classes.addIcon} onClick={this.handleToggle}>
          fiber_new
        </Icon>
        <Icon className={classes.addIcon}>folder_open</Icon>
      </Paper>
    );
  }
}

export default withStyles(styles)(Welcome);

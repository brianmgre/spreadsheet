import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

class Cell extends Component {
  state = {
    newEntry: ""
  };

  handleBlur = () => {
    const { newEntry } = this.state;
    if (this.state.newEntry !== "") {
    }
  };

  render() {
    return (
      <Grid item xs={1}>
        {this.props.ledgend ? (
          this.props.ledgend
        ) : (
          <TextField
            placeholder={this.props.cellId}
            variant="outlined"
            margin="dense"
            id="outlined-dense"
            onBlur={this.handleBlur}
          />
        )}
      </Grid>
    );
  }
}

export default Cell;

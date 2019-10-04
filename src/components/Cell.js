import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import { add, parseString, checker } from "./excelFunctions";

class Cell extends Component {
  state = {
    newEntry: ""
  };

  componentDidMount() {
    const { data, cellId } = this.props;

    if (data[cellId] && data[cellId].value) {
      this.setState({
        newEntry: data[cellId].value
      });
    } else if (data[cellId] && data[cellId].calculator) {
      this.setState({
        newEntry: data[cellId].calculator()
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleBlur = () => {
    const { newEntry } = this.state;
    const { cellId, data } = this.props;

    try {
      if (this.state.newEntry === "" || !newEntry) {
        delete data[cellId];
      } else if (newEntry[0] === "=") {
        let value = newEntry.replace(/\s/g, "").toUpperCase();
        let cleanStr = parseString(value);
        let safeInput = checker(cleanStr, value);

        if (safeInput) {
          add(value, cellId, data);
          data[cellId].value = data[cellId].calculator();
          data[cellId].eq = data[cellId].eqString();
          this.setState({
            newEntry: data[cellId].calculator()
          });
        }
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
    } catch {
      data[cellId] = "#VALUE!";
    }
  };

  handleFocus = () => {
    const { cellId, data } = this.props;
    try {
      if (data[cellId] && !data[cellId].eqString) {
        this.setState({
          newEntry: data[cellId]
        });
      } else if (data[cellId]) {
        this.setState({
          newEntry: data[cellId].eqString()
        });
      } else {
        return;
      }
    } catch {
      data[cellId] = "#VALUE!";
    }
  };

  loadingFromDb = () => {
    const { data, cellId } = this.props;
    if (data[cellId] && data[cellId].value) {
      this.setState({
        newEntry: data[cellId].value
      });
    } else if (data[cellId] && data[cellId].calculator) {
      this.setState({
        newEntry: data[cellId].calculator()
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.fetch !== this.props.fetch) {
      this.loadingFromDb();
    }
  }

  render() {
    const { cellId, legend } = this.props;
    const { newEntry } = this.state;

    return (
      <Grid item xs={1}>
        {legend ? (
          legend
        ) : (
          <TextField
            name="newEntry"
            variant="outlined"
            margin="dense"
            id={cellId}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            value={newEntry}
            onFocus={this.handleFocus}
          />
        )}
      </Grid>
    );
  }
}

export default Cell;

import React, { Component } from "react";
import Rows from "./Rows";
import WelcomeModal from "./WelcomeModal";
import Icon from "@material-ui/core/Icon";
import { saveDb } from "./api";
import { add } from "./excelFunctions";
import withStyles from "@material-ui/core/styles/withStyles";
import SaveModal from "./SaveModal";

const styles = theme => ({
  addIcon: {
    fontSize: "3rem",
    color: "#073e4b",
    "&:hover": {
      cursor: "pointer",
      color: "#ff5c5c"
    },
    marginTop: 20
  },

  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:hover": {
      cursor: "arrow",
      color: "black"
    }
  },

  save: {
    margin: 0,
    padding: 0,
    fontSize: "1.6rem",
    "&:hover": {
      cursor: "arrow",
      color: "black"
    }
  }
});

class Spreadsheet extends Component {
  state = {
    data: {},
    open: false,
    fetch: false,
    dataBaseName: "",
    save: false
  };

  componentDidMount() {
    this.setState({
      open: true
    });
  }

  updateName = name => {
    this.setState({
      dataBaseName: name
    });
  };

  modalOpen = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  };

  saveSpreadsheet = e => {
    e.preventDefault();
    const { dataBaseName, data } = this.state;
    if (!dataBaseName) {
      this.modalOpen();
    } else {
      saveDb(dataBaseName, data)
        .then(res => {
          this.saveOpen();
        })
        .catch(err => {
          alert("There was an error saving your sheet");
        });
    }
  };

  updateData = (newData, name) => {
    const { fetch } = this.state;
    Object.keys(newData).forEach(key => {
      add(newData[key].eq, key, this.state.data);
    });
    this.setState({
      dataBaseName: name,
      fetch: !fetch
    });
  };

  saveOpen = () => {
    const { save } = this.state;
    this.setState({
      save: !save
    });
  };

  render() {
    const { data, open, fetch, save } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <SaveModal open={save} saveOpen={this.saveOpen} />
        <WelcomeModal
          modalOpen={this.modalOpen}
          updateData={this.updateData}
          open={open}
          data={data}
          updateName={this.updateName}
        />

        <Icon onClick={this.saveSpreadsheet} className={classes.addIcon}>
          save
        </Icon>
        <p className={classes.save}>Save</p>

        <Rows data={data} fetch={fetch} />
      </div>
    );
  }
}

export default withStyles(styles)(Spreadsheet);

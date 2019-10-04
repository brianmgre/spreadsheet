import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  fileContainer: {
    display: "flex",
    flexDirection: "column"
  },
  fileTitle: {
    margin: 0,
    fontSize: "2rem"
  },

  fileNames: {
    fontSize: "1.3rem"
  },

  file: {
    "&:hover": {
      cursor: "pointer",

      color: "#ff5c5c"
    }
  }
});

const DisplayFileNames = props => {
  const { classes, getOneSheet, filenames } = props;
  if (filenames.length === 0) {
    return <p>There are no Saved SpreadSheets</p>;
  } else {
    return (
      <div className={classes.fileContainer}>
        <h3 className={classes.fileTitle}>Current Files:</h3>
        <ul className={classes.fileNames}>
          {filenames.map(name => (
            <li
              key={name._id}
              onClick={e => getOneSheet(name._id, e)}
              className={classes.file}
            >
              {name.sheetName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default withStyles(styles)(DisplayFileNames);

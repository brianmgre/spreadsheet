import React, { Component } from "react";
import Cells from "./Cells";
import Grid from "@material-ui/core/Grid";

const Rows = props => {
  const allRows = [];

  for (let i = 0; i < 11; i++) {
    const { data, handleUpdate } = props;
    allRows.push(
      <Cells id={i} key={i} data={data} handleUpdate={handleUpdate} />
    );
  }
  return (
    <Grid container spacing={0} alignItems="center" style={{ padding: 20 }}>
      {allRows}
    </Grid>
  );
};

export default Rows;

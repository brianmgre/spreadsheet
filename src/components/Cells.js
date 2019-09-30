import React, { Component } from "react";
import Cell from "./Cell";
import Grid from "@material-ui/core/Grid";

const alphabet = "AABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Cells = props => {
  const allCells = [];

  for (let i = 0; i < 11; i++) {
    const { data, id } = props;

    if (i === 0 && id === 0) {
      allCells.push(
        <Cell cellId={"0" + id} key={"0" + id} ledgend={" start"} data={data} />
      );
    } else if (id === 0) {
      allCells.push(
        <Cell
          cellId={"0" + id}
          key={alphabet[i] + id}
          ledgend={alphabet[i]}
          data={data}
        />
      );
    } else if (i === 0) {
      allCells.push(
        <Cell cellId={"0" + id} key={"0" + id} ledgend={id} data={data} />
      );
    } else {
      allCells.push(
        <Cell cellId={alphabet[i] + id} key={alphabet[i] + id} data={data} />
      );
    }
  }

  return (
    <Grid container spacing={0} alignItems="center">
      {allCells}
    </Grid>
  );
};

export default Cells;

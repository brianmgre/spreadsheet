import React, { Component } from "react";
import Cell from "./Cell";
import Grid from "@material-ui/core/Grid";

const alphabet = "0ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Cells = props => {
  const allCells = [];

  for (let i = 0; i < 11; i++) {
    const { data, id, handleUpdate } = props;

    // if (i === 0 && id === 0) {
    //   allCells.push(
    //     <Cell cellId={"0" + id} key={"0" + id} legend={" start"} data={data} />
    //   );
    // } else
    if (id === 0) {
      allCells.push(
        <Cell
          cellId={"0" + id}
          key={alphabet[i] + id}
          legend={alphabet[i]}
          data={data}
        />
      );
    } else if (i === 0) {
      allCells.push(
        <Cell cellId={"0" + id} key={"0" + id} legend={id} data={data} />
      );
    } else {
      allCells.push(
        <Cell
          cellId={alphabet[i] + id}
          key={alphabet[i] + id}
          data={data}
          handleUpdate={handleUpdate}
        />
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

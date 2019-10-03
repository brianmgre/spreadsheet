export function add(newEntry, cellId, data) {
  let newCell = new Object();

  data[cellId] = newCell;
  newCell.eqString = function() {
    return newEntry.toString();
  };
  newCell.calculator = () => {
    if (newEntry !== "" && newEntry[0] === "=") {
      let vals = parseString(newEntry);
      let newString = "";
      let index = 0;
      let end = vals.length;
      while (index < end) {
        let lengthDiff = end - index;
        let currentVal = vals[index];
        let dataVal = data[currentVal];
        if (dataVal && dataVal.eqString().indexOf("=") !== -1) {
          dataVal = parseString(dataVal.eqString(), true);
        } else if (dataVal && dataVal.eqString()) {
          dataVal = dataVal.eqString();
        }
        if (Number(currentVal)) {
          newString += currentVal;
        } else if (dataVal && dataVal.length) {
          let newVal = dataVal.split("+");

          end += newVal.length;
          vals.push(...newVal);
        } else if (Number(dataVal)) {
          newString += dataVal;
        } else if (!Number(dataVal)) {
          vals.push(dataVal);
        }

        if (
          lengthDiff > 1 &&
          newString.length !== 0 &&
          newString[newString.length - 1] !== "+"
        ) {
          newString += "+";
        }

        index += 1;
      }
      updateVals(cellId, data);
      return eval(newString);
    } else {
      updateVals(cellId, data);
      return newEntry;
    }
  };
}

function parseString(str, n = null) {
  if (n) {
    return str.substr(1);
  } else {
    let strEquation = str.substr(1);
    let x = strEquation.split("+");

    return x;
  }
}

function updateVals(cell, data) {
  let effectedCells = Object.keys(data).filter(key => {
    if (data[key].eq) {
      return data[key].eq.substr(1).indexOf(cell) !== -1;
    }
  });
  if (effectedCells && effectedCells.length > 0) {
    updateCells(effectedCells, data);
  }
}

function updateCells(effectedCells, data) {
  effectedCells.forEach(c => {
    if (c) {
      let currentEle = document.getElementById(c);
      data[c].value = data[c].calculator();
      data[c].eqString();
      currentEle.value = data[c].calculator();
    }
  });
}

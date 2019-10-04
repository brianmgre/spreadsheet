export function add(newEntry, cellId, data) {
  let newCell = {};

  data[cellId] = newCell;
  newCell.eqString = function() {
    return newEntry.toString();
  };
  newCell.calculator = () => {
    try {
      if (!newEntry) {
        return newEntry;
      } else if (newEntry !== "" && newEntry[0] === "=") {
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
          } else if (!dataVal && vals.length === 0) {
            data[cellId].value = "#VALUE!";
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
        return finalAdd(newString);
      } else {
        updateVals(cellId, data);
        return newEntry;
      }
    } catch {
      return (data[cellId].value = "#VALUE!");
    }
  };
}

export function parseString(str, n = null) {
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
    } else {
      return false;
    }
  });
  if (effectedCells && effectedCells.length > 0) {
    updateCells(effectedCells, data);
  }
}

export function updateCells(effectedCells, data) {
  effectedCells.forEach(c => {
    let tempVal = data[c];
    if (c) {
      let currentEle = document.getElementById(c);

      tempVal.value = tempVal.calculator();
      tempVal.eqString();
      currentEle.value = tempVal.calculator();
    }
  });
}

export function checker(str, value) {
  let count = 0;
  let alphaLimit = "j1";
  str.forEach(element => {
    if (element > alphaLimit && !Number(element)) {
      count += 1;
    } else if (Number(element)) {
      count -= 1;
    }
  });

  let strNum = value.match(/\d+/g);

  strNum.forEach(element => {
    if (element > 10) {
      count += 1;
    }
  });

  return count <= 0;
}

function finalAdd(str) {
  let strNum = str.match(/\d+/g);
  let sum = 0;
  strNum.forEach(num => {
    sum += +num;
  });

  return sum;
}

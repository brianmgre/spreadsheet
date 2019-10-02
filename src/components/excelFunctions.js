export function add(newEntry, cellId, data) {
  let z = new Object();
  data[cellId] = z;
  z.wtf = function() {
    return newEntry.toString();
  };
  z.newFun = () => {
    if (newEntry !== "" && newEntry[0] === "=") {
      let x = newEntry.substr(1);
      let vals = x.split("+");
      let newString = "";
      let index = 0;
      let end = vals.length;
      while (index < end) {
        let lengthDiff = end - index;
        let currentVal = vals[index];
        let dataVal = data[currentVal];
        if (dataVal && dataVal.wtf().indexOf("=") !== -1) {
          dataVal = dataVal.wtf().substr(1);
        } else if (dataVal && dataVal.wtf()) {
          dataVal = dataVal.wtf();
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
      return eval(newString);
    } else return newEntry;
  };
}

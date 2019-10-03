import axios from "axios";

const url = process.env.REACT_APP_API;

export async function saveNewDb(name, data) {
  try {
    const spreadsheet = { name, data };
    const nameResponse = await axios.post(`${url}/api/save-sheet`, spreadsheet);
    console.log(nameResponse);
    return nameResponse;
  } catch (err) {
    return err;
  }
}

export async function saveDb(name, data) {
  try {
    const spreadsheet = { name, data };
    const nameResponse = await axios.post(`${url}/api/data-save`, spreadsheet);
    console.log("----name--", nameResponse);
    return nameResponse;
  } catch (err) {
    return err;
  }
}

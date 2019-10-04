import axios from "axios";

const url = process.env.REACT_APP_API;

export async function saveNewDb(name, data) {
  try {
    const spreadsheet = { name, data };
    const nameResponse = await axios.post(`${url}/api/save-sheet`, spreadsheet);
    return nameResponse;
  } catch (err) {
    return err;
  }
}

export async function saveDb(name, data) {
  try {
    const spreadsheet = { name, data };
    const nameResponse = await axios.post(`${url}/api/data-save`, spreadsheet);
    return nameResponse;
  } catch (err) {
    return err;
  }
}

export async function getAllNames() {
  try {
    const allNames = await axios.get(`${url}/api/get-data`);
    return allNames;
  } catch (err) {
    return err;
  }
}

export async function getOne(id) {
  try {
    const one = await axios.get(`${url}/api/data/${id}`);
    return one;
  } catch (err) {
    return err;
  }
}

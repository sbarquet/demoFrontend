import axios from 'axios';

const serverURL = 'http://68.183.203.255:5000/api/characters';

export async function getAll() {
  const url = serverURL + '/all';
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function deleteOne(id) {
  const url = `${serverURL}/delete/${id}`;
  try {
    const respose = await axios.delete(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function getOne(id) {
  const url = `${serverURL}/${id}`;
  try {
    const respose = await axios.get(url);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function insertOne(body) {
  const url = serverURL + '/new';
  try {
    const respose = await axios.post(url, body);
    return respose;
  } catch (error) {
    return error;
  }
}

export async function editOne(body) {
  const url = serverURL + '/edit';
  try {
    const respose = await axios.put(url, body);
    return respose;
  } catch (error) {
    return error;
  }
}

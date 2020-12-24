import axios from 'axios';

const URL = "https://findfalcone.herokuapp.com";

export const getPlanets = (cancelToken) => axios(`${URL}/planets`, { cancelToken });
export const getVehicles = (cancelToken) => axios(`${URL}/vehicles`, { cancelToken });

export const getToken = (cancelToken) => (
  axios({
    method: 'post',
    url: `${URL}/token`,
    headers: { 
      'Accept': 'application/json'
    },
    cancelToken
  })
);

export const getResult = (data, cancelToken) => (
  axios({
    method: 'post',
    url: `${URL}/find`,
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    cancelToken,
    data
  })
);
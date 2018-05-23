export const LOAD_WEATHER = 'LOAD_WEATHER';
export const LOAD_FAIL = 'LOAD_FAIL';

import fetch from 'isomorphic-fetch';

export const loadWeather = (param, dispatch) => {
  const paramVal = param;
  const key = process.env.API_KEY

  console.log(key);

/*
  return dispatch => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${524901}&APPID=${key}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      return dispatch => {
        dispatch({
          type: LOAD_FAIL,
          data: true
        });
      }
    });
  }
*/
}

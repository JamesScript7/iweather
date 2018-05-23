// import fetch from 'isomorphic-fetch';
export const LOAD_WEATHER = 'LOAD_WEATHER';
export const LOAD_FAIL = 'LOAD_FAIL';

export const loadWeather = (param, dispatch) => {
  const paramVal = param;
  const key = process.env.REACT_APP_API_KEY;

  return dispatch => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${paramVal}&APPID=${key}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      return {
        type: LOAD_WEATHER,
        payload: resJson
      }
    })
    .catch(err => {
      return dispatch => {
        dispatch({
          type: LOAD_FAIL,
          payload: true
        });
      }
    });
  }

}

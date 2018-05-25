// import fetch from 'isomorphic-fetch';
export const LOAD_WEATHER = 'LOAD_WEATHER';
export const LOAD_FAIL = 'LOAD_FAIL';
export const LOAD_FORECAST = 'LOAD_FORECAST';

export const loadWeather = (param, dispatch) => {
  const paramVal = param;
  const key = process.env.REACT_APP_API_KEY;
  // loadForecast(paramVal, key);

  return dispatch => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${paramVal}&APPID=${key}`)
    .then(res => res.json())
    .then(resJson => {
      localStorage.setItem('weather', JSON.stringify(resJson));

      dispatch({
        type: LOAD_WEATHER,
        payload: resJson
      });
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

// const loadForecast = (param, key) => {
//   fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${param}&APPID=${key}`)
//   .then(res => res.json())
//   .then(resJson => {
//     console.log(resJson);
//   });
// }

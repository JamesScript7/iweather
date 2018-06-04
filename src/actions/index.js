import fetch from 'isomorphic-fetch';
export const LOAD_WEATHER = 'LOAD_WEATHER';
export const LOAD_FAIL = 'LOAD_FAIL';

export const loadWeather = (param, dispatch) => {
  const weatherParam = param;
  const key = process.env.REACT_APP_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${weatherParam}&APPID=${key}`;
  localStorage.setItem('param', param);

  return dispatch => {
    fetch(url)
    .then(res => res.json())
    .then(resJson => {
      localStorage.setItem('weather', JSON.stringify(resJson));

      fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${weatherParam}&APPID=${key}`)
      .then(res => res.json())
      .then(resJsonForecast => {
        localStorage.setItem('forecast', JSON.stringify(resJsonForecast));

        dispatch({
          type: LOAD_WEATHER,
          payload: resJson,
          forecast: resJsonForecast.list
        });
      }).catch(err => {
        dispatch({
          type: LOAD_FAIL,
          payload: false
        });
      });

    }).catch(err => {
      return dispatch => {
        dispatch({
          type: LOAD_FAIL,
          payload: false
        });
      }
    });
  }

}

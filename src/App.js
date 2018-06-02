import React, { Component } from 'react';
import { loadWeather } from './actions';
import { connect } from 'react-redux';
import { Button, Card } from 'react-materialize';
// Styles
import './css/App.css';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const inputVal = e.target.city.value;

    this.props.loadWeather(inputVal);
  }
  forecastEngine() {
    let forecastFromLS = JSON.parse(localStorage.getItem('forecast'));
    console.log(forecastFromLS);
    let arr = [];
    let obj = {};
    let swtch = false;

    forecastFromLS.list.forEach((el) => {
      const t = new Date(el.dt * 1000).toString().split(' ')[0];
      console.log(t);

      if (obj[t] === undefined) {
        obj[t] = [];
        obj[t].push(el.main.temp);
      } else {
        obj[t].push(el.main.temp);
      }
    });

    /*
    Math.min(...array);
    Math.man(...array);

    Desired Result:
    obj = {
      Fri: {
        min: 123.4,
        max: 567.8
      },
      Mon: {
        min: 123.4,
        max: 567.8
      }
    }
    */


    console.log(obj);
    // return obj;
  }
  componentDidMount() {
    // Checks localStorage for 'weather' and updates if exists:
    let data = JSON.parse(localStorage.getItem('weather'));
    // if (localStorage.getItem('weather')) {
    //   this.props.loadWeather(data.name);
    // }
  }
  componentWillUnmount() {
    // Why don't these remove weather from localStorage!!
    // localStorage.clear();
    // localStorage.removeItem('weather');
  }
  render() {
    let city, forecast;

    // Handle incoming props.
    if (this.props.data.length > 0) {
      if (this.props.data[0].cod === "404" || this.props.data[0].cod === "400") {
        console.log(this.props.data[0].message);
      } else {
        city = this.props.data.map((el, i) => {
          return (
            <div key={i}>
              <div>
                <div className="city-name left-align">{el.name}</div>
                <div className="temp">{Math.round((el.main.temp * (9/5)) - 459.67)}&#8457;</div>
              </div>
              <div className="row z-depth-5">
                <div className="weather-image-container col s6">
                  <img className="weather-image" src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt={el.weather[0].main} />
                </div>
                <div className="description col s6">
                  <div className="description-box">
                    <div>
                      <div>{el.weather[0].description}</div>
                      <span>
                        high: {Math.round((el.main.temp_max * (9/5)) - 459.67)}
                      </span>
                      <span>&nbsp;</span>
                      <span>
                        low: {Math.round((el.main.temp_min * (9/5)) - 459.67)}
                      </span>
                      </div>
                    <div>wind: {el.wind.speed} mph</div>
                  </div>
                </div>
              </div>
            </div>
          )
        });

        forecast = this.props.forecast[0].map((el, i) => {
          // console.log(el);
          const t = new Date(el.dt * 1000).toString().split(' ');
          return (
            <li key={i}>
              <Card>
                <p>{t[0]}</p>
                {/*
                <div>{el.dt_txt}</div>
                */}
                <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt={el.weather[0].main} />
                <div>{Math.round((el.main.temp_max * (9/5)) - 459.67)}</div>
                <div>{Math.round((el.main.temp_min * (9/5)) - 459.67)}</div>
              </Card>
            </li>
          )
        });
      }
    }

    this.forecastEngine();

    return (
      <div className="App">
        <header className="App-header">

          <form className="city-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="city">
              {!this.props.status && <span>Get the Weather Forecast:</span>}
            </label>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="Enter your zip code (eg. 10012)" />
            <Button className="waves-effect waves-light btn-small blue lighten-2">Go</Button>
          </form>
        </header>

        <main>
          {this.props.data.length > 0 &&
            <div className="current-weather">
              {city}
            </div>
          }
        </main>
        <section>
          {this.props.forecast.length > 0 &&
            <div className="forecast-container">
              <div className="city-name center-align">5-day Forecast</div>
                <ul className="forecast">
                  {forecast}
                </ul>
            </div>
          }
        </section>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    data: state.data,
    forecast: state.forecast
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadWeather: city => dispatch(loadWeather(city, dispatch))
  }
};
const WeatherApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default WeatherApp;

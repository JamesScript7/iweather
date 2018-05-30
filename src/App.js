import React, { Component } from 'react';
import { loadWeather } from './actions';
import { connect } from 'react-redux';
import { Button, Card, Row, Col } from 'react-materialize';
// Styles
import './css/App.css';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const inputVal = e.target.city.value;
    this.props.loadWeather(inputVal);
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
    // Handle incoming props.
    let city;
    if (this.props.data.length > 0) {
      console.log(this.props.data[0]);

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
                    <div>{el.weather[0].description}</div>
                    <div>Wind: {el.wind.speed} mph</div>
                  </div>
                </div>
              </div>
            </div>
          )
        });
      }
    }

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

          {this.props.forecast.length > 0 &&
            <div className="forecast-container">
              <h4>5-day forecast</h4>
              <div className="forecast">
                <div>{this.props.data.length > 0 && city}</div>
                <div>{this.props.data.length > 0 && city}</div>
                <div>{this.props.data.length > 0 && city}</div>
                <div>{this.props.data.length > 0 && city}</div>
                <div>{this.props.data.length > 0 && city}</div>
              </div>
            </div>
          }
        </main>

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

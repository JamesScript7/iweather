import React, { Component } from 'react';
import { loadWeather } from './actions';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import Forecast from './components/Forecast';
import City from './components/City';
// Styles
import './css/App.css';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const inputVal = e.target.city.value;

    this.props.loadWeather(inputVal);
  }
  kelvinToFahrenheit(kelvin) {
    const absoluteZeroInFahrenheit = 459.67;
    return Math.round( (kelvin * (9/5)) - absoluteZeroInFahrenheit );
  }
  forecastEngine() {
    const forecastFromLS = JSON.parse(localStorage.getItem('forecast'));
    const result = [];
    const obj = {};
    let current = '';

    forecastFromLS.list.forEach((el, i) => {
      const t = new Date(el.dt * 1000).toString().split(' ')[0];

      function initializeKey() {
        current = t;
        obj[t] = {};
        obj[t].temp = [];
      }
      function updateObj() {
        obj[t].day = t;
        obj[t].temp.push(el.main.temp);
        obj[t].description = el.weather[0].description;
        obj[t].icon = el.weather[0].icon;
      }

      if (i === forecastFromLS.list.length - 1) {
        // Push current at end of the array.
        updateObj();
        obj[current].min = Math.min(...obj[current].temp);
        obj[current].max = Math.max(...obj[current].temp);

        result.push(obj[current]);
      } else if (i !== 0 && t === current) {
        // Continue to update temp array.
        updateObj();
      } else if (i !== 0 && t !== current) {
        // push to result because this means
        // we are on to the next day.
        obj[current].min = Math.min(...obj[current].temp);
        obj[current].max = Math.max(...obj[current].temp);

        result.push(obj[current]);
        initializeKey();
        updateObj();
      } else {
        // i === 0
        initializeKey();
        updateObj();
      }
    });

    return result;
  }
  componentDidMount() {
    // Checks localStorage for 'param' and updates if exists:
    const searchParam = localStorage.getItem('param');

    if (searchParam) {
      this.props.loadWeather(searchParam);
    }
  }
  componentWillUnmount() {
    // localStorage.clear();
    // localStorage.removeItem('weather');
    // localStorage.removeItem('forecast');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form className="city-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="city">
              {!this.props.status &&
                <span>Get the Weather Forecast:</span>
              }
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
          {(this.props.data.length > 0 && this.props.data[0].cod !== '400') &&
            <City
              data={this.props.data}
              kelvinToFahrenheit={this.kelvinToFahrenheit} />
          }
        </main>

        <section>
          {(this.props.forecast.length > 0 && this.props.forecast[0] !== undefined) &&
            <Forecast
              forecastEngine={this.forecastEngine}
              kelvinToFahrenheit={this.kelvinToFahrenheit} />
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

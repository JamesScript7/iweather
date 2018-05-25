import React, { Component } from 'react';
import { loadWeather } from './actions';
import { connect } from 'react-redux';
// Styles
import './css/App.css';

class App extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const inputVal = e.target.city.value;
    this.props.loadWeather(inputVal);
  }
  componentDidMount() {
    // check to see if weather is in localStorage
    // if so then update the page with the last data:
    let data = JSON.parse(localStorage.getItem('weather'));
    if (localStorage.getItem('weather')) {
      this.props.loadWeather(data.name);
    }
  }
  componentWillUnmount() {
    // These don't really remove weather from localStorage!!
    // localStorage.clear();
    // localStorage.removeItem('weather');
  }
  render() {
    // Handle incoming props.
    let city;

    if (this.props.data.length > 0) {
      console.log(this.props.data[0]);
      
      city = this.props.data.map((el, i) => {
        return <div key={i}>
          <h2>{el.name}</h2>
          <div>{Math.round((el.main.temp * (9/5)) - 459.67)} F</div>
          <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt={el.weather[0].main}/>
          <div>{el.weather[0].description}</div>
          <div>Wind speed: {el.wind.speed} mph</div>
        </div>
      });
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Get The Current Weather</h1>
          <form className="city-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="city"></label>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="Enter your city" />
            <input type="submit" value="Submit" />
          </form>
        </header>
        <div>{this.props.data.length > 0 && city}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    data: state.data
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

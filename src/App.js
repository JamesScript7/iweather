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
  getData() {
    const data = JSON.parse(localStorage.getItem('weather'));
    console.log('getData: ', data);
    // console.log(data.weather[0].description);

    // Display: name, temp, description, id, icon,

    // Data comes in Kelvin??
    // console.log(this.props.data[0].name);
    // console.log(this.props.data[0].weather[0].description);
  }
  componentDidMount() {
    // check to see if weather is in localStorage
    // if so then update the page with the last data

  }
  componentWillUnmount() {
    // This doesn't really remove weather from localStorage!!

    // To remove all keys:
    // localStorage.clear();
    localStorage.removeItem('weather');
  }
  render() {
    // Handle incoming props.
    console.log(this.props.data);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Get The Current Weather</h1>
        </header>

        <form className="city-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="city"></label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Enter your city" />
          <input type="submit" value="Submit" />
        </form>

        <input type="button" onClick={() => this.getData()} value="Data from localStorage"/>
        <div>{/* display weather information */}</div>
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

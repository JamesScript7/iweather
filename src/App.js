import React, { Component } from 'react';
import { loadWeather } from './actions';

// Styles
import './css/App.css';

class App extends Component {
  handleSubmit(e) {
    console.log(e);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Get The Current Weather</h1>
        </header>

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="city"></label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Enter your city" />
          <input type="submit" value="Submit" />
        </form>
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

import React, { Component } from 'react';
import { Button } from 'react-materialize';
// Styles
import './City.css';

class Search extends Component {
  render() {
    return (
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
    )
  }
}

export default Search;

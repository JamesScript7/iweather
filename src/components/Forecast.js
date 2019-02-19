import React, { Component } from 'react';
import { Card } from 'react-materialize';
// Styles
import './Forecast.css';

class Forecast extends Component {
  render() {
    return (
      <div className="forecast-container">
        <div className="city-name center-align">
          5-day Forecast
        </div>
        <ul className="forecast">
          {
            this.props.forecastEngine().map((el, i) => {
              const imgSrc = `https://openweathermap.org/img/w/${el.icon}.png`;

              if (this.props.forecastEngine().length === 5 || i !== 0) {
                return (
                  <li key={i}>
                    <Card>
                      <p>{el.day}</p>
                      <img src={imgSrc} alt={el.description} />
                      <div className="max-temp">{this.props.kelvinToFahrenheit(el.max)}</div>
                      <div>{this.props.kelvinToFahrenheit(el.min)}</div>
                    </Card>
                  </li>
                )
              } else {
                return null;
              }
            })
          }
        </ul>
      </div>
    )
  }
}

export default Forecast;

import React, { Component } from 'react';
// Styles
import './City.css';

class City extends Component {
  render() {
    return (
      <div className="current-weather">
        {
          this.props.data.map((el, i) => {
            const imgSrc = `http://openweathermap.org/img/w/${el.weather[0].icon}.png`;

            return (
              <div key={i}>
                <div>
                  <div className="city-name left-align">{el.name}</div>
                  <div className="temp">{this.props.kelvinToFahrenheit(el.main.temp)}&#8457;</div>
                </div>
                <div className="row z-depth-5">
                  <div className="weather-image-container col s6">
                    <img className="weather-image" src={imgSrc} alt={el.weather[0].main} />
                  </div>

                  <div className="description col s6">
                    <div className="description-box">
                      <div>
                        <div>{el.weather[0].description}</div>
                        <span>
                          high: {this.props.kelvinToFahrenheit(el.main.temp_max)}
                        </span>
                        <span>&nbsp;</span>
                        <span>
                          low: {this.props.kelvinToFahrenheit(el.main.temp_min)}
                        </span>
                      </div>
                      <div>wind: {el.wind.speed} mph</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default City;

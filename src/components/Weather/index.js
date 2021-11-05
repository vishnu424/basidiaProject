import {Component} from 'react'
import {v4} from 'uuid'

import Header from '../Header'
import NavigationSection from '../NavigationSection'

import './index.css'

class Weather extends Component {
  state = {
    statesData: [],
    currentState: '',
    weatherDetails: {},
  }

  componentDidMount() {
    this.getWeather()
    this.getStatesData()
  }

  getStatesData = async () => {
    const url = 'https://www.universal-tutorial.com/api/getaccesstoken'

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'api-token':
          'Ntawl8qttMYwqyCO0TLGI6d_HGJS9odfWdgL3iaMe1RnegP4e_s86Do4ihJ4_nSpnIY',
        'user-email': 'kapavishnuvardhanreddy@gmail.com',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const jwtToken = data.auth_token

    const url1 = 'https://www.universal-tutorial.com/api/states/India'

    const options1 = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json',
      },
    }

    const responseData = await fetch(url1, options1)

    const newData = await responseData.json()

    const updatedData = newData.map(each => ({
      id: v4(),
      state: each.state_name,
    }))
    console.log(updatedData)

    this.setState({statesData: updatedData})
  }

  getWeather = async () => {
    const {currentState} = this.state
    console.log(currentState)
    const url = `https://foreca-weather.p.rapidapi.com/current/102643743?alt=0&tempunit=C&windunit=MS&tz=india/${currentState}&lang=en`
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'foreca-weather.p.rapidapi.com',
        'x-rapidapi-key': '335f08af4fmsha97ca70b14f44f6p16e37djsn1cf2fe546b28',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedWeather = {
        temperature: data.current.temperature,
        humidity: data.current.relHumidity,
        pressure: data.current.pressure,
      }
      console.log(updatedWeather)
      this.setState({weatherDetails: updatedWeather})
    }
  }

  handleChange = event => {
    this.setState({currentState: event.target.value}, this.getWeather)
  }

  getStatesInput = () => {
    const {currentState, statesData} = this.state
    return (
      <select
        value={currentState}
        onChange={this.handleChange}
        className="select-state"
      >
        {statesData.map(option => (
          <option key={option.id} value={option.state}>
            {option.state}
          </option>
        ))}
      </select>
    )
  }

  render() {
    const {weatherDetails} = this.state
    const {temperature, humidity, pressure} = weatherDetails
    return (
      <div className="weather-bg">
        <NavigationSection activeTabId="WEATHER" />
        <Header />
        <p className="weather-heading">Weather</p>
        <div className="weather-container">
          <h1 className="select-state-heading">Select State</h1>
        </div>

        {this.getStatesInput()}
        <div className="weather-display">
          <hr className="vl1" />
          <hr className="vl2" />
        </div>
        <p className="temperature-heading">temparature</p>
        <p className="humidity-heading">Humidity</p>
        <p className="pressure-heading">Pressure</p>
        <h1 className="temperatureText">{temperature}</h1>
        <h1 className="humidityText">{humidity}</h1>
        <h1 className="pressureTexts">{pressure}</h1>
      </div>
    )
  }
}

export default Weather

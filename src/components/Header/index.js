import {Component} from 'react'

import usericon from '../../Assets/ProfileIcon/usericon.png'

import './index.css'

class Header extends Component {
  state = {
    currentDateTime: '',
  }

  componentDidMount() {
    this.timerID = setInterval(this.getDateAndTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  getDateAndTime = () => {
    const today = new Date()

    const hour = today.getHours()
    const minutes = today.getMinutes()
    const todayDate = today.getDate()

    const dayName = today.toString().split(' ')[0]
    const month = today.toString().split(' ')[1]

    const isAM = hour >= 12 ? 'PM' : 'AM'
    const hours = ((hour + 11) % 12) + 1

    const dateAndTime = `${dayName} ${todayDate} ${month} ${hours}:${minutes} ${isAM}`

    this.setState({currentDateTime: dateAndTime})
  }

  render() {
    const {currentDateTime} = this.state

    return (
      <div className="header-container">
        <p className="time-and-date">{currentDateTime}</p>
        <h1 className="user-profile-name">Wellcome Jhon</h1>
        <img className="profile-icon" src={usericon} alt="profile" />
      </div>
    )
  }
}

export default Header

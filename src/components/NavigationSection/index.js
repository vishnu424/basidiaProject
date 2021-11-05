import {Link} from 'react-router-dom'

import Logo from '../../Assets/WebsiteLogo/Logo.png'
import adduser from '../../Assets/AddUserImage/adduser.png'
import users from '../../Assets/UsersImage/users.png'
import weather from '../../Assets/WeatherImage/weather.png'

import './index.css'

const NavigationSection = props => {
  const {activeTabId} = props

  const addUserClass =
    activeTabId === 'ADDUSER' ? 'selectedAddUserTab' : 'AddUserTab '

  const usersClass = activeTabId === 'USERS' ? 'selectedUsersTab' : 'UsersTab'

  const weatherClass =
    activeTabId === 'WEATHER' ? 'selectedWeatherTab' : 'WeatherTab'

  return (
    <div className="navigation-section">
      <img className="websitelogo" src={Logo} alt="" />
      <hr className="hrLine" />
      <Link className="LinkItem" to="/add-user">
        <li className={addUserClass}>
          <img className="adduser-image" src={adduser} alt="" />
          <p className="AdduserTabText">Add User</p>
        </li>
      </Link>

      <Link className="LinkItem" to="/users">
        <li className={usersClass}>
          <img className="users-image" src={users} alt="" />
          <p className="usersTabText">Users</p>
        </li>
      </Link>

      <Link className="LinkItem" to="/weather">
        <li className={weatherClass}>
          <img className="weather-image" src={weather} alt="" />
          <p className="weatherTabText">Weather </p>
        </li>
      </Link>
    </div>
  )
}

export default NavigationSection

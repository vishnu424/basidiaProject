import {Component} from 'react'
import {v4} from 'uuid'

import NavigationSection from '../NavigationSection'
import Header from '../Header'

import './index.css'

class AddUser extends Component {
  state = {
    statesData: [],
    usernameInput: '',
    emailInput: '',
    phoneInput: '',
    dobInput: '',
    stateInput: '',
    emailErr: false,
    phoneErr: false,
  }

  componentDidMount() {
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

  onChangeUsename = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangeEmail = event => {
    const input = event.target.value
    this.setState({emailInput: event.target.value})
    if (!input.includes('@gmail.com')) {
      this.setState({emailErr: true})
    } else {
      this.setState({emailErr: false})
    }
  }

  onChangePhone = event => {
    const input = event.target.value
    this.setState({phoneInput: event.target.value})
    const numLength = input.length
    if (numLength < 10) {
      this.setState({phoneErr: true})
    } else {
      this.setState({phoneErr: false})
    }
  }

  onChangeDob = event => {
    this.setState({dobInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {
      usernameInput,
      emailInput,
      phoneInput,
      dobInput,
      stateInput,
    } = this.state
    const newUser = {
      id: v4(),
      username: usernameInput,
      email: emailInput,
      phone: phoneInput,
      DOB: dobInput,
      state: stateInput,
    }

    const user = JSON.parse(localStorage.getItem('usersList'))
    if (user) {
      const newdata = [...user, newUser]
      localStorage.setItem('usersList', JSON.stringify(newdata))
    } else {
      const newdata = [newUser]
      localStorage.setItem('usersList', JSON.stringify(newdata))
    }

    this.setState({
      usernameInput: '',
      emailInput: '',
      phoneInput: '',
      dobInput: '',
      stateInput: '',
    })
  }

  handleChange = event => {
    this.setState({stateInput: event.target.value})
  }

  renderAddUserForm = () => {
    const {
      statesData,
      usernameInput,
      emailInput,
      phoneInput,
      dobInput,
      emailErr,
      phoneErr,
      stateInput,
    } = this.state

    return (
      <form onSubmit={this.onSubmitForm} className="form-container">
        <div>
          <p className="usernameLabel labelLaptop ">Username</p>
          <input
            value={usernameInput}
            className="usernameInput inputLaptop"
            type="text"
            onChange={this.onChangeUsename}
          />
        </div>

        <div>
          <p className="emailLabel  labelLaptop ">Email</p>
          <input
            value={emailInput}
            className="emailInput inputLaptop"
            type="text"
            onChange={this.onChangeEmail}
          />
          {emailErr && (
            <p className="emailErrMsg inputLaptop">Enter valid email id</p>
          )}
        </div>

        <div>
          <p className="phoneLabel  labelLaptop ">Phone</p>
          <input
            value={phoneInput}
            className="phoneInput inputLaptop"
            type="tel"
            onChange={this.onChangePhone}
          />
          {phoneErr && (
            <p className="inputLaptop phoneErrMsg">
              Enter a valid phone number(10 digits)
            </p>
          )}
        </div>
        <div>
          <p className="DOBLabel  labelLaptop ">DOB</p>
          <input
            value={dobInput}
            className="DOBInput inputLaptop"
            type="date"
            onChange={this.onChangeDob}
          />
        </div>
        <div>
          <p className="stateLabel  labelLaptop ">State</p>
          <select
            value={stateInput}
            onChange={this.handleChange}
            className="stateInput inputLaptop"
          >
            {statesData.map(option => (
              <option key={option.id} value={option.state}>
                {option.state}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submitButton inputLaptop">
          Create User
        </button>
      </form>
    )
  }

  render() {
    return (
      <div className="add-users-bgcontainer">
        <NavigationSection activeTabId="ADDUSER" />
        {this.renderAddUserForm()}
        <Header />
        <p className="form-heading">Add User</p>
      </div>
    )
  }
}

export default AddUser

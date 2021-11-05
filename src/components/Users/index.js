import {Component} from 'react'

import NavigationSection from '../NavigationSection'
import Header from '../Header'
import UserDetailsCardView from '../UserDetailsCardView'
import UserDetailsListView from '../UserDetailsListView'
import searchicon from '../../Assets/SearchIcon/searchicon.png'

import './index.css'

class Users extends Component {
  state = {
    usersData: [],
    currentCardId: '',
    currentListId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const {searchInput} = this.state
    const users = JSON.parse(localStorage.getItem('usersList'))
    console.log(users)
    if (users !== null) {
      const FilteredData = users.filter(each =>
        each.username.includes(searchInput),
      )
      this.setState({usersData: FilteredData})
    }
  }

  onClickCardItem = id => {
    this.setState({currentCardId: id})
  }

  onClickListItem = id => {
    this.setState({currentListId: id})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getData)
  }

  renderUsers = () => {
    const {usersData, searchInput, currentCardId, currentListId} = this.state
    return (
      <div className="users-container">
        <p className="search-heading">Search</p>
        <input
          value={searchInput}
          onChange={this.onChangeSearchInput}
          placeholder="Search user by name.."
          className="search-input"
          type="search"
        />
        <p className="cardsHeading">CardView</p>
        <ul className="cardListContainer">
          {usersData.map(each => (
            <UserDetailsCardView
              currentCardId={currentCardId}
              onClickCardItem={this.onClickCardItem}
              user={each}
              key={each.id}
            />
          ))}
        </ul>
        <p className="cards-list-heading">ListView</p>
        <ul className="listViewContainer">
          {usersData.map(each => (
            <UserDetailsListView
              currentListId={currentListId}
              onClickListItem={this.onClickListItem}
              user={each}
              key={each.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {usersData} = this.state
    console.log(usersData)
    return (
      <div className="user-bg">
        <NavigationSection activeTabId="USERS" />

        <Header />
        <p className="users-heading">Users</p>
        {this.renderUsers()}
        <img className="searchIcon" src={searchicon} alt="search" />
      </div>
    )
  }
}
export default Users

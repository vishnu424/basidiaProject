import usericon from '../../Assets/ProfileIcon/usericon.png'
import menu from '../../Assets/MenuIcon/menu.png'

import './index.css'

const UserDetailsListView = props => {
  const {user, currentListId, onClickListItem} = props
  const {username, id, DOB, state} = user

  const onClickList = () => {
    onClickListItem(id)
  }

  const listClass = id === currentListId ? 'selectedlistItem' : 'listItem'

  return (
    <li onClick={onClickList} className={listClass}>
      <div className="listProfileDetails">
        <img className="listProfileIcon" src={usericon} alt="profileIcon" />
        <p className="listProfileInfo">{`${username}--${DOB}--${state}`}</p>
      </div>
      <img src={menu} alt="profile" />
    </li>
  )
}

export default UserDetailsListView

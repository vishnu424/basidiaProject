import usericon from '../../Assets/ProfileIcon/usericon.png'

import './index.css'

const UserDetailsCardView = props => {
  const {user, onClickCardItem, currentCardId} = props
  const {username, DOB, id, state} = user

  const onClickCard = () => {
    onClickCardItem(id)
  }

  const cardClass = id === currentCardId ? 'selectedCardItem' : 'cardItem'

  return (
    <li className={cardClass} onClick={onClickCard}>
      <img className="profileIcon" src={usericon} alt="usericon" />
      <div className="profileDetails">
        <p>{username}</p>
        <p>{DOB}</p>
        <p>{state}</p>
      </div>
    </li>
  )
}

export default UserDetailsCardView

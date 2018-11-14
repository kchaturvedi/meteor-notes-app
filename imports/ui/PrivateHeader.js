import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const PrivateHeader = (props) => {
  return (
    <nav className='navbar navbar-expand-lg bg-info'>
      <div className='container'>
        <a className='navbar-brand'>{props.title}</a>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav justify-content-end'>
            <li className='nav-item'>
              <a className='nav-link' onClick={() => props.handleLogout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  handleNavToggle: React.PropTypes.func.isRequired,
  isNavOpen: React.PropTypes.bool.isRequired
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivateHeader)

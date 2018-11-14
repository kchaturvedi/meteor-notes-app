import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom'

import {routes, onAuthChange} from '../imports/routes/routes'
import '../imports/startup/simple-schema-config.js'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  const currentPagePrivacy = Session.get('currentPagePrivacy')
  
  onAuthChange(isAuthenticated, currentPagePrivacy)
})

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Session.set('isNavOpen', false)
  
  if (selectedNoteId && browserHistory.getCurrentLocation().pathname.startsWith('/dashboard')) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }
})

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen')
  
  document.body.classList.toggle('is-nav-open', isNavOpen)
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  Session.set('isNavOpen', false)
  ReactDOM.render(routes, document.getElementById('app'))
})

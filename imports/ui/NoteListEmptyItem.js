import React from 'react'
import moment from 'moment'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

export default NoteListEmptyItem = () => {
  return (
    <p className='empty-item'>Create a note to get started</p>
  )
}
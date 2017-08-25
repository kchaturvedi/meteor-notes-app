import React from 'react'
import moment from 'moment'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

export default NoteListEmptyItem = () => {
  return (
    <div>
      <h5>No notes</h5>
    </div>
  )
}
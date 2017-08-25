import React from 'react'
import moment from 'moment'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

export default NoteListItem = (props) => {
  return (
    <div>
      <h5>{ props.note.title || 'Untitled note' }</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired
}
import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import { Notes } from '../api/notes'

export const PublicViewer = (props) => {
  if (props.note) {
    return (
      <div className='page-content'>
        <div className='editor'>
          <input className='editor__title' value={props.note.title} placeholder='Untitled note' readOnly/>
          <textarea className='editor__body' value={props.note.body} placeholder='Your note here' readOnly></textarea>
        </div>
      </div>
    )
  } else {
    return (
      <div className='page-content'>
        <div className='editor'>
          <p className='editor__message'>Note not found. The author might have deleted it or the link might have expired.
          </p>
        </div>
      </div>
    )
  }
}

PublicViewer.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string
}

export default createContainer(() => {
  Meteor.subscribe('notes')
  const selectedNoteId = Session.get('selectedNoteId')
  const note = Notes.findOne(selectedNoteId)
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
  }
}, PublicViewer)

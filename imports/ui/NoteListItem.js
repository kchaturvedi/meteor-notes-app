import React from 'react'
import moment from 'moment'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListItem = (props) => {
  const className = props.note.selected ? 'list-group-item-info' : ''
  return (
    <a href='#' className={'list-group-item list-group-item-action flex-column align-items-start ' + className} onClick={() => {
      props.Session.set('selectedNoteId', props.note._id)
    }}>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1 mt-0'>{ props.note.title || 'Untitled note' }</h5>
        <small className='mt-2' style={{ color: 'inherit' }}>{ moment(props.note.updatedAt).format('M/DD/YY') }</small>
      </div>
      <small className='text-muted' style={{ color: 'inherit' }}>{ props.note.isPublic ? 'PUBLIC' : undefined }</small>
    </a>
  )
}

NoteListItem.propTypes = {
  note: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  return { Session }
}, NoteListItem)

import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import { Notes } from '../api/notes'

export const PublicViewer = (props) => {
  if (props.note) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='container'>
            <div className='card note-card' style={{ height: '69.8vh' }} >
              <div className='card-body' style={{ overflow: 'scroll' }}>
                <form className='form'>
                  <input id='note-title' type='text' className='form-control' style={{ backgroundColor: 'white' }} value={props.note.title} placeholder='Hello world' readOnly />
                  <textarea id='note-body' type='textarea' className='form-control mh-100 mt-2' rows='26' style={{ backgroundColor: 'white' }} value={props.note.body} placeholder='Something inspiring should go here...' readOnly />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <div className='container'>
            <div className='card note-card' style={{ height: '69.8vh' }}>
              <div className='card-body'>
                <h5 className='display-5 text-center'>
                  Note not found. The author might have deleted it or the link might have expired.
                </h5>
              </div>
            </div>
          </div>
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
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  }
}, PublicViewer)

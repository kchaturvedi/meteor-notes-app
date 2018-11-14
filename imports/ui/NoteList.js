import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'
import FlipMove from 'react-flip-move'

import { Notes } from '../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = (props) => {
  return (
    <div className='card' style={{ height: '70vh' }}>
      <NoteListHeader />
      <div className='container text-center'>
        <button type='button' className='btn btn-light' onClick={() => {
          props.meteorCall('notes.insert', (err, res) => {
            if (res) {
              props.Session.set('selectedNoteId', res)
            }
            if (err) { }
          })
        }}>Create Note</button>
      </div>

      <div className='list-group list-group-flush mh-100' style={{ overflow: 'scroll' }}>
        {props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
        <FlipMove enterAnimation='none' leaveAnimation='accordionVertical' maintainContainerHeight staggerDelayBy={50} staggerDurationBy={50}>
          {props.notes.map((note, i) => {
            return <NoteListItem key={note.updatedAt} note={note} index={i} />
          })}
        </FlipMove>
      </div>
    </div>
  )
}

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  Meteor.subscribe('notes')

  return {
    meteorCall: Meteor.call,
    Session,
    notes: Notes.find({}, {
      sort: { updatedAt: -1 }
    }).fetch().map((note) => {
      return { ...note, selected: note._id === selectedNoteId }
    })
  }
}, NoteList)

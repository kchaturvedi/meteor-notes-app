import React from 'react'
// import { Meteor } from 'meteor/meteor'
// import { createContainer } from 'meteor/react-meteor-data'

export default (props) => {
  return (
    <div className='card-header card-header-text card-header-info mb-3'>
      <div className='card-text text-center'>
        <h4 className='card-title'>Notes</h4>
      </div>
    </div>
  )
}
//
// NoteListHeader.propTypes = {
//   meteorCall: React.PropTypes.func.isRequired,
//   Session: React.PropTypes.object.isRequired
// }
//
// export default createContainer(() => {
//   return {
//     meteorCall: Meteor.call
//   }
// }, NoteListHeader)

import React from 'react'

import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList'
import Editor from './Editor'

export default () => {
  return (
    <div>
      <PrivateHeader title='Notes' />
      <div className='container'>
        <div className='space-70' />
        <div className='row'>
          <div className='col-lg-3'>
            <NoteList />
          </div>
          <div className='col-lg-9'>
            <Editor />
          </div>
        </div>
      </div>
    </div>
  )
}

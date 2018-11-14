import React from 'react'
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import { Notes } from '../api/notes'

export class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      isPublic: false,
      deleteConfirm: false
    }
  }

  handleBodyChange (e) {
    const body = e.target.value
    this.setState({ body, deleteConfirm: false })
    this.props.call('notes.update', this.props.note._id, { body })
  }

  handleTitleChange (e) {
    const title = e.target.value
    this.setState({ title, deleteConfirm: false })
    this.props.call('notes.update', this.props.note._id, { title })
  }

  handleDeleteNote (e) {
    e.preventDefault()
    if (this.state.deleteConfirm) {
      const notecard = document.querySelector('.note-card')
      notecard.style.animationDuration = '0.5s'
      notecard.classList.add('animated', 'fadeOutDown')
      setTimeout(() => {
        this.props.call('notes.remove', this.props.note._id)
        this.props.browserHistory.push('/dashboard')
        this.setState({ deleteConfirm: false })
        notecard.classList.remove('animated', 'fadeOutDown')
      }, 500)
    } else {
      this.setState({ deleteConfirm: true })
    }
  }

  handlePrivacyChange (e) {
    const isPublic = !!e.target.checked
    this.setState({ isPublic })
    this.props.call('notes.update', this.props.note._id, { isPublic })
  }

  handleCopy () {
    const linkArea = document.querySelector('#note-link')
    linkArea.select()
    document.execCommand('copy')
    const linkAreaLink = linkArea.value
    linkArea.value = 'LINK COPIED!'
    linkArea.setAttribute('style', 'background-color:#9bc99d; transition: all 0.5s ease;')
    linkArea.classList.add('animated', 'tada')
    setTimeout(() => {
      linkArea.value = linkAreaLink
      linkArea.setAttribute('style', 'background-color:white; transition: all 0.5s ease;')
      linkArea.classList.remove('animated', 'tada')
    }, 1000)
  }

  componentDidUpdate (prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body,
        isPublic: this.props.note.isPublic,
        deleteConfirm: false
      })
    }
  }

  render () {
    const deleteButtonClass = this.state.deleteConfirm ? 'btn-warning' : 'btn-light'

    if (this.props.note) {
      return (
        <div className='card note-card' style={{ height: '69.8vh' }} >
          <div className='card-body' style={{ overflow: 'scroll' }}>
            <form className='form has-info'>
              <input id='note-title' type='text' className='form-control' value={this.state.title} placeholder='Untitled note' onChange={this.handleTitleChange.bind(this)} />
              <textarea id='note-body' type='textarea' className='form-control mh-100 mt-2' rows='24' value={this.state.body} placeholder='Write something inspiring...' onChange={this.handleBodyChange.bind(this)} />
            </form>
          </div>
          <div className='card-footer pb-4'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-lg-2 text-center'>
                  <button className={'btn btn-md ' + deleteButtonClass} onClick={this.handleDeleteNote.bind(this)}>
                    {this.state.deleteConfirm ? 'Sure ?' : 'Delete'}
                  </button>
                </div>
                <div className='col-lg-2 text-center'>
                  <div className='togglebutton pt-4'>
                    <label>
                      <input type='checkbox' checked={this.state.isPublic} onChange={this.handlePrivacyChange.bind(this)} />
                      <span className='toggle' />
                      <h6>{this.state.isPublic ? 'Public' : 'Private'}</h6>
                    </label>
                  </div>
                </div>
                <div className='col-lg-4 text-center'>
                  {
                    this.state.isPublic ? <input className={'form-control text-center'} style={{ backgroundColor: 'white' }} id='note-link' value={`${window.location.origin}/${this.props.note._id}`} onClick={this.handleCopy.bind(this)} readOnly /> : undefined
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='card note-card' style={{ height: '69.8vh' }}>
          <div className='card-body'>
            <h5 className='display-5 text-center'>
              { this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note' }
            </h5>
          </div>
        </div>
      )
    }
  }
}

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  }
}, Editor)

import React from 'react'
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

import { Notes } from '../api/notes'

export class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      isPublic: false,
      deleteConfirm: false
    }
  }
  
  handleBodyChange(e) {
    const body = e.target.value
    this.setState({ body, deleteConfirm: false })
    this.props.call('notes.update', this.props.note._id, { body })
  }
  
  handleTitleChange(e) {
    const title = e.target.value
    this.setState({ title, deleteConfirm: false })
    this.props.call('notes.update', this.props.note._id, { title })
  }
  
  handleDeleteNote() {
    if (this.state.deleteConfirm) {
      this.props.call('notes.remove', this.props.note._id)
      this.props.browserHistory.push('/dashboard')
      this.setState({ deleteConfirm: false })
    } else {
      this.setState({ deleteConfirm: true })
    }
  }
  
  handlePrivacyChange(e) {
    const isPublic = !!e.target.checked
    this.setState({ isPublic })
    this.props.call('notes.update', this.props.note._id, { isPublic })
  }
  
  handleCopy() {
    const linkArea = document.querySelector('.editor__link')
    linkArea.select()
    document.execCommand('copy')
    const linkAreaLink = linkArea.value
    linkArea.value = 'LINK COPIED!'
    linkArea.setAttribute('style', 'background-color:#13C920; transition: all 0.5s ease;');
    setTimeout(() => {
      linkArea.value = linkAreaLink
      linkArea.setAttribute('style', 'background-color:white; transition: all 0.5s ease;');
    }, 500)
  }
  
  componentDidUpdate(prevProps, prevState) {
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
  
  render() {
    const deleteButtonClass = this.state.deleteConfirm ? 'button button--warning editor__delete' : 'button button--secondary editor__delete'
    
    if (this.props.note) {
      return (
        <div className='editor'>
          <input className='editor__title' value={this.state.title} placeholder='Untitled note' onChange={this.handleTitleChange.bind(this)}/>
          <textarea className='editor__body' value={this.state.body} placeholder='Your note here' onChange={this.handleBodyChange.bind(this)}></textarea>
          <div className='editor__toolbar'>
            <button className={deleteButtonClass} onClick={this.handleDeleteNote.bind(this)}>{this.state.deleteConfirm ? 'Confirm delete?' : 'Delete Note'}</button>
            <div className='onoffswitch editor__privacy'>
              <input type='checkbox' name='onoffswitch' className='onoffswitch-checkbox' id='myonoffswitch' checked={this.state.isPublic} onChange={this.handlePrivacyChange.bind(this)}></input>
              <label className='onoffswitch-label' htmlFor='myonoffswitch'>
                <span className='onoffswitch-inner'></span>
                <span className='onoffswitch-switch'></span>
              </label>
            </div>
            {
              this.state.isPublic ? <input className='editor__link' value={`${window.location.origin}/${this.props.note._id}`} onClick={this.handleCopy.bind(this)} readOnly></input> : undefined
            }
          </div>
        </div>
      )
    } else {
      return (
        <div className='editor'>
          <p className='editor__message'>
            { this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note' }
          </p>
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

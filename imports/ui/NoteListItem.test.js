import React from 'react'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { mount } from 'enzyme'

import NoteListItem from './NoteListItem'

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    
    it('should render title and timestamp', function () {
      const title = 'My Title'
      const updatedAt = 1503679581631
      const wrapper = mount( <NoteListItem note={{title, updatedAt}}/> )
      
      expect(wrapper.find('h5').text()).toBe(title)
      expect(wrapper.find('p').text()).toBe('8/25/17')
    })
    
    it('should set default title if not title set', function () {
      const title = ''
      const updatedAt = 1503679581631
      const wrapper = mount( <NoteListItem note={{title, updatedAt}}/> )
      
      expect(wrapper.find('h5').text()).toBe('Untitled note')
    })
  })
}
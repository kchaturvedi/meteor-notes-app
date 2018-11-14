import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import moment from 'moment'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

export const Notes = new Mongo.Collection('notes')

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({ $or: [{ userId: this.userId }, { isPublic: true }] })
  })
}

Meteor.methods({
  'notes.insert' () {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    return Notes.insert({
      _id: shortid.generate(),
      title: '',
      body: '',
      userId: this.userId,
      isPublic: false,
      updatedAt: moment().valueOf()
    })
  },
  'notes.remove' (_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })
    Notes.remove({ _id, userId: this.userId })
  },
  'notes.update' (_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      isPublic: {
        type: Boolean,
        optional: true
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    })
    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    })
  }
})

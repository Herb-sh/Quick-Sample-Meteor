import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

NoteItems = new Mongo.Collection('noteitems');


if( Meteor.isClient ){
  Meteor.subscribe('notes');
}

/**
* Template onCreated
*/
Template.notes.helpers({
  notes() {
      return NoteItems.find();
  }
});

/**
* Events
*/
Template.notes.events({
  'submit #noteForm'(event, instance){

    const newNote = event.target.noteInputNew.value;

    if (Meteor.isServer) {
       Meteor.call('addNote', newNote);
    }

    event.target.noteInputNew.value = "";
    event.preventDefault();

  }
});


/****************************
*  Server Code *
*******************************/
if( Meteor.isServer ){

  Meteor.publish('notes', function() {
      return NoteItems.find();
  })

  Meteor.methods({
     addNote : function( newNote ){
       NoteItems.insert({
             'label' : newNote,
             'time' : Date.now(),
             'userId' : Meteor.userId()
       })
     }
  });
}

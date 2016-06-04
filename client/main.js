// import { Meteor } form 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

NoteItems = new Mongo.Collection('noteitems');

/**
* Template onCreated
*/
Template.notes.helpers({
  notes() {
      return NoteItems.find({});
  },
});

/**
* Events
*/
Template.notes.onCreated(function(){
    Meteor.subscribe('notes');
});

Template.notes.events({
  'submit #noteForm'(event, instance){

    const newNote = event.target.noteInputNew.value;

    Meteor.call('notes.insert', newNote);

    event.target.noteInputNew.value = "";
    event.preventDefault();

  },
  'click .remove-note' : function(){

     Meteor.call('notes.remove', this )

  }
});

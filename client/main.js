// import { Meteor } form 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

NoteItems = new Mongo.Collection('noteitems');

// Router.configure({
//   layoutTemplate : 'app'
// });

Router.route('/', {
    name : 'home',
    template: 'home',
    data: function(){
        console.log(this.params);
    }
});

Router.route('/noteopen/:new/:note_id', function(){
  this.render('noteopen');

  console.log( this.params.new );
  console.log( this.params.note_id );

});

Router.route('/notelist', {
    name : 'notelist',
    template : 'notelist'
})




/**
* Template onCreated
*/
Template.notelist.onCreated(function(){
  /* important for server note item changes */
    Meteor.subscribe('notes');
});

/** Template helpers */
Template.notelist.helpers({
  notes() {
      return NoteItems.find({});
  },
  isOwner() {
    return this.owner === Meteor.userId();
  }
});


/** Template events */
Template.notelist.events({
  'submit #noteForm'(event, instance){
    const newNote = event.target.noteTitle.value;
    /* calls server methos 'notes.insert' passing newNote as argument */
    Meteor.call('notes.insert', newNote);

    event.target.noteTitle.value = "";
    event.preventDefault();
  },
  'click .remove-note' : function(){
     Meteor.call('notes.remove', this )
  },
  'click .edit-note' : function(){
    console.log( "Edit", this );
  }
});

/**
*  @Author Herbi Shtini
*/
// import { Meteor } form 'meteor/meteor';
import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

NoteItems = new Mongo.Collection('noteitems');


Router.route('/', {
    name : 'home',
    template: 'home',
    data: function(){
        // console.log(this.params);
    }
});

Router.route('/noteopen/:new/:note_id', function(){
  this.render('noteopen');

  // console.log( this.params.new );
  // console.log( this.params.note_id );

});

Router.route('/notelist', {
    name : 'notelist',
    template : 'notelist'
});


Template.registerHelper("prettifyDate", function(timestamp) {
    let date = new Date(timestamp)

    let dateFormat = `${moment(date).format("MM.DD.YYYY")}`;

    return dateFormat;
});
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

Template.noteopen.helpers({
   noteActive() {

       var noteId = Router.current().params.note_id;

       return NoteItems.findOne( { _id : noteId } );

   }
});

/** Template events */
Template.notelist.events({

  'click .remove-note' : function(){
     Meteor.call('notes.remove', this )
  },
  'click .edit-note' : function(){
    console.log( "Edit", this );
  }
});

Template.noteopen.helpers({
  routeParams(){
    console.log(this, Router.current().route.path(this))
    return Router.current().route.path(this);
  }
})

Template.noteopen.events({
  'submit #noteForm'(event, instance){
    var title = event.target.noteInputNew.value;
    var content = event.target.noteContent.value;

    var newNote = { title, content };

     var noteIsNew = !!Number(Router.current().params.new);
     var noteId = Router.current().params.note_id;
    console.log( noteIsNew, noteId );

    console.log("note is new?", noteIsNew );

    if( noteIsNew ){
      Meteor.call('notes.insert', newNote);
    }else{
      if(noteId && noteId !== "-1"){
        Meteor.call('notes.update', noteId, newNote);
      }else{
        console.error( "No valid id provided" );
      }

    }

    Router.go('/notelist');
    event.preventDefault();
  }
})

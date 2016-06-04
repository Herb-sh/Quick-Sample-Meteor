// import { Meteor } from 'meteor/meteor';

NoteItems = new Mongo.Collection('noteitems');

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('notes', function() {
    return NoteItems.find({});
})

Meteor.methods({
  // 'notes.insert'
    'notes.insert' : function( newNote ){

     console.log( Meteor.userId() );
     // Make sure the user is logged in before inserting a task
     NoteItems.insert({
           'label' : newNote,
           'time' : Date.now(),
           'userId' : Meteor.userId()
     });

   },
   'notes.update' : function(){

   },
   'notes.remove' : function( item ){
     console.log("remove")
      NoteItems.remove( item._id )
   }
});

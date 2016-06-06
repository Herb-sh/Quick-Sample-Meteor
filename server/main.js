// import { Meteor } from 'meteor/meteor';

NoteItems = new Mongo.Collection('noteitems');


Meteor.publish('notes', function() {
    return NoteItems.find({
      $or : [
        { userId : this.userId }
      ]
    });
})

Meteor.methods({
    'notes.insert' : function( newNote ){

      // console.log('notes.insert');
      // console.log(newNote);

      var titlee = newNote.title;
      var contentt = newNote.content;

     NoteItems.insert({
           title :titlee,
           content : contentt,
           'time' : Date.now(),
           'userId' : Meteor.userId()
     });

   },
   'notes.update' : function( id, note ){
    //  console.log("server",id, note);
      NoteItems.update( id, { $set : { title : note.title, content : note.content, time : Date.now() }} );
   },
   'notes.remove' : function( item ){
      NoteItems.remove( item._id )
   }
});

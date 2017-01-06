import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if(Meteor.isClient){
    // client code goes here
  }

  if(Meteor.isServer){
  // server code goes here
}

Template.todos.helpers({
  'todo': function(){
    return Todos.find({}, {sort: {createdAt: -1}});
  }
});

Template.addTodo.events({
  'submit form': function(event){
    event.preventDefault();
    var todoName = $('[name="todoName"]').val();
    Todos.insert({
      name: todoName,
      note: 0,
      completed: false,
      createdAt: new Date()
    });
    $('[name="todoName"]').val('');
  }
});

Template.todoItem.events({
  'click button.plus': function(event) {
    event.preventDefault();
    Todos.update(this._id, {
      $set: {note: this.note + 1}
    });
  },
  
  'click button.min': function(event) {
    event.preventDefault();
    Todos.update(this._id, {
      $set: {note: this.note - 1}
    });
  },

  'click .delete-todo': function(event) {
    event.preventDefault();
    var documentId = this._id;
    var confirm = window.confirm("Delete this task?");
    if(confirm){
      Todos.remove({ _id: documentId });
    }
  },

  'click [name=todoItem]': function(event){
    prev_val = $(event.target).val();
  },

  'keyup [name=todoItem]': function(event) {
    if(event.which === 13) {
      var documentId = this._id;
      var todoItem = $(event.target).val();
      Todos.update({ _id: documentId }, {$set: { name: todoItem }});
      $(event.target).blur();
    } else if (event.which === 27) {
      $(event.target).val(prev_val);
      $(event.target).blur();
    }
  },

  'click button.done': function() {
    Todos.find().fetch();
    var documentId = this._id;
    var isCompleted = this.completed;
    if(isCompleted){
        Todos.update({ _id: documentId }, {$set: { completed: false }});
        console.log("Task marked as incomplete.");
    } else {
        Todos.update({ _id: documentId }, {$set: { completed: true }});
        console.log("Task marked as complete.");
      }
    }
  });

  Template.todoItem.helpers({
    'checked': function(){
      var isCompleted = this.completed;
      if(isCompleted){
          return "checked";
      } else {
          return "";
      }
      }
});
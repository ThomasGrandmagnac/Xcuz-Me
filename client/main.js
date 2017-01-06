import { Template } from 'meteor/templating';
import {Accounts} from 'meteor/accounts-base';
import './main.html';


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.todoItem.helpers({
  'activeUser': function () {
    if (Meteor.user() !== null) {
      if (Meteor.user().username == this.username) {
        return true;
      } else {
        return false;
      }
    }
  }
});

Template.todoItem.helpers({
  'activeUser': function () {
    if (Meteor.user() !== null) {
      if (Meteor.user().username == this.username) {
        return true;
      } else {
        return false;
      }
    }
  }
});

Template.todos.helpers({
  'todo': function(){
    return Todos.find({}, {sort: {createdAt: -1}});
  }
});

Template.addTodo.events({
  'submit form': function(event){
    event.preventDefault();
    let todo = $('[name="todoName"]');
    let todoName = todo.val();
    Todos.insert({
      name: todoName,
      note: 0,
      completed: false,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
    todo.val('');
    todo.blur();
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

  'click .delete-todo': function (event) {
    event.preventDefault();
    let documentId = this._id;
    Todos.remove({_id: documentId})
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

  'focusout [name=todoItem]': function(event) {
      $(event.target).val(prev_val);
      $(event.target).blur();
  },

  'click button.done': function() {
    Todos.find().fetch();
    var documentId = this._id;
    var isCompleted = this.completed;
    if(isCompleted){
        Todos.update({ _id: documentId }, {$set: { completed: false }});
    } else {
        Todos.update({ _id: documentId }, {$set: { completed: true }});
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
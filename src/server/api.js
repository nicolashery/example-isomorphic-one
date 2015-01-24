var Immutable = require('immutable');
var express = require('express');
var db = require('./db');

var api = express.Router();

function contactNotFoundResponse() {
  return {
    error: {
      name: 'ContactNotFound',
      message: 'No contact found for given id'
    }
  };
}

api.get('/contacts', function(req, res) {
  res.json(db.getContacts());
});

api.post('/contacts', function(req, res) {
  contact = Immutable.fromJS(req.body);
  var contact = db.addContact(contact);
  res.status(201).json(contact);
});

api.get('/contacts/:id', function(req, res) {
  var id = req.params.id;
  var updates = Immutable.fromJS(req.body);
  var contact = db.getContact(id);
  if (!contact) {
    return res.status(404).json(contactNotFoundResponse());
  }
  return res.json(contact);
});

api.put('/contacts/:id', function(req, res) {
  var id = req.params.id;
  var updates = Immutable.fromJS(req.body);
  var contact = db.updateContact(id, updates);
  if (!contact) {
    return res.status(404).json(contactNotFoundResponse());
  }
  return res.json(contact);
});

api.delete('/contacts/:id', function(req, res) {
  var id = req.params.id;
  var contact = db.deleteContact(id);
  if (!contact) {
    return res.status(404).json(contactNotFoundResponse());
  }
  return res.sendStatus(200);
});

api.all('*', function(req, res) {
  return res.status(400).json({
    error: {
      name: 'BadUrl',
      message: 'No endpoint for given URL'
    }
  });
});

module.exports = api;

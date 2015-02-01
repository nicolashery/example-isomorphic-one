var Immutable = require('immutable');
var express = require('express');
var db = require('./db');

var api = express.Router();

api.post('/signin', function(req, res) {
  var credentials = Immutable.fromJS(req.body);
  if (credentials.get('username') === 'joe@example.com' &&
      credentials.get('password') === 'password1') {
    var token = db.createSession();
    return res.json({token: token});
  }
  else {
    return res.status(401).json({
      error: {
        name: 'BadCredentials',
        message: 'Wrong username or password'
      }
    });
  }
});

api.post('/signout', function(req, res) {
  var token = req.header('Authorization');
  if (token) {
    db.revokeSession(token);
  }
  return res.sendStatus(200);
});

function validateTokenMiddleware(req, res, next) {
  var token = req.header('Authorization');
  if (!(token && db.checkSession(token))) {
    return res.status(401).json({
      error: {
        name: 'InvalidToken',
        message: 'Must provide valid auth token in Authorization header'
      }
    });
  }
  next();
}

api.use(validateTokenMiddleware);

// Check if auth token is a valid session
api.get('/session', function(req, res) {
  res.sendStatus(200);
});

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
  var contact = Immutable.fromJS(req.body);
  contact = db.addContact(contact);
  res.status(201).json(contact);
});

api.get('/contacts/:id', function(req, res) {
  var id = req.params.id;
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

api.get('/contacts/:id/messages', function(req, res) {
  var contactId = req.params.id;
  var messages = db.getMessagesForContact(contactId);
  if (!messages) {
    return res.status(404).json(contactNotFoundResponse());
  }
  // return res.json(messages);
  setTimeout(function() {
    res.json(messages);
  }, 1000);
});

api.post('/contacts/:id/messages', function(req, res) {
  var contactId = req.params.id;
  var message = Immutable.fromJS(req.body);
  message = db.addMessageForContact(contactId, message);
  if (!message) {
    return res.status(404).json(contactNotFoundResponse());
  }
  return res.json(message);
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

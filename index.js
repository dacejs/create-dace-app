'use strict';

const createDace = require('./lib');
const messages = require('./lib/messages');

module.exports = {
  messages: messages,
  createDaceApp: createDace,
};

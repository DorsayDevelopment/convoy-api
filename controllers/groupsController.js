const
  Group = require('../models/Group'),
  db = require('../db');

exports.createGroup = async data => {
  let group = new Group(data.name);
  try {
    let result = await group.create();
    return group;
  } catch(err) {
    return `Error saving group: ${err.message}`;
  }
};
const
  User = require('../models/User'),
  db = require('../db');

exports.createUser = async function(data) {
  let user = new User();
  user.username = data.username;
  user.password = data.password;
  try {
    let result = await user.save();
    return user;
  } catch(err) {
    return `Error saving user: ${err.message}`;
  }
};

exports.deleteUser = async function(id) {
  await db.query(`delete from user where id = ${id};`);
  return 'user probably deleted';
};

exports.getUserById = async function(id) {
  var rows = await db.query(`select * from users where id = ${id};`);
  let row = rows.rows[0];
  if(!row) return 'no users found';
  return new User({
    username: row.username,
    id: row.id
  });
};

exports.getUsers = async function() {
  var result = await db.query(`select id, username from users;`);
  return result.rows;
};

exports.login = async function(username, password) {

};


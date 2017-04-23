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
    console.log(err.message);
    return `Error saving user: ${err.message}`;
  }
};

exports.deleteUser = async function(id) {
  console.log('deleting user');
  await db.query(`delete from user where id = ${id};`);
  return 'user probably deleted';
};

exports.getUserById = async function(id) {
  var rows = await db.query(`select * from users where id = ${id};`);
  let row = rows.rows[0];
  let user = new User();
  console.log(row)
  user.username = row.username;
  user.id = row.id;
  return user;
};

exports.getUsers = async function() {
  var result = await db.query(`select * from users;`);
  return result.rows;
};
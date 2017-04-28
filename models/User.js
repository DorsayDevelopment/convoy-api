const 
  db = require('../db'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

const SALT_ROUNDS = 2;
const SECRET = 'secret';

class User {
  constructor(username, password) {
    this.id;
    this.username = username;
    this.password = password;
    this.token;
  }

  async create() {
    let exists = await this._exists();
    if(!exists) {

      this.password = await User.hashPassword(this.password, SALT_ROUNDS);
      
      let result = await db.query(`insert into users (username, password) values ('${this.username}', '${this.password}') returning id;`);
      this.id = result.rows[0].id;
      return 'user created';

    } else throw new Error('User already exists');
  }

  async save() {
    let result = await db.query(`
        update users set token = '${this.token}', username = '${this.username}'
        where id = '${this.id}';
    `);
    return;
  }

  async _exists() {
    let result = await db.query(`select * from users where username = '${this.username}';`);
    return result.rowCount > 0;
  }

  update() {
    console.log('update the user');
  }

  delete() {
    console.log('delete the user');
  }

  static async findByUsername(username) {
    let result = await db.query(`select id, username, password from users where username = '${username}';`);
    if(result.rows.length != 1) return null;
    result = result.rows[0];
    let user = new User();
    user.id = result.id;
    user.username = result.username;
    user.password = result.password;
    return user;
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  async setJwt(token) {
    this.token = jwt.sign({
      id: this.id
    }, SECRET, { expiresIn: '1M' });
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }
}

module.exports = User;
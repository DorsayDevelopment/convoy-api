const 
  db = require('../db'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

const SALT_ROUNDS = 20000;
const SECRET = 'secret';

class User {
  constructor(username, password) {
    this.id;
    this.username = username;
    this.password = password;
  }

  async save() {
    let exists = await this._exists();
    if(!exists) {

      this.password = await hashPassword(this.password, SALT_ROUNDS);
      
      let result = await db.query(`insert into users (username, password) values ('${this.username}', '${this.password}') returning id;`);
      this.id = result.rows[0].id;
      return 'user created';

    } else throw new Error('User already exists');
  }

  async _exists() {
    let result = await db.query(`select * from users where username = '${this.username}';`);
    console.log(result)
    return result.rowCount > 0;
  }

  update() {
    console.log('update the user');
  }

  delete() {
    console.log('delete the user');
  }

  static async findByUsername(username) {
    let result = await db.query(`select username, password from users where username = '${this.username};`);
    return result;
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  async setJwt(token) {
    jwt.sign({
      id: this.id
    }, SECRET, { expiresIn: '1M' });
  }
}

async function hashPassword(password) {
  this.password = bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = User;
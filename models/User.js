const db = require('../db');

class User {
  constructor() {
    this.id;
    this.username;
    this.password;
  }

  async save() {
    let exists = await this.exists();
    if(!exists) {
      
      let result = await db.query(`insert into users (username, password) values ('${this.username}', '${this.password}') returning id;`);
      this.id = result.rows[0].id;
      return 'user created';

    } else throw new Error('User already exists');
  }

  async exists() {
    let result = await db.query(`select * from users where username = '${this.username}';`);
    return result.rowCount > 0;
  }

  update() {
    console.log('update the user');
  }

  delete() {
    console.log('delete ther user');
  }
}

module.exports = User;
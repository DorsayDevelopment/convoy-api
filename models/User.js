const db = require('../db');

class User {
  constructor() {
    this.id;
    this.username;
    this.password;
  }

  async save() {
    try {
      if(await !this.exists()) {
        let result = await db.query(`insert into users (username, password) values ('${this.username}', '${this.password}') returning id;`);
        if(result.rowCount == 1) {
          this.id = result.rows[0].id;
          return 'user created';
        } else throw new Error('Malformed query or missing mandatory field');
      } else throw new Error('User already exists');
    } catch(err) {
      return `Error inserting user: ${err.message}`;
    }
  }

  async exists() {
    console.log(`checking to see if ${this.username} already exists`);
    let result = db.query(`select * from users where username = '${this.username}';`);
    if(result.rowCount > 0) return true;
    else return false;
  }

  update() {
    console.log('update the user');
  }

  delete() {
    console.log('delete ther user');
  }
}

module.exports = User;
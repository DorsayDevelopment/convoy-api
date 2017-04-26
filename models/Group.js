const db = require('../db');

class Group {
  constructor(name) {
    this.id;
    this.name = name;
    this.members; // array of member ids
    this.origin; // place id
    this.destination; // place id
  }

  async save() {
      
    let result = await db.query(`insert into places (name) values ('${this.name}') returning id;`);
    this.id = result.rows[0].id;
    return 'group created';

  }
}

module.exports = User;
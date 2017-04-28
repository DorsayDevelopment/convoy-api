const db = require('../db');

class Group {
  constructor(name) {
    this.id;
    this.name = name;
    this.origin; // place id
    this.destination; // place id
  }

  async create() {
    let result = await db.query(`
      insert into groups (name)
      values ('${this.name}')
      returning id;
    `);
    this.id = result.rows[0].id;
    return 'group created';
  }

  async addMember(userId) {
    let result = await db.query(`
      insert into group_users (group_id, user_id)
      values ('${this.id}', '${userId}')
      returning id;
    `);
    return;
  }

  async removeMember(userId) {
    let result = await db.query(`
      delete from group_users where group_id = ${this.id} and user_id = ${userId};
    `);
    return;
  }

  async getMembers() {
    let result = await db.query(`
      select users.id, users.username from users
      join group_users on users.id = group_users.user_id
    `);
    let users = result.rows.map(row => {
      console.log(row);
    });
    return;
  }
}

module.exports = Group;
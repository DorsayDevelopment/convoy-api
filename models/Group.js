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
    // TODO: add primary key constraint migration for group_id and user_id
    let result = await db.query(`
      insert into group_users (group_id, user_id)
      values ('${this.id}', '${userId}')
      ON CONFLICT (group_id, user_id) DO NOTHING;
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
    return result.rows.map(row => row);
  }

  static async getGroupById(groupId, userId) {
    let result = await db.query(`
      select id, name, origin, destination from groups where id in
        (select group_id from group_users where user_id = ${userId} and group_id = ${groupId});
    `);
    if(result.rows.length === 0) return null;
    let row = result.rows[0];
    let group = new Group();
    group.id = row.id;
    group.name = row.name;
    group.origin = row.origin;
    group.destination = row.destination;
    return group;
  };

  static async addMember(groupId, userId) {
    let result = await db.query(`
      insert into group_users (group_id, user_id)
      values ('${groupId}', '${userId}');
    `);
  }
}

module.exports = Group;

// select groups.id as group_id, groups.name as group_name, users.id as user_id, users.username from groups
//       left join group_users on group_users.group_id = groups.id
//       left join users on users.id = group_users.user_id
//       where groups.id = ${id};
const
  Group = require('../models/Group'),
  db = require('../db');

/**
 * Create a group and add requesting user as a member
 * 
 * Create a group object then in a different query create a
 * group_user object with the created group's and requesting user's id
 * 
 * @param {object} data - data to be used to create a new group
 * @param {integer} userId - id of the requesting user
 */
exports.createGroup = async (data, userId) => {
  let group = new Group(data.name);
  
  try {
    let result = await group.create();
    group.addMember(userId);
    return group;
  } catch(err) {
    return `Error saving group: ${err.message}`;
  }
};

/**
 * Fetch groups in which the user is a member of
 * @param {integer} userId - id of the user making the request
 */
exports.getGroups = async userId => {
  let result = await db.query(`
    select id, name from groups where id in 
	    (select group_id from group_users where user_id = ${userId});
  `);
  return result.rows;
};

/**
 * Fetch a group and it's members
 * @param {integer} groupId - id of the group to fetch. user must be a member
 * @param {integer} userId - id of the user making the request
 */
exports.getGroupById = async (groupId, userId) => {
  let group = await Group.getGroupById(groupId, userId);
  if(group === null) return 'not authorized to access group';
  group.members = await group.getMembers();
  return group;
};

/**
 * Add a member to a group
 * 
 * Use this method when the group is not already in memory
 * This method uses the static version of {@link Group#addMember}
 * @param {integer} groupId - id of the group to add a member to
 * @param {integer} userId - id of the user to add as a member of the group
 * @param {integer} requestingUserId - id of the requesting user; used to verify user is allowed to add members
 */
exports.addMember = async (groupId, userId, requestingUserId) => {
  let group = await Group.getGroupById(groupId, requestingUserId);
  if(group === null) return 'not authorized to add members to group';
  let result = await group.addMember(userId);
  return 'user added to group';
};
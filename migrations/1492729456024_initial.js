exports.up = function(pgm) {

  pgm.createType('place_type', [
    'origin',
    'destination',
    'waypoint'
  ]);

  pgm.createTable('users', {
    id: 'id',
    username: 'text',
    password: 'text',
    tokens: 'text[]'
  });

  pgm.createTable('group', {
    id: 'id',
    name: 'text',
    origin: 'integer',
    destination: 'integer'
  });

  pgm.createTable('group_user', {
    id: 'id',
    group_id: 'integer',
    user_id: 'integer'
  });

  pgm.createTable('place', {
    id: 'id',
    name: 'text',
    lat: 'double',
    lng: 'double',
    type: 'place_type'
  });

};

exports.down = function(pgm) {
  pgm.dropTable('users');
  pgm.dropTable('place');
  pgm.dropTable('group');
  pgm.dropTable('group_user');
  pgm.dropType('place_type');
};

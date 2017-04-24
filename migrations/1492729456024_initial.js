exports.up = function(pgm) {

  pgm.createType('place_type', [
    'origin',
    'destination',
    'waypoint'
  ]);

  pgm.createTable('users', {
    id: 'id',
    username: 'text',
    password: 'text'
  });

  pgm.createTable('groups', {
    id: 'id',
    name: 'text',
    members: 'integer[]',
    places: 'integer[]'
  });

  pgm.createTable('places', {
    id: 'id',
    name: 'text',
    lat: 'double',
    lng: 'double',
    type: 'place_type'
  });

};

exports.down = function(pgm) {
  pgm.dropTable('users');
  pgm.dropTable('places');
  pgm.dropTable('groups');
  pgm.dropType('place_type');
};

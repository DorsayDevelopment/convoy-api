exports.up = function(pgm) {
  pgm.createTable(
    'users',
    {
      id: 'id',
      username: 'text',
      password: 'text'
    }
  )
};

exports.down = function(pgm) {
  pgm.dropTable('users');
};

const 
  gulp = require('gulp'),
  util = require('gulp-util'),
  exec = require('child_process').exec,
  path = require('path');

// This is config management until I get around to docker, probably
const dbConnection = 'postgres://postgres:root@localhost:5432/convoy';
// const dbConnection = 'postgres://brycen:dorsay@localhost:5432/convoy';

gulp.task('set-dev-database-url', function() {
  return process.env.DATABASE_URL = dbConnection;
});

gulp.task('migrate', ['set-dev-database-url'], function(cb) {
  const migrationCommand = path.normalize('./node_modules/.bin/pg-migrate') + ' up';
  exec(migrationCommand, (err, stdout, stderr) => cb());
});

gulp.task('down', ['set-dev-database-url'], function(cb) {
  const migrationCommand = path.normalize('./node_modules/.bin/pg-migrate') + ' down';
  exec(migrationCommand, (err, stdout, stderr) => cb());
});
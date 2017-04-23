const 
  gulp = require('gulp'),
  util = require('gulp-util'),
  exec = require('child_process').exec,
  path = require('path');  

gulp.task('set-dev-database-url', function() {
  return process.env.DATABASE_URL = 'postgres://postgres:root@localhost:5432/convoy';
});

gulp.task('migrate', ['set-dev-database-url'], function(cb) {
  const migrationCommand = path.normalize('./node_modules/.bin/pg-migrate') + ' up';
  exec(migrationCommand, (err, stdout, stderr) => cb());
});
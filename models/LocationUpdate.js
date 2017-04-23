const db = require('../db');

class LocationUpdate {

  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
    this.elevation;
    this.speed;
  }
}

module.exports = LocationUpdate;
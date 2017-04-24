const db = require('../db');

class Place {
  constructor(name) {
    this.id;
    this.lat;
    this.long;
    this.name;
    this.type; // place_type enum type
  }

  async sendLocationUpdates() {

  }
}

module.exports = Place;
const db = require('../db');

class Group {
  constructor(name) {
    this.id;
    this.name = name;
    this.members; // array of member ids
    this.origin; // place id
    this.destination; // place id
  }

  async sendLocationUpdates() {

  }
}

module.exports = User;
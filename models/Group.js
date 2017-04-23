const db = require('../db');

class Group {
  constructor(name) {
    this.id;
    this.name = name;
    this.members;
    this.stops;
    this.start;
    this.end;
  }

  async sendLocationUpdates() {

  }
}

module.exports = User;
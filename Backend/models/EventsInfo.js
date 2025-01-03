const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  eventname: {
    type: String,
  },
  likedusers: {
    type: Array,
  },
  registeredusers: {
    type: Array,
  },
} ); 

const EventInfo = mongoose.model('EventInfo', EventInfoSchema);

module.exports = EventInfo;

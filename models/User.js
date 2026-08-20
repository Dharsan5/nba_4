const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  bloodgroup: { type: String, required: true },
  gender: { type: String, required: true },
  birthdate: { type: Date, required: true },
  weight: { type: Number, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true },
  district: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String },
  donations: { type: String, default: '0' },
  received: { type: String, default: '0' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

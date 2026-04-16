const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    // Password is only required if they are signing up via "local" strategy
    required: function() {
      return this.authProvider === 'local';
    }
  },
  phone: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  address: {
    city: String,
    state: String,
    pincode: String,
    fullAddress: String,
  },
  // OAuth elements
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  googleId: {
    type: String
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true,
});

// Pre-save hook for password hashing
userSchema.pre('save', async function() {
  // Bypassing hook if no password is being modified or if there is no password at all
  if (!this.isModified('password') || !this.password) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

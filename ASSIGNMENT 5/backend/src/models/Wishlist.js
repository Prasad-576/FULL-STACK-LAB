const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{
    type: String, // String or ObjectId, depends on how products are stored
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Wishlist', wishlistSchema);

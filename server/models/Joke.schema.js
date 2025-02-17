const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true },
  active: { type: Boolean, required: true, default: false }, 
});

const voterSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  type: { type: String, required: true, enum: ['like', 'love', 'laugh'] },
  votedAt: { type: Date, default: Date.now },
});

const jokeSchema = new mongoose.Schema(
  {
    answer: { type: String, required: true },
    question: { type: String, required: true },

    votes: {
      type: [voteSchema],
      required: true,
      default: [
        { value: 0, label: 'like', active: false },
        { value: 0, label: 'love', active: false },
        { value: 0, label: 'laugh', active: false },
      ],
    },

    availableVotes: { type: [String], required: true, default: ['like', 'love', 'laugh'] },

    votesList: { type: [voterSchema], default: [] },
  },
  { timestamps: true, versionKey: false },
);

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;

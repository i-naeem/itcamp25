const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true },
});

const jokeSchema = new mongoose.Schema(
  {
    answer: { type: String, required: true },
    question: { type: String, required: true },

    votes: {
      type: [voteSchema],
      required: true,
      default: [
        { value: 0, label: 'like' },
        { value: 0, label: 'love' },
        { value: 0, label: 'laugh' },
      ],
    },

    availableVotes: { type: [String], required: true, default: ['like', 'love', 'laugh'] },
  },
  { timestamps: true, versionKey: false },
);

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;

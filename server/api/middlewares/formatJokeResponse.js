/**
 * @file formatJokeResponse.js
 * @description Middleware that formats the joke response by modifying the 'active' property
 * for all votes the user has cast based on their IP address. The middleware ensures that
 * multiple active votes can be tracked and removes the voters list from the response.
 *
 * @author Naeem (@i-naeem)
 * @created 2025-02-17
 * @modified 2025-02-17
 */

const formatJokeResponse = (req, res, next) => {
  if (!res.locals.joke) {
    return next();
  }

  const userIp = req.ip;
  const joke = res.locals.joke;

  // Get all vote types the user has cast
  const userVotes = joke.votesList.filter((vote) => vote.ipAddress === userIp).map((vote) => vote.type);

  // Mark all votes the user has cast as active
  joke.votes = joke.votes.map((vote) => ({
    ...vote,
    active: userVotes.includes(vote.label) ? 1 : 0,
  }));

  /**
   * For security reasons, we do not send the list of voters as it contains IP addresses.
   */
  joke.votesList = [];

  res.json(joke);
};

module.exports = formatJokeResponse;

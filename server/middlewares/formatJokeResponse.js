/**
 * @file formatJokeResponse.js
 * @description Middleware that formats the joke response by modify the 'active' property
 * to the user's vote based on their IP address. The user's active vote is determined
 * and applied to the joke's votes list, and also removes the voters list from the response.
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

  const activeVote = joke.votesList?.find((vote) => vote.ipAddress === userIp)?.type;
  joke.votes = joke.votes.map((vote) => ({ ...vote, active: vote.label === activeVote ? 1 : 0 }));

  /**
   * For security reason we do not send the list of voters as it contains the IP addresses.
   */
  joke.votesList = [];

  res.json(joke);
};

module.exports = formatJokeResponse;

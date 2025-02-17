const formatJokeResponse = (req, res, next) => {
  if (!res.locals.joke) {
    return next();
  }

  const userIp = req.ip;
  const joke = res.locals.joke;
  const activeVote = joke.votesList?.find((v) => v.ipAddress === userIp)?.type;
  
  joke.votes = joke.votes.map((vote) => {
    if (vote.label === activeVote) {
      return {
        ...vote,
        active: 1,
      };
    }
    return {
      ...vote,
      active: 0,
    };
  });

  joke.votesList = [];

   res.json(joke);
};

module.exports = formatJokeResponse;

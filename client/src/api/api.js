const getRandomJoke = async () => {
  let response = await fetch('http://localhost:3000/api/joke');
  return await response.json();
};

export default { getRandomJoke };

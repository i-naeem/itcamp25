const getRandomJoke = async () => {
  let response = await fetch('http://localhost:3000/api/joke');
  return await response.json();
};

const voteJoke = async (data) => {
  try {
    let { id, content } = data;

    let response = await fetch(`http://localhost:3000/api/joke/${id}`, {
      method: 'POST',
      body: JSON.stringify( content ),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error voting joke:', error);
    return { success: false, error: error.message };
  }
};

export default { getRandomJoke, voteJoke };

# Voting Game - Daily Emoji Jokes

A fun web application where users can vote on daily jokes using emojis! Think of it as "Daily News" but with emoji reactions.

## Project Overview

This project consists of two main parts:

1. **Frontend (React):**  
   - **Joke Display:**  
     - Shows random jokes in a question & answer format.
     - Displays emoji reactions with vote counts.
     - Includes a "Next Joke" button for smooth navigation.
   - **Voting System:**  
     - Users can vote using emoji reactions.
     - Vote counts update instantly via API interaction.
     - **Bonus:** Each joke maintains its own vote history.
   - **User Interface:**  
     - Modern, clean design built using plain CSS (or optionally with Tailwind CSS or Mantine).
     - **Bonus:** Mobile-responsive design.
   - **State Management:**  
     - Handles jokes and votes using React state.
     - Communicates with the backend using the fetch API.
     - **Bonus:** Implements React Context for session management and React Query for data fetching.

2. **Backend (Node.js API):**  
   - **Data Storage:**  
     - Uses MongoDB to store jokes and their vote counts.
     - **Bonus:** Configured with Express and CORS.
   - **API Endpoints:**  
     - **GET  /api/joke**  → Fetch a random joke.
     - **POST /api/joke/:id**  → Submit a vote.
     - **DELETE /api/joke/:id**  → Delete a joke.
     - **UPDATE /api/joke/:id**  → Update the content of a joke.
   - **Data Structure:**  

     ```json
     {
       "id": "unique_joke_id",
       "question": "Why did the developer go broke?",
       "answer": "Because he used up all his cache!",
       "votes": [
         { "value": 10, "label": "😂" },
         { "value": 5,  "label": "👍" },
         { "value": 3,  "label": "❤️" }
       ],
       "availableVotes": ["😂", "👍", "❤️"]
     }
     ```

   - **Key Features:**  
     - Tracks votes per joke.
     - Supports multiple emoji reactions.
     - Validates incoming votes.

## Success Criteria

- **App Functionality:**  
  - Displays a joke with the ability to vote using emoji reactions.
  - Allows smooth navigation between jokes using a "Next Joke" button.
- **User Experience:**  
  - Provides a clean and intuitive interface.
  - Ensures mobile responsiveness and a modern look & feel.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/i-naeem/itcamp25.git
   cd voting-game
   ```

2. **Install Frontend Dependencies:**

   ```bash
   cd client
   yarn install
   ```

3. **Install Backend Dependencies:**

   ```bash
   cd ../server
   yarn install
   ```

4. **Configure Environment Variables:**  
  Create `.env` according to the given samples.

5. **Run the Backend:**

   ```bash
   npm start
   # or using yarn
   yarn start
   ```

6. **Run the Frontend:**

   ```bash
   cd ../client
   yarn start
   ```

### Usage

- Open your browser and navigate to `http://localhost:8080` (or the port specified by your frontend).
- Enjoy voting on jokes with emoji reactions and navigating between different jokes.

## Deployment

- The application can be deployed on platforms supporting Node.js and static file hosting for the React frontend (e.g., Heroku, Vercel, Netlify).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **TeeHee Joke API:** For providing the joke data.
- Special thanks to everyone who contributed to this project!

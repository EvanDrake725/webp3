import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import "./Games.css";

const API_URL = "https://zelda.fanapis.com/api/games";

const Games = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundGames, setFoundGames] = useState([]);
  const [message, setMessage] = useState("");
  const [showNintendo, setShowNintendo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      setGames(data.data || []);
    } catch (error) {
      setMessage("Unable to load games.");
    } finally {
      setLoading(false);
    }
  };

  const searchGame = async () => {
    const search = searchTerm.trim();

    if (!search) {
      setMessage("Please enter a game title.");
      setFoundGames([]);
      return;
    }

    try {
      setMessage("");

      const response = await fetch(
        `${API_URL}?name=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      const results = data.data || [];

      setFoundGames(results);

      if (results.length === 0) {
        setMessage("No game found. Try another title.");
      }
    } catch (error) {
      setFoundGames([]);
      setMessage("Unable to search for games.");
    }
  };

  const filteredGames = showNintendo
    ? games.filter((game) =>
        (game.developer || "")
          .toLowerCase()
          .includes("nintendo")
      )
    : games;

  return (
    <div className="games-container">
      <h1>The Legend of Zelda Game Database</h1>

      <p className="subtitle">
        Explore games from the Zelda universe!
      </p>

      <button onClick={fetchGames}>
        Get Games
      </button>

      <button onClick={() => setShowNintendo(!showNintendo)}>
        {showNintendo ? "Show All Games" : "Nintendo Games Only"}
      </button>

      <div className="search">
        <input
          type="text"
          placeholder="Search for a Zelda game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={searchGame}>
          Search
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {foundGames.length > 0 && (
        <div>
          <h2>Search Results</h2>

          <div className="game-list">
            {foundGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading Zelda games...</p>
      ) : (
        <>
          <h2>Available Games ({filteredGames.length})</h2>

          <div className="game-list">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Games;
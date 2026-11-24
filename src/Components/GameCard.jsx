const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <h2>{game.name}</h2>

      <p>
        <strong>Developer:</strong>{" "}
        {game.developer || "Unknown"}
      </p>

      <p>
        <strong>Publisher:</strong>{" "}
        {game.publisher || "Unknown"}
      </p>

      <p>
        <strong>Release Date:</strong>{" "}
        {game.released_date || "Unknown"}
      </p>

      <p className="game-description">
        {game.description || "No description available."}
      </p>
    </div>
  );
};

export default GameCard;

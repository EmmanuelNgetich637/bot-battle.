import React from "react";

function BotCollection({ bots, onBotClick }) {
  return (
    <div>
      <h2>Bot Collection</h2>
      {bots.map((bot) => (
        <div key={bot.id} onClick={() => onBotClick(bot)}>
          <p>{bot.name}</p>
        </div>
      ))}
    </div>
  );
}

export default BotCollection;

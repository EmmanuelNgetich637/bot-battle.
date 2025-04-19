import React from "react";

function YourBotArmy({ bots }) {
  return (
    <div>
      <h2>Your Bot Army</h2>
      {bots.map((bot) => (
        <div key={bot.id}>
          <p>{bot.name}</p>
        </div>
      ))}
    </div>
  );
}

export default YourBotArmy;

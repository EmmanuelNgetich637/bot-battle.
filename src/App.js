import React, { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

const botsData = [
  {
    id: 1,
    name: "Bot-A",
    health: 100,
    damage: 30,
    armor: 50,
    image: "/bot-a.png",
    type: "Tank",
    description: "A strong frontline bot that absorbs damage."
  },
  {
    id: 2,
    name: "Bot-B",
    health: 80,
    damage: 40,
    armor: 40,
    image: "/bot-b.png",
    type: "Assault",
    description: "Fast and deadly with high burst damage."
  },
  {
    id: 3,
    name: "Bot-C",
    health: 90,
    damage: 25,
    armor: 60,
    image: "/bot-c.png",
    type: "Support",
    description: "Heals allies and provides defensive boosts."
  }
];

const typeColors = {
  Tank: "#ff6b6b",
  Assault: "#feca57",
  Support: "#1dd1a1"
};

function App() {
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortBy, setSortBy] = useState("name");

  const availableBots = botsData.filter(bot => !army.some(b => b.id === bot.id));

  const sortedBots = (list) => {
    return [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b[sortBy] - a[sortBy];
    });
  };

  const addToArmy = (bot) => setArmy([...army, bot]);
  const removeFromArmy = (botId) => setArmy(army.filter(bot => bot.id !== botId));

  const openModal = (bot) => setSelectedBot(bot);
  const closeModal = () => setSelectedBot(null);

  const cardStyle = {
    background: "#1e1e1e",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    border: "1px solid #444",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  };

  return (
    <div style={{ color: "#fff", background: "#111", minHeight: "100vh", padding: "2rem" }}>
      <h1>Your Bot Army</h1>
      {army.length === 0 ? <p>No bots in your army yet.</p> : null}
      {sortedBots(army).map(bot => (
        <motion.div
          key={bot.id}
          style={cardStyle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => removeFromArmy(bot.id)}
        >
          <img src={bot.image} alt={bot.name} width="80" />
          <div>
            <h2>{bot.name}</h2>
            <p>❤️ Health: {bot.health}</p>
            <p>💥 Damage: {bot.damage}</p>
            <p>🛡️ Armor: {bot.armor}</p>
            <p style={{ color: typeColors[bot.type], fontWeight: "bold" }}>{bot.type}</p>
          </div>
        </motion.div>
      ))}

      <h1>Bot Collection</h1>

      <label>Sort by: </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginBottom: "20px" }}>
        <option value="name">Name</option>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>

      {sortedBots(availableBots).map(bot => (
        <motion.div
          key={bot.id}
          style={cardStyle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => openModal(bot)}
        >
          <img src={bot.image} alt={bot.name} width="80" />
          <div>
            <h2>{bot.name}</h2>
            <p>❤️ Health: {bot.health}</p>
            <p>💥 Damage: {bot.damage}</p>
            <p>🛡️ Armor: {bot.armor}</p>
            <p style={{ color: typeColors[bot.type], fontWeight: "bold" }}>{bot.type}</p>
          </div>
        </motion.div>
      ))}

      <Modal isOpen={!!selectedBot} onRequestClose={closeModal} style={{
        content: {
          background: "#222", color: "#fff", padding: "2rem", maxWidth: "400px", margin: "auto"
        }
      }}>
        {selectedBot && (
          <>
            <h2>{selectedBot.name}</h2>
            <img src={selectedBot.image} alt={selectedBot.name} width="100" />
            <p>{selectedBot.description}</p>
            <p>❤️ Health: {selectedBot.health}</p>
            <p>💥 Damage: {selectedBot.damage}</p>
            <p>🛡️ Armor: {selectedBot.armor}</p>
            <p style={{ color: typeColors[selectedBot.type], fontWeight: "bold" }}>{selectedBot.type}</p>
            <button onClick={() => {
              addToArmy(selectedBot);
              closeModal();
            }}>Add to Army</button>
            <button onClick={closeModal} style={{ marginLeft: "10px" }}>Close</button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default App;

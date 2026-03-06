import { useState } from "react";
import "./App.css";

const pokemons = [
  { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
  { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
  { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
  { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
  { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
  { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
  { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
  { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
  { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
  { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
  { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
  { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
  { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
  { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
  { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
  { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
  { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
  { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
  { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
  { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
];

const typeColors = {
  Grass: "#5dab52",
  Fire: "#f87a33",
  Water: "#4d90d5",
  Electric: "#e5c531",
  Psychic: "#f45e80",
  Normal: "#9298a4",
  Ghost: "#5269ac",
  Dragon: "#4f60e2",
  Fighting: "#ce4265",
  Rock: "#c5b78c",
};

const typeIcons = {
  Grass: "🌿",
  Fire: "🔥",
  Water: "💧",
  Electric: "⚡",
  Psychic: "🔮",
  Normal: "⭐",
  Ghost: "👻",
  Dragon: "🐉",
  Fighting: "🥊",
  Rock: "🪨",
};

function PokemonCard({ pokemon }) {
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const color = typeColors[pokemon.type] || "#9298a4";

  return (
    <div className="card" style={{ borderColor: color }}>
      <div className="card-header" style={{ background: color }}>
        <span className="card-name">{pokemon.name}</span>
        <span className="card-hp">HP {pokemon.hp}</span>
      </div>
      <div className="card-image" style={{ background: color + "22" }}>
        <img src={spriteUrl} alt={pokemon.name} />
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-number">#{String(pokemon.id).padStart(3, "0")}</span>
          <span className={`type-badge type-${pokemon.type.toLowerCase()}`}>{pokemon.type}</span>
        </div>
        <div className="stat">
          <span>HP</span>
          <div className="stat-bar">
            <div className="stat-fill hp" style={{ width: `${(pokemon.hp / 160) * 100}%` }}></div>
          </div>
          <span>{pokemon.hp}</span>
        </div>
        <div className="stat">
          <span>ATK</span>
          <div className="stat-bar">
            <div className="stat-fill atk" style={{ width: `${(pokemon.attack / 134) * 100}%` }}></div>
          </div>
          <span>{pokemon.attack}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeType, setActiveType] = useState("All");

  const types = ["All", ...new Set(pokemons.map((p) => p.type))];

  const filteredPokemons =
    activeType === "All"
      ? pokemons
      : pokemons.filter((p) => p.type === activeType);

  return (
    <>
      <div className="pokedex-outer">

        {/* Title + filters above the screen */}
        <h1>Pokédex</h1>
        <div className="filters">
          <button
            className={`filter-all ${activeType === "All" ? "active" : ""}`}
            onClick={() => setActiveType("All")}
          >
            All Pokémon
          </button>
          <div className="filter-types">
            {types.filter((t) => t !== "All").map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`filter-type ${activeType === type ? "active" : ""}`}
                style={{ "--type-color": typeColors[type] }}
              >
                <span style={{ fontSize: "1.2rem" }}>{typeIcons[type]}</span>
                <span>{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Screen: cards only */}
        <div className="screen-bezel">
          <div className="screen-indicators">
            <div className="screen-dot"></div>
            <div className="screen-dot"></div>
          </div>
          <div className="screen">
            <div className="grid">
              {filteredPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </div>
          <div className="screen-bottom">
            <div className="screen-btn"></div>
            <div className="screen-speaker">
              <div></div><div></div><div></div><div></div>
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="pokedex-bottom">
          <div className="bottom-left">
            <div className="joystick"></div>
            <div className="small-buttons">
              <div className="small-btn-red"></div>
              <div className="small-btn-teal"></div>
            </div>
          </div>
          <div className="green-screen">
            This project is part of the course
            <br />
            <a
              href="https://www.react-graph-gallery.com/react-d3-dataviz-course"
              target="_blank"
              rel="noreferrer"
            >
              D3 ❤️ React
            </a>
          </div>
          <div className="dpad">
            <div className="dpad-v"></div>
            <div className="dpad-h"></div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
